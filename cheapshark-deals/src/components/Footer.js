import React from 'react';
import { Typography, Container } from '@mui/material';

function Footer () {
    return (
        <footer>
            <Container>
                <Typography variant="body2" color="textSecondary" align="center">
                © 2024 CheapShark Deals
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;