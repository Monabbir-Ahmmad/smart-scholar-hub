'use client';

import Link from 'next/link';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3} textAlign="center">
          <Typography variant="h1" fontWeight={800} color="text.primary" sx={{ fontSize: { xs: '4rem', md: '6rem' } }}>
            404
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Oops! Page not found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </Typography>
          <Box>
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Return to Home
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

