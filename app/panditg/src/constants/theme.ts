import { Platform, StyleSheet } from 'react-native';

export const SanskritiColors = {
  // Brand identity & primary actions
  maroon: '#7B1E23',
  darkMaroon: '#5E171B',

  // Spiritual highlights & accents
  saffron: '#F59E0B',
  gold: '#D4AF37',

  // Status & indicators
  deepGreen: '#166534',
  greenBg: '#E8F5E9',
  redStatus: '#B91C1C',
  redBg: '#FEE2E2',

  // Cultural earth tones
  earthBrown: '#8B5E3C',

  // Surface backgrounds
  cream: '#FFF8ED',
  white: '#FFFFFF',
  surfaceAlt: '#FAF3E8',

  // Text hierarchy
  primaryText: '#3B2420',
  secondaryText: '#6B5B53',
  mutedText: '#96877D',

  // Dividers and outlines
  border: '#EFE5DA',
  borderDark: '#D6C7B8',
} as const;

export const Typography = {
  family: Platform.select({
    ios: {
      heading: 'Georgia',
      body: 'System',
    },
    android: {
      heading: 'serif',
      body: 'sans-serif',
    },
    default: {
      heading: 'serif',
      body: 'sans-serif',
    },
  }),
  sizes: {
    hero: 32,
    title: 26,
    heading: 20,
    subheading: 18,
    cardTitle: 16,
    body: 14,
    caption: 12,
    tiny: 10,
  },
} as const;

export const Radii = {
  sm: 6,
  button: 10,
  input: 12,
  card: 16,
  full: 9999,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  screenPadding: 18,
  // Template backwards-compatibility
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const CommonStyles = StyleSheet.create({
  cardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#3B2420',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        // @ts-ignore
        boxShadow: '0 4px 16px rgba(59, 36, 32, 0.06)',
      },
    }),
  },
  modalShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#3B2420',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
      web: {
        // @ts-ignore
        boxShadow: '0 8px 30px rgba(59, 36, 32, 0.12)',
      },
    }),
  },
});

// Backward-compatibility export for existing template references
export const Colors = {
  light: {
    text: SanskritiColors.primaryText,
    background: SanskritiColors.cream,
    backgroundElement: SanskritiColors.white,
    backgroundSelected: SanskritiColors.border,
    textSecondary: SanskritiColors.secondaryText,
  },
  dark: {
    text: SanskritiColors.cream,
    background: '#1A0E0B',
    backgroundElement: '#2B1A14',
    backgroundSelected: '#42281F',
    textSecondary: '#C4B5A5',
  },
};

export type ThemeColor = keyof typeof Colors.light;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
