import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey800 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Header extends Component {
	handleTitleClick = () => {
		if (this.props.auth) {
			this.props.history.push('/dashboard');
		} else {
			this.props.history.push('/');
		}
	};
	renderContent() {
		if (this.props.auth === null) {
			return;
		}
		if (this.props.auth) {
			return <FlatButton href="/api/logout" label="Logout" />;
		}
		return <a className="google-btn" href="/auth/google"><img src={require('../../images/google-signin.png')} alt="google sign in"/></a>;
	}
	render() {
		return (
			<MuiThemeProvider muiTheme={appBarMuiTheme}>
				<AppBar
					title={<span style={styles.title}>JobHub</span>}
					onTitleTouchTap={this.handleTitleClick}
					showMenuIconButton={false}
					iconElementRight={this.renderContent()}
					className="appBar"
				/>
			</MuiThemeProvider>
		);
	}
}

/** STYLING **/
const appBarMuiTheme = getMuiTheme({
	appBar: {
		color: grey800,
		height: 80
	}
});

const styles = {
	title: {
		fontSize: '1.5em',
		cursor: 'pointer',
		margin: '0 auto'
	}
};
/************/

// pulls store state to props and only takes auth from combineReducers
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(withRouter(Header));
