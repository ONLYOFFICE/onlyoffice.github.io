import { switchTokens } from '../data/switches.ts';
import { resolveTheme } from './theme-utils.js';

/**
 * Switch — HTML-rendering version
 * @param {object} props
 * @param {boolean} [props.checked]
 * @param {'default'|'hover'|'disabled'} [props.state]
 * @param {string} [props.theme]
 */
export function Switch({ checked = false, state = 'default', theme = 'Light' } = {}) {
  const resolvedTheme = resolveTheme(theme);
  const isDisabled = state === 'disabled';
  const stateTokens = switchTokens[resolvedTheme]?.[state] ?? switchTokens['Light']?.['default'];
  const token = checked ? stateTokens.on : stateTokens.off;

  const justifyContent = checked ? 'flex-end' : 'flex-start';
  const opacity = token.opacity ?? 1;

  return `<button type="button" role="switch" aria-checked="${checked}" class="ui-switch"
    style="width:30px;height:16px;border-radius:8px;border:${token.trackBorder ? `1px solid ${token.trackBorder}` : 'none'};background:${token.track};display:inline-flex;align-items:center;justify-content:${justifyContent};padding:1px;box-sizing:border-box;cursor:${isDisabled ? 'default' : 'pointer'};opacity:${opacity};transition:all 120ms ease;"
    ${isDisabled ? 'disabled' : ''}>
    <span style="width:12px;height:12px;border-radius:6px;background:${token.thumb};flex-shrink:0;"></span>
  </button>`;
}
