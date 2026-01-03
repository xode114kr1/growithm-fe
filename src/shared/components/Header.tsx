import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useRef, useState } from "react";
import { useLogoutMutation } from "../hooks/useAuth";
import { GITHUB_AUTH_URL } from "../../shared/api/auth";
import { useSideNavStore } from "../../stores/sideNavStore";

interface ProfileProps {
  src?: string;
}

const HeaderContanier = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: white;
  z-index: 9999;
`;

const StyledFaBars = styled(FaBars)`
  position: absolute;
  left: 20px;
  top: 50%;
  width: 25px;
  height: 25px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Logo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 26px;
  font-weight: 800;
  color: #6c5ce7;
  cursor: pointer;
  transition: 300ms ease-in;
  font-family: "Space Grotesk", sans-serif;

  &:hover {
    transform: translateY(-55%) translateX(-50%);
  }
`;

const LoginButton = styled.button`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #191d23;
  border: none;
  color: white;
  border-radius: 8px;
  width: 70px;
  height: 40px;
  font-size: 17px;
  transition: 200ms ease-in;

  &:hover {
    opacity: 0.8;
  }
`;

const Profile = styled.div<ProfileProps>`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 200ms ease-in;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfileDropdown = styled.ul`
  padding: 0;
  position: absolute;
  top: 25px;
  right: 5px;
  background-color: white;
  box-shadow: 1px 3px rgb(0, 0, 0, 0.2);
  border-radius: 4px;
  border: 1px solid #e1e1e8;
`;

const ProfileItem = styled.ol`
  padding: 2px 10px;
  color: #2d3436;
  transition: background-color 300ms ease-in;
  cursor: pointer;

  &:hover {
    background-color: #cacaca;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { mutate: logout } = useLogoutMutation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useAuthStore((state) => state.user);
  const { setOpenSideNav } = useSideNavStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <HeaderContanier>
      <StyledFaBars onClick={setOpenSideNav} />
      <Logo onClick={() => navigate("/dashboard")}>GROWITHM</Logo>

      {!isAuthenticated ? (
        <LoginButton onClick={() => (window.location.href = GITHUB_AUTH_URL)}>로그인</LoginButton>
      ) : (
        <Profile src={user?.avatarUrl} onClick={() => setIsDropdownOpen(true)} ref={dropdownRef}>
          {isDropdownOpen && (
            <ProfileDropdown>
              <ProfileItem
                onClick={async () => {
                  setIsDropdownOpen(false);
                  await logout();
                }}
              >
                Logout
              </ProfileItem>
            </ProfileDropdown>
          )}
        </Profile>
      )}
    </HeaderContanier>
  );
};

export default Header;
