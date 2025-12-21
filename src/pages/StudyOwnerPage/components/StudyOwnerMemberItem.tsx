import styled from "styled-components";
import type { User } from "../../../types/userType";
import { useDeleteStudyMemberByIdMutation } from "../../../shared/hooks/useMember";
import type { Study } from "../../../types/studyType";
import { useState } from "react";
import ProfileModal from "../../../shared/components/ProfileModal";

const MemberItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 12px 14px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #eef2f7;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);

  @media (max-width: 768px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.22), rgba(99, 102, 241, 0.08));
  border: 1px solid rgba(79, 70, 229, 0.18);
  flex-shrink: 0;
`;

const MemberMain = styled.div`
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
  font-size: 15px;
  font-weight: 900;
  color: #111827;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #6b7280;
`;

const MemberActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    border-color: #c7d2fe;
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.12);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SmallButton = styled(Button)`
  height: 34px;
  font-size: 13px;
`;

const DangerButton = styled(Button)`
  border: 1px solid rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;

  &:hover {
    background: rgba(239, 68, 68, 0.12);
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.14);
  }
`;

const StudyOwnerMemberItem = ({ member, study }: { member: User; study: Study }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { mutate: deleteStudyMemberById } = useDeleteStudyMemberByIdMutation();
  const handleDeleteButton = async () => {
    deleteStudyMemberById({ studyId: study?._id, deleteUserId: member._id });
  };
  return (
    <MemberItemContainer>
      <Avatar />
      <MemberMain>
        <NameRow>
          <Name>{member.name}</Name>
        </NameRow>
        <Meta>
          <span>solved 42</span>
          <span>·</span>
          <span>tier Gold</span>
          <span>·</span>
          <span>joined 2025-10-03</span>
        </Meta>
      </MemberMain>
      <MemberActions>
        <SmallButton type="button" onClick={() => setModalOpen(true)}>
          프로필
        </SmallButton>
        <DangerButton type="button" onClick={handleDeleteButton}>
          삭제
        </DangerButton>
      </MemberActions>
      {modalOpen && <ProfileModal member={member} onClose={() => setModalOpen(false)} />}
    </MemberItemContainer>
  );
};

export default StudyOwnerMemberItem;
