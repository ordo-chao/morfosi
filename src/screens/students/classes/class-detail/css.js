// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

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

  /* ===== SCROLL ===== */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 12,
  },

  /* ===== HERO ===== */
  hero: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  heroLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    color: c.accent,
    fontWeight: '900',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.4,
  },
  heroMeta: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    letterSpacing: 0.3,
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

  /* ===== INFO BLOCK ===== */
  infoBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  infoLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.5,
    color: c.fgMuted,
    minWidth: 50,
  },
  infoValue: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: c.fg,
    textAlign: 'right',
  },

  /* ===== TEACHER CARD ===== */
  teacherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  teacherAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teacherInitials: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '900',
    color: c.fg,
  },
  teacherBody: {
    flex: 1,
    gap: 2,
  },
  teacherName: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  teacherRole: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },

  /* ===== SUBJECTS ===== */
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectChip: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  subjectName: {
    fontSize: 12,
    fontWeight: '700',
    color: c.fg,
  },
  subjectTeacher: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },

  /* ===== LINK BUTTON ===== */
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  linkButtonText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== ANNOUNCEMENTS ===== */
  announcementBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  announcementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  announcementBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: c.accent,
  },
  announcementText: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
  },
  announcementDate: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },

  /* ===== NOTE ===== */
  noteBlock: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    padding: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    marginTop: 8,
  },
  noteText: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 10,
    lineHeight: 16,
    color: c.fgMuted,
    letterSpacing: 0.2,
  },
});