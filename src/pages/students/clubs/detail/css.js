// clubs/detail/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.fg,
    textAlign: 'center',
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
  heroEmojiWrap: {
    width: 72,
    height: 72,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  heroEmoji: {
    fontSize: 34,
  },
  heroName: {
    fontSize: 22,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  heroMeta: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  /* ===== STATUS PILLS ===== */
  statusPillMember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: c.accent,
    backgroundColor: c.surface,
    marginTop: 6,
  },
  statusPillMemberText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
  },
  statusPillPending: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: c.fgMuted,
    backgroundColor: c.surface,
    marginTop: 6,
  },
  statusPillPendingText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fgMuted,
  },

  /* ===== PENDING CARD ===== */
  pendingCard: {
    borderWidth: 1,
    borderColor: c.border,
    borderLeftWidth: 4,
    borderLeftColor: '#e0a93a',
    backgroundColor: c.surface,
    padding: 14,
    gap: 6,
  },
  pendingText: {
    fontSize: 12,
    lineHeight: 18,
    color: c.fgMuted,
  },

  /* ===== DESCRIPTION ===== */
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: c.fg,
    marginBottom: 4,
  },

  /* ===== SECTION TITLE ===== */
  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 12,
    marginBottom: 8,
  },

  /* ===== DETAILS ===== */
  detailsBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  detailIcon: {
    fontSize: 14,
    width: 20,
  },
  detailLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 0.5,
    color: c.fgMuted,
    minWidth: 70,
  },
  detailValue: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: c.fg,
    textAlign: 'right',
  },

  /* ===== EVENTS ===== */
  eventCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    marginBottom: 8,
    gap: 10,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  eventEmoji: {
    fontSize: 20,
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  eventMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
  },
  mandatoryPill: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#e25b5b',
  },
  mandatoryText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 0.8,
    fontWeight: '900',
    color: '#e25b5b',
  },
  calendarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  calendarBtnText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== LEADERSHIP ===== */
  leadershipBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  leaderIcon: {
    fontSize: 16,
    width: 22,
  },
  leaderName: {
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  youTag: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.accent,
    fontWeight: '900',
  },
  leaderMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    marginTop: 2,
  },

  /* ===== ANNOUNCEMENTS ===== */
  announcementsBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    marginBottom: 8,
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
  announcementIcon: {
    fontSize: 14,
  },
  announcementText: {
    flex: 1,
    fontSize: 12,
    color: c.fg,
  },
  announcementTime: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },

  /* ===== LINK BUTTON ===== */
  linkButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    marginTop: 4,
  },
  linkButtonText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.fg,
  },

  /* ===== ACTIONS ===== */
  actions: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: c.border,
    gap: 8,
  },
  joinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
  },
  joinBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
  leaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e25b5b',
    backgroundColor: c.surface,
  },
  leaveBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: '#e25b5b',
  },
  cancelBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  cancelBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.fg,
  },
  fullCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  fullText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    textAlign: 'center',
  },
  waitlistBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: c.accent,
    backgroundColor: c.bg,
  },
  waitlistBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.accent,
  },
});