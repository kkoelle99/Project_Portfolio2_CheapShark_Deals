import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { searchDeals } from '../api';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const SearchContainer = styled('div')(({ theme }) => ({
  padding: '20px',
  marginTop: theme.spacing(8), // Add marginTop to push it below the header
}));

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const deals = await searchDeals(query);
        setResults(deals);
    };

    return (
        <SearchContainer>
            <Typography variant="h4">Search</Typography>
            <TextField
                label="Search Deals"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button onClick={handleSearch} variant="contained" color="primary">
                Search
            </Button>
            <Grid container spacing={3} style={{ marginTop: 16 }}>
                {results.map(deal => (
                    <Grid item key={deal.dealID} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={deal.title}
                                height="140"
                                image={deal.thumb}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {deal.title}
                                </Typography>
                                <Typography color="textSecondary">
                                    ${deal.salePrice}
                                </Typography>
                                <Button component={Link} to={`/detail/${deal.dealID}`} variant="outlined" color="primary">
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </SearchContainer>
    );
}

export default Search;
