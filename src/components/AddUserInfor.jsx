import React from "react";

class AddUserInfor extends React.Component {
  state = {
    name: "Oai",
    address: "Ha Noi",
    phone: "0123456789",
    age: 21,
  };

  handleOnChangeInput = (event) => {
    // bad code
    console.log(event.target.value);
    this.setState({
      name: event.target.value,
    });
  };

  handleOnChangeAge = (event) => {
    this.setState({
      age: event.target.value,
    });
  };

  handleOnSubnmit = (event) => {
    event.preventDefault(); //ngan chan reload trang
    // console.log("submit form");
    // console.log(this.state);
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 1000),
      name: this.state.name,
      age: this.state.age,
    });
    // alert("click me");
  };
  render() {
    return (
      <div>
        My name is {this.state.name} <br />
        My address is {this.state.address} <br />
        My phone is {this.state.phone} <br />
        My age is {this.state.age} <br />
        <form onSubmit={(event) => this.handleOnSubnmit(event)}>
          {/* <label htmlFor="name">Name</label> */}
          <input
            type="text"
            value={this.state.name}
            onChange={(event) => this.handleOnChangeInput(event)}
          />
          <br />
          {/* <label htmlFor="age">Age</label> */}
          <input
            type="number"
            value={this.state.age}
            onChange={(event) => this.handleOnChangeAge(event)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserInfor;
