import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // user-created methods don't bind 'this' to the React component, so you have to do it yourself. there are a couple of ways to do so:

  // // 1) use the constructor of a component to add additional stuff during creation of the component
  // constructor() {
  //   super();
  //   // bind the value of 'this' in the function to refer to the component
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore(event) {
    event.preventDefault();
    // first, grab the text from the box -- we can do this now that we've bound the goToStore method to the component
    const storeId = this.storeInput.value;
    // second, we're going to transition from / to /store/:id
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  // normal JS comments work fine outside of the HTML
  render() {
    return (
      // 2) same idea, but bind 'this' on the fly
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        { /* This is a comment in JSX -- do NOT put it at the top level or it'll throw an error */ }
        <h2>Please enter a store</h2>
        <input type="text" placeholder="Store Name" defaultValue={getFunName()} required ref={(input) => {this.storeInput = input} }/>
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

// this tells React that StorePicker expects something called a router
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
