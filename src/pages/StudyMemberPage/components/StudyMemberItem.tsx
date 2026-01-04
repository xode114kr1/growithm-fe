import styled from "styled-components";
import type { User } from "../../../types/userType";
import ProfileModal from "../../../shared/components/ProfileModal";
import { useState } from "react";

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;
  padding: 12px 14px;

  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);

  transition:
    box-shadow 0.12s ease,
    transform 0.05s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.15);
  }
`;

interface AvatarProps {
  src?: string;
}

const Avatar = styled.img<AvatarProps>`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  object-fit: cover;
  background-color: #e5e7eb;
  flex-shrink: 0;
`;

const Main = styled.div`
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #111827;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Badge = styled.span`
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 800;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #111827;
`;

const Sub = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;

  font-size: 13px;
  color: #6b7280;
`;

const Stat = styled.span`
  font-weight: 700;
  color: #111827;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
  flex-shrink: 0;
`;

const SmallButton = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: #c7d2fe;
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.12);
  }
`;

const StudyMemberItem = ({
  member,
  role,
  score,
}: {
  member: User;
  role: "member" | "owner";
  score: number;
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <MemberItem>
        <Avatar src={member?.avatarUrl} />
        <Main>
          <NameRow>
            <Name>{member?.name}</Name>
            <Badge>{role == "owner" ? "LEADER" : "MEMBER"}</Badge>
          </NameRow>
          <Sub>
            <div>
              Contribution : <Stat>{score} XP</Stat>
            </div>
          </Sub>
        </Main>
        <Right>
          <SmallButton type="button" onClick={() => setModalOpen(true)}>
            프로필
          </SmallButton>
          <Sub>last active {member?.updatedAt?.slice(0, 10)}</Sub>
        </Right>
      </MemberItem>
      {modalOpen && <ProfileModal member={member} onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default StudyMemberItem;
