'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Grid2 as Grid,
  Typography,
  Stack,
  IconButton,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'API'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'Help Center', 'Community', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

const socialIcons = [
  { Icon: TwitterIcon, label: 'Twitter' },
  { Icon: LinkedInIcon, label: 'LinkedIn' },
  { Icon: GitHubIcon, label: 'GitHub' },
  { Icon: EmailIcon, label: 'Email' },
];

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: alpha(theme.palette.grey[100], 0.3),
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Brand */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SchoolIcon sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  EduLearn
                </Typography>
              </Stack>
            </Link>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 280 }}
            >
              A complete digital learning ecosystem for tutoring, standardized test prep,
              and academic assessments.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialIcons.map(({ Icon, label }) => (
                <IconButton
                  key={label}
                  size="small"
                  sx={{
                    bgcolor: 'grey.100',
                    color: 'text.secondary',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid key={title} size={{ xs: 6, sm: 3, lg: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={2}>
                {title}
              </Typography>
              <Stack spacing={1}>
                {links.map((link) => (
                  <Typography
                    key={link}
                    component="a"
                    href="#"
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      '&:hover': { color: 'text.primary' },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        {/* Bottom */}
        <Divider sx={{ my: 4 }} />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} EduLearn. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography
              component="a"
              href="#"
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'text.primary' },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              component="a"
              href="#"
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'text.primary' },
              }}
            >
              Terms of Service
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
