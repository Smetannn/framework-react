import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import Esse from './components/Esse/Esse';
import Calc from './components/Calc/Calc';
import RPG from './components/RPG/RPG';


class App extends Component {

  state = {
    activeComponent: null
  };

  
  showComponent = (componentName) => {
    this.setState({ activeComponent: componentName });

  }

  render() {
    return (
      <div className="app-container">
  
      <div className="menu-container">
        <Menu onSelect={this.showComponent} />
      </div>

      

      <div className="main-content">
        
        {this.state.activeComponent === 'esse' && <Esse />}
        {this.state.activeComponent === 'calc' && <Calc />}   
        {this.state.activeComponent === 'rpg' && <RPG />}   
        {!this.state.activeComponent} 
      </div>
    </div>
    );
  }
}

export default App;