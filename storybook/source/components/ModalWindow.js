import { Header } from './Header.js';
import { resolveTheme } from './theme-utils.js';

const modalTokensByTheme = {
  'Light': {
    frameBg: '#FFFFFF',
    frameBorder: '#E0E0E0',
    contentBg: '#FFFFFF',
    contentText: 'rgba(0, 0, 0, 0.60)',
    notificationText: 'rgba(0, 0, 0, 0.80)',
    divider: '#E0E0E0',
  },
  'Light Classic': {
    frameBg: '#FFFFFF',
    frameBorder: '#D8DADC',
    contentBg: '#FFFFFF',
    contentText: '#A5A5A5',
    notificationText: '#444444',
    divider: '#D8DADC',
  },
  'Dark': {
    frameBg: '#333333',
    frameBorder: '#555555',
    contentBg: '#333333',
    contentText: 'rgba(255, 255, 255, 0.60)',
    notificationText: 'rgba(255, 255, 255, 0.80)',
    divider: '#555555',
  },
  'Dark Contrast': {
    frameBg: '#1E1E1E',
    frameBorder: '#424242',
    contentBg: '#1E1E1E',
    contentText: '#B8B8B8',
    notificationText: '#E8E8E8',
    divider: '#424242',
  },
  'Modern Light': {
    frameBg: '#FFFFFF',
    frameBorder: '#EAEAEA',
    contentBg: '#FFFFFF',
    contentText: '#383838',
    notificationText: '#383838',
    divider: '#EAEAEA',
  },
  'Modern Dark': {
    frameBg: '#404040',
    frameBorder: '#585858',
    contentBg: '#404040',
    contentText: '#F3F3F3',
    notificationText: '#F3F3F3',
    divider: '#585858',
  },
};

