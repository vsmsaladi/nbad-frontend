import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from '@mui/material/Collapse';
import FormControlLabel from "@mui/material/FormControlLabel";
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";


const ProfileComponent = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({});

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://52.91.73.7:3001/app/userProfile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUserData(response.data.userProfile);
            setEditedUserData(response.data.userProfile); // Set initial data for editing
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Reset edited data to the original user data
        setEditedUserData(userData);
    };

    const handleUpdateClick = async () => {
        if(editedUserData.firstName.length==0 || editedUserData.lastName.length==0 || editedUserData.username.length==0 || editedUserData.email.length==0 || editedUserData.mobile==null || editedUserData.gender.length==0){
            // console.log(editedUserData);
            alert("error");
        }
        else{
        try {
            // console.log(editedUserData);
            const response = await axios.put('http://52.91.73.7:3001/app/userDetails', editedUserData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // console.log("update: ", response.data)
            localStorage.setItem("token", response.data.token);
            setUserData(response.data.userProfile);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user profile:', error.message);
        }
    }
    };

    const handleInputChange = (e) => {
        // Update the edited user data when input fields change
        setEditedUserData({
            ...editedUserData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []); // Fetch user data when the component mounts

    var gender = editedUserData.gender;
    const handleRadioChange = (event) => {
        gender = event.target.value;
        editedUserData.gender = gender;
    };

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <AppBarComponent />
            <Container component="main" maxWidth="100%">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div>
                        {userData ? (
                            <div>
                                {isEditing ? (
                                    <div>
                                        <Typography variant="h4" align='center' gutterBottom>
                                            User Profile
                                        </Typography>
                                        <Box component="form" sx={{ mt: 3 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        name="firstName"
                                                        label="First Name"
                                                        value={editedUserData.firstName}
                                                        onChange={handleInputChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        name="lastName"
                                                        label="Last Name"
                                                        value={editedUserData.lastName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        name="userName"
                                                        label="User Name"
                                                        value={editedUserData.username}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        name="email"
                                                        label="email"
                                                        value={editedUserData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        name="mobile"
                                                        label="Mobile"
                                                        value={editedUserData.mobile}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    <FormControl id="gender">
                                                        <FormLabel id="demo-row-radio-buttons-group-label">
                                                            Gender
                                                        </FormLabel>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="row-radio-buttons-group"
                                                            onChange={handleRadioChange}
                                                        >
                                                            <FormControlLabel
                                                                value="female"
                                                                control={<Radio />}
                                                                label="Female"
                                                            />
                                                            <FormControlLabel
                                                                value="male"
                                                                control={<Radio />}
                                                                label="Male"
                                                            />
                                                            <FormControlLabel
                                                                value="other"
                                                                control={<Radio />}
                                                                label="Other"
                                                            />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            {/* Add other fields for editing */}
                                        </Box>
                                    </div>
                                ) : (
                                    <div>
                                        <Box
                                            component="form"
                                            sx={{
                                                mt: 3,
                                                p: 3,
                                                boxShadow: 3, // Adjust the shadow intensity as needed
                                                borderRadius: 2,
                                                backgroundColor: 'white',
                                                margin: 'auto',
                                                width: '50%', // Adjust the width as needed
                                            }}
                                        >
                                            <Typography variant="h4" align='center' gutterBottom>
                                                User Profile
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="subtitle1" paragraph>
                                                        <strong>First Name:</strong> {userData.firstName}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="subtitle1" paragraph>
                                                        <strong>Last Name:</strong> {userData.lastName}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1" paragraph>
                                                        <strong>User Name:</strong> {userData.username}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1" paragraph>
                                                        <strong>Email:</strong> {userData.email}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1" paragraph>
                                                        <strong>Mobile:</strong> {userData.mobile}
                                                    </Typography>
                                                    <Typography variant="subtitle1" paragraph>
                                                        <strong>Gender:</strong> {userData.gender}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </div>
                                )}

                                {isEditing ? (
                                    <div>
                                        <Button variant="contained" onClick={handleUpdateClick} sx={{ marginRight: 2 }}>
                                            Update Profile
                                        </Button>
                                        <Button variant="outlined" onClick={handleCancelClick}>
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <div style={{display: 'flex', alignItems:'center', justifyContent:'center', alignContent:'center',margin:'20px 0'}}>
                                    <Button variant="contained" onClick={handleEditClick}>
                                        Edit Profile
                                    </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Typography variant="body1">Loading user details...</Typography>
                        )}
                    </div>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ProfileComponent;

