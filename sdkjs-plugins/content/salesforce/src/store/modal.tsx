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

import { createContext, ComponentType } from 'preact';
import { signal, ReadonlySignal } from '@preact/signals';
import { useContext } from 'preact/hooks';

import { useTranslation } from '@hooks';

import { t } from '@utils/i18n';

export type ModalComponent = ComponentType<{ params: URLSearchParams }>;

const BASE_URL = `${window.location.origin}${window.location.pathname}`;
const PLUGIN_BUTTON_EVENT = 'plugin:button';
const SOQL_KEYS = {
  query: '__soql_editor_query__',
  execute: '__soql_editor_execute__',
  result: '__soql_editor_result__',
  cancel: '__soql_editor_cancel__',
} as const;
const POLL_INTERVAL = 100;
const DEFAULT_CONFIRM_SIZE: [number, number] = [320, 71];
const DEFAULT_SOQL_SIZE: [number, number] = [610, 350];

const registry = new Map<string, ModalComponent>();

export interface ModalButton {
  text: string;
  primary?: boolean;
}

export interface ModalConfig {
  component: string;
  title: string;
  buttons: ModalButton[];
  size: [number, number];
  params?: Record<string, string>;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  size?: [number, number];
}

export interface SoqlEditorOptions {
  query?: string;
  size?: [number, number];
}

interface SoqlExecuteResult {
  success: boolean; error?: string;
}

interface ModalStore {
  isOpen: ReadonlySignal<boolean>;
  show: (config: ModalConfig, onConfirm?: () => void, onCancel?: () => void) => void;
  confirm: (options: ConfirmOptions, onConfirm: () => void, onCancel?: () => void) => void;
  soqlEditor: (
    options: SoqlEditorOptions,
    onExecute: (query: string) => Promise<SoqlExecuteResult>,
    onCancel?: () => void,
  ) => void;
  close: () => void;
}

export function registerModal(name: string, component: ModalComponent): void {
  registry.set(name, component);
}

export function getModalComponent(name: string): ModalComponent | undefined {
  return registry.get(name);
}

const buildUrl = (component: string, params?: Record<string, string>): string => {
  const search = new URLSearchParams({ modal: component, ...params });
  return `${BASE_URL}?${search}`;
};

const getPluginWindowConfig = (title: string, size: [number, number], buttons: ModalButton[] = []) => ({
  description: title,
  isVisual: true,
  isModal: true,
  buttons,
  size,
  EditorsSupport: ['cell'],
  isDisplayedInViewer: true,
});

function attachButtonHandler(
  pluginWindow: { close: () => void },
  onConfirm?: () => void,
  onCancel?: () => void,
  onClose?: () => void,
): () => void {
  const handler = (e: CustomEvent<{ id: number | string }>) => {
    window.removeEventListener(PLUGIN_BUTTON_EVENT, handler as EventListener);
    const confirmed = e.detail.id === 0 || e.detail.id === '0';
    if (confirmed) {
      onConfirm?.();
    } else {
      onCancel?.();
    }
    pluginWindow.close();
    onClose?.();
  };

  window.addEventListener(PLUGIN_BUTTON_EVENT, handler as EventListener);
  return () => {
    window.removeEventListener(PLUGIN_BUTTON_EVENT, handler as EventListener);
    pluginWindow.close();
  };
}

const clearSoqlStorage = () => {
  Object.values(SOQL_KEYS).forEach((key) => localStorage.removeItem(key));
};

const hasPluginWindow = () => !!window.Asc?.PluginWindow;