const primaryButtonByTheme = {
  'Light': {
    bg: '#444444',
    text: '#FFFFFF',
    hoverBg: '#333333',
    pressedBg: '#1F1F1F',
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  'Light Classic': {
    bg: '#7D858C',
    text: '#FFFFFF',
    hoverBg: '#666D73',
    pressedBg: '#666D73',
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  'Dark': {
    bg: '#DDDDDD',
    text: '#333333',
    hoverBg: '#FCFCFC',
    pressedBg: '#FCFCFC',
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  'Dark Contrast': {
    bg: '#E6E6E6',
    text: '#121212',
    hoverBg: '#A6A6A6',
    pressedBg: '#A6A6A6',
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  'Modern Light': {
    bg: '#4473CA',
    text: '#FFFFFF',
    hoverBg: '#2A5BB9',
    pressedBg: '#1D4FAF',
    pressedBorder: '#2A5BB9',
    radius: 4,
    size: 24,
    minWidth: 48,
    px: 12,
    letterSpacing: 0.24,
    fontSize: 12,
  },
  'Modern Dark': {
    bg: '#4A7BE0',
    text: '#FFFFFF',
    hoverBg: '#366CDA',
    pressedBg: '#2D66CC',
    pressedBorder: '#4A7BE0',
    radius: 4,
    size: 24,
    minWidth: 48,
    px: 12,
    letterSpacing: 0.24,
    fontSize: 12,
  },
};

const secondaryButtonByTheme = {
  'Light': {
    bg: '#FFFFFF',
    text: 'rgba(0, 0, 0, 0.80)',
    border: '#C0C0C0',
    hoverBg: '#E0E0E0',
    pressedBg: '#CBCBCB',
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  'Light Classic': {
    bg: '#FFFFFF',
    text: '#444444',
    border: '#CFCFCF',
    hoverBg: '#D8DADC',
    pressedBg: '#7D858C',
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  'Dark': {
    bg: '#333333',
    text: 'rgba(255, 255, 255, 0.80)',
    border: '#666666',
    hoverBg: '#555555',
    pressedBg: '#606060',
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  'Dark Contrast': {
    bg: '#1E1E1E',
    text: '#E8E8E8',
    border: '#696969',
    hoverBg: '#424242',
    pressedBg: '#666666',
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  'Modern Light': {
    bg: '#FFFFFF',
    text: '#383838',
    border: '#E1E1E1',
    hoverBg: '#F9F9F9',
    pressedBg: '#EAEAEA',
    pressedBorder: '#2A5BB9',
    radius: 4,
    size: 24,
    minWidth: 48,
    px: 12,
    letterSpacing: 0.24,
    fontSize: 12,
  },
  'Modern Dark': {
    bg: '#404040',
    text: '#F3F3F3',
    border: '#686868',
    hoverBg: '#585858',
    pressedBg: '#686868',
    pressedBorder: '#4A7BE0',
    radius: 4,
    size: 24,
    minWidth: 48,
    px: 12,
    letterSpacing: 0.24,
    fontSize: 12,
  },
};

const sizeToWidth = { S: 350, M: 610, L: 1380 };
const sizeToContentHeight = { S: 206, M: 206, L: 423 };

const frameRadiusByTheme = {
  'Light': 2,
  'Light Classic': 2,
  'Dark': 2,
  'Dark Contrast': 2,
  'Modern Light': 4,
  'Modern Dark': 4,
};

const WARNING_SVG = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
  <path d="M20.5303 0.882195C21.1795 -0.256091 22.8205 -0.256088 23.4696 0.882198L43.765 36.47C44.4082 37.5978 43.5937 38.9999 42.2953 38.9999H1.70464C0.406249 38.9999 -0.408223 37.5978 0.234989 36.47L20.5303 0.882195Z" fill="#F2BE08"/>
  <path d="M22.0007 29.9739C23.39 29.9741 24.5161 31.1002 24.5163 32.4895C24.5163 33.879 23.3901 35.0059 22.0007 35.0061C20.6111 35.0061 19.4841 33.8791 19.4841 32.4895C19.4843 31.1001 20.6112 29.9739 22.0007 29.9739ZM21.9997 9.0061C23.8524 9.0061 25.355 10.5079 25.3552 12.3606C25.3552 13.225 24.3402 17.6282 23.6775 21.5872C23.089 25.1023 22.8408 28.2677 22.8386 28.2961H21.1618C21.1598 28.2695 20.9116 25.1033 20.323 21.5872C19.6602 17.6282 18.6452 13.225 18.6452 12.3606C18.6454 10.508 20.1472 9.00628 21.9997 9.0061Z" fill="#FFFFFF"/>
</svg>`;

/**
 * ModalWindow — HTML-rendering dialog shell
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.contentLabel]
 * @param {string} [props.notificationText]
 * @param {string} [props.primaryLabel]
 * @param {string} [props.secondaryLabel]
 * @param {'S'|'M'|'L'} [props.size]
 * @param {boolean} [props.notification]
 * @param {'auto'|'single'|'double'} [props.footerMode]
 * @param {string} [props.theme]
 */
export function ModalWindow({
  title = 'Title',
  contentLabel = 'Content',
  notificationText = 'Text\nText',
  primaryLabel = 'Button',
  secondaryLabel = 'Button',
  size = 'M',
  notification = false,
  footerMode = 'auto',
  theme,
} = {}) {
  const resolved = resolveTheme(theme);
  const tokens = modalTokensByTheme[resolved] ?? modalTokensByTheme['Light'];
  const isModern = resolved.startsWith('Modern');
  const resolvedFooter = footerMode === 'auto' ? (size === 'L' ? 'double' : 'single') : footerMode;
  const sizeWidth = sizeToWidth[size] ?? sizeToWidth['M'];
  const frameRadius = frameRadiusByTheme[resolved] ?? 2;
  const primaryBtn = primaryButtonByTheme[resolved] ?? primaryButtonByTheme['Light'];
  const secondaryBtn = secondaryButtonByTheme[resolved] ?? secondaryButtonByTheme['Light'];
  const fontSize = isModern ? 12 : 11;
  const letterSpacing = isModern ? 0.24 : 0.22;
  const footerPaddingY = isModern ? 12 : 16;

  const headerHtml = Header({ title, width: sizeWidth, variant: 'window', theme: resolved });

  const contentAreaHtml = notification
    ? `<div style="min-height:44px;display:inline-flex;align-items:center;gap:16px;">
        ${WARNING_SVG}
        <div style="color:${tokens.notificationText};font-family:Arial,Helvetica,sans-serif;font-size:${fontSize}px;font-weight:400;line-height:16px;letter-spacing:${letterSpacing}px;white-space:pre-line;">${notificationText}</div>
      </div>`
    : `<div style="min-height:${sizeToContentHeight[size] ?? 206}px;display:flex;align-items:center;justify-content:center;color:${tokens.contentText};font-family:Arial,Helvetica,sans-serif;font-size:${fontSize}px;font-weight:400;line-height:16px;letter-spacing:${letterSpacing}px;text-align:center;">${contentLabel}</div>`;

  const primaryBtnBorder = primaryBtn.border ? `1px solid ${primaryBtn.border}` : '1px solid transparent';
  const primaryBtnPressedBorder = primaryBtn.pressedBorder ? `1px solid ${primaryBtn.pressedBorder}` : primaryBtnBorder;
  const primaryBtnHtml = `<button type="button" data-role="primary" data-rest-bg="${primaryBtn.bg}" data-hover-bg="${primaryBtn.hoverBg}" data-pressed-bg="${primaryBtn.pressedBg}" data-rest-border="${primaryBtnBorder}" data-pressed-border="${primaryBtnPressedBorder}" style="height:${primaryBtn.size}px;${primaryBtn.minWidth ? `min-width:${primaryBtn.minWidth}px;` : ''}padding:0 ${primaryBtn.px}px;border-radius:${primaryBtn.radius}px;border:${primaryBtnBorder};background:${primaryBtn.bg};color:${primaryBtn.text};font-family:Arial,Helvetica,sans-serif;font-size:${primaryBtn.fontSize}px;font-weight:700;line-height:16px;letter-spacing:${primaryBtn.letterSpacing}px;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;">${primaryLabel}</button>`;

  const secondaryBtnBorder = secondaryBtn.border ? `1px solid ${secondaryBtn.border}` : '1px solid transparent';
  const secondaryBtnPressedBorder = secondaryBtn.pressedBorder ? `1px solid ${secondaryBtn.pressedBorder}` : secondaryBtnBorder;
  const secondaryBtnHtml = `<button type="button" data-role="secondary" data-rest-bg="${secondaryBtn.bg}" data-hover-bg="${secondaryBtn.hoverBg}" data-pressed-bg="${secondaryBtn.pressedBg}" data-rest-border="${secondaryBtnBorder}" data-pressed-border="${secondaryBtnPressedBorder}" style="height:${secondaryBtn.size}px;${secondaryBtn.minWidth ? `min-width:${secondaryBtn.minWidth}px;` : ''}padding:0 ${secondaryBtn.px}px;border-radius:${secondaryBtn.radius}px;border:${secondaryBtnBorder};background:${secondaryBtn.bg};color:${secondaryBtn.text};font-family:Arial,Helvetica,sans-serif;font-size:${secondaryBtn.fontSize}px;font-weight:700;line-height:16px;letter-spacing:${secondaryBtn.letterSpacing}px;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;">${secondaryLabel}</button>`;

  const footerButtons = resolvedFooter === 'double'
    ? `${primaryBtnHtml}${secondaryBtnHtml}`
    : primaryBtnHtml;

  return `<div role="dialog" aria-modal="true" style="width:${sizeWidth}px;display:flex;flex-direction:column;border:1px solid ${tokens.frameBorder};background:${tokens.frameBg};border-radius:${frameRadius}px;box-sizing:border-box;overflow:hidden;">
  ${headerHtml}
  <div style="background:${tokens.contentBg};padding:16px;display:flex;flex-direction:column;gap:16px;box-sizing:border-box;">
    ${contentAreaHtml}
  </div>
  <div style="background:${tokens.contentBg};">
    <div style="height:1px;background:${tokens.divider};"></div>
    <div style="padding:${footerPaddingY}px 16px;display:flex;align-items:center;justify-content:center;gap:10px;box-sizing:border-box;flex-wrap:wrap;">
      ${footerButtons}
    </div>
  </div>
</div>`;
}
