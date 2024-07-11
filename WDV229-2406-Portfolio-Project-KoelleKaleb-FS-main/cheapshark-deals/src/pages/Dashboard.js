import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDeals } from '../api';
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  CardContent,
  CardMedia,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';

const Dashboard = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDeals = async () => {
      try {
        const dealsData = await fetchDeals();
        setDeals(dealsData);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setError('Failed to fetch deals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getDeals();
  }, []);

  if (loading) {
    return (
      <CustomContainer>
        <Typography variant="h4">Dashboard</Typography>
        <CircularProgress />
      </CustomContainer>
    );
  }

  if (error) {
    return (
      <CustomContainer>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </CustomContainer>
    );
  }

  return (
    <CustomContainer>
      <Typography variant="h4">Dashboard</Typography>
      <Grid container spacing={3}>
        {deals.map((deal) => (
          <Grid item key={deal.dealID} xs={12} sm={6} md={4}>
            <CustomPaper elevation={3}>
              <CustomCardMedia
                component="img"
                alt={deal.title}
                image={deal.thumb}
              />
              <CustomCardContent>
                <Typography variant="h6" gutterBottom>
                  {deal.title}
                </Typography>
                <Typography variant="body2">Price: ${deal.salePrice}</Typography>
                <CustomButton
                  component={Link}
                  to={`/detail/${deal.dealID}`}
                  variant="contained"
                >
                  View Details
                </CustomButton>
              </CustomCardContent>
            </CustomPaper>
          </Grid>
        ))}
      </Grid>
    </CustomContainer>
  );
}

const CustomContainer = styled(Container)({
  background: '#1c1c1c', 
  color: '#fff', 
  paddingTop: '72px', 
  paddingBottom: '20px', 
  paddingLeft: '20px',
  paddingRight: '20px',
  minHeight: 'calc(100vh - 72px)', 
  width: '100%',
});

const CustomPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
  },
});

const CustomCardMedia = styled(CardMedia)({
  height: 180,
  objectFit: 'cover',
  borderRadius: '4px 4px 0 0',
});

const CustomCardContent = styled(CardContent)({
  flexGrow: 1,
  backgroundColor: '#212121', 
  color: '#fff',
  padding: '16px',
});

const CustomButton = styled(Button)({
  marginTop: '16px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#388E3C',
  },
});

export default Dashboard;
