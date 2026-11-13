// SPDX-License-Identifier: AGPL-3.0-only
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const directory=path.dirname(fileURLToPath(import.meta.url));
const listen=server=>new Promise(resolve=>server.listen(0,'127.0.0.1',()=>resolve(server.address().port)));
const close=server=>new Promise(resolve=>server.close(resolve));

test('transport restrictions and LM request defaults',async t=>{
 const temporary=await mkdtemp(path.join(tmpdir(),'onlyoffice-bridge-'));
 let received;
 const upstream=http.createServer(async(req,res)=>{
  let body='';for await(const chunk of req)body+=chunk;
  received={path:req.url,body:body?JSON.parse(body):null};
  res.setHeader('Content-Type','application/json');res.end(JSON.stringify({ok:true}));
 });
 const upstreamPort=await listen(upstream);
 const reservation=http.createServer();const port=await listen(reservation);await close(reservation);
 const configFile=path.join(temporary,'config.json');
 await writeFile(configFile,JSON.stringify({port,models:{fixture:{cli:'does-not-exist.exe',model:'fixture',kind:'codex'}},lmStudio:{url:`http://127.0.0.1:${upstreamPort}`,requestDefaults:{fixture:{reasoning_effort:'none'}}}}));
 // Keep the tested server's runtime and log in a disposable directory.
 await writeFile(path.join(temporary,'adapter.mjs'),await readFile(path.join(directory,'onlyoffice-oauth-adapter.mjs')));
 const child=spawn(process.execPath,[path.join(temporary,'adapter.mjs')],{env:{...process.env,ONLYOFFICE_BRIDGE_CONFIG:configFile},stdio:'ignore'});
 t.after(async()=>{const exited=new Promise(resolve=>child.once('exit',resolve));if(child.exitCode===null){child.kill();await exited;}await close(upstream);await rm(temporary,{recursive:true});});
 const base=`http://127.0.0.1:${port}`;
 let ready=false;
 for(let i=0;i<100;i++){try{await fetch(base+'/v1/models');ready=true;break;}catch{await new Promise(resolve=>setTimeout(resolve,30));}}
 assert.ok(ready,'server starts');
 let response=await fetch(base+'/v1/models');assert.equal(response.status,200);assert.deepEqual((await response.json()).data.map(x=>x.id),['fixture']);
 response=await fetch(base+'/v1/models',{headers:{Origin:'https://example.com'}});assert.equal(response.status,403);
 response=await fetch(base+'/v1/models',{method:'OPTIONS',headers:{Origin:'onlyoffice://plugin','Access-Control-Request-Headers':'content-type,x-stainless-lang,untrusted'}});
 assert.equal(response.status,204);assert.equal(response.headers.get('access-control-allow-origin'),'onlyoffice://plugin');assert.equal(response.headers.get('access-control-allow-headers'),'content-type, x-stainless-lang');
 response=await fetch(base+'/v1/chat/completions',{method:'POST',body:JSON.stringify({model:'unknown',messages:[]})});assert.equal(response.status,502);assert.equal((await response.json()).error.message,'Unknown model');
 response=await fetch(base+'/lmstudio/v1/files');assert.equal(response.status,404);
 response=await fetch(base+'/lmstudio/v1/models',{method:'DELETE'});assert.equal(response.status,405);
 response=await fetch(base+'/lmstudio/v1/chat/completions',{method:'POST',body:JSON.stringify({model:'fixture',messages:[]})});assert.equal(response.status,200);assert.equal(received.path,'/v1/chat/completions');assert.equal(received.body.reasoning_effort,'none');
 response=await fetch(base+'/lmstudio/v1/chat/completions',{method:'POST',body:JSON.stringify({model:'fixture',reasoning_effort:'low',messages:[]})});assert.equal(response.status,200);assert.equal(received.body.reasoning_effort,'low');
});

test('provider imports advertise only chat and their configured model',async()=>{
 for(const [file,id] of [['Codex-OAuth-provider.js','codex-oauth-gpt-6.1-sol'],['Claude-OAuth-provider.js','claude-oauth-sonnet-5-5']]){
  const context=vm.createContext({AI:{Provider:class {constructor(...args){this.args=args;}},CapabilitiesUI:{Chat:1}}});
  vm.runInContext((await readFile(path.join(directory,file),'utf8'))+'\nthis.provider = new Provider();',context);
  assert.equal(context.provider.checkModelCapability(),1);assert.equal(context.provider.checkExcludeModel({id}),false);assert.equal(context.provider.checkExcludeModel({id:'other'}),true);
  assert.equal(context.provider.args[2],'');
 }
});
