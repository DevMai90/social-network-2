import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import LandingJob from './components/layout/LandingJob';
import Routes from './components/routing/Routes';
// Redux
import Footer from './components/layout/Footer';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { loadProgressBar } from 'axios-progress-bar';

import './App.css';
import 'axios-progress-bar/dist/nprogress.css';

// Initialize axios-progress-bar
loadProgressBar({ showSpinner: false });

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // useEffect will always run unless we add [] as a second parameter. This makes it run only once.
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register/jobs" component={LandingJob} />
            <Route component={Routes} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
