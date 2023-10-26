// header
var header = {"alg":"HS256","sign_type":"SIGN"}

// payload
var apikey = localStorage.getItem('apikey');
var [userId, secret] = apikey.split('.');
const payload = {
    "api_key": userId,
    "exp": Math.floor(Date.now() / 1000) + (60 * 60 * 24) ,
    "timestamp": Date.now() / 1000,
};

// generate JWT
var sHeader = JSON.stringify(header);
var sPayload = JSON.stringify(payload);
var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, {utf8: secret});

window.Asc.JWT = sJWT;

// console.log(sJWT)