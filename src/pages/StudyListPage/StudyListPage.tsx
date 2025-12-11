import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import StudyCard from "./components/StudyCard";

const StudyListPageContainer = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #111827;
`;

const SectionLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.4fr;
  gap: 24px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const SectionCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 20px 20px 18px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const SectionSubText = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const Pill = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  background: #f3f4f6;
  color: #4b5563;
`;

const StudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyText = styled.div`
  padding: 18px 12px;
  border-radius: 10px;
  background: #f9fafb;
  font-size: 12px;
  color: #6b7280;
`;

/* --- 가입 요청 영역 (스터디장이 나에게 초대한 경우) --- */

const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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
  font-size: 13px;
  font-weight: 500;
  color: #111827;
`;

const RequestSub = styled.div`
  font-size: 11px;
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
  font-size: 11px;
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

// ────────────────────────────────────────────────────────────────
//  dummy 데이터 (나중에 API 연결할 때 대체하면 됨)
// ────────────────────────────────────────────────────────────────
const dummyMyStudies = [
  {
    id: "1",
    name: "알고리즘 스터디 - Growithm",
    explanation: "백준 / 프로그래머스 위주 주 3회 문제 풀이 + 코드 리뷰.",
    members: 8,
    ownerName: "나",
  },
  {
    id: "2",
    name: "물리화학 기말 대비 스터디",
    explanation: "기출 위주로 개념 정리 + 계산 문제 풀이.",
    members: 5,
    ownerName: "동혁",
  },
  {
    id: "3",
    name: "React/Node.js 웹 풀스택 스터디",
    explanation: "실전 프로젝트 위주, 코드리뷰와 배포까지 같이 하는 스터디.",
    members: 10,
    ownerName: "지현",
  },
];

const dummyRequests = [
  {
    id: "r1",
    studyName: "알고리즘 스터디 - Growithm",
  },
  {
    id: "r2",
    studyName: "React/Node.js 웹 풀스택 스터디",
  },
];

const StudyListPage = () => {
  return (
    <Wapper>
      <StudyListPageContainer>
        <PageTitle>스터디</PageTitle>

        <SectionLayout>
          {/* 내 스터디 영역 */}
          <SectionCard>
            <SectionHeader>
              <div>
                <SectionTitle>내 스터디</SectionTitle>
                <SectionSubText>현재 참여 중인 스터디 목록</SectionSubText>
              </div>
              <Pill>{dummyMyStudies.length}개 참여 중</Pill>
            </SectionHeader>

            {dummyMyStudies.length === 0 ? (
              <EmptyText>아직 참여 중인 스터디가 없습니다.</EmptyText>
            ) : (
              <StudyGrid>
                {dummyMyStudies.map((study) => (
                  <StudyCard
                    key={study.id}
                    name={study.name}
                    explanation={study.explanation}
                    members={study.members}
                    ownerName={study.ownerName}
                  />
                ))}
              </StudyGrid>
            )}
          </SectionCard>

          {/* 스터디장이 보낸 가입 요청 (초대) */}
          <SectionCard>
            <SectionHeader>
              <div>
                <SectionTitle>스터디 가입 요청</SectionTitle>
                <SectionSubText>스터디장이 보낸 초대를 확인해요</SectionSubText>
              </div>
              <Pill>{dummyRequests.length}건</Pill>
            </SectionHeader>

            {dummyRequests.length === 0 ? (
              <EmptyText>현재 받은 초대가 없습니다.</EmptyText>
            ) : (
              <RequestList>
                {dummyRequests.map((req) => (
                  <RequestItem key={req.id}>
                    <RequestInfo>
                      <RequestMain>{req.studyName}</RequestMain>
                      <RequestSub>스터디 설명</RequestSub>
                    </RequestInfo>
                    <RequestActions>
                      <RequestButton variant="ghost">거절</RequestButton>
                      <RequestButton variant="primary">수락</RequestButton>
                    </RequestActions>
                  </RequestItem>
                ))}
              </RequestList>
            )}
          </SectionCard>
        </SectionLayout>
      </StudyListPageContainer>
    </Wapper>
  );
};

export default StudyListPage;
