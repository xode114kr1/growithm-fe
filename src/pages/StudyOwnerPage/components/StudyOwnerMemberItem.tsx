import styled from "styled-components";
import type { User } from "../../../types/userType";
import { useDeleteStudyMemberByIdMutation } from "../../../shared/hooks/useMember";
import type { Study } from "../../../types/studyType";
import { useState } from "react";
import ProfileModal from "../../../shared/components/ProfileModal";
import WarningModal from "../../../shared/components/WarningModal";

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

interface AvatarProps {
  src?: string;
}

const Avatar = styled.img<AvatarProps>`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  object-fit: cover;
  background-color: #e5e7eb;
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
  font-size: 16px;
  font-weight: 900;
  color: #111827;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  font-size: 15px;
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
  font-size: 14px;
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
  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const { mutate: deleteStudyMemberById } = useDeleteStudyMemberByIdMutation();
  const handleDeleteButton = async () => {
    deleteStudyMemberById({ studyId: study?._id, deleteUserId: member._id });
  };
  return (
    <MemberItemContainer>
      <Avatar src={member?.avatarUrl} />
      <MemberMain>
        <NameRow>
          <Name>{member.name}</Name>
        </NameRow>
      </MemberMain>
      <MemberActions>
        <SmallButton type="button" onClick={() => setModalOpen(true)}>
          프로필
        </SmallButton>
        <DangerButton type="button" onClick={() => setWarningModalOpen(true)}>
          삭제
        </DangerButton>
      </MemberActions>
      {modalOpen && <ProfileModal member={member} onClose={() => setModalOpen(false)} />}
      {warningModalOpen && (
        <WarningModal
          onClose={() => setWarningModalOpen(false)}
          handleDeleteButton={handleDeleteButton}
          message="맴버를 삭제하시겠습니까?"
        />
      )}
    </MemberItemContainer>
  );
};

export default StudyOwnerMemberItem;
