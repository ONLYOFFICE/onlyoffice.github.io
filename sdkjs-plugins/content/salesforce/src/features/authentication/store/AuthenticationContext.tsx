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

import { createContext } from 'preact';
import { signal, computed } from '@preact/signals';

import type { Authentication, AuthenticationStore } from '@features/authentication/types';
import { emptyAuthentication, AUTHENTICATION_STORAGE_KEY } from '@features/authentication/types';

const TOKEN_LIFETIME_SECONDS = 3600;

function createAuthenticationStore(): AuthenticationStore {
  let expirationTimer: ReturnType<typeof setTimeout> | null = null;
  const stored = localStorage.getItem(AUTHENTICATION_STORAGE_KEY);
  const state = signal<Authentication>(
    stored ? JSON.parse(stored) : emptyAuthentication,
  );

  const clearExpirationTimer = () => {
    if (expirationTimer) {
      clearTimeout(expirationTimer);
      expirationTimer = null;
    }
  };

  const clear = () => {
    clearExpirationTimer();
    state.value = emptyAuthentication;
    localStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
  };

  const setExpirationTimer = (expiresAt: number) => {
    clearExpirationTimer();
    const untilExpiration = (expiresAt * 1000) - Date.now();
    if (untilExpiration > 0) expirationTimer = setTimeout(clear, untilExpiration);
    else clear();
  };

  const isAuthenticated = computed(() => {
    const auth = state.value;
    if (!auth.access_token) return false;
    if (auth.expires_at && Date.now() / 1000 >= auth.expires_at) {
      clear();
      return false;
    }

    return true;
  });

  const authenticate = (authentication: Omit<Authentication, 'expires_at'>) => {
    const expiresAt = Math.floor(authentication.issued_at / 1000) + TOKEN_LIFETIME_SECONDS;

    const fullAuthentication: Authentication = {
      ...authentication,
      expires_at: expiresAt,
    };

    state.value = fullAuthentication;
    localStorage.setItem(AUTHENTICATION_STORAGE_KEY, JSON.stringify(fullAuthentication));
    setExpirationTimer(expiresAt);
  };

  if (state.value.expires_at) setExpirationTimer(state.value.expires_at);

  return {
    state,
    isAuthenticated,
    authenticate,
    clear,
  };
}

const store = createAuthenticationStore();

export const AuthenticationContext = createContext<AuthenticationStore>(store);

interface AuthenticationProviderProps {
  children: preact.ComponentChildren;
}

export function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  return (
    <AuthenticationContext.Provider value={store}>
      {children}
    </AuthenticationContext.Provider>
  );
}
