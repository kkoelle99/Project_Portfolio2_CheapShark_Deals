import React from 'react';
import { AppBar, Toolbar, Typography, Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
    backgroundColor: '#333', 
    top: 0,
});

const StyledToolbar = styled(Toolbar)({
    paddingTop: '8px', 
    paddingBottom: '8px', 
});

const StyledButton = styled(Button)({
    color: '#fff', 
    '&:hover': {
        backgroundColor: '#555', 
        boxShadow: 'none', 
    },
});

function Header({ isLoggedIn, onLogout }) {
    return (
        <StyledAppBar position="fixed">
            <StyledToolbar>
                <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}>
                    GameDealFinder
                </Typography>
                <StyledButton component={Link} to="/" color="inherit">Home</StyledButton>
                <StyledButton component={Link} to="/search" color="inherit">Search</StyledButton>
                {isLoggedIn ? (
                    <>
                        <StyledButton component={Link} to="/user" color="inherit">My Account</StyledButton>
                        <StyledButton onClick={onLogout} color="inherit">Logout</StyledButton>
                    </>
                ) : (
                    <>
                        <StyledButton component={Link} to="/login" color="inherit">Login</StyledButton>
                        <StyledButton component={Link} to="/register" color="inherit">Register</StyledButton>
                    </>
                )}
            </StyledToolbar>
        </StyledAppBar>
    );
}

export default Header;
