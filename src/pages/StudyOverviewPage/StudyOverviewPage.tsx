import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { Study } from "../../types/studyType";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useGetStudyUserScoreById, useLeaveStudyMutation } from "../../shared/hooks/useStudy";
import type { GrowithmTierType } from "../../types/problemType";
import {
  calculateStudyTier,
  getProblemTier,
  getStudyPrograss,
  getStudyTierMaxScore,
} from "../../shared/utils/tier";
import { CARD_TIER_COLOR, TIER_COLOR, TIER_PROGRESS_COLOR } from "../../shared/styles/palette";
import WarningModal from "../../shared/components/WarningModal";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../stores/authStore";

interface StudyOutletContext {
  study: Study;
}

const TIER_KR: Record<GrowithmTierType, string> = {
  bronze: "브론즈",
  silver: "실버",
  gold: "골드",
  platinum: "플래티넘",
  diamond: "다이아몬드",
  ruby: "루비",
};

const OverviewWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 21px;
  font-weight: 700;
  color: #111827;
`;

export const FiLogOutButton = styled(FiLogOut)`
  width: 36px;
  height: 36px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;

  color: #111827;
  transition: 150ms ease;

  &:hover {
    color: #ef4444;
    background-color: #fee2e2;
  }
`;

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1.4fr;
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 16px 14px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: #111827;
`;

const CardHint = styled.span`
  font-size: 13px;
  color: #9ca3af;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  border-radius: 12px;
  padding: 10px 10px 8px;
  background: #f9fafb;

  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StatLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const StatValue = styled.span`
  font-size: 19px;
  font-weight: 700;
  color: #111827;
`;

const ProblemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProblemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 14px;
  color: #374151;
`;

const ProblemTierDot = styled.span<{ tier: GrowithmTierType }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: ${({ tier }) => TIER_COLOR[tier] || TIER_COLOR["bronze"]};
  flex-shrink: 0;
`;

const ProblemTitle = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TierCard = styled.div<{ tier: GrowithmTierType }>`
  border-radius: 16px;
  padding: 16px 14px;
  background: ${({ tier }) =>
    `linear-gradient(135deg, ${CARD_TIER_COLOR[tier]}, ${CARD_TIER_COLOR[tier]}88)`};
  color: #111827;

  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TierLabel = styled.span`
  font-size: 14px;
  opacity: 0.9;
`;

const TierName = styled.span`
  font-size: 21px;
  font-weight: 800;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 6px;
`;

const ProgressScore = styled.div`
  width: 100%;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;

  font-size: 13px;
  font-weight: 500;
  font-weight: div {
    line-height: 1;
  }
`;

const ProgressBarFill = styled.div<{ value: number; tier: GrowithmTierType }>`
  height: 100%;
  width: ${({ value }) => value}%;
  background: ${({ tier }) => TIER_PROGRESS_COLOR[tier]};
  transition: width 0.4s ease;
`;

const MemberCard = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 16px 14px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MemberHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const MemberCount = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 220px;
  overflow-y: auto;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface AvatarProps {
  src?: string;
}

const Avatar = styled.img<AvatarProps>`
  width: 26px;
  height: 26px;
  border-radius: 999px;
  object-fit: cover;
  background-color: #e5e7eb;
  flex-shrink: 0;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MemberName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
`;

