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
    gap: 12,
  },

  /* ===== META ===== */
  metaBlock: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    gap: 6,
    marginBottom: 4,
  },
  metaLine: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    letterSpacing: 0.2,
  },
  metaKey: {
    fontWeight: '900',
    color: c.fg,
  },
  metaLink: {
    marginTop: 4,
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
  },

  /* ===== CONTENTS ===== */
  sectionTitleLarge: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 8,
    marginBottom: 8,
  },
  contentsBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    marginBottom: 8,
  },
  contentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  contentsNumber: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '900',
    color: c.accent,
    width: 20,
  },
  contentsLabel: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
  },

  /* ===== ACCORDION SECTION ===== */
  section: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  sectionNumber: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '900',
    color: c.accent,
    width: 20,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  sectionBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: c.border,
    paddingTop: 12,
  },
  sectionSummary: {
    fontSize: 12,
    lineHeight: 18,
    color: c.fgMuted,
  },
  bullets: {
    gap: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  bulletDot: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: c.accent,
    lineHeight: 18,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
    lineHeight: 18,
  },
  sectionParagraph: {
    fontSize: 12,
    lineHeight: 18,
    color: c.fgMuted,
  },

  /* ===== ACTIONS ===== */
  actionsBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    marginBottom: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  actionBtnText: {
    flex: 1,
    fontSize: 13,
    color: c.fg,
    fontWeight: '500',
  },

  /* ===== LEGAL ===== */
  legalBlock: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: c.border,
    gap: 8,
  },
  legalText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  legalLink: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
  },
});