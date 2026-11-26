// css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* ===== PAGE ===== */
  page: {
    flex: 1,
    backgroundColor: c.bg,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
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
  weekLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    color: c.fgMuted,
    textAlign: 'center',
    paddingVertical: 10,
  },

  /* ===== TOGGLE ===== */
  toggleRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 6,
    marginBottom: 14,
  },
  toggleBtn: {
    borderWidth: 1,
    borderColor: c.border,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  toggleBtnActive: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  toggleText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    color: c.fgMuted,
  },
  toggleTextActive: {
    color: c.accentContrast,
    fontWeight: 'bold',
  },

  /* ===== WEEK GRID ===== */
  grid: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  gridRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  timeCol: {
    width: 58,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: c.border,
  },
  timeLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },
  timeLabelEnd: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: c.fgFaint,
  },
  dayHeader: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: c.border,
  },
  dayHeaderToday: {
    backgroundColor: c.surfaceHi,
  },
  dayHeaderText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    color: c.fgMuted,
    fontWeight: '700',
  },
  dayHeaderTextToday: {
    color: c.accent,
  },

  /* cells */
  cell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: c.border,
    minHeight: 56,
  },
  cellElective: {
    backgroundColor: c.surfaceHi,
  },
  cellLive: {
    borderWidth: 1.5,
    borderColor: c.accent,
    backgroundColor: c.bg,
    margin: 2,
  },
  cellBreak: {
    backgroundColor: c.bg,
    justifyContent: 'center',
  },
  cellSubject: {
    fontSize: 11,
    fontWeight: '700',
    color: c.fg,
  },
  cellSubjectLive: {
    color: c.accent,
    fontWeight: '900',
  },
  cellRoom: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: c.fgMuted,
    marginTop: 2,
  },
  cellRoomLive: {
    color: c.accent,
    fontWeight: '700',
  },
  breakText: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: c.fgFaint,
    textAlign: 'center',
  },

  /* ===== DAY AGENDA ===== */
  agenda: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  agendaHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    backgroundColor: c.surfaceHi,
  },
  agendaHeaderText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    color: c.accent,
    fontWeight: '900',
  },
  agendaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    gap: 10,
  },
  agendaTime: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    width: 50,
  },
  agendaStatus: {
    fontSize: 12,
    width: 16,
  },
  agendaSubject: {
    flex: 1,
    fontSize: 13,
    color: c.fg,
    fontWeight: '600',
  },
  agendaBreak: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgFaint,
  },
  agendaLiveCard: {
    margin: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: c.accent,
    backgroundColor: c.bg,
    gap: 4,
  },
  agendaLiveLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.accent,
  },
  agendaLiveSubject: {
    fontSize: 14,
    fontWeight: '700',
    color: c.fg,
  },
  agendaLiveMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
  },

  /* ===== MONTH CALENDAR ===== */
  monthWrap: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  monthDayLabel: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    color: c.fgMuted,
    fontWeight: '700',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthCell: {
    width: '14.2857%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  monthCellToday: {
    backgroundColor: c.surfaceHi,
  },
  monthCellSelected: {
    borderWidth: 1.5,
    borderColor: c.accent,
  },
  monthCellNum: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fg,
  },
  monthCellNumToday: {
    color: c.accent,
    fontWeight: '900',
  },
  monthCellNumSelected: {
    color: c.accent,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  dotClass: { backgroundColor: '#4d7cff' },
  dotAssign: { backgroundColor: c.accent },
  dotEvent: { backgroundColor: '#a26bff' },

  monthDayPanel: {
    borderTopWidth: 1,
    borderTopColor: c.border,
    padding: 14,
    gap: 4,
  },
  monthDayPanelTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
    marginBottom: 6,
  },
  monthDayPanelRow: {
    fontSize: 13,
    color: c.fg,
  },
  monthDayPanelEmpty: {
    fontSize: 13,
    color: c.fgMuted,
    fontStyle: 'italic',
  },

  /* ===== DETAIL MODAL ===== */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: c.bg,
    borderTopWidth: 1,
    borderTopColor: c.border,
    padding: 24,
    gap: 8,
  },
  modalLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    color: c.accent,
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.5,
  },
  modalMeta: {
    fontSize: 13,
    color: c.fgMuted,
  },
  modalDivider: {
    height: 1,
    backgroundColor: c.border,
    marginVertical: 16,
  },
  modalAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  modalActionText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.2,
    color: c.fg,
    fontWeight: '700',
  },
  modalClose: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: c.buttonBg,
  },
  modalCloseText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.buttonFg,
  },
});