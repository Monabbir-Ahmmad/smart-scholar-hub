'use client';

import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import DrawIcon from '@mui/icons-material/Draw';
import ChatIcon from '@mui/icons-material/Chat';
import EventIcon from '@mui/icons-material/Event';
import { SectionWrapper } from '@/components/SectionWrapper';
import { GradientBackground } from '@/components/GradientBackground';

const features = [
  {
    icon: VideocamIcon,
    title: 'Real-Time Online Classes',
    description: 'HD video with crystal-clear audio for immersive learning',
  },
  {
    icon: DrawIcon,
    title: 'Collaborative Whiteboard',
    description: 'Draw, annotate, and solve problems together in real-time',
  },
  {
    icon: ChatIcon,
    title: 'Interactive Sessions',
    description: 'Ask questions and get instant answers during class',
  },
  {
    icon: EventIcon,
    title: 'Request Extra Lessons',
    description: 'Need more help? Schedule additional sessions anytime',
  },
];

export const LiveClassesSection = () => {
  const theme = useTheme();

  return (
    <SectionWrapper id="live-classes" bgcolor={alpha(theme.palette.grey[100], 0.3)}>
      <GradientBackground variant="mesh" />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, lg: 10 }} alignItems="center">
          {/* Visual - Whiteboard mockup */}
          <Grid size={{ xs: 12, lg: 6 }} order={{ xs: 2, lg: 1 }}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              sx={{ p: 3, borderRadius: 6 }}
            >
              {/* Toolbar */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                mb={2}
                pb={2}
                borderBottom={1}
                borderColor="divider"
              >
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main' }} />
                <Box flex={1} />
                {[1, 2, 3, 4].map((i) => (
                  <Box key={i} sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: 'grey.100' }} />
                ))}
              </Stack>

              {/* Whiteboard content */}
              <Box
                sx={{
                  height: 256,
                  position: 'relative',
                  bgcolor: alpha(theme.palette.grey[100], 0.5),
                  borderRadius: 4,
                  p: 2,
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 400 200">
                  <motion.path
                    d="M 20 100 Q 100 30 200 100 T 380 100"
                    stroke={theme.palette.primary.main}
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.text
                    x="50"
                    y="60"
                    fill={theme.palette.text.primary}
                    fontSize="14"
                    fontWeight="500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 }}
                  >
                    y = sin(x)
                  </motion.text>
                  <motion.circle
                    cx="200"
                    cy="100"
                    r="6"
                    fill={theme.palette.secondary.main}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2 }}
                  />
                </svg>

                {/* Cursor indicator */}
                <Box
                  component={motion.div}
                  animate={{ x: [0, 100, 50], y: [0, 50, 30] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  sx={{
                    position: 'absolute',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    bgcolor: 'secondary.main',
                    boxShadow: 4,
                    top: '40%',
                    left: '40%',
                  }}
                />
              </Box>

              {/* Participants */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                mt={2}
                pt={2}
                borderTop={1}
                borderColor="divider"
              >
                <Stack direction="row" spacing={-1}>
                  {[1, 2, 3].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        border: 2,
                        borderColor: 'background.paper',
                      }}
                    />
                  ))}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  3 participants
                </Typography>
                <Box flex={1} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  />
                  <Typography variant="body2" fontWeight={500} color="success.main">
                    Live
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>

          {/* Content */}
          <Grid size={{ xs: 12, lg: 6 }} order={{ xs: 1, lg: 2 }}>
            <Typography
              component={motion.span}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              variant="overline"
              color="primary"
              fontWeight={600}
              sx={{ display: 'block', mb: 2 }}
            >
              LIVE CLASSES & WHITEBOARD
            </Typography>

            <Typography
              component={motion.h2}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              variant="h2"
              sx={{ fontSize: { xs: '2rem', lg: '2.5rem', xl: '3rem' }, mb: 3 }}
            >
              Learn Live with{' '}
              <Box component="span" color="primary.main">
                Real Teachers
              </Box>
            </Typography>

            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, fontSize: '1.1rem' }}
            >
              Experience the power of real-time learning with our
              interactive virtual classrooms and collaborative tools.
            </Typography>

            <Stack spacing={2}>
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  sx={{
                    border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: 'background.paper',
                      borderColor: 'divider',
                    },
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <feature.icon sx={{ color: 'white', fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </SectionWrapper>
  );
};

export default LiveClassesSection;

