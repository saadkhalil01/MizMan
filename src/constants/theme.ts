// Asset Colors
const ASSET_COLORS = {
  stock: '#86EFAC', // Light Green
  crypto: '#FACC15', // Yellow
  real_estate: '#9CA3AF', // Grey
  gold: '#D4A017', // Gold
  silver: '#E5E7EB', // Slate
  bonds: '#8B5CF6', // Violet
  money_market: '#93C5FD', // Light Blue
  options: '#F9A8D4', // Pink
  pension_fund: '#C4B5FD', // Light Purple
  equity_funds: '#EF4444', // Red
};

const ASSET_ICON_COLORS = {
  stock: '#15803D',      // Green 700 - Darker
  crypto: '#A16207',     // Yellow 700 - Darker
  real_estate: '#374151', // Gray 700 - Darker
  gold: '#78350F',       // Amber 900 - Darker
  silver: '#334155',     // Slate 700 - Darker
  bonds: '#6D28D9',      // Violet 700 - Darker
  money_market: '#1D4ED8', // Blue 700 - Darker
  options: '#BE185D',    // Pink 700 - Darker
  pension_fund: '#5B21B6', // Violet 900 - Darker
  equity_funds: '#B91C1C', // Red 700 - Darker
};

export const DARK_COLORS = {
  // Primary Palette - Vibrant
  primary: '#FDE047',
  secondary: '#FBBF24',
  accent: '#EAB308',

  // Module Colors
  spirit: '#FEF9C3',
  body: '#FDE68A',
  mind: '#5EDDD4',
  wealth: '#F59E0B',

  // Backgrounds - Dark
  background: '#0F1629',
  surface: '#1A2038',
  surfaceLight: '#252D4A',

  // Text
  text: '#FFFFFF',
  textSecondary: '#B4C6E7',
  textMuted: '#8B9DC3',

  // Status
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',

  // Premium Gradients
  premiumGradient: ['#0F1629', '#1A2545', '#0F1629'] as const,
  accentGradient: ['#FDE047', '#FBBF24', '#F59E0B'] as const,
  spiritGradient: ['#FEF9C3', '#FDE047'] as const,
  bodyGradient: ['#FDE68A', '#FBBF24'] as const,
  mindGradient: ['#5FE3D4', '#2DD4BF'] as const,
  wealthGradient: ['#FBBF24', '#F59E0B'] as const,

  // Asset Colors
  asset: ASSET_COLORS,
  assetIcon: ASSET_ICON_COLORS,
};

export const LIGHT_COLORS = {
  // Primary Palette - Vibrant, slightly Adjusted for Light Mode
  primary: '#EAB308',      // Gold (more visible on white)
  secondary: '#F59E0B',    // Amber
  accent: '#D97706',       // Deep Amber

  // Module Colors
  spirit: '#854D0E',       // Darker Gold for text
  body: '#92400E',         // Brownish Amber
  mind: '#0D9488',         // Dark Teal
  wealth: '#B45309',       // Golden Brown

  // Backgrounds - Light
  background: '#F8FAFC',   // Very Light Slate
  surface: '#FFFFFF',      // White
  surfaceLight: '#F1F5F9', // Light Slate

  // Text
  text: '#0F172A',         // Slate 900
  textSecondary: '#475569', // Slate 600
  textMuted: '#94A3B8',    // Slate 400

  // Status
  success: '#10B981',      // Emerald 500
  warning: '#F59E0B',      // Amber 500
  error: '#EF4444',        // Red 500

  // Premium Gradients - Lighter versions
  premiumGradient: ['#F8FAFC', '#F1F5F9', '#F8FAFC'] as const,
  accentGradient: ['#FEF08A', '#FDE047', '#FBBF24'] as const,
  spiritGradient: ['#FEF9C3', '#FEF08A'] as const,
  bodyGradient: ['#FEF08A', '#FDE68A'] as const,
  mindGradient: ['#CCFBF1', '#99F6E4'] as const,
  wealthGradient: ['#FEF3C7', '#FDE68A'] as const,

  // Asset Colors
  asset: ASSET_COLORS,
  assetIcon: ASSET_ICON_COLORS,
};

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  spirit: string;
  body: string;
  mind: string;
  wealth: string;
  background: string;
  surface: string;
  surfaceLight: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  warning: string;
  error: string;
  premiumGradient: readonly [string, string, ...string[]];
  accentGradient: readonly [string, string, ...string[]];
  spiritGradient: readonly [string, string, ...string[]];
  bodyGradient: readonly [string, string, ...string[]];
  mindGradient: readonly [string, string, ...string[]];
  wealthGradient: readonly [string, string, ...string[]];
  asset: Record<string, string>;
  assetIcon: Record<string, string>;
};

export const COLORS = DARK_COLORS as ThemeColors;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 20,
    fontWeight: '400' as const,
    lineHeight: 32,
    fontFamily: 'Inter-SemiBold',
  },
  h2: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 26,
    fontFamily: 'Inter-SemiBold',
  },
  h3: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 20,
    fontFamily: 'Inter-SemiBold',
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
    fontFamily: 'Inter-Medium',
  },
  bodySemiBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
    fontFamily: 'Inter-SemiBold',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  captionMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
    fontFamily: 'Inter-Medium',
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  smallMedium: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 18,
    fontFamily: 'Inter-Medium',
  },
  smallBold: {
    fontSize: 12,
    fontWeight: '700' as const,
    lineHeight: 18,
    fontFamily: 'Inter-SemiBold',
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};


