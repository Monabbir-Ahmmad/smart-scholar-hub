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
import PersonIcon from '@mui/icons-material/Person';
import RouteIcon from '@mui/icons-material/Route';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { SectionWrapper } from '@/components/SectionWrapper';
import { GradientBackground } from '@/components/GradientBackground';

const features = [
  {
    icon: PersonIcon,
    title: 'Instructor-Led Courses',
    description: 'Learn from expert tutors with personalized attention and guidance',
  },
  {
    icon: RouteIcon,
    title: 'Custom Learning Paths',
    description: 'AI-generated curricula adapted to your goals and pace',
  },
  {
    icon: AssignmentIcon,
    title: 'Quizzes & Assignments',
    description: 'Interactive assessments with immediate feedback',
  },
  {
    icon: ScheduleIcon,
    title: 'Flexible Scheduling',
    description: 'Reschedule lessons anytime without penalties',
  },
];

export const PersonalizedLearningSection = () => {
  const theme = useTheme();

  return (
    <SectionWrapper id="personalized-learning">
      <GradientBackground variant="grid" />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" maxWidth={800} mx="auto" mb={8}>
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
            PERSONALIZED LEARNING
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
            Learning That{' '}
            <Box component="span" color="primary.main">
              Adapts to You
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
            sx={{ fontSize: '1.1rem' }}
          >
            Our intelligent platform analyzes your performance and learning patterns
            to create a truly personalized educational experience.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid key={feature.title} size={{ xs: 12, md: 6, lg: 3 }}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: `0 12px 40px -8px ${alpha(theme.palette.primary.main, 0.2)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 3, position: 'relative' }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                      transition: 'transform 0.3s',
                    }}
                  >
                    <feature.icon sx={{ color: 'white', fontSize: 28 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} mb={1.5}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Learning path visual */}
        <Card
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          sx={{ mt: 8, p: 4, borderRadius: 6 }}
        >
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            {['Assess', 'Plan', 'Learn', 'Practice', 'Master'].map((step, index) => (
              <Stack
                key={step}
                component={motion.div}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    bgcolor: index === 4 ? 'primary.main' : 'grey.100',
                    color: index === 4 ? 'primary.contrastText' : 'text.primary',
                  }}
                >
                  {index + 1}
                </Box>
                <Typography
                  fontWeight={600}
                  sx={{ display: { xs: 'none', sm: 'inline' } }}
                >
                  {step}
                </Typography>
                {index < 4 && (
                  <Box
                    sx={{
                      width: { xs: 32, lg: 64 },
                      height: 2,
                      bgcolor: 'divider',
                      display: { xs: 'none', md: 'block' },
                    }}
                  />
                )}
              </Stack>
            ))}
          </Stack>
        </Card>
      </Container>
    </SectionWrapper>
  );
};

export default PersonalizedLearningSection;

