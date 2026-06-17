/**
 *
 * (c) Copyright Ascensio System SIA 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const SALESFORCE_URLS = {
  production: 'https://login.salesforce.com',
  sandbox: 'https://test.salesforce.com',
};

export function openSalesforceAuth(clientId: string, environment: 'production' | 'sandbox' = 'production'): void {
  const redirectUri = import.meta.env.VITE_REDIRECT_URI ?? new URL('./oauth.html', window.location.href).href;
  const baseUrl = SALESFORCE_URLS[environment];

  const params = new URLSearchParams({
    response_type: 'token',
    client_id: clientId,
    redirect_uri: redirectUri,
  });

  const url = `${baseUrl}/services/oauth2/authorize?${params.toString()}`;
  window.open(url, 'salesforce_auth', 'width=500,height=700');
}
