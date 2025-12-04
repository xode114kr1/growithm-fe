import styled from "styled-components";
import type { PendingProblem, TierType } from "../../../types/problemType";
import { useNavigate } from "react-router-dom";

interface PendingLargeItemContainerProps {
  tier: TierType;
}

interface TierInfoProps {
  tier: TierType;
}

const TIER_COLOR: Record<TierType, string> = {
  bronze: "#CC8846",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#A0FFF0",
  diamond: "#DDEBFF",
  ruby: "#FF4F7A",
};

const PendingLargeItemContainer = styled.div<PendingLargeItemContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  padding: 0px 20px;
  border-left: 5px solid ${({ tier }) => TIER_COLOR[tier] || TIER_COLOR.bronze};
  background-color: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 10px;
  gap: 5px;
`;

const ProblemTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  font-weight: 600;
  color: #2d3436;
`;

const TierInfo = styled.div<TierInfoProps>`
  width: 100px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background-color: ${({ tier }) => TIER_COLOR[tier] || TIER_COLOR.bronze};
  border-radius: 15px;
  font-size: 16px;
  font-weight: 500;
  color: white;
`;

const ProblemSub = styled.div`
  font-size: 16px;
  color: #866e72;
  margin-bottom: 15px;
`;

const ProblemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #866e72;
  padding: 5px 0;
  border-top: 1px solid #cfceda;
`;

const ProblemInfoText = styled.div`
  display: flex;
  align-items: center;
`;

const WriteButton = styled.button`
  width: 130px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: #6c5ce7;
  color: white;
  font-size: 16px;
  transition: 200ms ease-in;

  &:hover {
    opacity: 0.8;
  }
`;
interface PendingLargeItemProps {
  pendingProblem: PendingProblem;
}

const PendingLargeItem = ({ pendingProblem }: PendingLargeItemProps) => {
  const navigate = useNavigate();
  const handleFromPending = (pending: PendingProblem) => {
    navigate("/solved/form", {
      state: {
        mode: "fromPending",
        pending,
      },
    });
  };

  const growithmTier = pendingProblem?.tier.split(" ")[0].toLowerCase() as TierType;
  return (
    <PendingLargeItemContainer
      tier={growithmTier}
      onClick={() => handleFromPending(pendingProblem)}
    >
      <ProblemTitle>
        <span>
          {pendingProblem?.problemId} - {pendingProblem?.title}
        </span>
        <TierInfo tier={growithmTier}>{pendingProblem?.tier}</TierInfo>
      </ProblemTitle>
      <ProblemSub>이러이러한 문제입니다</ProblemSub>
      <ProblemInfo>
        <ProblemInfoText>
          📅풀이 완료 : 2024.12.01&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;🕒소요시간 : 45분
        </ProblemInfoText>
        <WriteButton>작성하기</WriteButton>
      </ProblemInfo>
    </PendingLargeItemContainer>
  );
};

export default PendingLargeItem;
