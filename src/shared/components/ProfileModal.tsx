import styled from "styled-components";
import type { User } from "../../types/userType";
import { calculateTier } from "../utils/tier";
import type { BeakjoonTierType } from "../../types/problemType";
import { TIER_GRADIENT } from "../styles/palette";
import { useGetProblemListByUserId } from "../hooks/useProblem";
import { useMemo } from "react";

type ProfileModalProps = {
  member: User;
  onClose: () => void;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  width: 420px;
  max-height: 90vh;
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Top = styled.div`
  display: flex;
  gap: 14px;
  position: relative;
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

const TopInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

const Handle = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;

const DashboardSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
`;

const Stat = styled.div`
  flex: 1;
  background: #f9fafb;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
`;

const Value = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const Label = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

interface TierContainerProps {
  tier: BeakjoonTierType;
}

const TierContainer = styled.div<TierContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background: ${({ tier }) => TIER_GRADIENT[tier] || TIER_GRADIENT.bronze};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

export default function ProfileModal({ onClose, member }: ProfileModalProps) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const { data: problems } = useGetProblemListByUserId({ userId: member._id });
  const tier = calculateTier(member?.score || 0);

  const todaySolved = useMemo(() => {
    if (!problems) return 0;

    const today = new Date().toISOString().slice(0, 10);

    return problems.reduce((count, problem) => {
      if (problem.timestamp === today) {
        return count + 1;
      }
      return count;
    }, 0);
  }, [problems]);

  const pendingProblems = useMemo(() => {
    if (!problems) return [];
    return problems?.filter((item) => item?.state == "pending");
  }, [problems]);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={stop}>
        <Top>
          <Avatar src={member?.avatarUrl} />

          <TopInfo>
            <NameRow>
              <Name>{member?.name}</Name>
            </NameRow>
            <Handle>@xode114kr1</Handle>
          </TopInfo>

          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </Top>

        <DashboardSection>
          <Stat>
            <Value>{problems?.length}</Value>
            <Label>All</Label>
          </Stat>
          <Stat>
            <Value>{todaySolved}</Value>
            <Label>Today</Label>
          </Stat>
          <Stat>
            <Value>{pendingProblems?.length}</Value>
            <Label>Pending</Label>
          </Stat>
          <Stat>
            <Value>{(problems?.length || 0) - pendingProblems?.length}</Value>
            <Label>Solved</Label>
          </Stat>
        </DashboardSection>
        <TierContainer tier={tier}>{tier}</TierContainer>
      </Modal>
    </Overlay>
  );
}
