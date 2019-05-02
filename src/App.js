import React from 'react';
import Homepage from './pages/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Homepage} />
            </div>
        </Router>
    );
}

export default App;
