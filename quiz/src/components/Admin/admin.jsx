import SideBar from "./SideBar";
// import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, Input } from "@heroui/react";
import Language from "../Header/language";


export const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};


const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập delay khi tải trang (có thể thay bằng API logic thật)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden h-screen">
      <div className="">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="w-full">
        <div className="admin-toggle flex justify-between items-center px-4 border h-16 relative">
          <div className="flex items-center gap-4">
            <FaBars onClick={() => setCollapsed(!collapsed)} className="cursor-pointer" />

            <Input
              className="hidden sm:block"
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
          </div>

          <div className="flex items-center gap-4">
            <Language />

            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform"
                  description="@tonyreichert"
                  name="Tony Reichert"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">@tonyreichert</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div style={{ height: "calc(100vh - 50px)" }} className="overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