const MemberRole = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const StudyOverviewPage = () => {
  const { study } = useOutletContext<StudyOutletContext>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data } = useGetStudyUserScoreById({ studyId: study?._id });
  const { mutate: leaveStudy } = useLeaveStudyMutation();

  const isOwner = study?.owner?._id == user?._id;

  const chartData = data
    ?.slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => ({
      name: item.user.name,
      score: item.score,
    }));

  const tier = calculateStudyTier(study?.score) || "bronze";

  const weeklySolved =
    study?.problems?.filter((problem) => {
      if (!problem?.timestamp) return false;

      const getDateMinusDays = (days: number) => {
        const now = new Date();
        now.setDate(now.getDate() - days);

        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, "0");
        const d = String(now.getDate()).padStart(2, "0");

        return `${y}-${m}-${d}`;
      };

      const today = getDateMinusDays(0);
      const oneWeekAgo = getDateMinusDays(7);

      return problem.timestamp >= oneWeekAgo && problem.timestamp <= today;
    }) || [];

  const handleDeleteButton = async () => {
    await leaveStudy({ studyId: study._id }, { onSuccess: () => navigate("/study") });
  };

  const memberLength = study?.members?.length || 0;
  const problemLength = study?.problems?.length || 0;

  return (
    <OverviewWrapper>
      <Header>
        <Title>Overview</Title>
        {!isOwner && (
          <FiLogOutButton size={15} onClick={() => setModalOpen(true)}>
            탈퇴하기
          </FiLogOutButton>
        )}
      </Header>
      <TierCard tier={tier}>
        <TierLabel>현재 스터디 티어</TierLabel>
        <TierName>{TIER_KR[tier]}</TierName>
        <ProgressBarWrapper>
          <ProgressBarFill value={getStudyPrograss(study?.score) || 0} tier={tier} />
        </ProgressBarWrapper>
        <ProgressScore>
          <div>{study?.score}</div>
          <div>{getStudyTierMaxScore(study?.score)}</div>
        </ProgressScore>
      </TierCard>
      <ContentGrid>
        <LeftColumn>
          <Card style={{ flex: 0 }}>
            <CardHeader>
              <CardTitle>스터디 풀이 통계</CardTitle>
              <CardHint>최근 활동 기준</CardHint>
            </CardHeader>

            <StatsGrid>
              <StatCard>
                <StatLabel>전체 푼 문제</StatLabel>
                <StatValue>{problemLength}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>이번 주 푼 문제</StatLabel>
                <StatValue>{weeklySolved.length}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>스터디원 수</StatLabel>
                <StatValue>{memberLength}</StatValue>
              </StatCard>
            </StatsGrid>
          </Card>
          <Card style={{ minHeight: "300px" }}>
            <CardHeader>
              <CardTitle>기여도 분석</CardTitle>
              <CardHint>스터디원별 풀이 기여도</CardHint>
            </CardHeader>

            <div style={{ width: "100%", height: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                {chartData && (
                  <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 4, 4]} barSize={40} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </Card>
        </LeftColumn>

        <RightColumn>
          <MemberCard>
            <MemberHeader>
              <MemberTitle>스터디 멤버</MemberTitle>
              <MemberCount>{memberLength}명 참여 중</MemberCount>
            </MemberHeader>

            <MemberList>
              {memberLength
                ? study?.members?.map((member) => (
                    <MemberRow key={member?.name}>
                      <Avatar src={member?.avatarUrl} />
                      <MemberInfo>
                        <MemberName>{member?.name}</MemberName>
                        <MemberRole>
                          {member?._id == study?.owner._id ? "owner" : "member"}
                        </MemberRole>
                      </MemberInfo>
                    </MemberRow>
                  ))
                : null}
            </MemberList>
          </MemberCard>
          <Card>
            <CardHeader>
              <CardTitle>최근에 푼 문제</CardTitle>
              <CardHint>스터디원들이 풀이한 문제들</CardHint>
            </CardHeader>

            <ProblemList>
              {problemLength
                ? study?.problems
                    .slice(-10)
                    .reverse()
                    .map((p) => (
                      <ProblemRow key={p.title}>
                        <ProblemTierDot tier={getProblemTier(p)} />
                        <ProblemTitle>{p.title}</ProblemTitle>
                      </ProblemRow>
                    ))
                : null}
            </ProblemList>
          </Card>
        </RightColumn>
      </ContentGrid>
      {modalOpen && (
        <WarningModal onClose={() => setModalOpen(false)} handleDeleteButton={handleDeleteButton} />
      )}
    </OverviewWrapper>
  );
};

export default StudyOverviewPage;
