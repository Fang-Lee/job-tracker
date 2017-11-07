import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { grey700, grey800 } from "material-ui/styles/colors";

import Header from "./Header/Header";
import Landing from "./Landing/Landing";
import Dashboard from "./Dashboard/Dashboard";
import OppPage from "./opps/OppPage";
import OppForm2 from './opps/OppForm2';
import EditOppPage from './opps/EditOppPage';

import "./App.css";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<BrowserRouter>
					<div>
						<Header />
						<div className="container">
							<div className="inner-container" style={{ padding: "0 15px" }}>
								<Route exact path="/" component={Landing} />
								<Route exact path="/dashboard" component={Dashboard} />
								<Route path="/new" component={OppForm2} />
								<Route path="/opp/:id" component={OppPage} />
								<Route path="/edit/opp/:id" component={EditOppPage} />
							</div>
						</div>
					</div>
				</BrowserRouter>
			</MuiThemeProvider>
		);
	}
}

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: grey800,
		primary2Color: grey700
	}
});

export default connect(null, actions)(App);
