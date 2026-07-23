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

import type { ReadonlySignal } from '@preact/signals';

export const AUTHENTICATION_STORAGE_KEY = 'salesforce_authentication';

export interface Authentication {
  id: string;
  access_token: string;
  instance_url: string;
  issued_at: number;
  expires_at: number;
  scope: string;
  signature: string;
  token_type: string;
}

export interface AuthenticationStore {
  state: ReadonlySignal<Authentication>;
  isAuthenticated: ReadonlySignal<boolean>;
  authenticate: (authentication: Omit<Authentication, 'expires_at'>) => void;
  clear: () => void;
}

export const emptyAuthentication: Authentication = {
  id: '',
  access_token: '',
  instance_url: '',
  issued_at: 0,
  expires_at: 0,
  scope: '',
  signature: '',
  token_type: '',
};
