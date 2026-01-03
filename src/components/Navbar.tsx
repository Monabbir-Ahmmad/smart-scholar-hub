'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Container,
  Stack,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navLinks = [
  { label: 'Features', href: '#personalized-learning' },
  { label: 'Exams', href: '#exam-prep' },
  { label: 'Live Classes', href: '#live-classes' },
  { label: 'Tutors', href: '#verified-tutors' },
  { label: 'Pricing', href: '#benefits' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <AppBar
      component={motion.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      position="fixed"
      sx={{
        bgcolor: alpha(theme.palette.background.default, 0.8),
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1, lg: 1.5 } }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
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
                <SchoolIcon sx={{ color: 'primary.contrastText', fontSize: 24 }} />
              </Box>
              <Typography variant="h6" fontWeight={700} color="text.primary">
                EduLearn
              </Typography>
            </Stack>
          </Link>

          {/* Desktop Nav */}
          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: 'none', lg: 'flex' } }}
          >
            {navLinks.map((link) => (
              <Typography
                key={link.label}
                component="a"
                href={link.href}
                variant="body2"
                fontWeight={500}
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>

          {/* CTAs */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: 'none', lg: 'flex' } }}
          >
            <Button
              component={Link}
              href="/sign-in"
              variant="text"
              color="inherit"
              size="small"
              sx={{ color: 'text.primary' }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              href="/sign-up"
              variant="contained"
              size="small"
            >
              Get Started
            </Button>
          </Stack>

          {/* Mobile menu button */}
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              display: { lg: 'none' },
              bgcolor: 'grey.100',
              '&:hover': { bgcolor: 'grey.200' },
            }}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          display: { lg: 'none' },
          '& .MuiDrawer-paper': {
            top: 64,
            pt: 2,
            pb: 3,
          },
        }}
      >
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component="a"
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={1.5} px={2}>
          <Button
            component={Link}
            href="/sign-in"
            variant="outlined"
            fullWidth
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Button>
          <Button
            component={Link}
            href="/sign-up"
            variant="contained"
            fullWidth
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Button>
        </Stack>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
