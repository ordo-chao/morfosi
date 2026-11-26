// src/pages/teachers/tasks/create/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* =========================================================
   * PAGE
   * ======================================================= */
  page: {
    flex: 1,
    backgroundColor: c.bg,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },

  /* =========================================================
   * HEADER
   * ======================================================= */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    backgroundColor: c.bg,
  },
  headerTitle: {
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.fg,
  },

  /* =========================================================
   * FIELD
   * ======================================================= */
  field: {
    gap: 6,
    marginBottom: 16,
  },
  fieldLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
  },

  /* =========================================================
   * INPUTS
   * ======================================================= */
  input: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    color: c.fg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
  },
  textarea: {
    minHeight: 120,
    paddingTop: 10,
  },

  /* =========================================================
   * TWO-COLUMN ROW (due + points)
   * ======================================================= */
  twoCol: {
    flexDirection: 'row',
    gap: 10,
  },

  /* =========================================================
   * CLASS PILLS
   * ======================================================= */
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  pillActive: {
    borderColor: c.accent,
    backgroundColor: c.surfaceHi,
  },
  pillText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    color: c.fgMuted,
  },
  pillTextActive: {
    color: c.accent,
    fontWeight: '900',
  },

  /* =========================================================
   * SWITCH ROW (allow late submissions)
   * ======================================================= */
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: c.border,
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  switchHint: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
  },

  /* =========================================================
   * ATTACHMENTS
   * ======================================================= */
  attachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: c.border,
    marginTop: 6,
  },
  attachBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.accent,
  },
  attachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  attachName: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
  },

  /* =========================================================
   * RUBRIC EDITOR
   * ======================================================= */
  rubricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  rubricNameInput: {
    flex: 1,
  },
  rubricWeightInput: {
    width: 60,
  },
  rubricMaxInput: {
    width: 60,
  },

  /* =========================================================
   * FOOTER (Save Draft / Publish)
   * ======================================================= */
  footer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: c.border,
    backgroundColor: c.bg,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: c.accent,
  },
  btnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.accentContrast,
  },
  btnGhost: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  btnGhostText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fg,
  },
});