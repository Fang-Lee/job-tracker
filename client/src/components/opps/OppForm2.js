import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import OppFormPageOne from './FormPages/OppFormPageOne';
import OppFormPageTwo from './FormPages/OppFormPageTwo';
import OppFormPageThree from './FormPages/OppFormPageThree';
import OppFormPageFour from './FormPages/OppFormPageFour';
import OppFormPageFive from './FormPages/OppFormPageFive';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class OppFormStepper extends Component {
  state = {
    finished: false,
    stepIndex: 0
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 4
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <OppFormPageOne onSubmit={this.handleNext} />;
      case 1:
        return (
          <OppFormPageTwo
            onSubmit={this.handleNext}
            handlePrev={this.handlePrev}
          />
        );
      case 2:
        return (
          <OppFormPageThree
            onSubmit={this.handleNext}
            handlePrev={this.handlePrev}
          />
        );
      case 3:
        return (
          <OppFormPageFour
            onSubmit={this.handleNext}
            handlePrev={this.handlePrev}
          />
        );
      case 4:
        return <OppFormPageFive handlePrev={this.handlePrev} />;
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };

    return (
      <div style={{ width: '100%', maxWidth: 960, margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>General Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Company/Job Descriptions</StepLabel>
          </Step>
          <Step>
            <StepLabel>Recruiter Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Documents</StepLabel>
          </Step>
          <Step>
            <StepLabel>Miscellaneous</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          <div>{this.getStepContent(stepIndex)}</div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'oppForm'
})(OppFormStepper);
