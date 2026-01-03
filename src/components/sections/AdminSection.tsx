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
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { SectionWrapper } from '@/components/SectionWrapper';
import { AnimatedCounter } from '@/components/AnimatedCounter';

const features = [
  {
    icon: DashboardIcon,
    title: 'Admin Dashboards',
    description: 'Comprehensive overview of all platform activities',
  },
  {
    icon: ManageAccountsIcon,
    title: 'User Management',
    description: 'Role-based access control and permissions',
  },
  {
    icon: MenuBookIcon,
    title: 'Content Creation',
    description: 'Build courses, exams, and question banks',
  },
  {
    icon: AnalyticsIcon,
    title: 'Analytics & Insights',
    description: 'Track engagement, revenue, and performance',
  },
];

export const AdminSection = () => {
  const theme = useTheme();

  return (
    <SectionWrapper id="admin" bgcolor={alpha(theme.palette.grey[100], 0.3)}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, lg: 10 }} alignItems="center">
          {/* Dashboard mockup */}
          <Grid size={{ xs: 12, lg: 6 }} order={{ xs: 2, lg: 1 }}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              sx={{ p: 3, borderRadius: 6 }}
            >
              {/* Header */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Platform Overview
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last 30 days
                  </Typography>
                </Box>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 10,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                  }}
                >
                  <Typography variant="caption" fontWeight={600} color="success.main">
                    +12.5%
                  </Typography>
                </Box>
              </Stack>

              {/* Stats grid */}
              <Grid container spacing={2} mb={3}>
                {[
                  { label: 'Active Users', value: 12847, suffix: '' },
                  { label: 'Revenue', value: 284, prefix: '$', suffix: 'K' },
                  { label: 'Sessions', value: 45623, suffix: '' },
                  { label: 'Completion', value: 94, suffix: '%' },
                ].map((stat, index) => (
                  <Grid key={stat.label} size={6}>
                    <Card
                      component={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      sx={{ p: 2, bgcolor: alpha(theme.palette.grey[100], 0.5), boxShadow: 0 }}
                    >
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="h5" fontWeight={700}>
                        <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Mini chart */}
              <Stack direction="row" alignItems="flex-end" spacing={0.5} height={128}>
                {[40, 55, 45, 65, 75, 60, 80, 70, 85, 90, 75, 95].map((height, i) => (
                  <Box
                    key={i}
                    component={motion.div}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
                    sx={{
                      flex: 1,
                      borderRadius: '4px 4px 0 0',
                      bgcolor: i === 11 ? 'primary.main' : alpha(theme.palette.primary.main, 0.2),
                    }}
                  />
                ))}
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
              ADMIN & PLATFORM CONTROL
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
              Powerful Tools{' '}
              <Box component="span" color="primary.main">
                Behind the Scenes
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
              Our comprehensive admin dashboard gives you complete control
              over every aspect of your educational platform.
            </Typography>

            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid key={feature.title} size={{ xs: 12, sm: 6 }}>
                  <Card
                    component={motion.div}
                    initial={{ opacity: 0, x: 20 }}
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
        </Grid>
      </Container>
    </SectionWrapper>
  );
};

export default AdminSection;

