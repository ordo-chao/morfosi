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
  hintText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  footnote: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    textAlign: 'center',
    letterSpacing: 0.2,
    marginTop: 12,
  },

  /* ===== THEME SWATCHES ===== */
  swatchesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  swatchWrap: {
    flex: 1,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 8,
  },
  swatchWrapSelected: {
    borderColor: c.accent,
    borderWidth: 2,
  },
  swatchPreview: {
    width: '100%',
    aspectRatio: 1.4,
    borderWidth: 1,
    borderColor: c.border,
    overflow: 'hidden',
  },
  swatchTop: { flex: 2 },
  swatchBottom: { flex: 1 },
  swatchLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '700',
    color: c.fgMuted,
  },
  swatchLabelSelected: {
    color: c.accent,
    fontWeight: '900',
  },
  swatchRadio: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: c.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchRadioSelected: {
    borderColor: c.accent,
  },
  swatchRadioDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: c.accent,
  },

  /* ===== TEXT SIZE SLIDER ===== */
  block: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 16,
    gap: 12,
  },
  blockLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
  },
  sliderWrap: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 14,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: c.surfaceHi,
    borderRadius: 2,
    justifyContent: 'center',
    position: 'relative',
    marginHorizontal: 6,
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: c.accent,
    borderRadius: 2,
  },
  sliderStep: {
    position: 'absolute',
    width: 20,
    height: 20,
    marginLeft: -10,
    alignItems: 'center',
    justifyContent: 'center',
    top: -8,
  },
  sliderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: c.surfaceHi,
    borderWidth: 1,
    borderColor: c.borderStrong,
  },
  sliderDotActive: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  sliderDotCurrent: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: c.bg,
    backgroundColor: c.accent,
  },

  sliderLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderLabelSmall: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: c.fgMuted,
    fontWeight: '700',
  },
  sliderLabelCurrent: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    color: c.accent,
    fontWeight: '900',
  },
  sliderLabelLarge: {
    fontFamily: 'monospace',
    fontSize: 17,
    color: c.fgMuted,
    fontWeight: '900',
  },

  /* ===== PREVIEW ===== */
  previewLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: c.fgMuted,
    marginTop: 4,
  },
  previewCard: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
    padding: 16,
    gap: 4,
  },
  previewTitle: {
    fontWeight: '900',
    color: c.fg,
    letterSpacing: -0.3,
  },
  previewMeta: {
    fontFamily: 'monospace',
    color: c.fgMuted,
  },

  /* ===== TOGGLES ===== */
  listBlock: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.surface,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  rowDisabled: {
    opacity: 0.55,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontSize: 13,
    color: c.fg,
    fontWeight: '500',
  },
  rowLabelDisabled: {
    color: c.fgMuted,
  },
  rowSub: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: c.fgMuted,
    letterSpacing: 0.3,
  },

  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.borderStrong,
    backgroundColor: c.surfaceHi,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleOn: {
    backgroundColor: c.accent,
    borderColor: c.accent,
  },
  knob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: c.fgMuted,
  },
  knobOn: {
    backgroundColor: c.accentContrast,
    alignSelf: 'flex-end',
  },
});