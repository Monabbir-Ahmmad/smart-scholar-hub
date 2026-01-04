import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  CircularProgress,
  alpha,
  useTheme,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AuthLayout } from '@/components/auth/AuthLayout';

export default function ForgotPasswordPage() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Forgot password:', { email });
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <AuthLayout variant="forgot" backLink={{ to: '/sign-in', label: 'Back to sign in' }}>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <Stack
            key="form"
            component={motion.div}
            spacing={3}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Header */}
            <Box>
              <Box
                component={motion.div}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <MailOutlineIcon sx={{ color: 'primary.main', fontSize: 28 }} />
              </Box>
              <Typography
                component={motion.h1}
                variant="h4"
                fontWeight={700}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Forgot password?
              </Typography>
              <Typography
                component={motion.p}
                variant="body1"
                color="text.secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                No worries, we&apos;ll send you reset instructions
              </Typography>
            </Box>

            {/* Form */}
            <Box
              component={motion.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <Stack spacing={2.5}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                  sx={{ py: 1.5 }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowForwardIcon sx={{ ml: 1, fontSize: 20 }} />
                    </>
                  )}
                </Button>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <Stack
            key="success"
            component={motion.div}
            spacing={3}
            textAlign="center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Success Icon */}
            <Box
              component={motion.div}
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.success.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
            >
              <CheckCircleIcon
                component={motion.svg}
                sx={{ color: 'success.main', fontSize: 40 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              />
            </Box>

            {/* Message */}
            <Box>
              <Typography
                component={motion.h1}
                variant="h4"
                fontWeight={700}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Check your email
              </Typography>
              <Typography
                component={motion.p}
                variant="body1"
                color="text.secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                We&apos;ve sent a password reset link to{' '}
                <Typography component="span" fontWeight={500} color="text.primary">
                  {email}
                </Typography>
              </Typography>
            </Box>

            {/* Actions */}
            <Stack
              component={motion.div}
              spacing={2}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography variant="body2" color="text.secondary">
                Didn&apos;t receive the email?{' '}
                <Typography
                  component="span"
                  color="primary"
                  fontWeight={500}
                  sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  onClick={() => setSubmitted(false)}
                >
                  Click to resend
                </Typography>
              </Typography>
              <Button
                component={Link}
                to="/sign-in"
                variant="outlined"
                size="large"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Back to sign in
              </Button>
            </Stack>
          </Stack>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
