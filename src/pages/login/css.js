import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* ===== PAGE ===== */
  container: {
    flex: 1,
    backgroundColor: c.bg,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  inner: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },

  /* ===== LABEL BAR ===== */
  labelBar: {
    fontSize: 10,
    letterSpacing: 2,
    color: c.accent,
    marginBottom: 32,
    fontFamily: 'monospace',
  },

  /* ===== HEADINGS ===== */
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -1,
    marginBottom: 12,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 12,
    color: c.fgMuted,
    marginBottom: 40,
    lineHeight: 20,
  },

  /* ===== FORM ===== */
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: c.accent,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  input: {
    borderWidth: 1,
    borderColor: c.border,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: c.fg,
    marginBottom: 24,
    backgroundColor: c.surface,
    fontFamily: 'monospace',
  },

  /* Password row */
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    marginBottom: 12,
    backgroundColor: c.surface,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: c.fg,
    fontFamily: 'monospace',
  },
  eyeIconContainer: {
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Forgot */
  forgotPassword: {
    color: c.fgMuted,
    textAlign: 'right',
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 28,
    fontFamily: 'monospace',
  },

  /* Primary button */
  button: {
    backgroundColor: c.buttonBg,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: c.buttonBg,
  },
  buttonText: {
    color: c.buttonFg,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    fontFamily: 'monospace',
  },

  /* Register */
  registerText: {
    textAlign: 'center',
    color: c.fgMuted,
    fontSize: 12,
    marginBottom: 36,
    lineHeight: 20,
  },
  registerLink: {
    color: c.fg,
    fontWeight: 'bold',
  },

  /* Divider */
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: c.border,
  },
  orText: {
    color: c.fgFaint,
    fontSize: 10,
    letterSpacing: 2,
    marginHorizontal: 14,
    fontFamily: 'monospace',
  },

  /* Social buttons */
  continueContainer: {
    alignItems: 'center',
  },
  continue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: c.border,
    paddingVertical: 14,
    width: '100%',
    marginBottom: 10,
    backgroundColor: c.bg,
  },
  socialIcon: {
    marginRight: 10,
  },
  continueText: {
    color: c.fg,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.2,
    fontFamily: 'monospace',
  },

  /* ===== THEME TOGGLE (test-only) ===== */
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  themeLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: c.fgFaint,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
  },
  themeBtn: {
    borderWidth: 1,
    borderColor: c.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  themeBtnText: {
    fontSize: 10,
    letterSpacing: 1,
    color: c.fgMuted,
    fontFamily: 'monospace',
  },
  themeBtnActive: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  themeBtnTextActive: {
    color: c.accentContrast,
    fontWeight: 'bold',
  },
});