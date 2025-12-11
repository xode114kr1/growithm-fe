import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import StudyCard from "./components/StudyCard";
import { useGetStudyList } from "../../shared/hooks/useStudy";
import { useGetStudyRequestList } from "../../shared/hooks/useStudyRequest";
import StudyRequestItem from "./components/StudyRequestItem";

const StudyListPageContainer = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 48px 0 72px;
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 36px 16px 56px;
  }
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
  padding: 22px 22px 20px;
  box-shadow: 0 3px 14px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SectionTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

const SectionSubText = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const Pill = styled.span`
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  background: #f3f4f6;
  color: #4b5563;
  white-space: nowrap;
`;

const StudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyText = styled.div`
  padding: 18px 14px;
  border-radius: 12px;
  background: #f9fafb;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`;

const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StudyListPage = () => {
  const { data: studyList } = useGetStudyList();
  const { data: studyRequestList } = useGetStudyRequestList();

  return (
    <Wapper>
      <StudyListPageContainer>
        <SectionLayout>
          {/* 내 스터디 섹션 */}
          <SectionCard>
            <SectionHeader>
              <SectionTitleBlock>
                <SectionTitle>내 스터디</SectionTitle>
                <SectionSubText>현재 참여 중인 스터디 목록</SectionSubText>
              </SectionTitleBlock>
              <Pill>{studyList?.length ?? 0}개 참여 중</Pill>
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

          {/* 스터디 가입 요청 섹션 */}
          <SectionCard>
            <SectionHeader>
              <SectionTitleBlock>
                <SectionTitle>스터디 가입 요청</SectionTitle>
                <SectionSubText>스터디장이 보낸 초대를 확인해요.</SectionSubText>
              </SectionTitleBlock>
              <Pill>{studyRequestList?.length ?? 0}건</Pill>
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
