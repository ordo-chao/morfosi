// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  headerTitle: {
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.fg,
  },
  headerAction: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 24,
  },

  /* ===== AVATAR ===== */
  avatarBlock: {
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
  avatarInitials: {
    fontFamily: 'monospace',
    fontSize: 32,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -1,
  },
  avatarActions: {
    flexDirection: 'row',
    gap: 8,
  },
  avatarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  avatarBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== FIELDS ===== */
  fieldsBlock: {
    gap: 18,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    color: c.fgMuted,
    fontWeight: '900',
  },
  inputWrap: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    color: c.fg,
    fontFamily: 'monospace',
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingRight: 34,
  },
  inputLocked: {
    color: c.fgMuted,
    backgroundColor: c.surfaceHi,
  },
  inputLock: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  fieldHint: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },
  fieldAction: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 2,
  },

  /* ===== LOCKED NOTE ===== */
  lockedNote: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 8,
  },
  lockedNoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lockedNoteTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
  },
  lockedNoteBody: {
    fontSize: 12,
    lineHeight: 18,
    color: c.fgMuted,
  },

  /* ===== SAVE ===== */
  saveBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.buttonBg,
    backgroundColor: c.buttonBg,
  },
  saveBtnDisabled: {
    backgroundColor: c.disabled,
    borderColor: c.disabled,
  },
  saveText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
  saveTextDisabled: {
    color: c.fgMuted,
  },
  footnote: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
});