'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  variant?: TypographyProps['variant'];
  component?: React.ElementType;
  sx?: TypographyProps['sx'];
}

export const AnimatedText = ({
  children,
  delay = 0,
  variant = 'inherit',
  component = 'span',
  sx,
}: AnimatedTextProps) => {
  const text = children?.toString() || '';
  const words = text.split(' ');

  return (
    <Typography variant={variant} component={component} sx={{ display: 'block', ...sx }}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.1,
            ease: 'easeOut',
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </Typography>
  );
};

export default AnimatedText;

