'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';

const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Access courses, take exams, and track your learning progress',
    icon: PersonIcon,
    features: ['Personalized learning paths', 'Practice exams & quizzes', 'Progress tracking'],
  },
  {
    id: 'tutor',
    title: 'Tutor',
    description: 'Create courses, conduct live classes, and help students succeed',
    icon: SchoolIcon,
    features: ['Course creation tools', 'Live class hosting', 'Student analytics'],
  },
  {
    id: 'parent',
    title: 'Parent',
    description: 'Monitor your child\'s progress and manage their learning journey',
    icon: FamilyRestroomIcon,
    features: ['Progress monitoring', 'Payment management', 'Attendance tracking'],
  },
];

const floatingIcons = [
  { Icon: MenuBookIcon, delay: 0, x: '10%', y: '20%' },
  { Icon: GroupIcon, delay: 0.5, x: '75%', y: '15%' },
  { Icon: EmojiEventsIcon, delay: 1, x: '85%', y: '60%' },
  { Icon: TrendingUpIcon, delay: 1.5, x: '15%', y: '70%' },
  { Icon: AutoAwesomeIcon, delay: 2, x: '60%', y: '80%' },
];

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const theme = useTheme();
  const router = useRouter();

  const handleContinue = () => {
    if (selectedRole) {
      // Navigate to dashboard or onboarding based on role
      console.log('Selected role:', selectedRole);
      router.push('/');
    }
  };

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
              Choose Your Role
            </Typography>
            <Typography
              component={motion.p}
              variant="h6"
              color="text.secondary"
              fontWeight={400}
              sx={{ mb: 4, maxWidth: 360 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Select how you&apos;ll be using the platform to get a personalized experience
            </Typography>
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
          px: { xs: 3, sm: 6, lg: 8 },
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

        <Box sx={{ maxWidth: 640, mx: 'auto', width: '100%' }}>
          <Typography
            component={motion.h1}
            variant="h4"
            fontWeight={700}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            sx={{ display: { lg: 'none' }, mb: 1 }}
          >
            Choose Your Role
          </Typography>
          <Typography
            component={motion.p}
            variant="body1"
            color="text.secondary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            sx={{ display: { lg: 'none' }, mb: 4 }}
          >
            Select how you&apos;ll be using the platform
          </Typography>

          <Stack spacing={2}>
            {roles.map((role, index) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <Box
                  key={role.id}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole(role.id)}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: `2px solid`,
                    borderColor: isSelected ? 'primary.main' : alpha(theme.palette.divider, 0.5),
                    bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      borderColor: isSelected ? 'primary.main' : 'primary.light',
                      boxShadow: 3,
                    },
                  }}
                >
                  {/* Selected Check */}
                  {isSelected && (
                    <Box
                      component={motion.div}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                      }}
                    >
                      <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    </Box>
                  )}

                  <Stack direction="row" spacing={3} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: isSelected
                          ? alpha(theme.palette.primary.main, 0.15)
                          : alpha(theme.palette.grey[100], 1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 28,
                          color: isSelected ? 'primary.main' : 'text.secondary',
                          transition: 'color 0.2s',
                        }}
                      />
                    </Box>

                    <Box sx={{ flex: 1, pr: 4 }}>
                      <Typography variant="h6" fontWeight={600} mb={0.5}>
                        {role.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1.5}>
                        {role.description}
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {role.features.map((feature) => (
                          <Box
                            key={feature}
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1.5,
                              bgcolor: alpha(theme.palette.grey[500], 0.1),
                              fontSize: '0.75rem',
                              color: 'text.secondary',
                            }}
                          >
                            {feature}
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Stack>

          <Button
            component={motion.button}
            variant="contained"
            size="large"
            fullWidth
            disabled={!selectedRole}
            onClick={handleContinue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: selectedRole ? 1.02 : 1 }}
            whileTap={{ scale: selectedRole ? 0.98 : 1 }}
            sx={{ mt: 4, py: 1.75 }}
          >
            Continue
          </Button>

          <Typography
            component={motion.p}
            variant="body2"
            color="text.secondary"
            textAlign="center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            sx={{ mt: 2 }}
          >
            You can change your role later in settings
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
