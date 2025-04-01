//class components
//function Component
import React from "react";

class MyComponent extends React.Component {
  //jsx
  render() {
    return (
        <div>
            my first components

            {
                Math.random()
            }
        </div>
    )
  }
}

export default MyComponent;