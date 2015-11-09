import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Header from './Header';

if (process.env.BROWSER) {
  require('../styles/App.scss');
}

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
        <div id="body" className='mainContainer'>
          <Header />
          {this.props.children}
        </div>
    );
  }
}

export default App;
