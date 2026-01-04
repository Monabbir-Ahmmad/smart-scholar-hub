import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Stack,
  Chip,
  CircularProgress,
  alpha,
  useTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AuthLayout } from '@/components/auth/AuthLayout';

export default function ResetPasswordPage() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Reset password:', { password });
    setIsLoading(false);
    setSubmitted(true);
  };

  const passwordRequirements = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Uppercase', met: /[A-Z]/.test(password) },
    { label: 'Number', met: /\d/.test(password) },
  ];

  const strengthLevel = passwordRequirements.filter((r) => r.met).length;

  return (
    <AuthLayout variant="reset" backLink={{ to: '/sign-in', label: 'Back to sign in' }}>
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
                <LockOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
              </Box>
              <Typography
                component={motion.h1}
                variant="h4"
                fontWeight={700}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Set new password
              </Typography>
              <Typography
                component={motion.p}
                variant="body1"
                color="text.secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your new password must be different from previous passwords
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
                <Box>
                  <TextField
                    id="password"
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                              {showPassword ? <VisibilityOffIcon sx={{ fontSize: 20 }} /> : <VisibilityIcon sx={{ fontSize: 20 }} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  {/* Password Strength */}
                  <Stack spacing={1} mt={1.5}>
                    <Stack direction="row" spacing={0.5}>
                      {[1, 2, 3].map((level) => (
                        <Box
                          key={level}
                          component={motion.div}
                          sx={{
                            flex: 1,
                            height: 4,
                            borderRadius: 2,
                            bgcolor: strengthLevel >= level ? 'success.main' : 'grey.200',
                            transition: 'background-color 0.3s',
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.3 + level * 0.1 }}
                        />
                      ))}
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {passwordRequirements.map((req) => (
                        <Chip
                          key={req.label}
                          component={motion.div}
                          icon={
                            req.met ? (
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: '50%',
                                  bgcolor: 'success.main',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <CheckIcon sx={{ color: 'white', fontSize: 8 }} />
                              </Box>
                            ) : undefined
                          }
                          label={req.label}
                          size="small"
                          sx={{
                            bgcolor: req.met ? alpha(theme.palette.success.main, 0.1) : 'grey.100',
                            color: req.met ? 'success.main' : 'text.secondary',
                            '& .MuiChip-label': { fontSize: '0.7rem' },
                          }}
                          initial={false}
                          animate={req.met ? { scale: [1, 1.05, 1] } : {}}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Box>

                <Box>
                  <TextField
                    id="confirmPassword"
                    label="Confirm New Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                              {showConfirmPassword ? <VisibilityOffIcon sx={{ fontSize: 20 }} /> : <VisibilityIcon sx={{ fontSize: 20 }} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <Typography
                      component={motion.p}
                      variant="caption"
                      color="error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      sx={{ mt: 0.5 }}
                    >
                      Passwords do not match
                    </Typography>
                  )}
                  {confirmPassword && password === confirmPassword && password && (
                    <Stack
                      component={motion.div}
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      sx={{ mt: 0.5 }}
                    >
                      <CheckIcon sx={{ color: 'success.main', fontSize: 12 }} />
                      <Typography variant="caption" color="success.main">
                        Passwords match
                      </Typography>
                    </Stack>
                  )}
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={
                    password !== confirmPassword ||
                    !passwordRequirements.every((r) => r.met) ||
                    isLoading
                  }
                  sx={{ py: 1.5 }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>
                      Reset Password
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
            {/* Success Animation */}
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
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
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
                Password reset successful
              </Typography>
              <Typography
                component={motion.p}
                variant="body1"
                color="text.secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your password has been successfully reset. You can now sign in with your new password.
              </Typography>
            </Box>

            {/* CTA */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                component={Link}
                to="/sign-in"
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Sign in
                <ArrowForwardIcon sx={{ ml: 1, fontSize: 20 }} />
              </Button>
            </Box>
          </Stack>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
