// src/styles/theme.js
// Thème et styles partagés pour l'application mobile GuestPass (React Native).
// Commentaires pensés pour un niveau débutant.
// Utilise StyleSheet.create pour les performances.

import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';

/* ---------------------------
   Helpers responsives / fonts
   --------------------------- */
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard ~375 width (iPhone 8)
const guidelineBaseWidth = 375;
// const guidelineBaseHeight = 812;

const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
// const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

// Font scaling to keep text readable on different densities
const fontScale = (size: number) => {
  const newSize = moderateScale(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/* ---------------------------
   Palette de couleurs
   --------------------------- */
export const Colors = {
  primary: '#714EE3',        // bleu principal (boutons, actions)
  primaryDark: '#4E76E3',    // bleu foncé (hover, active)
  success: '#198754',        // vert pour succès
  danger: '#DC3545',         // rouge pour erreur
  warning: '#FFC107',        // jaune/alerte
  neutral100: '#FFFFFF',
  neutral200: '#F8F9FA',
  neutral300: '#E9ECEF',
  neutral400: '#CED4DA',
  neutral500: '#6C757D',
  neutral600: '#495057',
  neutral700: '#343A40',
  shadow: '#000000',
  transparent: 'transparent',
};

/* ---------------------------
   Échelles d'espacement / tailles
   --------------------------- */
export const Spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Sizes = {
  iconSmall: moderateScale(16),
  icon: moderateScale(20),
  iconLarge: moderateScale(28),
  buttonHeight: moderateScale(48),
  inputHeight: moderateScale(44),
  avatar: moderateScale(44),
};

/* ---------------------------
   Typographie
   --------------------------- */
export const Fonts = {
  // Si tu ajoutes des polices custom, remplace 'System' par le nom importé
  regular: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  medium: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  bold: Platform.OS === 'ios' ? 'System' : 'sans-serif-bold',
};

export const FontSizes = {
  xs: fontScale(12),
  sm: fontScale(14),
  base: fontScale(16),
  lg: fontScale(18),
  xl: fontScale(20),
  xxl: fontScale(24),
};

/* ---------------------------
   Styles communs (boutons, inputs, cards...)
   --------------------------- */
export default StyleSheet.create({
  // Conteneur global safe
  container: {
    flex: 1,
    backgroundColor: Colors.neutral200,
    padding: Spacing.md,
  },

  // Écran centré
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Ecran distribution verticale
  spaced: {
    flex: 1,
    justifyContent: 'space-evenly',
  },

  // Header simple
  header: {
    width: '100%',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral100,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral300,
  },
  headerTitle: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.xl,
    color: Colors.neutral700,
  },

  /* ---------- Buttons ---------- */
  btnPrimary: {
    height: Sizes.buttonHeight,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3, // android shadow
  },
  btnPrimaryText: {
    color: Colors.neutral100,
    fontSize: FontSizes.base,
    fontFamily: Fonts.medium,
  },
  btnGhost: {
    height: Sizes.buttonHeight,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  btnGhostText: {
    color: Colors.primary,
    fontSize: FontSizes.base,
    fontFamily: Fonts.medium,
  },

  /* ---------- Inputs ---------- */
  input: {
    height: Sizes.inputHeight,
    backgroundColor: Colors.neutral100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.neutral300,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.base,
    fontFamily: Fonts.regular,
    color: Colors.neutral700,
  },
  inputLabel: {
    fontSize: FontSizes.sm,
    color: Colors.neutral600,
    marginBottom: Spacing.xs,
  },
  inputError: {
    borderColor: Colors.danger,
  },

  /* ---------- Lists & Items ---------- */
  list: {
    width: '100%',
  },
  listItem: {
    backgroundColor: Colors.neutral100,
    padding: Spacing.md,
    borderRadius: 10,
    // marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
    borderColor: Colors.neutral300,
  },
  listItemLeft: { flexDirection: 'row', alignItems: 'center' },
  listItemText: {
    marginLeft: Spacing.sm,
  },
  eventTitle: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.base,
    color: Colors.neutral700,
  },
  eventMeta: {
    fontSize: FontSizes.sm,
    color: Colors.neutral500,
  },

  /* ---------- Badges / Status ---------- */
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: FontSizes.xs,
    fontFamily: Fonts.medium,
    color: Colors.neutral100,
  },
  badgeSuccess: { backgroundColor: Colors.success },
  badgeWarning: { backgroundColor: Colors.warning },
  badgeDanger: { backgroundColor: Colors.danger },
  badgeNeutral: { backgroundColor: Colors.neutral500 },

  /* ---------- Scan / Overlay ---------- */
  scannerContainer: {
    flex: 1,
    backgroundColor: Colors.neutral700,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrame: {
    width: '85%',
    height: '55%',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerHint: {
    position: 'absolute',
    bottom: Spacing.md,
    color: Colors.neutral100,
    fontSize: FontSizes.sm,
  },

  /* ---------- Resultats (succès/erreur) ---------- */
  resultBox: {
    width: '90%',
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  resultSuccess: {
    backgroundColor: Colors.success,
  },
  resultError: {
    backgroundColor: Colors.danger,
  },
  resultText: {
    color: Colors.neutral100,
    fontSize: FontSizes.lg,
    fontFamily: Fonts.medium,
  },

  /* ---------- Card / Modal ---------- */
  card: {
    backgroundColor: Colors.neutral100,
    borderRadius: 14,
    padding: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
  },

  /* ---------- Profil / Header small ---------- */
  smallAvatar: {
    width: Sizes.avatar,
    height: Sizes.avatar,
    borderRadius: Sizes.avatar / 2,
    backgroundColor: Colors.neutral300,
  },

  /* ---------- Footer / bottom bar ---------- */
  bottomBar: {
    width: '100%',
    height: 64,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral100,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral300,
  },

  /* accessibility helpers */
  visuallyHidden: {
    position: 'absolute',
    left: -9999,
    top: -9999,
    height: 1,
    width: 1,
  },
});
