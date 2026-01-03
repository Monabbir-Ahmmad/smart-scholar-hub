'use client';

import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid2 as Grid,
  Card,
  Stack,
  LinearProgress,
  alpha,
  useTheme,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { SectionWrapper } from '@/components/SectionWrapper';

const features = [
  {
    icon: GroupIcon,
    title: 'Family Accounts',
    description: 'Manage multiple students under one or two parent accounts',
  },
  {
    icon: PaymentIcon,
    title: 'Unified Payments',
    description: "Single billing for all family members' courses and sessions",
  },
  {
    icon: TrendingUpIcon,
    title: 'Progress Tracking',
    description: 'Monitor attendance, grades, and exam results at a glance',
  },
  {
    icon: NotificationsIcon,
    title: 'Smart Notifications',
    description: 'Automated alerts for upcoming classes, exams, and reports',
  },
  {
    icon: PersonIcon,
    title: 'Solo Student Support',
    description: 'Independent students can manage their own accounts too',
  },
];

export const FamilyAccountsSection = () => {
  const theme = useTheme();

  return (
    <SectionWrapper id="family-accounts">
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
              FAMILY & PARENT ACCOUNTS
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
              Built for Students.{' '}
              <Box component="span" color="primary.main">
                Trusted by Parents.
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
              Our family-centric platform gives parents full visibility and control
              while empowering students to take ownership of their education.
            </Typography>

            <Stack spacing={1}>
              {features.map((feature, index) => (
                <Box
                  key={feature.title}
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1.5,
                    borderRadius: 2,
                    transition: 'background-color 0.3s',
                    '&:hover': { bgcolor: alpha(theme.palette.grey[100], 0.5) },
                  }}
                >
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
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Dashboard mockup */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              sx={{ p: 3, borderRadius: 6 }}
            >
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Family Dashboard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The Johnson Family
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GroupIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
              </Stack>

              {/* Family members */}
              <Stack spacing={1.5} mb={3}>
                {[
                  { name: 'Emma Johnson', role: 'Student', progress: 85 },
                  { name: 'Michael Johnson', role: 'Student', progress: 72 },
                ].map((member, index) => (
                  <Card
                    key={member.name}
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    sx={{ p: 2, bgcolor: alpha(theme.palette.grey[100], 0.5), boxShadow: 0 }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'primary.main' }} />
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {member.role}
                          </Typography>
                        </Box>
                      </Stack>
                      <Typography variant="body2" fontWeight={600} color="primary.main">
                        {member.progress}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={member.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': { borderRadius: 4 },
                      }}
                    />
                  </Card>
                ))}
              </Stack>

              {/* Quick stats */}
              <Grid container spacing={2} sx={{ pt: 2, borderTop: 1, borderColor: 'divider' }}>
                {[
                  { label: 'Classes', value: '24' },
                  { label: 'Exams', value: '8' },
                  { label: 'Hours', value: '156' },
                ].map((stat) => (
                  <Grid key={stat.label} size={4}>
                    <Box textAlign="center">
                      <Typography variant="h6" fontWeight={700}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </SectionWrapper>
  );
};

export default FamilyAccountsSection;

