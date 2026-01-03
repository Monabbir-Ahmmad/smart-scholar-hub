'use client';

import { motion } from 'framer-motion';
import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  bgcolor?: BoxProps['bgcolor'];
  sx?: BoxProps['sx'];
}

export const SectionWrapper = ({ children, id, bgcolor, sx }: SectionWrapperProps) => {
  return (
    <Box
      component={motion.section}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{
        position: 'relative',
        py: { xs: 10, lg: 14 },
        overflow: 'hidden',
        bgcolor: bgcolor || 'background.default',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default SectionWrapper;

