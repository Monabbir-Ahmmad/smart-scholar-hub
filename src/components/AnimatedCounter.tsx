'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Typography, TypographyProps } from '@mui/material';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  variant?: TypographyProps['variant'];
  color?: TypographyProps['color'];
  sx?: TypographyProps['sx'];
}

export const AnimatedCounter = ({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  variant = 'inherit',
  color = 'inherit',
  sx,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <Typography
      component={motion.span}
      ref={ref}
      variant={variant}
      color={color}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      sx={sx}
    >
      {prefix}{count}{suffix}
    </Typography>
  );
};

export default AnimatedCounter;

