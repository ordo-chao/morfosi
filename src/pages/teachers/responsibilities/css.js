// src/pages/teachers/profile/responsibilities/css.js
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

  /* Tab strip */
  tabsRow: {
    paddingHorizontal: 12, paddingVertical: 8, gap: 6,
    borderBottomWidth: 1, borderBottomColor: c.border,
    backgroundColor: c.surface,
  },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1, borderColor: c.border, backgroundColor: c.bg,
    maxWidth: 200,
  },
  tabActive: {
    borderColor: c.accent, backgroundColor: c.accent,
  },
  tabText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1,
    fontWeight: '900', color: c.fgMuted,
  },
  tabTextActive: { color: c.accentContrast },

  /* Panel */
  panelContent: {
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, gap: 12,
  },
  panelHero: { alignItems: 'center', gap: 4, marginBottom: 6 },
  panelIcon: {
    width: 64, height: 64, borderWidth: 1, borderColor: c.border,
    backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center',
    marginBottom: 6,
  },
  panelTitle: {
    fontSize: 20, fontWeight: '900', color: c.fg, letterSpacing: -0.3,
    textAlign: 'center',
  },
  panelSubtitle: {
    fontFamily: 'monospace', fontSize: 11, color: c.fgMuted, textAlign: 'center',
  },

  sectionTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
    fontWeight: '900', color: c.accent, marginTop: 8, marginBottom: 4,
  },
  summary: { fontSize: 13, lineHeight: 20, color: c.fg },

  /* Duties */
  dutiesBlock: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
    padding: 14, gap: 10,
  },
  dutyRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  dutyBullet: {
    width: 5, height: 5, borderRadius: 2.5, backgroundColor: c.accent, marginTop: 7,
  },
  dutyText: { flex: 1, fontSize: 12, color: c.fg, lineHeight: 18 },

  /* Quick actions */
  actionsBlock: {
    borderWidth: 1, borderColor: c.border, backgroundColor: c.surface,
  },
  actionRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 12, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border,
  },
  actionLabel: { flex: 1, fontSize: 13, fontWeight: '700', color: c.fg },

  /* Empty */
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 32 },
  emptyTitle: { fontSize: 15, fontWeight: '900', color: c.fg },
  emptySub: {
    fontFamily: 'monospace', fontSize: 11, color: c.fgMuted,
    textAlign: 'center', lineHeight: 17,
  },
});