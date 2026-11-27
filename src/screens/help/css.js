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

  sectionTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
    color: c.accent,
    marginTop: 6,
    marginBottom: 8,
  },

  /* Stack of cards */
  stack: {
    gap: 8,
  },

  /* ===== CARD (FAQ + contact) ===== */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  cardBody: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: c.fg,
  },
  cardSub: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },
  cardMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    maxWidth: 140,
    textAlign: 'right',
  },

  /* ===== LINK BUTTON ===== */
  linkButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.bg,
  },
  linkButtonText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: c.fg,
  },

  /* ===== SYSTEM ===== */
  systemBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  systemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  systemLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    letterSpacing: 0.5,
  },
  systemValue: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fg,
    fontWeight: '700',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  clearBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '900',
    color: c.fg,
  },
});