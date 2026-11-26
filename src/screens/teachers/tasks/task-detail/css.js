// src/pages/teachers/tasks/task-detail/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* PAGE */
  page: { flex: 1, backgroundColor: c.bg },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32, gap: 20 },

  /* HEADER */
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: c.border, backgroundColor: c.bg,
  },
  headerTitle: { flex: 1, fontSize: 14, fontWeight: '900', color: c.fg },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 14 },

  /* STATUS STRIP */
  statusBar: {
    borderLeftWidth: 3, borderLeftColor: c.accent,
    backgroundColor: c.surfaceHi,
    paddingVertical: 12, paddingHorizontal: 16, gap: 2,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusSubject: { fontSize: 13, fontWeight: '700', color: c.fg },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: c.accent },
  statusDue: { fontFamily: 'monospace', fontSize: 11, color: c.accent, letterSpacing: 0.3 },

  /* TABS */
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1, borderBottomColor: c.border, backgroundColor: c.surface,
  },
  tabBtn: {
    flex: 1, paddingVertical: 12, alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabBtnActive: { borderBottomColor: c.accent },
  tabText: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.2,
    fontWeight: '900', color: c.fgMuted,
  },
  tabTextActive: { color: c.accent },

  /* TASK ACTIONS MENU */
  menuScrim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-start' },
  menuSheet: {
    marginTop: 80, marginHorizontal: 16,
    backgroundColor: c.bg, borderWidth: 1, borderColor: c.border, padding: 8,
  },
  menuTitle: {
    fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5,
    fontWeight: '900', color: c.fgMuted, padding: 8,
  },
  menuRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 12, paddingHorizontal: 10,
  },
  menuLabel: { fontSize: 13, color: c.fg, fontWeight: '700' },
});