import React, { useState } from "react";
import "./styles/App.css";
import Header from "./Header.jsx";
import LoginView from "./LoginView/LoginView.jsx";
import CourseView from "./CourseView/CourseView.jsx";
import DashboardView from "./DashboardView/DashboardView.jsx";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState();
  return (
    <Router>
      <div className="parent-container">
        {user && <Header setUser={setUser} />}
        <Route
          path="/"
          component={() => <LoginView setUser={setUser} user={user} />}
        />

        {/* PRIVATE ROUTES AREA ACCESSABLE ONLY IF WE HAVE USER  */}
        {user && <Route path="/course" component={() => <CourseView />} />}
        {user && (
          <Route path="/dashboard" component={() => <DashboardView />} />
        )}
      </div>
    </Router>
  );
};

export default App;
