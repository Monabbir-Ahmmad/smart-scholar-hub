'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  alpha,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const contactInfo = [
  {
    icon: EmailOutlinedIcon,
    title: 'Email Us',
    value: 'support@eduplatform.com',
    description: 'We respond within 24 hours',
  },
  {
    icon: PhoneOutlinedIcon,
    title: 'Call Us',
    value: '+1 (555) 123-4567',
    description: 'Mon-Fri, 9am-6pm EST',
  },
  {
    icon: LocationOnOutlinedIcon,
    title: 'Visit Us',
    value: '123 Education Ave',
    description: 'New York, NY 10001',
  },
  {
    icon: AccessTimeOutlinedIcon,
    title: 'Support Hours',
    value: '24/7 Online Support',
    description: 'Live chat available',
  },
];

const inquiryTypes = [
  'General Inquiry',
  'Technical Support',
  'Billing Question',
  'Partnership Opportunity',
  'Feedback',
  'Other',
];

const floatingIcons = [
  { Icon: MenuBookIcon, delay: 0, x: '10%', y: '20%' },
  { Icon: GroupIcon, delay: 0.5, x: '75%', y: '15%' },
  { Icon: EmojiEventsIcon, delay: 1, x: '85%', y: '60%' },
  { Icon: TrendingUpIcon, delay: 1.5, x: '15%', y: '70%' },
  { Icon: AutoAwesomeIcon, delay: 2, x: '60%', y: '80%' },
];

export default function ContactPage() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    console.log('Contact form submitted:', formData);
  };

  if (isSubmitted) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.02),
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center', maxWidth: 400 }}
        >
          <Box
            component={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.success.main, 0.15),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 40, color: 'success.main' }} />
          </Box>
          <Typography variant="h4" fontWeight={700} mb={1.5}>
            Message Sent!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Thank you for reaching out. We&apos;ll get back to you within 24 hours.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            size="large"
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Panel */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          width: { lg: '45%', xl: '40%' },
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Shapes */}
        <Box sx={{ position: 'absolute', inset: 0 }}>
          <Box
            component={motion.div}
            sx={{
              position: 'absolute',
              width: 384,
              height: 384,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              top: '-10%',
              left: '-10%',
            }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Box
            component={motion.div}
            sx={{
              position: 'absolute',
              width: 288,
              height: 288,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
              bottom: '10%',
              right: '-5%',
            }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Box
            component={motion.div}
            sx={{
              position: 'absolute',
              width: 192,
              height: 192,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.warning.main, 0.15),
              top: '40%',
              right: '20%',
            }}
            animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </Box>

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <Box
            key={index}
            component={motion.div}
            sx={{
              position: 'absolute',
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              left: x,
              top: y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            transition={{
              opacity: { delay, duration: 0.5 },
              scale: { delay, duration: 0.5 },
              y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <Icon sx={{ color: 'primary.main', fontSize: 24 }} />
          </Box>
        ))}

        {/* Main Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: { lg: 6, xl: 8 },
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Stack direction="row" alignItems="center" spacing={1.5} mb={6}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" fontWeight={700} color="primary.contrastText">
                    E
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700} color="text.primary">
                  EduPlatform
                </Typography>
              </Stack>
            </Link>

            {/* Headline */}
            <Typography
              component={motion.h1}
              variant="h2"
              fontWeight={700}
              sx={{ fontSize: { lg: '2.5rem', xl: '3rem' }, mb: 2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Get in Touch
            </Typography>
            <Typography
              component={motion.p}
              variant="h6"
              color="text.secondary"
              fontWeight={400}
              sx={{ mb: 5, maxWidth: 360 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </Typography>

            {/* Contact Info */}
            <Stack spacing={3}>
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Stack
                    key={info.title}
                    component={motion.div}
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ color: 'primary.main', fontSize: 22 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {info.title}
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {info.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {info.description}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          width: { xs: '100%', lg: '55%', xl: '60%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, sm: 6, lg: 8, xl: 10 },
          py: 6,
        }}
      >
        {/* Mobile Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            mb={4}
            sx={{ display: { lg: 'none' } }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" fontWeight={700} color="primary.contrastText">
                E
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              EduPlatform
            </Typography>
          </Stack>
        </Link>

        {/* Back Link */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          mb={4}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                color: 'text.secondary',
                transition: 'color 0.2s',
                '&:hover': { color: 'text.primary' },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">Back to home</Typography>
            </Stack>
          </Link>
        </Box>

        <Box sx={{ maxWidth: 500, mx: { lg: 0 }, ml: { xs: 'auto', lg: 0 }, mr: { xs: 'auto' } }}>
          <Stack spacing={3}>
            {/* Header */}
            <Box>
              <Typography
                component={motion.h1}
                variant="h4"
                fontWeight={700}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Contact Us
              </Typography>
              <Typography
                component={motion.p}
                variant="body1"
                color="text.secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Fill out the form below and we&apos;ll get back to you shortly
              </Typography>
            </Box>

            {/* Mobile Contact Info */}
            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              sx={{ display: { lg: 'none' }, gap: 2 }}
            >
              {contactInfo.slice(0, 2).map((info) => {
                const Icon = info.icon;
                return (
                  <Stack key={info.title} direction="row" spacing={1} alignItems="center">
                    <Icon sx={{ color: 'primary.main', fontSize: 18 }} />
                    <Typography variant="body2" color="text.secondary">
                      {info.value}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>

            {/* Form */}
            <Box
              component={motion.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Stack spacing={2.5}>
                <TextField
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                  fullWidth
                />

                <TextField
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange('email')}
                  required
                  fullWidth
                />

                <FormControl fullWidth>
                  <InputLabel>Inquiry Type</InputLabel>
                  <Select
                    value={formData.inquiryType}
                    label="Inquiry Type"
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    required
                  >
                    {inquiryTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Message"
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={handleChange('message')}
                  required
                  multiline
                  rows={4}
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  fullWidth
                  endIcon={!isSubmitting && <SendIcon />}
                  sx={{ py: 1.5, mt: 1 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Stack>
            </Box>

            {/* Privacy Note */}
            <Typography
              component={motion.p}
              variant="caption"
              color="text.secondary"
              textAlign="center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              By submitting this form, you agree to our{' '}
              <Link href="/privacy" style={{ color: theme.palette.primary.main }}>
                Privacy Policy
              </Link>
              {' '}and{' '}
              <Link href="/terms" style={{ color: theme.palette.primary.main }}>
                Terms of Service
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
