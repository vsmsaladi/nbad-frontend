import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './components/LoginComponent/LoginComponent';
import SignUp from './components/SignupComponent/SignupComponent';
import HomePage from './components/HomePage/HomePage';
import LoggedOutComponent from './components/LoggedOutComponent/LoggedOutComponent';
import ProfileComponent from './components/ProfileComponent/ProfileComponent';
import MyBudgetsComponent from './components/MyBudgetsComponent/MyBudgetsComponent';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import MonthlyBudgetsComponent from './components/MonthlyBudgetsComponent/MonthlyBudgetsComponent';
import MonthlyBudgets from './components/MonthlyBudgets/MonthlyBudgets';
import UnauthorizedComponent from './components/UnauthorizedComponent/UnauthorizedComponent';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MyConfigureBudgetsComponent from './components/ConfigureBudgets/ConfigureBudgets';
import ExpensesComponent from './components/ExpensesComponent/ExpensesComponent';

function App() {
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  let timer;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      timer = setInterval(() => {
        const now = new Date().getTime();
        const remaining = tokenExpiration - now;
        setRemainingTime(remaining);

        if (remaining < 20000 && remaining > 0) {
          setShowDialog(true);
        }

        // Clear interval when token expires
        if (remaining <= 0) {
          clearInterval(timer);
          localStorage.removeItem("token");
          window.location = "/";
          // Perform logout or token refresh here
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [tokenExpiration]);

  useEffect(() => {
    if (token) {
      const expirationTime = new Date().getTime() + 60000; // 1 minute
      setTokenExpiration(expirationTime);

      // Clean up timer when component unmounts
      return () => clearInterval(timer);
    }
  }, []);

  const handleStayLoggedIn = async () => {
    // Handle user choosing to stay logged in

    // Implement any necessary actions to refresh the token or extend the session
    try {
      const response = await axios.post(
        "http://52.91.73.7:3001/app/refreshToken",
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      setShowDialog(false);
      const expirationTime = new Date().getTime() + 60000; // 1 minute
      setTokenExpiration(expirationTime);
    } catch (err) {
      alert("Error refreshing token:", err);
    }
  };

  const handleLogout = () => {
    // Handle user choosing to logout
    setShowDialog(false);
    // Implement logout logic
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
    <div>
        {showDialog && token && (
          <React.Fragment>
            <Dialog
              open={showDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Want to Stay Logged in?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Your session will expire in {Math.floor(remainingTime / 1000)}{" "}
                  seconds. Click Stay Logged in or Refresh the screen to stay
                  here.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleStayLoggedIn}>Stay Logged in</Button>
                <Button onClick={handleLogout}>Logout</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        )}
      </div>
    <Router>
      {/* <div className="App">
        <LoginComponent />
      </div> */}
      {
        token ?
        (<Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/logout' element={<LoggedOutComponent />} />
          <Route path='/mybudgets' element={<MyBudgetsComponent />} />
          <Route path='/profile' element={<ProfileComponent />} />
          <Route path='/dashboard' element={<DashboardComponent />} />
          <Route path='/monthlybudgets' element={<MonthlyBudgets />} />
          <Route path='/configure' element={<MyConfigureBudgetsComponent />} />
          <Route path='/expenses' element={<ExpensesComponent />} />

      </Routes>)
        :
        (
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path='*' element={<UnauthorizedComponent />} />
      </Routes>
        )
      }
      
    </Router>
    </div>
  );
}

export default App;
