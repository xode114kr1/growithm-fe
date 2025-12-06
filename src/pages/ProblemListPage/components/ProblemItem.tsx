import styled from "styled-components";
import type { Problem, BeakjoonTierType, ProgrammersTierType } from "../../../types/problemType";
import { useNavigate } from "react-router-dom";

interface ProblemItemContainerProps {
  tier: BeakjoonTierType | ProgrammersTierType;
}

interface TierInfoProps {
  tier: BeakjoonTierType | ProgrammersTierType;
}

const TIER_COLOR: Record<BeakjoonTierType | ProgrammersTierType, string> = {
  bronze: "#CC8846",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#A0FFF0",
  diamond: "#DDEBFF",
  ruby: "#FF4F7A",

  "level 1": "#CC8846",
  "level 2": "#C0C0C0",
  "level 3": "#FFD700",
  "level 4": "#A0FFF0",
};

const ProblemItemContainer = styled.div<ProblemItemContainerProps>`
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
  padding-left: 10px;
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
interface ProblemItemProps {
  problem: Problem;
}

const ProblemItem = ({ problem }: ProblemItemProps) => {
  const navigate = useNavigate();
  const handleFromPending = (problem: Problem) => {
    navigate("/solved/form", {
      state: {
        problem,
      },
    });
  };

  let growithmTier: BeakjoonTierType | ProgrammersTierType;
  if (problem?.platform == "programmers") {
    growithmTier = problem?.tier as ProgrammersTierType;
  } else {
    growithmTier = problem?.tier.split(" ")[0].toLowerCase() as BeakjoonTierType;
  }

  return (
    <ProblemItemContainer tier={growithmTier}>
      <ProblemTitle>
        <span>
          [{problem?.platform}] {problem?.problemId} - {problem?.title}
        </span>
        <TierInfo tier={growithmTier}>{problem?.tier}</TierInfo>
      </ProblemTitle>
      <ProblemSub>이러이러한 문제입니다</ProblemSub>
      <ProblemInfo>
        <ProblemInfoText>풀이 완료 : {problem?.timestamp}</ProblemInfoText>
        <WriteButton onClick={() => handleFromPending(problem)}>
          {problem?.state == "pending" ? "작성하기" : "수정하기"}
        </WriteButton>
      </ProblemInfo>
    </ProblemItemContainer>
  );
};

export default ProblemItem;
