import React from "react";
import logo from "../assets/react.svg";
import './DisplayInfor.scss';

class DisplayInfor extends React.Component {
  state = {
    showList: true,
  };

  handleShowHide = () => {
    console.log("show/hide");
    this.setState({
      showList: !this.state.showList,
    });
  };
  render() {
    //distructuring array/object

    const { listUser } = this.props;
    // console.log(listUser);

    // console.log(this.props);
    return (
      //props => viet tat tu properties
      <div className="display-infor-container">
        <img src={logo} alt="" />
        <div>
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.showList === true
              ? "hide list users:"
              : "show list users:"}
          </span>
        </div>
        {this.state.showList && (
          <div>
            {listUser.map((user) => {
              console.log(">>check: ", user);

              return (
                <div key={user.id} className={+user.age > 21 ? "green" : "red"}>
                  <div>
                    <div style={{ color: "yellow", paddingTop: "20px" }}>
                      My name is {user.name}
                    </div>
                    <div>My age is {user.age}</div>
                  </div>
                  <div>
                    <button onClick={() => this.props.handleDeleteUser(user.id)}>
                      delete
                    </button>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
