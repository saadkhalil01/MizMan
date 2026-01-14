export const COLORS = {
  // Primary Palette - Vibrant, Lighter Colors
  primary: '#8B7FFF',      // Lighter Vibrant Purple
  secondary: '#FF7FA3',    // Lighter Coral Pink
  accent: '#5EDDD4',       // Lighter Turquoise

  // Module Colors
  spirit: '#B39DFF',       // Lighter Spiritual Purple
  body: '#FF85B3',         // Lighter Fitness Pink
  mind: '#5EDDD4',         // Lighter Mental Teal
  wealth: '#FFE066',       // Lighter Gold

  // Backgrounds - Lighter
  background: '#0F1629',   // Lighter Navy
  surface: '#1A2038',      // Lighter Surface
  surfaceLight: '#252D4A', // Even Lighter Surface

  // Text
  text: '#FFFFFF',
  textSecondary: '#B4C6E7', // Lighter Slate
  textMuted: '#8B9DC3',    // Lighter Muted

  // Status
  success: '#34D399',      // Lighter Green
  warning: '#FBBF24',      // Lighter Warning
  error: '#F87171',        // Lighter Red

  // Premium Gradients - Lighter
  premiumGradient: ['#0F1629', '#1A2545', '#0F1629'] as const,
  accentGradient: ['#7C70FF', '#B794F6', '#F472B6'] as const, // Lighter Indigo -> Purple -> Pink
  spiritGradient: ['#9D91FF', '#7C70FF'] as const,
  bodyGradient: ['#FF8FC7', '#F472B6'] as const,
  mindGradient: ['#5FE3D4', '#2DD4BF'] as const,
  wealthGradient: ['#FFD666', '#FBBF24'] as const,
};

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
    fontFamily: 'PressStart2P',
  },
  h2: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 26,
    fontFamily: 'PressStart2P',
  },
  h3: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 20,
    fontFamily: 'PressStart2P',
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
