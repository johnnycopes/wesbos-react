import React from 'react';

/*
when a component doesn't have any functionality apart from rendering some HTML, it makes more sense
to use what's called a 'stateless functional component'
*/

const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      { /* notice the lack of 'this' before props */ }
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
};


export default Header;
