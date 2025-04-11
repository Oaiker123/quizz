import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

export const AcmeLogo = () => {
  return (
    <img
      src="/quizz_logo.png"
      alt=""
      fill="none"
      height="70"
      viewBox="0 0 32 32"
      width="70"
      className="hidden sm:inline-block"
    />
  );
};

const Header = () => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  // const account = useSelector(state => state.user.account);

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "User",
      href: "/user",
    },
    {
      label: "Admin",
      href: "/admin",
    },
  ];

  const handleLogin = () => {
    // alert("Login");
    navigate("/login");
  }

  const handleSignUp = () => {
    // alert("Sign Up");
    navigate("/signup");
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="mt-3 bg-white shadow-sm"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex gap-2" href="#">
          <span className="hidden sm:inline-block text-foreground font-bold text-inherit">
            Q͟u͟i͟z͟!͟
          </span>
          <AcmeLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `no-underline text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              `no-underline text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground hover:text-primary"
              }`
            }
          >
            User
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `no-underline text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground hover:text-primary"
              }`
            }
          >
            Admin
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      {isAuthenticated === false ?
        <>
          <NavbarContent justify="end">
            <NavbarItem className="lg:flex">
              <Button
                color="primary"
                variant="bordered"
                radius="full"
                onPress={() => handleLogin()}
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                radius="full"
                onPress={() => handleSignUp()}
              >
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
          : 
        <>
          <NavbarContent justify="end">
          <Dropdown>
            <DropdownTrigger>
              <div className="flex items-center gap-2">
                <Avatar
                  isBordered
                  size="sm"
                  src="https://img.heroui.chat/image/avatar?w=150&h=150&u=1"
                  className="transition-transform"
                />
                <span className="text-sm font-medium text-default-600">John Doe</span>
                <Icon
                  icon="lucide:chevron-down"
                  className="text-default-500 text-sm"
                />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" sideOffset={5}>
              <DropdownItem key="profile">
                Trần Bá Oai
              </DropdownItem>
              <DropdownItem key="settings">
                Settings
              </DropdownItem>
              <DropdownItem key="logout" withDivider>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </NavbarContent>
        </>
      }

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.label}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;