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
import { NavLink } from "react-router-dom";

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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Settings",
    "Log Out",
  ];

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
              `no-underline text-sm font-medium transition-colors ${
                isActive ? "text-primary" : "text-foreground hover:text-primary"
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
              `no-underline text-sm font-medium transition-colors ${
                isActive ? "text-primary" : "text-foreground hover:text-primary"
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
              `no-underline text-sm font-medium transition-colors ${
                isActive ? "text-primary" : "text-foreground hover:text-primary"
              }`
            }
          >
            Admin
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Button color="primary" variant="bordered" radius="full">
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            radius="full"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
