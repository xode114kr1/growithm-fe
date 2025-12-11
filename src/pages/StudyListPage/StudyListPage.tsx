import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import StudyCard from "./components/StudyCard";
import { useGetStudyList } from "../../shared/hooks/useStudy";
import { useGetStudyRequestList } from "../../shared/hooks/useStudyRequest";
import StudyRequestItem from "./components/StudyRequestItem";

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

const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StudyListPage = () => {
  const { data: studyList } = useGetStudyList();
  const { data: studyRequestList } = useGetStudyRequestList();

  return (
    <Wapper>
      <StudyListPageContainer>
        <PageTitle>스터디</PageTitle>

        <SectionLayout>
          <SectionCard>
            <SectionHeader>
              <div>
                <SectionTitle>내 스터디</SectionTitle>
                <SectionSubText>현재 참여 중인 스터디 목록</SectionSubText>
              </div>
              <Pill>{studyList?.length}개 참여 중</Pill>
            </SectionHeader>

            {studyList?.length === 0 ? (
              <EmptyText>아직 참여 중인 스터디가 없습니다.</EmptyText>
            ) : (
              <StudyGrid>
                {studyList?.map((study) => (
                  <StudyCard key={study?._id} study={study} />
                ))}
              </StudyGrid>
            )}
          </SectionCard>

          <SectionCard>
            <SectionHeader>
              <div>
                <SectionTitle>스터디 가입 요청</SectionTitle>
                <SectionSubText>스터디장이 보낸 초대를 확인해요</SectionSubText>
              </div>
              <Pill>{studyRequestList?.length}건</Pill>
            </SectionHeader>

            {studyRequestList?.length === 0 ? (
              <EmptyText>현재 받은 초대가 없습니다.</EmptyText>
            ) : (
              <RequestList>
                {studyRequestList?.map((studyRequest) => (
                  <StudyRequestItem key={studyRequest._id} studyRequest={studyRequest} />
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
