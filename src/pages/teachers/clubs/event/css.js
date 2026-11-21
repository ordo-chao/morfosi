// src/pages/teachers/clubs/event/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    gap: 12, paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  headerTitle: {
    flex: 1, fontFamily: 'monospace', fontSize: 12, letterSpacing: 2,
    fontWeight: '900', color: c.fg, textAlign: 'center',
  },

  scrollContent: {
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 14,
  },

  hero: { alignItems: 'center', gap: 6 },
  heroEmojiWrap: {
    width: 64, height: 64, borderWidth: 1, borderColor: c.border,
    backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center',
    marginBottom: 6,
  },
  heroEmoji: { fontSize: 30 },
  heroTitle: {
    fontSize: 20, fontWeight: '900', color: c.fg, letterSpacing: -0.3, textAlign: 'center',
  },
  heroMeta: {
    fontFamily: 'monospace', fontSize: 11, color: c.fgMuted, textAlign: 'center',
  },
  mandatoryPill: {
    marginTop: 8, paddingHorizontal: 10, paddingVertical: 3,
    borderWidth: 1, borderColor: '#e25b5b',
  },
  mandatoryText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 0.8,
    fontWeight: '900', color: '#e25b5b',
  },

  statRow: { flexDirection: 'row', borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  statCell: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderRightWidth: 1, borderRightColor: c.border,
  },
  statValue: { fontSize: 20, fontWeight: '900', color: c.fg },
  statLabel: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted, marginTop: 2,
  },

  quickRow: { flexDirection: 'row', gap: 8 },
  quickBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  quickBtnText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fg,
  },

  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: c.border },
  tab: {
    flex: 1, paddingVertical: 10, alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: c.accent },
  tabText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted,
  },
  tabTextActive: { color: c.accent },

  section: { gap: 8, marginTop: 8 },
  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.accent, marginTop: 4,
  },
  bodyText: { fontSize: 13, lineHeight: 20, color: c.fg },

  listBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  rsvpRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: 'monospace', fontSize: 11, fontWeight: '900', color: c.fg },
  rsvpName: { fontSize: 13, fontWeight: '700', color: c.fg },
  rsvpMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, marginTop: 2 },
  rsvpBadge: { paddingVertical: 2, paddingHorizontal: 8, borderWidth: 1 },
  rsvpBadgeText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1, fontWeight: '900',
  },

  input: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    color: c.fg, fontFamily: 'monospace', fontSize: 13,
    paddingHorizontal: 12, paddingVertical: 12,
  },
  inputMultiline: { minHeight: 110, paddingTop: 12 },

  primaryBtn: {
    paddingVertical: 14, alignItems: 'center',
    borderWidth: 1, borderColor: c.buttonBg, backgroundColor: c.buttonBg,
  },
  primaryBtnText: {
    fontFamily: 'monospace', fontSize: 11, letterSpacing: 1.5,
    fontWeight: 'bold', color: c.buttonFg,
  },
});