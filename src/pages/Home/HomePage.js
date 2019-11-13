import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import swal from 'sweetalert2';
// import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { signalRun } from '../../redux/modules/signalr';
import { sendMesage } from '../../redux/modules/sendMessage';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount(){
    this.props.signalRun();
  }

  static getDerivedStateFromProps(nextProps) {
    const result = {};
    if (nextProps.signalR.isLoaded) {
      result.data = nextProps.signalR.data;
    }

    return { ...result };
  }


  handleSendMessage = () => {
    this.props.sendMesage("emresimsk")
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.handleSendMessage} className="btn">Send Message</button>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  signalRun: PropTypes.func.isRequired,
  sendMesage: PropTypes.func.isRequired,
};
HomePage.defaultProps = {};

const mapStateToProps = state => ({
  signalR: state.signalR,
  message: state.message,
});
const mapDispatchToProps = {
  signalRun,
  sendMesage,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
