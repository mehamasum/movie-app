import React, {useState} from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
    return (
        <Router>
            <AuthProvider>
                <PrivateRoute exact path="/" component={Home} />
                <Route
                    exact
                    path="/login/"
                    component={Login}
                />
            </AuthProvider>
        </Router>
    );
}

export default App;
