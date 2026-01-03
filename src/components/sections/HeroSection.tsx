'use client';

import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { AnimatedText } from '@/components/AnimatedText';
import { GradientBackground } from '@/components/GradientBackground';

export const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pt: 10,
      }}
    >
      <GradientBackground variant="mesh" />

      {/* Floating decorative elements */}
      <Box
        component={motion.div}
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: 128,
          left: '10%',
          width: 80,
          height: 80,
          borderRadius: 4,
          bgcolor: alpha(theme.palette.primary.main, 0.2),
          filter: 'blur(4px)',
        }}
      />
      <Box
        component={motion.div}
        animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          bottom: 128,
          right: '15%',
          width: 128,
          height: 128,
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.secondary.main, 0.2),
          filter: 'blur(4px)',
        }}
      />
      <Box
        component={motion.div}
        animate={{ y: [-15, 25, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '8%',
          width: 64,
          height: 64,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.warning.main, 0.3),
          filter: 'blur(4px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" maxWidth={900} mx="auto">
          {/* Badge */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Chip
              icon={
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                    animation: 'pulse 2s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                  }}
                />
              }
              label="Now available for students worldwide"
              sx={{
                mb: 4,
                px: 2,
                py: 2.5,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                '& .MuiChip-label': { fontWeight: 500 },
              }}
            />
          </Box>

          {/* Main headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '4rem', xl: '5rem' },
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            <AnimatedText delay={0.2} sx={{ color: 'text.primary' }}>
              Prepare Smarter.
            </AnimatedText>
            <AnimatedText delay={0.5} sx={{ color: 'primary.main' }}>
              Learn Faster.
            </AnimatedText>
            <AnimatedText delay={0.8} sx={{ color: 'text.primary' }}>
              Succeed Confidently.
            </AnimatedText>
          </Typography>

          {/* Subheadline */}
          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            variant="h6"
            color="text.secondary"
            fontWeight={400}
            sx={{ maxWidth: 700, mx: 'auto', mb: 5 }}
          >
            A complete digital learning ecosystem for tutoring, standardized test prep,
            live classes, and academic assessments—built for modern students.
          </Typography>

          {/* CTAs */}
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s',
              }}
            >
              Start Learning
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrowIcon sx={{ color: 'primary.main' }} />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderWidth: 2,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              Explore Features
            </Button>
          </Stack>

          {/* Trust indicators */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            sx={{ mt: 8, pt: 4, borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}
          >
            <Typography variant="body2" color="text.secondary" mb={3}>
              Trusted by students and educators worldwide
            </Typography>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              flexWrap="wrap"
              sx={{ opacity: 0.6 }}
            >
              {['SAT', 'ACT', 'AP', 'GED', 'CLT'].map((exam, i) => (
                <Typography
                  key={exam}
                  component={motion.span}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + i * 0.1 }}
                  variant="h6"
                  fontWeight={700}
                  color="text.secondary"
                >
                  {exam}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* Bottom wave divider */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill={alpha(theme.palette.grey[100], 0.5)}
          />
        </svg>
      </Box>
    </Box>
  );
};

export default HeroSection;

