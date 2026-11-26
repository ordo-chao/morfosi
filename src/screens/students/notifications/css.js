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

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },

  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 4,
    marginBottom: 8,
  },

  /* ===== LIST BLOCK ===== */
  listBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: 13,
    color: c.fg,
    fontWeight: '500',
  },
  rowSub: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },

  /* ===== TOGGLE ===== */
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.borderStrong,
    backgroundColor: c.surfaceHi,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleOn: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  knob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: c.fgMuted,
  },
  knobOn: {
    backgroundColor: c.accentContrast,
    alignSelf: 'flex-end',
  },

  /* ===== TIMING ===== */
  timingBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
  },
  timingLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
    marginBottom: 10,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timingChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  timingChipActive: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  timingChipText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '700',
    color: c.fgMuted,
  },
  timingChipTextActive: {
    color: c.accentContrast,
    fontWeight: '900',
  },

  quietRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quietInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    color: c.fg,
    fontFamily: 'monospace',
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 10,
    textAlign: 'center',
  },
  quietTo: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fgMuted,
  },
  quietHint: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 8,
    letterSpacing: 0.2,
  },

  /* ===== SAVE ===== */
  saveBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.buttonBg,
    backgroundColor: c.buttonBg,
    marginTop: 12,
  },
  saveText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
  warningNote: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#e25b5b',
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.3,
  },
});