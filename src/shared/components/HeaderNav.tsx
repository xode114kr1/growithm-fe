import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface HeaderNavContainerProps {
  hide: boolean;
}

const HeaderNavContainer = styled.nav<HeaderNavContainerProps>`
  position: fixed;
  margin-top: 65px;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  pointer-events: ${({ hide }) => (hide ? "none" : "auto")};
  gap: 20px;
  z-index: 1;
  transition: opacity 0.2s ease-in-out;
`;

const NavItem = styled(NavLink)`
  position: relative;
  color: #999;
  text-decoration: none;
  font-size: 18px;
  padding: 8px 12px;

  &.active {
    color: #6c5ce7;
    font-weight: 700;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0%;
    height: 2px;
    bottom: 5px;
    left: 0;
    background: #6c5ce7;
    transition: width 300ms ease-in;
  }

  &:hover::after {
    width: 100%;
  }
`;

const HeaderNav = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHide(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderNavContainer hide={hide}>
      <NavItem to="/dashboard">Home</NavItem>
      <NavItem to="/pending">Pending</NavItem>
      <NavItem to="/friend">Friend</NavItem>
    </HeaderNavContainer>
  );
};

export default HeaderNav;
