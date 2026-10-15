import panelButtons from '../data/panel-buttons.ts';
import { resolveTheme } from './theme-utils.js';

const STATE_KEY = { default: 'Default', hover: 'Hover', pressed: 'Pressed', disabled: 'Disabled', loader: 'Loader' };

const SPINNER_SVG = (color, size) => `<svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
  <circle cx="8" cy="8" r="6" stroke="${color}" stroke-width="2" opacity="0.24"/>
  <path d="M8 2 A6 6 0 0 1 14 8" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
</svg>`;

/**
 * PanelButton — renders HTML string for the given visual state.
 * Interactivity (hover/press transitions) is handled in the story layer.
 */
export function PanelButton({ label = 'Button', size = 24, state = 'default', theme = 'Light', scale = false } = {}) {
  const resolved = resolveTheme(theme);
  const themeEntry = panelButtons[resolved] ?? panelButtons['Light'];
  const sizeEntry = themeEntry[String(size)] ?? themeEntry['24'];
  const token = sizeEntry?.[STATE_KEY[state]] ?? sizeEntry?.['Default'] ?? {};

  const container = token.container ?? {};
  const text = token.text ?? {};
  const spinnerColor = token.spinnerColor ?? text.color ?? 'rgba(0,0,0,0.8)';
  const isLoader = state === 'loader';
  const isDisabled = state === 'disabled';
  const spinnerSize = size === 30 ? 20 : 16;

  const stateClass = state === 'hover' ? 'ui-panel-button--hover'
    : state === 'pressed' ? 'ui-panel-button--pressed'
    : state === 'disabled' ? 'ui-panel-button--disabled'
    : state === 'loader' ? 'ui-panel-button--loader' : '';

  const containerStyle = [
    `height:${container.height ?? size}px`,
    `padding:0 ${container.paddingRight ?? 32}px`,
    `background:${container.background ?? 'white'}`,
    `outline:${container.outline ?? '1px #C0C0C0 solid'}`,
    `outline-offset:${container.outlineOffset ?? -1}px`,
    `border-radius:${container.borderRadius ?? 1}px`,
    'display:inline-flex', 'align-items:center', 'justify-content:center',
    'box-sizing:border-box', 'border:none',
    `width:${scale ? '100%' : 'fit-content'}`,
    `cursor:${isDisabled || isLoader ? 'not-allowed' : 'pointer'}`,
  ].join(';');

  const textStyle = [
    `color:${text.color ?? 'rgba(0,0,0,0.8)'}`,
    `font-size:${text.fontSize ?? 11}px`,
    'font-family:Arial,Helvetica,sans-serif',
    `font-weight:${text.fontWeight ?? 700}`,
    `line-height:${text.lineHeight ?? 16}px`,
    `letter-spacing:${text.letterSpacing ?? 0.22}px`,
    'display:inline-flex', 'align-items:center', 'justify-content:center',
    'width:100%', 'white-space:nowrap',
  ].join(';');

  const inner = isLoader
    ? `<span class="ui-panel-button__spinner" aria-hidden="true" style="color:${spinnerColor}">${SPINNER_SVG(spinnerColor, spinnerSize)}</span>`
    : `<span style="${textStyle}">${label}</span>`;

  const disabledAttr = isDisabled || isLoader ? ` disabled aria-busy="${isLoader}"` : '';
  return `<button type="button" class="ui-panel-button${stateClass ? ' ' + stateClass : ''}" style="${containerStyle}"${disabledAttr}>${inner}</button>`;
}
