import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Stack,
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import { AuthLayout } from '@/components/auth/AuthLayout';

export default function SignUpPage() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up:', { name, email, password });
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /\d/.test(password) },
  ];

  return (
    <AuthLayout variant="signup" backLink={{ to: '/', label: 'Back to home' }}>
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
            Create an account
          </Typography>
          <Typography
            component={motion.p}
            variant="body1"
            color="text.secondary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Start your learning journey today
          </Typography>
        </Box>

        {/* Form */}
        <Box
          component={motion.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Stack spacing={2}>
            <TextField
              id="name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

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

            <Box>
              <TextField
                id="password"
                label="Password"
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
              <Stack direction="row" flexWrap="wrap" gap={1} mt={1.5}>
                {passwordRequirements.map((req) => (
                  <Chip
                    key={req.label}
                    component={motion.div}
                    icon={
                      req.met ? (
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            bgcolor: 'success.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CheckIcon sx={{ color: 'white', fontSize: 10 }} />
                        </Box>
                      ) : undefined
                    }
                    label={req.label}
                    size="small"
                    sx={{
                      bgcolor: req.met ? alpha(theme.palette.success.main, 0.1) : 'grey.100',
                      color: req.met ? 'success.main' : 'text.secondary',
                      '& .MuiChip-label': { fontSize: '0.75rem' },
                    }}
                    initial={false}
                    animate={req.met ? { scale: [1, 1.02, 1] } : {}}
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
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
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={password !== confirmPassword || !passwordRequirements.every((r) => r.met)}
              sx={{ py: 1.5, mt: 1 }}
            >
              Create Account
            </Button>
          </Stack>
        </Box>

        {/* Footer */}
        <Typography
          component={motion.p}
          variant="body2"
          textAlign="center"
          color="text.secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Already have an account?{' '}
          <Link to="/sign-in" style={{ textDecoration: 'none' }}>
            <Typography component="span" color="primary" fontWeight={500} sx={{ '&:hover': { textDecoration: 'underline' } }}>
              Sign in
            </Typography>
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
