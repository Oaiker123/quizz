//class components
//function Component
import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Oai",
    address: "Ha Noi",
    phone: "0123456789",
    age: 21,
  };

  handleClick(event) {
    console.log("My name is", this.state.name);
    console.log("My age is", Math.floor(Math.random() * 100) + 1); //random age
    this.setState({
      name: "Oai Tran",
      address: "Ha Noi",
      phone: "0123456789",
      age: 21,
    }); //cap nhat gia tri
    console.log(event.target);
  }

  handleOnMoverOver(event) {
    console.log(event.target);
    this.setState({
      name: "Oai Tran",
      address: "Ha Noi",
      phone: "0123456789",
      age: Math.floor(Math.random() * 100 + 1), //random age
    });
  }

  handleOnChangeInput = (event) => {
    console.log(event.target.value);
    this.setState({
      name: event.target.value,
    });
  };

  handleOnSubnmit = (event) => {
    event.preventDefault(); //ngan chan reload trang
    console.log("submit form");
    console.log(this.state)
  }
  //jsx
  render() {
    return (
      <div>
        My name is {this.state.name} <br />
        My address is {this.state.address} <br />
        My phone is {this.state.phone} <br />
        My age is {this.state.age} <br />
        {/* <button onClick={(event) => {this.handleOnMoverOver(event)}}>Click Me</button>
        <button onClick={(event) => {this.handleClick(event)}}>Click Me</button> */}
        <form action="" onSubmit={(event) => this.handleOnSubnmit(event)}>
          <input
            type="text"
            name=""
            id=""
            onChange={(event) => this.handleOnChangeInput(event)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
