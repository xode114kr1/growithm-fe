import styled from "styled-components";
import type { Problem, BeakjoonTierType, ProgrammersTierType } from "../../../types/problemType";
import { useNavigate } from "react-router-dom";
import { TIER_COLOR, TIER_TINT } from "../../../shared/styles/palette";

interface ProblemItemContainerProps {
  tier: BeakjoonTierType | ProgrammersTierType;
}

interface TierInfoProps {
  tier: BeakjoonTierType | ProgrammersTierType;
}

interface WriteButtonProps {
  state: "pending" | "solved" | undefined;
}

const ProblemItemContainer = styled.div<ProblemItemContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 7px;

  width: 100%;
  padding: 12px 14px;

  border-radius: 13px;
  border-left: 4px solid ${({ tier }) => TIER_COLOR[tier]};
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(108, 92, 231, 0.15);
  }
`;

const ProblemTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 9px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProblemTitleText = styled.div`
  flex: 1;
  min-width: 0;
  font-size: 21px;
  font-weight: 600;
  color: #111827;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TierInfo = styled.div<TierInfoProps>`
  flex-shrink: 0;

  padding: 5px 9px;
  min-width: 80px;

  text-align: center;
  background-color: ${({ tier }) => TIER_TINT[tier]};
  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;
  color: ${({ tier }) => TIER_COLOR[tier]};
`;

const ProblemSub = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  font-size: 14px;
  color: #6b7280;
`;

const CategoryChip = styled.span`
  padding: 3px 9px;
  border-radius: 999px;

  background-color: #f5f3ff;
  border: 1px solid rgba(108, 92, 231, 0.3);
  color: #6c5ce7;

  font-size: 13px;
  font-weight: 600;
`;

const ProblemInfo = styled.div`
  margin-top: 2px;
  padding-top: 7px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  font-size: 14px;
  color: #6b7280;
  border-top: 1px solid #e5e7eb;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
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

  min-width: 108px;
  padding: 7px 12px;

  border: none;
  border-radius: 999px;

  background-color: ${({ state }) => (state === "pending" ? " #6c5ce7" : "#ffffff")};
  color: ${({ state }) => (state === "pending" ? "#ffffff" : "#6c5ce7")};
  border: ${({ state }) => (state === "pending" ? "none" : `1px solid #6c5ce7`)};

  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  transition:
    background 0.15s ease,
    transform 0.05s ease,
    box-shadow 0.12s ease;

  &:hover {
    background-color: ${({ state }) => (state === "pending" ? "#5a4bdc" : "#f5f3ff")};
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(108, 92, 231, 0.25);
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