function createModalStore(): ModalStore {
  const cleanup = signal<(() => void) | null>(null);
  const isOpen = signal(false);

  const closeModal = () => {
    cleanup.value?.();
    isOpen.value = false;
    cleanup.value = null;
  };

  const show = (config: ModalConfig, onConfirm?: () => void, onCancel?: () => void) => {
    cleanup.value?.();

    if (!registry.has(config.component)) {
      console.error(`Modal component "${config.component}" not registered`);
      return;
    }

    if (!hasPluginWindow()) {
      console.warn('PluginWindow not available, falling back to browser confirm');
      const message = config.params?.message || config.title;
      if (window.confirm(message)) {
        onConfirm?.();
      } else {
        onCancel?.();
      }
      return;
    }

    const url = buildUrl(config.component, config.params);
    const pluginWindow = new window.Asc.PluginWindow();

    cleanup.value = attachButtonHandler(pluginWindow, onConfirm, onCancel, closeModal);

    pluginWindow.show({
      url,
      ...getPluginWindowConfig(config.title, config.size, config.buttons),
    });

    isOpen.value = true;
  };

  const confirm = (options: ConfirmOptions, onConfirm: () => void, onCancel?: () => void) => {
    show({
      component: 'confirmation',
      title: options.title ?? t('common.confirm'),
      buttons: [
        { text: options.confirmText ?? t('common.confirm'), primary: true },
        { text: options.cancelText ?? t('common.cancel') },
      ],
      size: options.size ?? DEFAULT_CONFIRM_SIZE,
      params: { message: options.message },
    }, onConfirm, onCancel);
  };

  const soqlEditor = (
    options: SoqlEditorOptions,
    onExecute: (query: string) => Promise<SoqlExecuteResult>,
    onCancel?: () => void,
  ) => {
    cleanup.value?.();

    if (!registry.has('soql-editor')) {
      console.error('SOQL editor modal not registered');
      return;
    }

    if (!hasPluginWindow()) {
      console.warn('PluginWindow not available, falling back to browser prompt');
      const query = window.prompt('Enter SOQL query:', options.query || '');
      if (query) {
        onExecute(query);
      } else {
        onCancel?.();
      }
      return;
    }

    clearSoqlStorage();

    const url = buildUrl('soql-editor', { query: options.query || '' });
    const pluginWindow = new window.Asc.PluginWindow();
    let pollInterval: ReturnType<typeof setInterval> | null = null;

    const closeSoqlModal = () => {
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
      clearSoqlStorage();
      pluginWindow.close();
      cleanup.value = null;
      isOpen.value = false;
    };

    pollInterval = setInterval(async () => {
      if (localStorage.getItem(SOQL_KEYS.cancel) === 'true') {
        localStorage.removeItem(SOQL_KEYS.cancel);
        closeSoqlModal();
        onCancel?.();
        return;
      }

      if (localStorage.getItem(SOQL_KEYS.execute) === 'true') {
        localStorage.removeItem(SOQL_KEYS.execute);
        const query = localStorage.getItem(SOQL_KEYS.query) || '';

        if (query.trim()) {
          const result = await onExecute(query);
          if (result.success) {
            closeSoqlModal();
          } else {
            localStorage.setItem(SOQL_KEYS.result, JSON.stringify(result));
          }
        }
      }
    }, POLL_INTERVAL);

    const buttonHandler = () => {
      window.removeEventListener(PLUGIN_BUTTON_EVENT, buttonHandler as EventListener);
      closeSoqlModal();
      onCancel?.();
    };

    window.addEventListener(PLUGIN_BUTTON_EVENT, buttonHandler as EventListener);
    cleanup.value = () => {
      window.removeEventListener(PLUGIN_BUTTON_EVENT, buttonHandler as EventListener);
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
      clearSoqlStorage();
      pluginWindow.close();
      isOpen.value = false;
    };

    pluginWindow.show({
      url,
      ...getPluginWindowConfig(t('import.soql_editor'), options.size ?? DEFAULT_SOQL_SIZE),
    });

    isOpen.value = true;
  };

  return {
    isOpen, show, confirm, soqlEditor, close: closeModal,
  };
}

const store = createModalStore();
const ModalContext = createContext<ModalStore>(store);

export function ModalStore({ children }: { children: preact.ComponentChildren }) {
  return <ModalContext.Provider value={store}>{children}</ModalContext.Provider>;
}

export function useModals() {
  return useContext(ModalContext);
}

export function ModalRenderer() {
  const { t: tHook } = useTranslation();
  const params = new URLSearchParams(window.location.search);
  const componentName = params.get('modal');
  const Component = componentName ? getModalComponent(componentName) : undefined;

  if (!Component) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        {tHook('Common.unknownModal')}
        :
        {componentName}
      </div>
    );
  }

  return <Component params={params} />;
}
