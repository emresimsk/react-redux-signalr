import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
    };
  }

  componentDidMount() {
    this.setData(1);
  }

  setData = value => {
    this.setState({
      data: value,
    });
  };

  render() {
    return <div>{this.state.data}</div>;
  }
}

const mapStateToProps = state => { };
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyComponent);
