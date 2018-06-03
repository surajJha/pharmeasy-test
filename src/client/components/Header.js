import React from 'react';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import actions from "../actions";
import { connect } from "react-redux";
import { getQueryParamFromSearch } from "../utils/urlHelper";

class Header extends React.Component {
  signOut = () => {
    const type = getQueryParamFromSearch('type', this.props.location.search);
    this.props.actions.signOut(this.props.history, type);
  };

  render() {
    const type = getQueryParamFromSearch('type', this.props.location.search);
    return (
      <header>
        <h1 className="uppercase">Pharmeasy Test</h1>
        {
          type !== null ? <div onClick={this.signOut} className="logout pointer">Logout</div> : null
        }
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  'actions': bindActionCreators(actions, dispatch)
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
