import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* ===== PAGE ===== */
  container: {
    flex: 1,
    backgroundColor: c.bg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },

  /* ===== BRAND ===== */
  brandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  brand: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: -0.5,
    color: c.fg,
  },
  brandDot: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontWeight: '900',
    fontSize: 22,
    color: c.accent,
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
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 12,
    color: c.fgMuted,
    marginBottom: 40,
    lineHeight: 20,
  },
  subtitleStrong: {
    color: c.fg,
    fontWeight: 'bold',
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
  hint: {
    fontSize: 10,
    color: c.fgFaint,
    marginTop: -16,
    marginBottom: 24,
    letterSpacing: 0.5,
    fontFamily: 'monospace',
  },

  /* Password row */
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    marginBottom: 24,
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

  /* Primary button */
  button: {
    backgroundColor: c.buttonBg,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
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

  /* Register / login switch */
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

  /* ===== OTP GRID ===== */
  otpGridContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 32,
    gap: 12,
  },
  otpInputBox: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    fontSize: 24,
    fontWeight: 'bold',
    color: c.fg,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  otpInputBoxFilled: {
    borderColor: c.accent,
    color: c.fg,
  },
});