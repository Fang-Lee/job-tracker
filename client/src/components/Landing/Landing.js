import React, { Component } from 'react';
import './Landing.css';

class Landing extends Component {
	render() {
		return (
			<div className="landing-wrapper">
				<div className="">
					<div className="landing-hero">
						<div className="hero-text">
							<h1>Restructure Your Job Hunt.</h1>
							<p>
								Consolidate your information and streamline your application
								process.
							</p>
						</div>
						<div className="hero-image">
							<img
								src={require('../../images/jobhub-dashboard.png')}
								alt="JobHub Dashboard"
							/>
						</div>
					</div>
				</div>
				<div className="landing-about">
					<h1>Centralize Your Search</h1>
					<p>
						Keep all of your applications in one place. Simple to navigate, easy
						to organize.
					</p>
					<div className="landing-features-about">
						<div className="feature">
							<div className="feature-image">
								<img src={require('../../images/glasses.png')} alt="Glasses" />
							</div>
							<div className="feature-text">
								<h4>At A Glance</h4>
								<p>
									Sort and search through your opportunities all in one place.
								</p>
							</div>
						</div>
						<div className="feature">
							<div className="feature-image">
								<img src={require('../../images/box.png')} alt="Glasses" />
							</div>
							<div className="feature-text">
								<h4>Upload Your Documents</h4>
								<p>
									Upload a resume and cover letter unique to each application.
								</p>
							</div>
						</div>
						<div className="feature">
							<div className="feature-image">
								<img src={require('../../images/stairs.png')} alt="Glasses" />
							</div>
							<div className="feature-text">
								<h4>Track Your Progress</h4>
								<p>
									Keep organized through every step of your process through
									summary tags and notes.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
