import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  FaChartBar,
  FaCalendarAlt,
  FaCopy,
  FaUser,
  FaCogs,
} from "react-icons/fa";
import sidebarBg from "/y2.jpg";
import { Link } from "react-router-dom";

const SideBar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              alt="Genm Corp."
              src="/quizz_logo.png"
              width="80px"
              style={{ flexShrink: 0, marginRight: "10px" }}
            />
            <span
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "#FCB902",
              }}
            >
              Quiz!
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={
                <FaChartBar style={{ color: "#FCB902", fontSize: "20px" }} />
              }
              suffix={<span className="badge bg-danger ms-2">New</span>}
            >
              dashboard
              <Link to="/admin" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              title="Management"
              icon={<FaCopy style={{ color: "#FCB902", fontSize: "20px" }} />}
              suffix={
                <span className="badge bg-warning text-dark ms-2">3</span>
              }
            >
              <MenuItem icon={<FaUser />}>
                <Link to="/admin/manage-user" />
                User Management
              </MenuItem>
              <MenuItem icon={<FaCogs />}>
                <Link to="/admin/manage-quizzes" />
                Quiz Management
              </MenuItem>
              <MenuItem icon={<FaChartBar />}>
                <Link to="/admin/reports" />
                Question Management
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              paddingTop: "15px",
            }}
          >
            <p
              style={{
                color: "#FCB902",
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              Presented by Quiz! &copy; {new Date().getFullYear()}
            </p>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
