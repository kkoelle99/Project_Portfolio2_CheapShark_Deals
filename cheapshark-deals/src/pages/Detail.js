import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDealById } from '../api';
import { Container, Typography, CircularProgress, Paper } from '@mui/material';
import { styled } from '@mui/system';

const Detail = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDeal = async () => {
      try {
        const dealData = await fetchDealById(id);
        setDeal(dealData);
      } catch (error) {
        console.error('Error fetching deal:', error);
      } finally {
        setLoading(false);
      }
    };

    getDeal();
  }, [id]);
  console.log('Fetching deal with ID:', id);


  if (loading) {
    return <CircularProgress />;
  }

  if (!deal || !deal.gameInfo) {
    return <Typography variant="h6">Deal not found</Typography>;
  }

  return (
    <CustomContainer>
      <CustomPaper elevation={3}>
        <Typography variant="h4" className={customClasses.customTitle}>
          {deal.gameInfo.name}
        </Typography>
        <Typography variant="body1" className={customClasses.customPrice}>
          Price: ${deal.gameInfo.salePrice}
        </Typography>
        <Typography variant="body2" className={customClasses.customNormalPrice}>
          Normal Price: ${deal.gameInfo.retailPrice}
        </Typography>
        <Typography variant="body2" className={customClasses.customSavings}>
          Rating: {deal.gameInfo.steamRatingText} ({deal.gameInfo.steamRatingPercent}%)
        </Typography>
        <img src={deal.gameInfo.thumb} alt={deal.gameInfo.name} className={customClasses.customImage} />
      </CustomPaper>
    </CustomContainer>
  );
};

const CustomContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 64px)', 
  padding: '20px',
  marginTop: '64px', 
});

const CustomPaper = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  maxWidth: '800px',
  width: '100%',
  backgroundColor: '#1c1c1c',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
});

const customClasses = {
  customTitle: 'customTitleClassName',
  customPrice: 'customPriceClassName',
  customNormalPrice: 'customNormalPriceClassName',
  customSavings: 'customSavingsClassName',
  customImage: 'customImageClassName',
  customDescription: 'customDescriptionClassName',
};

export default Detail;
