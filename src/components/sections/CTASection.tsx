'use client';

import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GradientBackground } from '@/components/GradientBackground';

export const CTASection = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 12, lg: 16 },
        overflow: 'hidden',
      }}
    >
      <GradientBackground variant="mesh" />

      {/* Wave divider at top */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: 'rotate(180deg)',
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          maxWidth={900}
          mx="auto"
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', lg: '3rem', xl: '3.5rem' },
              mb: 3,
            }}
          >
            Start Your Learning{' '}
            <Box component="span" color="primary.main">
              Journey Today
            </Box>
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            fontWeight={400}
            sx={{ maxWidth: 700, mx: 'auto', mb: 5 }}
          >
            Everything you need to learn, practice, and succeed—on one powerful platform.
            Join thousands of students achieving their academic goals.
          </Typography>

          <Stack
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
              Get Started Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ChatIcon sx={{ color: 'primary.main' }} />}
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
              Request a Demo
            </Button>
          </Stack>

          {/* Trust badges */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            sx={{
              mt: 8,
              pt: 4,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="center"
              spacing={4}
              flexWrap="wrap"
            >
              {[
                'No credit card required',
                'Free 14-day trial',
                'Cancel anytime',
              ].map((text) => (
                <Stack key={text} direction="row" alignItems="center" spacing={1}>
                  <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
