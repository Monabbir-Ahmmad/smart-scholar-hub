import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';

interface AuthLayoutProps {
  children: React.ReactNode;
  backLink?: { to: string; label: string };
  variant?: 'signin' | 'signup' | 'forgot' | 'reset';
}

const floatingIcons = [
  { Icon: MenuBookIcon, delay: 0, x: '10%', y: '20%' },
  { Icon: GroupIcon, delay: 0.5, x: '75%', y: '15%' },
  { Icon: EmojiEventsIcon, delay: 1, x: '85%', y: '60%' },
  { Icon: TrendingUpIcon, delay: 1.5, x: '15%', y: '70%' },
  { Icon: AutoAwesomeIcon, delay: 2, x: '60%', y: '80%' },
];

const contentVariants = {
  signin: {
    title: 'Welcome Back!',
    subtitle: 'Continue your learning journey',
    features: [
      'Access personalized learning paths',
      'Track your progress across all courses',
      'Connect with verified tutors',
    ],
  },
  signup: {
    title: 'Start Learning Today',
    subtitle: 'Join thousands of successful students',
    features: [
      'Expert-led courses and tutoring',
      'Comprehensive exam preparation',
      'Family-friendly account management',
    ],
  },
  forgot: {
    title: "Don't Worry",
    subtitle: "We'll help you get back on track",
    features: [
      'Quick and secure password reset',
      'Check your email for instructions',
      'Back to learning in no time',
    ],
  },
  reset: {
    title: 'Almost There',
    subtitle: 'Create a new secure password',
    features: [
      'Choose a strong, unique password',
      'Your account security matters',
      'Ready to continue learning',
    ],
  },
};

export const AuthLayout = ({ children, backLink, variant = 'signin' }: AuthLayoutProps) => {
  const theme = useTheme();
  const content = contentVariants[variant];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Panel - Animated Illustration Section */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          width: { lg: '50%', xl: '55%' },
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Shapes */}
        <Box sx={{ position: 'absolute', inset: 0 }}>
          <Box
            component={motion.div}
            sx={{
              position: 'absolute',
              width: 384,
              height: 384,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              top: '-10%',
              left: '-10%',
            }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Box
            component={motion.div}
            sx={{
              position: 'absolute',
              width: 288,
              height: 288,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
              bottom: '10%',
              right: '-5%',
            }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Box
            component={motion.div}
            sx={{
              position: 'absolute',
              width: 192,
              height: 192,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.warning.main, 0.15),
              top: '40%',
              right: '20%',
            }}
            animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </Box>

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <Box
            key={index}
            component={motion.div}
            sx={{
              position: 'absolute',
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              left: x,
              top: y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            transition={{
              opacity: { delay, duration: 0.5 },
              scale: { delay, duration: 0.5 },
              y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <Icon sx={{ color: 'primary.main', fontSize: 24 }} />
          </Box>
        ))}

        {/* Main Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: { lg: 6, xl: 10 },
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Stack direction="row" alignItems="center" spacing={1.5} mb={6}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" fontWeight={700} color="primary.contrastText">
                    E
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700} color="text.primary">
                  EduPlatform
                </Typography>
              </Stack>
            </Link>

            {/* Headline */}
            <Typography
              component={motion.h1}
              variant="h2"
              fontWeight={700}
              sx={{ fontSize: { lg: '2.5rem', xl: '3rem' }, mb: 2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {content.title}
            </Typography>
            <Typography
              component={motion.p}
              variant="h6"
              color="text.secondary"
              fontWeight={400}
              sx={{ mb: 5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {content.subtitle}
            </Typography>

            {/* Features */}
            <Stack spacing={2}>
              {content.features.map((feature, index) => (
                <Stack
                  key={feature}
                  component={motion.div}
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.success.main, 0.2),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <CheckIcon sx={{ color: 'success.main', fontSize: 16 }} />
                  </Box>
                  <Typography color="text.secondary">{feature}</Typography>
                </Stack>
              ))}
            </Stack>

            {/* Testimonial */}
            <Box
              component={motion.div}
              sx={{
                mt: 6,
                p: 3,
                borderRadius: 4,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                maxWidth: 400,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Stack direction="row" spacing={0.5} mb={1.5}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    component={motion.svg}
                    sx={{ color: 'warning.main', fontSize: 16 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  />
                ))}
              </Stack>
              <Typography variant="body2" color="text.secondary" fontStyle="italic" mb={1.5}>
                &quot;This platform transformed how my kids learn. The tutors are amazing and the progress tracking keeps everyone motivated!&quot;
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                Sarah M., Parent
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right Panel - Form Section */}
      <Box
        sx={{
          width: { xs: '100%', lg: '50%', xl: '45%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, sm: 6, lg: 8, xl: 10 },
          py: 6,
        }}
      >
        {/* Mobile Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            mb={4}
            sx={{ display: { lg: 'none' } }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" fontWeight={700} color="primary.contrastText">
                E
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              EduPlatform
            </Typography>
          </Stack>
        </Link>

        {/* Back Link */}
        {backLink && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            mb={4}
          >
            <Link to={backLink.to} style={{ textDecoration: 'none' }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  color: 'text.secondary',
                  transition: 'color 0.2s',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">{backLink.label}</Typography>
              </Stack>
            </Link>
          </Box>
        )}

        {/* Form Content */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ width: '100%', maxWidth: 400, mx: { lg: 0 }, ml: { xs: 'auto', lg: 0 }, mr: { xs: 'auto' } }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
