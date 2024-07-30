// pages/index.js
import Head from 'next/head';
import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Pantry Management</title>
      </Head>
      <Typography variant="h2" gutterBottom>
        Pantry Management Application
      </Typography>
      <Link href="/pantry">
        <Button variant="contained" color="primary">
          Go to Pantry
        </Button>
      </Link>
    </Container>
  );
}
