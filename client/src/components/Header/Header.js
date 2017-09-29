import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
		return (
			<FlatButton
				href={this.props.auth ? '/api/logout' : '/auth/google'}
				label={this.props.auth ? 'Logout' : 'Login'}
			/>
		);
	}
	render() {
		return (
			<MuiThemeProvider muiTheme={appBarMuiTheme}>
				<AppBar
					title={<span style={styles.title}>Job Tracker</span>}
					onTitleTouchTap={this.handleTitleClick}
					showMenuIconButton={false}
					iconElementRight={this.renderContent()}
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
		cursor: 'pointer'
	}
};
/************/

// pulls store state to props and only takes auth from combineReducers
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(withRouter(Header));
