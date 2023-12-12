import React from "react";
import { Link } from "react-router-dom";
import AppBarComponent from "../AppBarComponent/AppBarComponent";
import { Button } from "@mui/material";
function UnauthorizedComponent() {
    return (
        <div>
            <AppBarComponent />
            <header className="hero">
                <h1>UnAuthorized</h1>
                <h2>Please login/signup to access the application</h2>
            </header>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    <Link to={"/"} >Go to Home</Link>
                </Button>
            </div>
        </div>
    );
}

export default UnauthorizedComponent;
