import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addFish = this.addFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // initial state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount() {
    // this runs right before the app is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
      , {
      context: this,
      state: 'fishes'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      // update our app component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    // this runs anytime anything changes
    // console.log('Something changed');
    // console.log({nextProps, nextState});

    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  // the hook shouldComponentUpdate allows more precise control over when a component rerenders



  addFish(fish) {
    // update state
    // first, make a copy of the state
    const fishes = {...this.state.fishes};
    // add in our new fish, using a timestamp as an identifier
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes }); // ES6 syntax for fishes: fishes
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    // the keyword delete apparently doesn't work with Firebase
    fishes[key] = null;
    this.setState({ fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes })
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // make a copy of state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state (order: order)
    this.setState({ order });
  }

  removeFromOrder(key) {
    // make a copy of state
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Fish Market" />
          <ul className="list-of-fishes">
            {Object
              .keys(this.state.fishes)
              // the prop key can't be passed down, so we make one called index to be used in the 'add to order' callback function
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          addFish={this.addFish}
          removeFish={this.removeFish}
          updateFish={this.updateFish}
        />
      </div>
    )
  }
}

export default App;
