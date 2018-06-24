import React from 'react';
import Navigator from './navigation';
import Sentry from 'sentry-expo';
import config from './config';

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = true;
Sentry.config(config.SENTRYDSN).install();

export default class App extends React.Component {
  
  render() {
    return (
      <Navigator />
    );
  }
}