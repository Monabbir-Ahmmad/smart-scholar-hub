import { createTheme, alpha } from '@mui/material/styles';

// Color palette derived from index.css HSL values
const colors = {
  // Primary: hsl(217 100% 61%) = #3B82F6
  primary: {
    main: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
    contrastText: '#FFFFFF',
  },
  // Secondary: hsl(265 83% 57%) = #8B5CF6
  secondary: {
    main: '#8B5CF6',
    light: '#A78BFA',
    dark: '#7C3AED',
    contrastText: '#FFFFFF',
  },
  // Success: hsl(174 64% 47%) = #2DD4BF
  success: {
    main: '#2DD4BF',
    light: '#5EEAD4',
    dark: '#14B8A6',
    contrastText: '#FFFFFF',
  },
  // Error/Destructive: hsl(0 84% 60%) = #EF4444
  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
    contrastText: '#FFFFFF',
  },
  // Warning/Accent: hsl(45 100% 52%) = #F59E0B
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    contrastText: '#1E293B',
  },
  // Background
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
  },
  // Text: hsl(222 47% 11%) = #1E293B
  text: {
    primary: '#1E293B',
    secondary: '#64748B', // muted-foreground
    disabled: '#94A3B8',
  },
  // Border: hsl(220 13% 91%) = #E2E8F0
  divider: '#E2E8F0',
  // Muted: hsl(220 14% 96%) = #F1F5F9
  muted: '#F1F5F9',
};

// Custom shadows matching the CSS variables
const customShadows = [
  'none',
  '0 1px 2px 0 rgba(30, 41, 59, 0.05)', // shadow-sm
  '0 1px 3px 0 rgba(30, 41, 59, 0.1), 0 1px 2px -1px rgba(30, 41, 59, 0.1)',
  '0 4px 6px -1px rgba(30, 41, 59, 0.1), 0 2px 4px -2px rgba(30, 41, 59, 0.1)', // shadow-md
  '0 4px 24px -4px rgba(30, 41, 59, 0.08)', // shadow-card
  '0 10px 15px -3px rgba(30, 41, 59, 0.1), 0 4px 6px -4px rgba(30, 41, 59, 0.1)', // shadow-lg
  '0 12px 40px -8px rgba(59, 130, 246, 0.2)', // shadow-card-hover
  '0 20px 25px -5px rgba(30, 41, 59, 0.1), 0 8px 10px -6px rgba(30, 41, 59, 0.1)', // shadow-xl
  '0 0 40px rgba(59, 130, 246, 0.3)', // shadow-glow
  // Fill remaining with defaults
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
  '0 25px 50px -12px rgba(30, 41, 59, 0.25)',
] as const;

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    background: colors.background,
    text: colors.text,
    divider: colors.divider,
  },
  shape: {
    borderRadius: 12, // 0.75rem
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shadows: customShadows as unknown as typeof createTheme.arguments[0]['shadows'],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.default,
          color: colors.text.primary,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${colors.divider}`,
          boxShadow: customShadows[4], // shadow-card
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: customShadows[5], // shadow-lg on hover
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px 24px 8px 24px',
        },
        title: {
          fontSize: '1.125rem',
          fontWeight: 600,
        },
        subheader: {
          fontSize: '0.875rem',
          color: colors.text.secondary,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: 'none',
          padding: '8px 16px',
        },
        contained: {
          '&:hover': {
            boxShadow: customShadows[3],
          },
        },
        outlined: {
          borderColor: colors.divider,
          '&:hover': {
            borderColor: colors.primary.main,
            backgroundColor: alpha(colors.primary.main, 0.04),
          },
        },
        sizeSmall: {
          padding: '4px 12px',
          fontSize: '0.875rem',
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1rem',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: colors.muted,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
        sizeSmall: {
          height: 24,
        },
        colorPrimary: {
          backgroundColor: alpha(colors.primary.main, 0.1),
          color: colors.primary.main,
        },
        colorSecondary: {
          backgroundColor: alpha(colors.secondary.main, 0.1),
          color: colors.secondary.main,
        },
        colorSuccess: {
          backgroundColor: alpha(colors.success.main, 0.1),
          color: colors.success.main,
        },
        colorError: {
          backgroundColor: alpha(colors.error.main, 0.1),
          color: colors.error.main,
        },
        colorWarning: {
          backgroundColor: alpha(colors.warning.main, 0.1),
          color: colors.warning.dark,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        colorDefault: {
          backgroundColor: alpha(colors.primary.main, 0.1),
          color: colors.primary.main,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 6,
          backgroundColor: colors.muted,
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: alpha(colors.muted, 0.5),
            '& fieldset': {
              borderColor: colors.divider,
            },
            '&:hover fieldset': {
              borderColor: colors.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          border: `1px solid ${colors.divider}`,
          boxShadow: customShadows[5],
          marginTop: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: '4px 8px',
          padding: '8px 12px',
          '&:hover': {
            backgroundColor: colors.muted,
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
          fontSize: '0.75rem',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          backgroundColor: colors.text.primary,
          fontSize: '0.75rem',
          fontWeight: 500,
        },
      },
    },
  },
});

// Export colors for use in components that need direct access
export { colors };

// Type augmentation for custom palette options
declare module '@mui/material/styles' {
  interface Palette {
    muted: string;
  }
  interface PaletteOptions {
    muted?: string;
  }
}

// Add muted to the theme
theme.palette.muted = colors.muted;
