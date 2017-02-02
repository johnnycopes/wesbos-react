import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // normal JS comments work fine outside of the HTML
  render() {
    return (
      <form className="store-selector">
        { /* This is a comment in JSX -- do NOT put it at the top level or it'll throw an error */ }
        <h2>Please enter a store</h2>
        <input type="text" placeholder="Store Name" defaultValue={getFunName()} required/>
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker;
