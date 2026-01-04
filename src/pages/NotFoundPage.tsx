import { Link } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
      }}
    >
      <Stack spacing={3} textAlign="center" maxWidth={400}>
        <Typography variant="h1" fontWeight={800} color="primary.main">
          404
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          sx={{ alignSelf: 'center' }}
        >
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
}
