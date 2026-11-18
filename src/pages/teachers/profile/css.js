// src/pages/teachers/profile/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  headerTitle: {
    fontFamily: 'monospace', fontSize: 12, letterSpacing: 2, fontWeight: '900', color: c.fg,
  },
  headerAction: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.2, fontWeight: '900', color: c.accent,
  },

  scrollContent: {
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, gap: 24,
  },

  /* HERO */
  hero: { alignItems: 'center', paddingVertical: 12, gap: 6 },
  avatarWrap: { position: 'relative', marginBottom: 8 },
  avatarCircle: {
    width: 96, height: 96, borderRadius: 48,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
  avatarInitials: {
    fontFamily: 'monospace', fontSize: 32, fontWeight: '900',
    color: c.fg, letterSpacing: -1,
  },
  avatarBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: c.accent, borderWidth: 2, borderColor: c.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  heroName: {
    fontSize: 22, fontWeight: '900', color: c.fg, letterSpacing: -0.4,
  },
  heroLine: {
    fontFamily: 'monospace', fontSize: 11, color: c.fgMuted, letterSpacing: 0.5,
  },
  heroStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  heroStatusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4caf7d' },
  heroStatusText: {
    fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, letterSpacing: 0.5,
  },

  /* SECTION */
  section: { gap: 12 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2, fontWeight: '900', color: c.accent,
  },
  sectionAction: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1, fontWeight: '900', color: c.accent,
  },

  /* STATS */
  statsRow: { flexDirection: 'row', gap: 8 },
  statTile: {
    flex: 1, paddingVertical: 14, paddingHorizontal: 4,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    alignItems: 'center', gap: 4,
  },
  statTileAccent: { borderColor: c.accent },
  statValue: {
    fontSize: 16, fontWeight: '900', color: c.fg, letterSpacing: -0.3,
  },
  statValueAccent: { color: c.accent },
  statLabel: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1.2,
    color: c.fgMuted, textTransform: 'uppercase', fontWeight: '700',
  },

  /* CLASSES */
  classList: { gap: 8 },
  classCard: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    padding: 12, gap: 4,
  },
  classCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  classCardName: { fontSize: 13, fontWeight: '700', color: c.fg },
  classCardMeta: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },

  /* DETAILS */
  detailsBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  detailRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  detailText: { flex: 1, fontSize: 13, color: c.fg },

  /* ACCOUNT */
  accountBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  accountRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  accountLabel: { flex: 1, fontSize: 13, color: c.fg },
  accountValue: { fontFamily: 'monospace', fontSize: 11, color: c.fgMuted, marginRight: 4 },

  /* LOGOUT */
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 14, marginTop: 8,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.buttonBg,
  },
  logoutText: {
    fontFamily: 'monospace', fontSize: 11, letterSpacing: 1.5,
    fontWeight: 'bold', color: c.buttonFg,
  },
});