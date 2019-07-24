import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import EditExperience from '../profile-forms/EditExperience';
import EditEducation from '../profile-forms/EditEducation';
import AddEducation from '../profile-forms/AddEducation';
import EditResume from '../resume/EditResume';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import EditPost from '../posts/EditPost';
import Jobs from '../jobs/Jobs';
import AddJob from '../jobs/AddJob';
import PrivateRoute from './PrivateRoute';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/experience/:id" component={EditExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/education/:id" component={EditEducation} />
        <PrivateRoute exact path="/edit-resume" component={EditResume} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/posts/edit/:id" component={EditPost} />
        <PrivateRoute exact path="/jobs" component={Jobs} />
        <PrivateRoute exact path="/jobs/add-job" component={AddJob} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
