import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Layout from "./Layout";
import Alert from './components/layout/Alert'
import PrivateRoute from './components/routing/PrivateRoute'
import { LOGOUT } from './actions/types';

import { Provider } from 'react-redux'
import store from "./store"
import { loadUser } from './actions/auth';
import setAuthToken from "./utils/setAuthToken"

function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.mernToken) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.mernToken);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.mernToken) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path="create-profile"
              element={<PrivateRoute component={ProfileForm} />}
            />
            <Route
              path="edit-profile"
              element={<PrivateRoute component={ProfileForm} />}
            />
            <Route
              path="add-experience"
              element={<PrivateRoute component={AddExperience} />}
            />
            <Route
              path="add-education"
              element={<PrivateRoute component={AddEducation} />}
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
