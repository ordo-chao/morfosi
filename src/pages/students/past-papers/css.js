// revision/past-papers/css.js
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
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 12,
  },

  /* ===== SEARCH ===== */
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
    fontFamily: 'monospace',
    padding: 0,
  },

  /* ===== FILTER CHIPS ===== */
  chipsScroll: {
    flexGrow: 0,
    marginBottom: 4,
  },
  chipsRow: {
    gap: 6,
    paddingVertical: 2,
  },
  chip: {
    borderWidth: 1,
    borderColor: c.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: c.surface,
  },
  chipActive: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  chipText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '700',
    color: c.fgMuted,
  },
  chipTextActive: {
    color: c.accentContrast,
    fontWeight: '900',
  },

  /* ===== FILTER BLOCK ===== */
  filterBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 12,
    gap: 10,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  filterLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fgMuted,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownValue: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fg,
    fontWeight: '700',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    marginTop: 4,
    zIndex: 10,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  dropdownItemActive: {
    backgroundColor: c.surfaceHi,
  },
  dropdownItemText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fg,
  },
  dropdownItemTextActive: {
    color: c.accent,
    fontWeight: '900',
  },

  /* ===== COUNT ===== */
  countLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    color: c.fgMuted,
    fontWeight: '700',
  },

  /* ===== PAPER LIST ===== */
  paperList: {
    gap: 8,
  },
  paperCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 10,
  },
  paperHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  paperTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
    lineHeight: 18,
  },
  paperMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
    letterSpacing: 0.3,
  },

  /* ===== BADGES ===== */
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badgeGreen: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#4caf7d',
  },
  badgeGreenText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: '#4caf7d',
  },
  badgeAmber: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#e0a93a',
  },
  badgeAmberText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: '#e0a93a',
  },
  badgeNeutral: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: c.borderStrong,
  },
  badgeNeutralText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: c.fgMuted,
  },
  badgeAccent: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: c.accent,
    borderWidth: 1,
    borderColor: c.accent,
  },
  badgeAccentText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: c.accentContrast,
  },

  /* ===== PAPER ACTIONS ===== */
  paperActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  bookmarkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  bookmarkText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '700',
    color: c.fgMuted,
  },
  resumeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.accent,
    backgroundColor: c.surface,
  },
  resumeText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.accent,
  },
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
    marginLeft: 'auto',
  },
  openText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.buttonFg,
  },

  /* ===== EMPTY ===== */
  empty: {
    alignItems: 'center',
    paddingVertical: 56,
    gap: 12,
  },
  emptyEmojiWrap: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyEmoji: {
    fontSize: 28,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: c.fg,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  emptyBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  emptyBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
  },
});