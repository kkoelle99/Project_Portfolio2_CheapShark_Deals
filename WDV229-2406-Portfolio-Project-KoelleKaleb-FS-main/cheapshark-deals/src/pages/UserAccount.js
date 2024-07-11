import React from 'react';
import { Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const UserAccountContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  marginTop: theme.spacing(8), // Add marginTop to push it below the header
}));

const UserAccount = ({ username }) => {
  const user = {
    username: username,
  };

  return (
    <UserAccountContainer>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', width: '100%' }}>
        <Typography variant="h4">User Account</Typography>
        <Typography variant="subtitle1">Username: {user.username}</Typography>
      </Paper>
    </UserAccountContainer>
  );
};

export default UserAccount;
