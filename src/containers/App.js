import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainLayout from './Layouts/MainLayout';


const App = ({ lang }) => (
  <div data-test="appComponent" className="appComponent">
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
        <Route path="/" component={MainLayout} />
      </Switch>
    </div>
  </div>
);

App.propTypes = {
};

const mapStateToProps = state => ({
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
