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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PaymentIcon from '@mui/icons-material/Payment';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { SectionWrapper } from '@/components/SectionWrapper';

export const SchedulingSection = () => {
  const theme = useTheme();

  const features = [
    { icon: CalendarMonthIcon, title: 'Smart Calendar', desc: 'Sync with iCal, Google Calendar' },
    { icon: NotificationsActiveIcon, title: 'Auto Reminders', desc: 'Never miss a class again' },
    { icon: PaymentIcon, title: 'Stripe Payments', desc: 'Secure, hassle-free billing' },
    { icon: AutorenewIcon, title: 'Subscriptions', desc: 'Flexible monthly plans' },
  ];

  return (
    <SectionWrapper id="scheduling">
      {/* Calendar grid background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `linear-gradient(${theme.palette.primary.main} 1px, transparent 1px), linear-gradient(90deg, ${theme.palette.primary.main} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

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
              SCHEDULING & PAYMENTS
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
              Simple Scheduling.{' '}
              <Box component="span" color="primary.main">
                Secure Payments.
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
              Book lessons, manage your calendar, and handle payments
              seamlessly—all in one place with enterprise-grade security.
            </Typography>

            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid key={feature.title} size={{ xs: 12, sm: 6 }}>
                  <Card
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
                            {feature.desc}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Calendar mockup */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              sx={{ position: 'relative' }}
            >
              <Card sx={{ p: 3, borderRadius: 6 }}>
                {/* Calendar header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight={700}>
                    January 2026
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 2,
                        bgcolor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      ←
                    </Box>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 2,
                        bgcolor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      →
                    </Box>
                  </Stack>
                </Stack>

                {/* Days header */}
                <Grid container spacing={0.5} mb={1}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <Grid key={`${day}-${i}`} size={12 / 7}>
                      <Typography
                        variant="caption"
                        fontWeight={500}
                        color="text.secondary"
                        sx={{ display: 'block', textAlign: 'center', py: 1 }}
                      >
                        {day}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                {/* Calendar grid */}
                <Grid container spacing={0.5}>
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 3;
                    const isCurrentMonth = day >= 1 && day <= 31;
                    const hasClass = [5, 8, 12, 15, 19, 22, 26].includes(day);
                    const isToday = day === 15;

                    return (
                      <Grid key={i} size={12 / 7}>
                        <Box
                          component={motion.div}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.01 }}
                          sx={{
                            aspectRatio: '1',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            color: !isCurrentMonth
                              ? alpha(theme.palette.text.secondary, 0.3)
                              : isToday
                              ? 'primary.contrastText'
                              : hasClass
                              ? 'primary.main'
                              : 'text.primary',
                            bgcolor: isToday
                              ? 'primary.main'
                              : hasClass
                              ? alpha(theme.palette.primary.main, 0.1)
                              : 'transparent',
                            fontWeight: isToday || hasClass ? 500 : 400,
                            '&:hover': {
                              bgcolor: !isToday ? 'grey.100' : undefined,
                            },
                          }}
                        >
                          {isCurrentMonth ? day : day > 0 ? day : 31 + day}
                          {hasClass && !isToday && (
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: 4,
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                              }}
                            />
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Upcoming class */}
                <Card
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    boxShadow: 0,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ width: 4, height: 48, borderRadius: 2, bgcolor: 'primary.main' }} />
                    <Box flex={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        SAT Math Practice
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Today, 4:00 PM - 5:00 PM
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
                        Confirmed
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Card>

              {/* Payment success badge */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, type: 'spring' }}
                sx={{
                  position: 'absolute',
                  bottom: -16,
                  right: -16,
                  bgcolor: 'success.main',
                  color: 'success.contrastText',
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <PaymentIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2" fontWeight={600}>
                  Payment Successful
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </SectionWrapper>
  );
};

export default SchedulingSection;

