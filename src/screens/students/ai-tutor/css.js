// revision/ai-tutor/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  /* ===== HEADER ===== */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    backgroundColor: c.bg,
    flexShrink: 0,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fg,
    textAlign: 'center',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },

  /* ===== EMPTY STATE ===== */
  emptyWrap: {
    gap: 16,
    paddingTop: 8,
  },
  greetBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 10,
  },
  botAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  botAvatarText: {
    fontSize: 30,
  },
  greetTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
  },
  greetBody: {
    fontSize: 13,
    lineHeight: 20,
    color: c.fgMuted,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 4,
  },
  suggestionsList: {
    gap: 8,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  suggestionText: {
    flex: 1,
    fontSize: 13,
    color: c.fg,
    lineHeight: 18,
  },

  /* ===== SUBJECT PICKER ===== */
  pickerWrap: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 8,
    marginTop: 8,
  },
  pickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pickerLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fgMuted,
  },
  pickerValue: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    color: c.fg,
  },
  pickerMenu: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    marginTop: 4,
  },
  pickerItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  pickerItemActive: {
    backgroundColor: c.surfaceHi,
  },
  pickerItemText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fg,
  },
  pickerItemTextActive: {
    color: c.accent,
    fontWeight: '900',
  },
  pickerHint: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.2,
  },

  /* ===== MESSAGE BUBBLES ===== */
  msgRow: {
    width: '100%',
  },
  msgRowUser: {
    alignItems: 'flex-end',
  },
  msgRowAssistant: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '88%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 8,
  },
  bubbleUser: {
    backgroundColor: c.buttonBg,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  bubbleAssistant: {
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  bubbleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  bubbleBot: {
    fontSize: 14,
  },
  bubbleRole: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '900',
    color: c.accent,
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 20,
    color: c.fg,
  },
  bubbleTextUser: {
    color: c.buttonFg,
  },

  /* ===== SOURCES ===== */
  sourcesBlock: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  sourcesLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },

  /* ===== FEEDBACK ===== */
  feedbackRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 2,
  },
  feedbackBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  feedbackText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fg,
  },

  /* ===== ACTIONS ===== */
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },

  timeText: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: c.fgMuted,
    alignSelf: 'flex-end',
    letterSpacing: 0.3,
  },
  timeTextUser: {
    color: c.fgFaint,
  },

  /* ===== TYPING ===== */
  typingRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
    fontStyle: 'italic',
  },

  /* ===== STREAMING ===== */
  cursor: {
    color: c.accent,
    fontFamily: 'monospace',
    fontWeight: '900',
    fontSize: 14,
  },
  stopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e25b5b',
    backgroundColor: c.bg,
  },
  stopBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '900',
    color: '#e25b5b',
  },

  /* ===== INPUT BAR ===== */
  inputBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: c.border,
    backgroundColor: c.bg,
    flexShrink: 0,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 44,
  },
  input: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: c.fg,
    paddingVertical: 6,
    maxHeight: 120,
  },
  micBtn: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  sendBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: c.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },

  /* ===== HISTORY DRAWER ===== */
  drawerRoot: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
  },
  drawerScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
drawerPanel: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: c.surface,
  borderLeftWidth: 1,
  borderLeftColor: c.border,
  shadowColor: '#000',
  shadowOffset: { width: -4, height: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  elevation: 12,
},
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  drawerTitle: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.fg,
  },
  newChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 14,
    paddingVertical: 12,
    backgroundColor: c.buttonBg,
    borderWidth: 1,
    borderColor: c.buttonBg,
  },
  newChatText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.buttonFg,
  },
  drawerList: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 16,
  },
  historyGroup: {
    gap: 4,
  },
  historyGroupLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  historyItemActive: {
    backgroundColor: c.surfaceHi,
    borderLeftWidth: 3,
    borderLeftColor: c.accent,
  },
  historyTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: c.fg,
  },
  historyTitleActive: {
    color: c.accent,
    fontWeight: '900',
  },
  historyMeta: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: c.fgMuted,
    marginTop: 2,
    letterSpacing: 0.2,
  },
});