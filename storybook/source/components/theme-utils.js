/**
 * Theme utilities for HTML-based components
 * Mirrors the functionality of editors-storybook/src/components/shared/pluginTheme.ts
 */

export const themeTokens = {
  'Light': {
    pageBg: '#FFFFFF', pageSurface: '#F7F7F7', pageSurfaceAlt: '#F9F9F9',
    pageBorder: '#DFDFDF', pageFg: 'rgba(0, 0, 0, 0.80)', pageMuted: 'rgba(0, 0, 0, 0.60)',
  },
  'Light Classic': {
    pageBg: '#FFFFFF', pageSurface: '#F1F1F1', pageSurfaceAlt: '#D8DADC',
    pageBorder: '#CBCBCB', pageFg: '#444444', pageMuted: '#A5A5A5',
  },
  'Modern Light': {
    pageBg: '#FFFFFF', pageSurface: '#F3F3F3', pageSurfaceAlt: '#F9F9F9',
    pageBorder: '#E1E1E1', pageFg: '#383838', pageMuted: undefined,
  },
  'Modern Dark': {
    pageBg: '#404040', pageSurface: '#404040', pageSurfaceAlt: '#585858',
    pageBorder: '#686868', pageFg: '#E8E8E8', pageMuted: 'rgba(232, 232, 232, 0.70)',
  },
  'Dark': {
    pageBg: '#333333', pageSurface: '#333333', pageSurfaceAlt: '#555555',
    pageBorder: '#666666', pageFg: 'rgba(255, 255, 255, 0.80)', pageMuted: 'rgba(255, 255, 255, 0.60)',
  },
  'Dark Contrast': {
    pageBg: '#1E1E1E', pageSurface: '#1E1E1E', pageSurfaceAlt: '#424242',
    pageBorder: '#696969', pageFg: '#E8E8E8', pageMuted: '#B8B8B8',
  },
};

const THEME_ALIASES = {
  light: 'Light', lightclassic: 'Light Classic', modernlight: 'Modern Light',
  moderndark: 'Modern Dark', dark: 'Dark', darkcontrast: 'Dark Contrast',
};

export function resolveTheme(theme) {
  if (!theme) return 'Light';
  const cleaned = decodeURIComponent(String(theme)).replace(/^!/, '').trim();
  const compact = cleaned.replace(/[\s_-]+/g, '').toLowerCase();
  return THEME_ALIASES[compact] ?? 'Light';
}

export function getTokens(theme) {
  const resolved = resolveTheme(theme);
  const tokens = themeTokens[resolved];
  return {
    theme: resolved,
    bg: tokens.pageBg,
    surface: tokens.pageSurface,
    surfaceAlt: tokens.pageSurfaceAlt,
    border: tokens.pageBorder,
    fg: tokens.pageFg,
    muted: tokens.pageMuted ?? tokens.pageFg,
    accent: (resolved === 'Dark' || resolved === 'Dark Contrast' || resolved === 'Modern Dark') ? '#4D9DFF' : '#0B6DFF',
    isDark: resolved === 'Dark' || resolved === 'Dark Contrast' || resolved === 'Modern Dark',
    isModern: resolved.startsWith('Modern'),
  };
}

/** Convert a camelCase style key to kebab-case CSS property */
export function styleStr(obj) {
  return Object.entries(obj)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`)
    .join(';');
}

export const pluginThemeOptions = ['Light', 'Light Classic', 'Dark', 'Dark Contrast', 'Modern Light', 'Modern Dark'];

// Story theme utilities

/** Resolve story-level theme: if argsTheme is 'Auto' or undefined, use globalTheme */
export function resolveStoryTheme(argsTheme, globalTheme) {
  if (argsTheme && argsTheme !== 'Auto') return resolveTheme(argsTheme);
  return resolveTheme(globalTheme);
}

/**
 * Create an interactive DOM wrapper that re-renders HTML string on hover/press.
 * @param {function(state: string): string} renderFn - returns HTML string for given state ('default'|'hover'|'pressed')
 * @param {object} [opts]
 * @param {boolean} [opts.disabled] - skip event listeners
 * @param {string} [opts.forcedState] - if set, render this state statically (no listeners)
 * @returns {HTMLElement}
 */
export function makeInteractive(renderFn, { disabled = false, forcedState } = {}) {
  const el = document.createElement('div');
  el.style.display = 'contents';

  if (forcedState !== undefined || disabled) {
    el.innerHTML = renderFn(forcedState ?? 'default');
    return el;
  }

  let hovered = false;
  let pressed = false;

  const update = () => {
    el.innerHTML = renderFn(pressed ? 'pressed' : hovered ? 'hover' : 'default');
  };

  el.addEventListener('mouseenter', () => { hovered = true; update(); });
  el.addEventListener('mouseleave', () => { hovered = false; pressed = false; update(); });
  el.addEventListener('mousedown', () => { pressed = true; update(); });
  el.addEventListener('mouseup', () => { pressed = false; update(); });

  update();
  return el;
}
