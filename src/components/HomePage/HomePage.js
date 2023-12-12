import * as React from "react";
import './HomePage.css'
import AppBarComponent from "../AppBarComponent/AppBarComponent";
import Hero from "../Hero/Hero";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";




export default function HomePage() {


  const redirectToLink = (value) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to a link for authenticated users
      window.location.href = value.link.authenticated;
    } else {
      // Redirect to a link for unauthenticated users
      window.location.href = value.link.unauthenticated;
    }
  };

  const sections = [
    {
      title: 'Functionality 1',
      description: 'Users can add, edit, and delete the budgets.',
      function: 'View Budgets',
      link: {
        authenticated: '/mybudgets',
        unauthenticated: '/signup',
      },
    },
    {
      title: 'Functionality 2',
      description: 'Users can add, edit, delete the budgets with respective to the month.',
      function: 'Monthly Budgets',
      link: {
        authenticated: '/monthlybudgets',
        unauthenticated: '/login',
      },
    },
    {
      title: 'Functionality 3',
      description: 'Users can see 3 visualizations designed using their budgets data.',
      function: 'Show Visualizations',
      link: {
        authenticated: '/dashboard',
        unauthenticated: '/signup',
      },
    },
  ];

  return (
    <div>
      <AppBarComponent />
      <Hero />

      <Box
      sx={{
        component:"form",
        width: '50%',
        margin: 'auto',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: 3,
        backgroundColor: 'white',
        textAlign: 'center',
        mt: 3,
        p: 3,
      }}
    >
      <h2>
        This Personal Budget application is useful to plan their budgets. Using this application, the user can set budgets for items with respect to a particular month. Users can also visualize their budgets.
      </h2>
      <Typography variant="h5" align='center' gutterBottom>
          Functionalities
        </Typography>
        <hr></hr>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {sections.map((value) => (
            <ListItem
              key={value.description}
              disableGutters
              secondaryAction={
                <Button onClick={() => redirectToLink(value)}
                width = '20%'
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                  {value.function}
                </Button>
              }
            >
              <ListItemText primary={value.description} />
            </ListItem>
          ))}
        </List>
    </Box>
    </div>
  );
}