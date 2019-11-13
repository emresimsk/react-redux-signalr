import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class TopNavigationComp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lang } = this.props;
    return (
      <></>
    );
  }
}

TopNavigationComp.propTypes = {
};

const mapStateToProps = state => ({
});
const mapDispatchToProps = {
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNavigationComp);
