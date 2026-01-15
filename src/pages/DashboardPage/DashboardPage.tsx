import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import ProfileCard from "./components/ProfileCard";
import PendingItem from "./components/PendingItem";
import type { GrowithmTierType } from "../../types/problemType";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  useGetProblemInfo,
  useGetProblemList,
  useGetProblemTierStats,
} from "../../shared/hooks/useProblem";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { TIER_COLOR } from "../../shared/styles/palette";
import { useAuthStore } from "../../stores/authStore";

const DashboardContainer = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0 60px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media (max-width: 1024px) {
    width: 90%;
    padding: 40px 0 48px;
  }
`;

const UserInfoContainer = styled.section`
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) 2fr minmax(260px, 0.9fr);
  grid-template-rows: auto;
  grid-template-areas: "profile stats pending";
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1280px) {
    grid-template-columns: minmax(260px, 1fr) 1.7fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "profile stats"
      "pending pending";
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "profile"
      "stats"
      "pending";
  }
`;

const ProfileContainer = styled.div`
  grid-area: profile;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenualButton = styled.button`
  width: 100%;
  height: 48px;
  margin-top: 4px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #f9fafb;
  box-shadow: 0 6px 18px rgba(79, 70, 229, 0.25);
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition:
    transform 0.08s ease-in-out,
    box-shadow 0.12s ease-in-out,
    opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 8px 22px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
  }
`;

const DashboardInfoContainer = styled.section`
  grid-area: stats;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(0, auto);
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 18px 20px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  border: 1px solid #e5e7eb;
  gap: 4px;
  cursor: pointer;

  transition:
    transform 0.14s ease,
    box-shadow 0.18s ease,
    border-color 0.14s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #a5b4fc;
    box-shadow: 0 12px 26px rgba(129, 140, 248, 0.25);
  }
`;

const StatLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #6b7280;
`;

const StatValue = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #111827;
`;

const StatSubText = styled.div`
  font-size: 14px;
  color: #9ca3af;
`;

const ChartBox = styled.div`
  grid-column: 1 / 3;
  height: 500px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  border: 1px solid #e5e7eb;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
`;

const ChartTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const ChartSubtitle = styled.div`
  font-size: 14px;
  color: #9ca3af;
`;

const ChartInner = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
`;

const PendingListContainer = styled.section`
  grid-area: pending;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  /* max-height: 460px; */

  @media (max-width: 1280px) {
    max-height: 380px;
  }
`;

const PendingListTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 8px;
  background-color: #f9fafb;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #4f46e5;
  border-bottom: 1px solid #e5e7eb;
`;

const PendingListTitleBadge = styled.span`
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 999px;
  background-color: #eef2ff;
  color: #4f46e5;
`;

const PendingListBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 12px 12px;
  height: 100%;
  overflow-y: auto;
  gap: 6px;
`;

const EmptyPending = styled.div`
  padding: 20px 12px 24px;
  font-size: 15px;
  color: #9ca3af;
  text-align: center;
`;

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data } = useGetProblemList({});

  const { data: problems } = data ?? { data: [] };

  const user = useAuthStore((s) => s.user);
  const { data: problemInfo } = useGetProblemInfo({ userId: user?._id });
  const {
    data: problemTierStats = [
      { name: "bronze / level 1", value: 0 },
      { name: "silver / level 2", value: 0 },
      { name: "gold / level 3", value: 0 },
      { name: "platinum / level 4", value: 0 },
      { name: "diamond", value: 0 },
      { name: "ruby", value: 0 },
    ],
  } = useGetProblemTierStats();

  const pendingProblems = useMemo(() => {
    if (!problems) return [];
    return problems?.filter((item) => item?.state == "pending");
  }, [problems]);

  return (
    <Wapper>
      <DashboardContainer>
        <UserInfoContainer>
          <ProfileContainer>
            <ProfileCard />
            <MenualButton onClick={() => navigate("/dashboard/menual")}>
              Growithm이 처음이신가요?
            </MenualButton>
          </ProfileContainer>

          <DashboardInfoContainer>
            <StatCard onClick={() => navigate("/problem")}>
              <StatLabel>All</StatLabel>
              <StatValue>{problemInfo?.allProblemCount}</StatValue>
              <StatSubText>성공한 문제</StatSubText>
            </StatCard>
            <StatCard onClick={() => navigate("/problem", { state: { initalIsToday: true } })}>
              <StatLabel>Today</StatLabel>
              <StatValue>{problemInfo?.todayProblemCount}</StatValue>
              <StatSubText>오늘 해결한 문제</StatSubText>
            </StatCard>
            <StatCard onClick={() => navigate("/problem", { state: { initialState: "pending" } })}>
              <StatLabel>Pending</StatLabel>
              <StatValue>{problemInfo?.pendingProblemCount}</StatValue>
              <StatSubText>작성 대기 중인 문제</StatSubText>
            </StatCard>

            <StatCard onClick={() => navigate("/problem", { state: { initialState: "solved" } })}>
              <StatLabel>Solved</StatLabel>
              <StatValue>{problemInfo?.solvedProblemCount}</StatValue>
              <StatSubText>풀이 작성한 문제</StatSubText>
            </StatCard>

            <ChartBox>
              <ChartHeader>
                <ChartTitle>티어별 풀이 분포</ChartTitle>
                <ChartSubtitle>최근 풀이를 기준으로 한 티어 분포</ChartSubtitle>
              </ChartHeader>
              <ChartInner>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={problemTierStats}
                    margin={{ top: 8, right: 8, bottom: 8, left: -10 }}
                  >
                    <XAxis
                      dataKey="name"
                      tickFormatter={(value) => value.split(" ")[0].toUpperCase()}
                      fontSize={12}
                    />
                    <YAxis fontSize={12} />
                    <Tooltip
                      formatter={(value) => [`${value} solved`]}
                      labelFormatter={(label) => label.toUpperCase()}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {problemTierStats?.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={TIER_COLOR[entry.name.split(" ")[0] as GrowithmTierType]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartInner>
            </ChartBox>
          </DashboardInfoContainer>

          <PendingListContainer>
            <PendingListTitle>
              보류 문제
              <PendingListTitleBadge>{problemInfo?.pendingProblemCount}개</PendingListTitleBadge>
            </PendingListTitle>
            <PendingListBox>
              {pendingProblems && pendingProblems.length > 0 ? (
                pendingProblems.map((item) => <PendingItem pendingProblem={item} key={item._id} />)
              ) : (
                <EmptyPending>보류 중인 문제가 없습니다. 새 문제를 추가해보세요 ✏️</EmptyPending>
              )}
            </PendingListBox>
          </PendingListContainer>
        </UserInfoContainer>
      </DashboardContainer>
    </Wapper>
  );
};

export default DashboardPage;
