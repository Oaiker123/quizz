//class components
//function Component
import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "Oai", age: 21 },
      { id: 2, name: "Hanh", age: 22 },
      { id: 3, name: "Thang", age: 29 },
    ],
  };

  handleAddNewUser = (userObj) => {
    console.log(">>> check data: ", userObj);
    // alert("click me");
    // Cach 01:
    this.setState({
      listUser: [userObj, ...this.state.listUser],
    });
  };

  handleDeleteUser = (userId) => {
    console.log("Deleting user with ID:", userId);
    let listUserClone = [...this.state.listUser];
    listUserClone = listUserClone.filter((item) => item.id !== userId);
    this.setState({
      listUser: listUserClone,
    });
  };

  //jsx
  //DRY: don't repeat yourself
  render() {
    // const MyAge = 50;
    // const myInfor = ['UserInfor', 'DisplayInfor'];
    return (
      <>
        <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
        <DisplayInfor
          listUser={this.state.listUser}
          handleDeleteUser={this.handleDeleteUser}//loi hay truyền sai
        />
      </>
    );
  }
}

export default MyComponent;
