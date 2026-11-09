// revision/css.js
import { StyleSheet } from 'react-native';

export const makeStyles = (c) => StyleSheet.create({
  page: { flex: 1, backgroundColor: c.bg },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

  /* ===== GREETING ===== */
  greetCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 18,
    gap: 10,
  },
  greetTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
  },
  greetMeta: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.accent,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  progressWrap: {
    gap: 6,
    marginTop: 4,
  },
  progressTrack: {
    height: 6,
    backgroundColor: c.surfaceHi,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: c.accent,
    borderRadius: 3,
  },
  progressLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
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
    marginTop: 12,
    marginBottom: 4,
  },

  /* ===== QUICK START GRID ===== */
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickTile: {
    width: '48.5%',
    minHeight: 96,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  quickEmoji: {
    fontSize: 22,
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: c.fg,
    letterSpacing: -0.1,
  },

  /* ===== RESUME ===== */
  resumeList: {
    gap: 8,
  },
  resumeCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 8,
  },
  resumeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  resumeTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
    lineHeight: 18,
  },
  resumeMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },
  resumeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    marginTop: 4,
  },
  resumeBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== WEAK TOPICS ===== */
  weakList: {
    gap: 8,
  },
  weakCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 14,
    gap: 10,
  },
  weakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  weakDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  weakTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: c.fg,
  },
  weakPct: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  weakBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
    alignItems: 'center',
  },
  weakBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },

  /* ===== FOOTNOTE ===== */
  footnote: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 0.2,
    marginTop: 12,
  },
});