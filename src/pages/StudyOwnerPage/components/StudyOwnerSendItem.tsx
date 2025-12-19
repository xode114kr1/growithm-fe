import styled from "styled-components";
import type { StudyRequest } from "../../../types/studyRequestType";
import { useRejectStudyRequestMutation } from "../../../shared/hooks/useStudyRequest";

const MemberItem = styled.div`
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

const Meta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #6b7280;
`;

const Name = styled.div`
  font-size: 15px;
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

const DangerButton = styled(Button)`
  border: 1px solid rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;

  &:hover {
    background: rgba(239, 68, 68, 0.12);
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.14);
  }
`;

const StudyOwnerSendItem = ({ studyRequest }: { studyRequest: StudyRequest }) => {
  const { mutate: rejectStudyRequest } = useRejectStudyRequestMutation();

  const handleCancelButton = async () => {
    await rejectStudyRequest({ studyRequestId: studyRequest?._id });
  };

  return (
    <MemberItem>
      <Avatar />
      <MemberMain>
        <NameRow>
          <Name>{studyRequest?.userId.name}</Name>
        </NameRow>
        <Meta>
          <span>invited 2025-12-10</span>
        </Meta>
      </MemberMain>
      <MemberActions>
        <DangerButton type="button" onClick={handleCancelButton}>
          초대 취소
        </DangerButton>
      </MemberActions>
    </MemberItem>
  );
};

export default StudyOwnerSendItem;
