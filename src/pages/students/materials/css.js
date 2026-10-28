// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* ===== PAGE ===== */
  page: {
    flex: 1,
    backgroundColor: c.bg,
  },

  /* ===== HEADER ===== */
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

  /* ===== SUBJECT BANNER ===== */
  banner: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    backgroundColor: c.surface,
    gap: 2,
  },
  bannerLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    color: c.accent,
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.4,
  },
  bannerMeta: {
    fontSize: 12,
    color: c.fgMuted,
  },

/* ===== SEARCH ===== */
searchWrap: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  marginHorizontal: 16,
  marginTop: 14,
  marginBottom: 14,          // ← gap before chips
  borderWidth: 1,
  borderColor: c.border,
  backgroundColor: c.surface,
  paddingHorizontal: 12,
  paddingVertical: 10,
},
searchInput: {
  flex: 1,
  fontSize: 13,
  color: c.fg,
  fontFamily: 'monospace',
  padding: 0,
},

/* ===== CHIPS ===== */
chipsScroll: {
  flexGrow: 0,
  height: 44,                // one row of chips, no extra
},
chipsRow: {
  paddingHorizontal: 16,
  paddingVertical: 0,
  gap: 8,                    // ← wider gap between chips
  alignItems: 'center',
},
chip: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  borderWidth: 1,
  borderColor: c.border,
  paddingHorizontal: 26,     // ← wider chip
  paddingVertical: 6,        // ← more vertical
  backgroundColor: c.surface,
  minHeight: 42,             // ← pill-like
},
chipActive: {
  backgroundColor: c.accent,
  borderColor: c.accent,
},
chipText: {
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: 1.2,
  color: c.fgMuted,
  fontWeight: '700',
  lineHeight: 12,
},
chipTextActive: {
  color: c.accentContrast,
  fontWeight: '900',
},

/* ===== LIST ===== */
listContent: {
  paddingHorizontal: 16,
  paddingTop: 16,            // ← gap before list
  paddingBottom: 40,
},
countLabel: {
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: 1.5,
  color: c.fgMuted,
  marginTop: 0,
  marginBottom: 8,
},
  listBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    gap: 12,
  },
  rowIconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  rowMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },

  /* ===== EMPTY ===== */
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 6,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '700',
    color: c.fg,
  },
  emptySub: {
    fontSize: 12,
    color: c.fgMuted,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});