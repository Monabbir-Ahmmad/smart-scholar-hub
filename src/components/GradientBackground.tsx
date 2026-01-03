'use client';

import { motion } from 'framer-motion';
import { Box, alpha, useTheme } from '@mui/material';

interface GradientBackgroundProps {
  variant?: 'mesh' | 'dots' | 'grid' | 'waves';
}

export const GradientBackground = ({ variant = 'mesh' }: GradientBackgroundProps) => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  if (variant === 'dots') {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: `radial-gradient(circle, ${primaryColor} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    );
  }

  if (variant === 'grid') {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: `linear-gradient(${primaryColor} 1px, transparent 1px), linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    );
  }

  if (variant === 'waves') {
    return (
      <Box
        component="svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 128,
          opacity: 0.1,
        }}
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          fill={primaryColor}
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,208C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </Box>
    );
  }

  // Default mesh
  return (
    <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 600,
          height: 600,
          borderRadius: '50%',
          bgcolor: alpha(primaryColor, 0.1),
          filter: 'blur(100px)',
        }}
      />
      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 500,
          height: 500,
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.grey[300], 0.5),
          filter: 'blur(100px)',
        }}
      />
    </Box>
  );
};

export default GradientBackground;

