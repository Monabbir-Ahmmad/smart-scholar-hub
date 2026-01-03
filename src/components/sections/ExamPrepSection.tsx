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
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import { SectionWrapper } from '@/components/SectionWrapper';
import { GradientBackground } from '@/components/GradientBackground';
import { AnimatedCounter } from '@/components/AnimatedCounter';

const features = [
  {
    icon: DescriptionIcon,
    title: 'SAT, ACT, AP, GED & More',
    description: 'Comprehensive practice exams for all major standardized tests',
  },
  {
    icon: CheckCircleIcon,
    title: 'Automated Grading',
    description: 'Instant feedback with detailed explanations',
  },
  {
    icon: BarChartIcon,
    title: 'Performance Analytics',
    description: 'Track progress with detailed score breakdowns',
  },
  {
    icon: DownloadIcon,
    title: 'PDF Reports',
    description: 'Exportable reports for college applications',
  },
];

export const ExamPrepSection = () => {
  const theme = useTheme();

  return (
    <SectionWrapper id="exam-prep" bgcolor={alpha(theme.palette.grey[100], 0.3)}>
      <GradientBackground variant="dots" />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, lg: 10 }} alignItems="center">
          {/* Content */}
          <Grid size={{ xs: 12, lg: 6 }}>
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
              EXAM PREPARATION
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
              Ace Every Exam with{' '}
              <Box component="span" color="primary.main">
                Confidence
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
              Our AI-powered platform adapts to your learning style,
              identifying weak areas and providing targeted practice to
              maximize your score improvements.
            </Typography>

            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid key={feature.title} size={{ xs: 12, sm: 6 }}>
                  <Card
                    component={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    sx={{
                      height: '100%',
                      border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <feature.icon sx={{ color: 'primary.main', fontSize: 20 }} />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {feature.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Visual */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              sx={{ position: 'relative' }}
            >
              <Card sx={{ p: 4, borderRadius: 6 }}>
                {/* Mock score chart */}
                <Box mb={3}>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    Your SAT Progress
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="flex-end" height={160}>
                    {[65, 72, 68, 78, 82, 75, 88, 92].map((height, i) => (
                      <Box
                        key={i}
                        component={motion.div}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                        sx={{
                          flex: 1,
                          bgcolor: 'primary.main',
                          borderRadius: '4px 4px 0 0',
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                {/* Stats */}
                <Grid container spacing={2} sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}>
                  <Grid size={4}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight={700}>
                        <AnimatedCounter target={1420} />
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Current Score
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={4}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight={700} color="success.main">
                        +<AnimatedCounter target={180} />
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Improvement
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={4}>
                    <Box textAlign="center">
                      <Typography variant="h5" fontWeight={700}>
                        <AnimatedCounter target={94} suffix="%" />
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Accuracy
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Card>

              {/* Floating badge */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                sx={{
                  position: 'absolute',
                  top: -16,
                  right: -16,
                  bgcolor: 'success.main',
                  color: 'success.contrastText',
                  px: 2,
                  py: 1,
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  boxShadow: 4,
                }}
              >
                Top 5% Score
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </SectionWrapper>
  );
};

export default ExamPrepSection;

