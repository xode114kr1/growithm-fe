import styled from "styled-components";
import type { Problem, BeakjoonTierType, ProgrammersTierType } from "../../../types/problemType";
import { useNavigate } from "react-router-dom";

interface ProblemItemContainerProps {
  tier: BeakjoonTierType | ProgrammersTierType;
}

interface TierInfoProps {
  tier: BeakjoonTierType | ProgrammersTierType;
}

interface WriteButtonProps {
  state: "pending" | "solved" | undefined;
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
  gap: 12px;

  width: 100%;
  padding: 20px 24px 18px;

  border-radius: 18px;
  border-left: 5px solid ${({ tier }) => TIER_COLOR[tier] || TIER_COLOR.bronze};
  background-color: #ffffff;
  box-shadow: 0 3px 12px rgba(15, 23, 42, 0.08);
`;

const ProblemTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const ProblemTitleText = styled.div`
  flex: 1;
  min-width: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TierInfo = styled.div<TierInfoProps>`
  flex-shrink: 0;

  padding: 8px 12px;
  min-width: 94px;

  text-align: center;
  background-color: ${({ tier }) => TIER_COLOR[tier] || TIER_COLOR.bronze};
  border-radius: 12px;

  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const ProblemSub = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  font-size: 13px;
  color: #6b7280;
`;

const CategoryChip = styled.span`
  padding: 3px 10px;
  border-radius: 999px;
  background-color: #eef2ff;
  color: #4f46e5;
  font-size: 12px;
  font-weight: 500;
`;

const ProblemInfo = styled.div`
  margin-top: 2px;
  padding-top: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;

  font-size: 14px;
  color: #6b7280;
  border-top: 1px solid #e5e7eb;
`;

const ProblemInfoText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WriteButton = styled.button<WriteButtonProps>`
  flex-shrink: 0;

  min-width: 130px;
  padding: 10px 14px;

  border: none;
  border-radius: 999px;
  background-color: ${({ state }) => (state === "pending" ? "#4f46e5" : "#111827")};
  color: #ffffff;

  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  transition:
    background 0.15s ease-in-out,
    transform 0.05s ease-in-out,
    box-shadow 0.12s ease-in-out;

  &:hover {
    background-color: ${({ state }) => (state === "pending" ? "#4338ca" : "#030712")};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.18);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

interface ProblemItemProps {
  problem: Problem;
}

const ProblemItem = ({ problem }: ProblemItemProps) => {
  const navigate = useNavigate();

  let growithmTier: BeakjoonTierType | ProgrammersTierType;

  if (problem?.platform === "programmers") {
    growithmTier = problem?.tier as ProgrammersTierType;
  } else {
    growithmTier = problem?.tier.split(" ")[0].toLowerCase() as BeakjoonTierType;
  }

  return (
    <ProblemItemContainer tier={growithmTier}>
      <ProblemTitleRow>
        <ProblemTitleText>
          [{problem?.platform}] {problem?.problemId} - {problem?.title}
        </ProblemTitleText>
        <TierInfo tier={growithmTier}>{problem?.tier}</TierInfo>
      </ProblemTitleRow>

      <ProblemSub>
        {problem?.categories?.map((item) => (
          <CategoryChip key={item}>#{item}</CategoryChip>
        ))}
      </ProblemSub>

      <ProblemInfo>
        <ProblemInfoText>풀이 완료 : {problem?.timestamp}</ProblemInfoText>

        <WriteButton state={problem?.state} onClick={() => navigate(`/problem/${problem._id}`)}>
          {problem?.state === "pending" ? "작성하기" : "상세 보기"}
        </WriteButton>
      </ProblemInfo>
    </ProblemItemContainer>
  );
};

export default ProblemItem;
