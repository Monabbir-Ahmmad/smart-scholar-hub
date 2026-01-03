'use client';

import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
  alpha,
  useTheme,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { SectionWrapper } from '@/components/SectionWrapper';
import { GradientBackground } from '@/components/GradientBackground';

const steps = [
  {
    icon: SchoolIcon,
    title: 'Subject Expertise',
    description: 'Tutors specialize in specific subjects with proven knowledge',
  },
  {
    icon: AssignmentTurnedInIcon,
    title: 'Qualification Exam',
    description: 'Every tutor passes rigorous subject-specific assessments',
  },
  {
    icon: VerifiedIcon,
    title: 'Admin Review',
    description: 'Teaching demos and credentials verified by our team',
  },
  {
    icon: EmojiEventsIcon,
    title: 'Certification',
    description: 'Only top performers earn verified tutor status',
  },
];

export const VerifiedTutorsSection = () => {
  const theme = useTheme();

  return (
    <SectionWrapper id="verified-tutors" bgcolor={alpha(theme.palette.grey[100], 0.3)}>
      <GradientBackground variant="dots" />

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
            VERIFIED TUTORS
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
            Learn from{' '}
            <Box component="span" color="primary.main">
              Verified Subject Experts
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
            Our rigorous verification process ensures you&apos;re learning from
            qualified, experienced educators who are passionate about teaching.
          </Typography>
        </Box>

        {/* Certification steps */}
        <Box position="relative">
          {/* Connection line */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: 2,
              bgcolor: 'divider',
              transform: 'translateY(-50%)',
            }}
          />

          <Grid container spacing={3}>
            {steps.map((step, index) => (
              <Grid key={step.title} size={{ xs: 12, md: 6, lg: 3 }}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.15 }}
                  sx={{ position: 'relative' }}
                >
                  <Card
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: `0 12px 40px -8px ${alpha(theme.palette.primary.main, 0.2)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Box
                        component={motion.div}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.15, type: 'spring' }}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 3,
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2.5,
                        }}
                      >
                        <step.icon sx={{ color: 'white', fontSize: 32 }} />
                      </Box>

                      <Typography
                        variant="overline"
                        color="primary"
                        fontWeight={700}
                        sx={{ display: 'block', mb: 1 }}
                      >
                        STEP {index + 1}
                      </Typography>
                      <Typography variant="h6" fontWeight={700} mb={1}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Step number connector */}
                  {index < steps.length - 1 && (
                    <Box
                      component={motion.div}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.15 }}
                      sx={{
                        display: { xs: 'none', lg: 'flex' },
                        position: 'absolute',
                        top: '50%',
                        right: -12,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <Typography variant="caption" sx={{ color: 'white', fontWeight: 700 }}>
                        →
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats */}
        <Card
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          sx={{ mt: 8, p: 4, borderRadius: 6 }}
        >
          <Grid container spacing={4} textAlign="center">
            {[
              { value: '500+', label: 'Verified Tutors' },
              { value: '98%', label: 'Student Satisfaction' },
              { value: '50+', label: 'Subjects Covered' },
              { value: '100K+', label: 'Lessons Delivered' },
            ].map((stat, index) => (
              <Grid key={stat.label} size={{ xs: 6, lg: 3 }}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color="primary.main"
                    sx={{ fontSize: { xs: '1.75rem', lg: '2.5rem' } }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Container>
    </SectionWrapper>
  );
};

export default VerifiedTutorsSection;

