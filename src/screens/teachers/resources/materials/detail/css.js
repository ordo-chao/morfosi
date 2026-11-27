// src/pages/teachers/resources/materials/detail/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  headerTitle: {
    flex: 1, fontFamily: 'monospace', fontSize: 12, letterSpacing: 2,
    fontWeight: '900', color: c.fg, textAlign: 'center',
  },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, gap: 12 },

  /* Hero */
  hero: { alignItems: 'center', gap: 6 },
  heroIcon: {
    width: 64, height: 64, borderWidth: 1, borderColor: c.border,
    backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  heroFormat: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
    fontWeight: '900', color: c.accent,
  },
  heroTitle: {
    fontSize: 18, fontWeight: '900', color: c.fg, textAlign: 'center',
    paddingHorizontal: 12, letterSpacing: -0.3,
  },
  statusWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  statusPill: { paddingVertical: 3, paddingHorizontal: 8, borderWidth: 1 },
  statusPillText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1, fontWeight: '900',
  },
  classesText: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted },

  /* Stats */
  statRow: { flexDirection: 'row', borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, marginTop: 8 },
  statCell: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderRightWidth: 1, borderRightColor: c.border,
  },
  statValue: { fontSize: 18, fontWeight: '900', color: c.fg },
  statLabel: {
    fontFamily: 'monospace', fontSize: 8, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted, marginTop: 2,
  },

  /* Actions */
  actionsRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: 10,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  actionBtnText: {
    fontFamily: 'monospace', fontSize: 9, letterSpacing: 1,
    fontWeight: '900', color: c.fg,
  },

  /* Class stats */
  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
    fontWeight: '900', color: c.accent, marginTop: 12, marginBottom: 6,
  },
  classStatBlock: { borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
  classStatRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  classStatName: { flex: 1, fontSize: 12, fontWeight: '700', color: c.fg },
  classStatValue: { fontFamily: 'monospace', fontSize: 10, color: c.fgMuted, minWidth: 60, textAlign: 'right' },

  /* Body */
  bodyText: { fontSize: 13, lineHeight: 20, color: c.fg },
  noteBlock: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, padding: 12,
  },
  noteText: { fontSize: 12, lineHeight: 18, color: c.fg, fontStyle: 'italic' },

  /* Danger */
  dangerRow: {
    marginTop: 20, paddingTop: 16,
    borderTopWidth: 1, borderTopColor: c.border, alignItems: 'center',
  },
  dangerText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.2,
    fontWeight: '900', color: '#e25b5b',
  },
});