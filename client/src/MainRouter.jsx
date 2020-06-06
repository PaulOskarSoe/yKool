import React, { useContext, useEffect } from "react";
import { UserContext } from "./store/UserContextProvider";
import Header from "./Header.jsx";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { checkIfAuthenticated } from "./services/userServices";

import LoginView from "./LoginView/LoginView.jsx";
import CourseView from "./CourseView/CourseView.jsx";
import DashboardView from "./DashboardView/DashboardView.jsx";

const MainRouter = () => {
  const { user, setUser } = useContext(UserContext);

  // check if user is authenticated
  // if is then update user object in context API
  useEffect(() => {
    const checkForAuth = async () => {
      const authenticatedUser = await checkIfAuthenticated();
      authenticatedUser && setUser(authenticatedUser);
    };
    checkForAuth();
  }, []);

  return (
    <Router>
      <div className="parent-container">
        {user && <Header></Header>}
        <Route path="/" component={() => <LoginView />} />

        {/* PRIVATE ROUTES AREA ACCESSABLE ONLY IF WE HAVE USER  */}
        {user && <Route path="/course" component={() => <CourseView />} />}
        {user && (
          <Route path="/dashboard" component={() => <DashboardView />} />
        )}
      </div>
    </Router>
  );
};

export default MainRouter;
