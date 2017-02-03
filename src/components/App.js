import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import NotFound from './NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    // getinitialstate -- setting the initial state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  addFish(fish) {
    // update state
    // first, take a copy of the state
    const fishes = {...this.state.fishes};
    // add in our new fish, using a timestamp as an identifier
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes }); // ES6 syntax for fishes: fishes
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Fish Market"/>
        </div>
        <Order/>
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App;
