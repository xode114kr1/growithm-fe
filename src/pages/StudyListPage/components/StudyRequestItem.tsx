import styled from "styled-components";
import type { StudyRequest } from "../../../types/studyRequestType";
import {
  useAcceptStudyRequestMutation,
  useRejectStudyRequestMutation,
} from "../../../shared/hooks/useStudyRequest";

const RequestItem = styled.div`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const RequestInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const RequestMain = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
`;

const RequestSub = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const RequestActions = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 6px;
`;

const RequestButton = styled.button<{ variant?: "primary" | "ghost" }>`
  padding: 6px 10px;
  border-radius: 999px;
  border: ${({ variant }) => (variant === "primary" ? "none" : "1px solid #e5e7eb")};
  background: ${({ variant }) =>
    variant === "primary" ? "linear-gradient(135deg, #4f46e5, #6366f1)" : "#ffffff"};
  color: ${({ variant }) => (variant === "primary" ? "#f9fafb" : "#4b5563")};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background 0.12s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ variant }) =>
      variant === "primary"
        ? "0 8px 18px rgba(79, 70, 229, 0.35)"
        : "0 4px 10px rgba(148, 163, 184, 0.25)"};
  }
`;

interface StudyRequestItemProps {
  studyRequest: StudyRequest;
}

const StudyRequestItem = ({ studyRequest }: StudyRequestItemProps) => {
  const { mutate: acceptStudyRequest } = useAcceptStudyRequestMutation();
  const { mutate: rejectStudyRequest } = useRejectStudyRequestMutation();

  return (
    <RequestItem>
      <RequestInfo>
        <RequestMain>{studyRequest?.studyId?.title}</RequestMain>
        <RequestSub>{studyRequest?.studyId?.explanation}</RequestSub>
      </RequestInfo>
      <RequestActions>
        <RequestButton
          variant="primary"
          onClick={() => acceptStudyRequest({ studyRequestId: studyRequest._id })}
        >
          수락
        </RequestButton>
        <RequestButton
          variant="ghost"
          onClick={() => rejectStudyRequest({ studyRequestId: studyRequest._id })}
        >
          거절
        </RequestButton>
      </RequestActions>
    </RequestItem>
  );
};

export default StudyRequestItem;
