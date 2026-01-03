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
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import BoltIcon from '@mui/icons-material/Bolt';
import StorageIcon from '@mui/icons-material/Storage';
import LockIcon from '@mui/icons-material/Lock';
import { SectionWrapper } from '@/components/SectionWrapper';

const benefits = [
  {
    icon: AutoAwesomeIcon,
    title: 'Personalized Learning',
    description: "AI-driven paths that adapt to each student's unique needs",
  },
  {
    icon: SecurityIcon,
    title: 'Verified Tutors',
    description: 'Every instructor passes rigorous qualification exams',
  },
  {
    icon: PeopleIcon,
    title: 'Family-Friendly',
    description: 'Parent controls and multi-student account management',
  },
  {
    icon: BoltIcon,
    title: 'Full Automation',
    description: 'Scheduling, payments, and notifications run automatically',
  },
  {
    icon: StorageIcon,
    title: 'Scalable Architecture',
    description: 'Built to grow with thousands of concurrent users',
  },
  {
    icon: LockIcon,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and data protection standards',
  },
];

export const BenefitsSection = () => {
  const theme = useTheme();

  return (
    <SectionWrapper id="benefits">
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
            WHY CHOOSE US
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
            Everything You Need to{' '}
            <Box component="span" color="primary.main">
              Succeed
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
            A complete learning ecosystem designed for modern education,
            backed by cutting-edge technology.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid key={benefit.title} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.08 }}
                whileHover={{ y: -8 }}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: `0 12px 40px -8px ${alpha(theme.palette.primary.main, 0.2)}`,
                    '&::before': {
                      opacity: 1,
                    },
                    '& .icon-box': {
                      transform: 'rotate(360deg) scale(1.1)',
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    opacity: 0,
                    transition: 'opacity 0.3s',
                  },
                }}
              >
                <CardContent sx={{ p: 4, position: 'relative' }}>
                  <Box
                    className="icon-box"
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      transition: 'transform 0.5s',
                    }}
                  >
                    <benefit.icon sx={{ color: 'white', fontSize: 32 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} mb={1.5}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
};

export default BenefitsSection;
