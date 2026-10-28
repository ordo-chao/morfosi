// ============================================================
// Design tokens — single source of truth for both modes
// Naming follows the site's CSS variables so the mental model
// is the same between the website and the mobile app.
// ============================================================

export const dark = {
  bg:          '#0a0a0a',   // page background
  surface:     '#0f0f0f',   // input / card background (slightly lifted)
  surfaceHi:   '#111111',   // hover / active surface
  fg:          '#f0f0f0',   // primary text
  fgMuted:     '#888888',   // secondary text
  fgFaint:     '#555555',   // tertiary text, hints
  border:      '#2a2a2a',   // 1px borders
  borderStrong:'#444444',   // stronger borders (active states)
  accent:      '#d4663a',   // ember accent
  accentContrast: '#0a0a0a',// text on accent background
  buttonBg:    '#f0f0f0',   // primary button fill
  buttonFg:    '#0a0a0a',   // primary button text
  placeholder: '#444444',   // input placeholder text
  disabled:    '#333333',   // disabled state
};

export const light = {
  bg:          '#ffffff',
  surface:     '#f7f7f7',
  surfaceHi:   '#efefef',
  fg:          '#0a0a0a',
  fgMuted:     '#555555',
  fgFaint:     '#888888',
  border:      '#e2e2e2',
  borderStrong:'#bbbbbb',
  accent:      '#b84f28',   // slightly darker ember so it reads on white
  accentContrast: '#ffffff',
  buttonBg:    '#0a0a0a',
  buttonFg:    '#f0f0f0',
  placeholder: '#999999',
  disabled:    '#cccccc',
};