import styled from "styled-components";
import { useSideNavStore } from "../../stores/sideNavStore";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { GITHUB_AUTH_URL } from "../api/auth";

const SideNavWapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: ${({ $isOpen }) => ($isOpen ? "rgba(0, 0, 0, 0.15)" : "transparent")};
  z-index: 9999;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
`;

const SideNavContainer = styled.nav<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 260px;
  height: 100%;
  background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);
  color: #2d3436;
  padding: 20px 18px;
  box-sizing: border-box;

  border-right: 1px solid #e5e7eb;

  display: flex;
  flex-direction: column;
  gap: 24px;

  transition: transform 300ms ease-in-out;
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
`;

const SideNavHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Brand = styled.div`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #6c5ce7;
`;

const NavSectionTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;

  padding: 10px 14px;
  border-radius: 12px;
  text-decoration: none;

  font-size: 14px;
  font-weight: 500;

  color: #2d3436;
  background: transparent;

  transition:
    background 0.18s ease-in-out,
    color 0.18s ease-in-out,
    transform 0.05s ease-in-out;

  &.active {
    background: #eef2ff;
    color: #6c5ce7;
    font-weight: 600;
  }

  &:hover {
    background: #f4f4ff;
    transform: translateX(2px);
  }
`;

const NavLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const SideNavFooter = styled.footer`
  margin-top: auto;
  font-size: 11px;
  color: #6b7280;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`;

const SideNavFooterText = styled.p`
  margin: 0;
  line-height: 1.4;
`;

const EmptyState = styled.div`
  margin-top: 16px;
  padding: 18px 16px;
  border-radius: 14px;
  background: #f9fafb;
  border: 1px dashed #e5e7eb;

  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: #4b5563;
`;

const EmptyTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #6b7280;
`;

const LoginButton = styled.button`
  border: none;
  margin-top: 6px;
  align-self: flex-start;

  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;

  background: #6c5ce7;
  color: #f9fafb;
  transition: opacity 300ms ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

const SideNav = () => {
  const sideNavContainerRef = useRef<HTMLElement>(null);
  const { isOpenSideNav, setCloseSideNav } = useSideNavStore();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sideNavContainerRef.current && !sideNavContainerRef.current.contains(e.target as Node)) {
        setCloseSideNav();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenSideNav, setCloseSideNav]);

  if (!isAuthenticated) {
    return (
      <SideNavWapper $isOpen={isOpenSideNav}>
        <SideNavContainer ref={sideNavContainerRef} $isOpen={isOpenSideNav}>
          <SideNavHeader>
            <Brand>Growithm</Brand>
          </SideNavHeader>

          <EmptyState>
            <EmptyTitle>로그인이 필요합니다</EmptyTitle>
            <EmptyText>
              문제 대시보드, 친구 목록, 풀이 통계를 확인하려면 먼저 GitHub 계정으로 로그인해 주세요.
            </EmptyText>

            <LoginButton onClick={() => (window.location.href = GITHUB_AUTH_URL)}>
              로그인 하러 가기 →
            </LoginButton>
          </EmptyState>

          <SideNavFooter>
            <SideNavFooterText>로그인 후 더 많은 기능을 사용할 수 있어요.</SideNavFooterText>
          </SideNavFooter>
        </SideNavContainer>
      </SideNavWapper>
    );
  }

  return (
    <SideNavWapper $isOpen={isOpenSideNav}>
      <SideNavContainer ref={sideNavContainerRef} $isOpen={isOpenSideNav}>
        <SideNavHeader>
          <Brand>Growithm</Brand>
        </SideNavHeader>

        <div>
          <NavSectionTitle>Pages</NavSectionTitle>
          <NavList>
            <NavItem to="/dashboard">
              <NavLabel>Home</NavLabel>
            </NavItem>

            <NavItem to="/problem">
              <NavLabel>Problem</NavLabel>
            </NavItem>

            <NavItem to="/friend">
              <NavLabel>Friend</NavLabel>
            </NavItem>
          </NavList>
        </div>

        <SideNavFooter>
          <SideNavFooterText>Logged in as</SideNavFooterText>
          <SideNavFooterText>
            {user?.name} / {user?.repo}
          </SideNavFooterText>
        </SideNavFooter>
      </SideNavContainer>
    </SideNavWapper>
  );
};

export default SideNav;
