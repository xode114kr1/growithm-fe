import styled from "styled-components";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Wapper from "../../shared/styles/Wapper";
import { useGetStudyById } from "../hooks/useStudy";
import { useAuthStore } from "../../stores/authStore";

const PageContainer = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0 60px;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 32px 16px 48px;
  }
`;

const StudyBox = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 20px 22px 22px;
  min-height: 85vh;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.08);

  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const StudyHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 10px;
`;

const StudyTitle = styled.h1`
  margin: 0;
  font-size: 23px;
  font-weight: 700;
  color: #111827;
`;

const StudyBody = styled.div`
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 20px;
  margin-top: 4px;
  flex: 1;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const NavColumn = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavLabel = styled.div`
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 2px;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 12px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;

  color: #4b5563;
  text-decoration: none;
  background: transparent;

  transition:
    background 0.12s ease-in-out,
    color 0.12s ease-in-out,
    transform 0.05s ease-in-out,
    box-shadow 0.12s ease-in-out;

  &.active {
    background: #4f46e5;
    color: #f9fafb;
    box-shadow: 0 3px 10px rgba(79, 70, 229, 0.3);
  }

  &:not(.active):hover {
    background: #f3f4ff;
  }
`;

const ContentColumn = styled.section`
  min-height: 260px;
  padding: 4px 2px 0;

  display: flex;
  flex-direction: column;
`;

const StudyLayout = () => {
  const { id } = useParams<{ id: string }>();
  const { data: study } = useGetStudyById({ studyId: id as string });
  const user = useAuthStore((state) => state.user);
  const isOwner = study?.owner._id == user?._id;
  return (
    <Wapper>
      <PageContainer>
        <StudyBox>
          <StudyHeader>
            <StudyTitle>{study?.title}</StudyTitle>
          </StudyHeader>
          <StudyBody>
            <NavColumn>
              <NavLabel>스터디 메뉴</NavLabel>
              <NavList>
                <NavItem to="overview">Overview</NavItem>
                <NavItem to="problem">Problem</NavItem>
                <NavItem to="member">Member</NavItem>
                {isOwner && <NavItem to="owner">Owner</NavItem>}
              </NavList>
            </NavColumn>

            <ContentColumn>
              <Outlet context={{ study }} />
            </ContentColumn>
          </StudyBody>
        </StudyBox>
      </PageContainer>
    </Wapper>
  );
};

export default StudyLayout;
