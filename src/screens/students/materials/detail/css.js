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

  /* ===== HERO ===== */
  hero: {
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  heroFormat: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  heroMeta: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    textAlign: 'center',
  },

  /* ===== ACTIONS ===== */
  actionsBlock: {
    gap: 8,
    marginVertical: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  actionBtnPrimary: {
    backgroundColor: c.buttonBg,
    borderColor: c.buttonBg,
  },
  actionBtnDanger: {
    borderColor: '#e25b5b',
    backgroundColor: c.surface,
  },
  actionText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
  actionTextPrimary: {
    color: c.buttonFg,
  },
  actionTextDanger: {
    color: '#e25b5b',
  },

  /* ===== SECTION TITLE ===== */
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 8,
    marginBottom: 8,
  },

  /* ===== META ===== */
  metaBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  metaLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.5,
    color: c.fgMuted,
    minWidth: 70,
  },
  metaValue: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: c.fg,
    textAlign: 'right',
  },

  /* ===== TEXT ===== */
  textBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 20,
    color: c.fg,
  },

  /* ===== TOPICS ===== */
  topicsBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 8,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topicBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: c.accent,
  },
  topicText: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
  },

  /* ===== TEACHER NOTE ===== */
  noteBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 8,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noteBy: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.accent,
  },
  noteText: {
    fontSize: 12,
    lineHeight: 18,
    color: c.fg,
    fontStyle: 'italic',
  },

  /* ===== SUBJECT LINK ===== */
  subjectLink: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  subjectLinkText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
});