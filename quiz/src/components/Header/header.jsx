import React, { useState } from "react";
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
  User,
} from "@heroui/react";
import { HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiService";
import { doLogout } from "../../redux/action/userAction";
import Language from "./language";
import { useTranslation } from "react-i18next";
import { TbPasswordUser } from "react-icons/tb";
import { RiChatHistoryFill } from "react-icons/ri";
import ModalChangePasswod from "../Admin/Content/Auth/showModalChangePassword";

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
  const { t } = useTranslation();

  const [showModalChangePassword, setShowModalChangePassword] = useState(false);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const account = useSelector(state => state.user.account);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleLogout = async () => {
    let res = await logout("account.email", account.refresh_token);
    if (res && res.EC === 0) {
      //clear local storage
      dispatch(doLogout());
      navigate("/login");
      toast.success(
        <div>
          <strong>Success</strong>
          <div>LogOut Success</div>
        </div>
      );
    } else {
      toast.error(
        <div>
          <strong>Error</strong>
          <div>{res.EM}</div>
        </div>
      );
    }
  }

  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className="sticky top-0 py-2 border-b z-50 bg-white"
      >

        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden mt-3"
          />
          <NavbarBrand
            className="gap-2 mt-3 hidden sm:flex"
          >

            <Language />

            <AcmeLogo />

          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 mt-3" justify="center">
          <NavbarItem>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `no-underline text-sm font-medium transition-colors 
                ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`
              }
            >
              {
                t('navbar.home')
              }
            </NavLink>
          </NavbarItem>
          <NavbarItem isActive>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `no-underline text-sm font-medium transition-colors 
                ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`
              }
            >
              {
                t('navbar.user')
              }
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `no-underline text-sm font-medium transition-colors 
                ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`
              }
            >
              {
                t('navbar.admin')
              }
            </NavLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="mt-3">
          {isAuthenticated === false ? (
            <>
              <NavbarItem>
                <Button
                  color="primary"
                  variant="bordered"
                  radius="full"
                  onPress={() => handleLogin()}
                >
                  {
                    t('navbar.button.login')
                  }
                </Button>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex">
                <Button
                  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                  radius="full"
                  onPress={() => handleSignUp()}
                >
                  {
                    t('navbar.button.signup')
                  }
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <Dropdown placement="bottom-start">
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
                  <DropdownItem
                    key="settings"
                    startContent={<CgProfile />}
                    onPress={() => navigate("/setting")}
                  >
                    {
                      t('navbar.button.profile')
                    }
                  </DropdownItem>
                  <DropdownItem
                    key="logout"

                    onPress={() => handleLogout()}
                    startContent={<RiChatHistoryFill />}
                  >
                    Lịch sử Làm Quiz
                  </DropdownItem>
                  <DropdownItem
                    key="changepassword"
                    onPress={() => setShowModalChangePassword(true)}
                    startContent={<TbPasswordUser />}
                  >
                    Quên mật khẩu
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={() => handleLogout()}
                    startContent={<HiOutlineLogout />}
                  >
                    {
                      t('navbar.button.logout')
                    }
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          )}
        </NavbarContent>

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
          {/* <Language /> */}
        </NavbarMenu>

      </Navbar>

      <ModalChangePasswod
        show={showModalChangePassword}
        setShow={setShowModalChangePassword}
      />

    </>
  );
}

export default Header;