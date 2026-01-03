// StudyMemberPage.tsx
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import type { Study } from "../../types/studyType";
import { useMemo, useState } from "react";
import StudyMemberItem from "./components/StudyMemberItem";
import { useGetStudyUserScoreById } from "../../shared/hooks/useStudy";

const StudyMemberContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 21px;
  font-weight: 700;
  color: #111827;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  width: 100%;
  min-height: 60px;
  padding: 12px 18px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
    padding: 12px 12px;
    gap: 10px;
  }
`;

const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 1024px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const DropdownMenu = styled.select`
  width: 160px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 15px;
  font-weight: 400;
  color: #111827;
  padding: 0 10px;
  background: #ffffff;
  outline: none;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.12);
  }

  @media (max-width: 1024px) {
    flex: 1;
    width: 100%;
  }
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const TextInput = styled.input`
  min-width: 220px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  font-size: 15px;
  padding: 0 14px;
  color: #111827;
  background: #ffffff;
  outline: none;

  &::placeholder {
    color: #b2bec3;
  }

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.12);
  }

  @media (max-width: 1024px) {
    width: 100%;
    min-width: 0;
  }
`;

const MemberList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  max-height: 600px;
  overflow: auto;
`;

interface StudyOutletContext {
  study: Study;
}

const StudyMemberPage = () => {
  const { study } = useOutletContext<StudyOutletContext>();

  const { data: studyUserScoreList } = useGetStudyUserScoreById({ studyId: study?._id });

  const [sortBy, setSortBy] = useState<string>("");

  const scoreMap = useMemo(() => {
    const map = new Map<string, number>();
    studyUserScoreList?.forEach((s) => {
      if (s.user?._id) {
        map.set(s.user._id, s.score);
      }
    });
    return map;
  }, [studyUserScoreList]);

  const sortedMember = useMemo(() => {
    if (!study) return [];

    const members = [...study.members];

    switch (sortBy) {
      case "name-asc":
        return members.sort((a, b) => a.name.localeCompare(b.name));

      case "name-desc":
        return members.sort((a, b) => b.name.localeCompare(a.name));

      case "score-desc":
        return members.sort((a, b) => (scoreMap.get(b._id) ?? 0) - (scoreMap.get(a._id) ?? 0));

      case "score-asc":
        return members.sort((a, b) => (scoreMap.get(a._id) ?? 0) - (scoreMap.get(b._id) ?? 0));

      default:
        return members;
    }
  }, [study, sortBy, scoreMap]);

  return (
    <StudyMemberContainer>
      <Header>
        <Title>Member</Title>
      </Header>

      <FilterContainer>
        <LeftArea>
          <DropdownMenu onChange={(e) => setSortBy(e.target.value)}>
            <option value="">기본 값</option>
            <option value="name-asc">이름 오름차순</option>
            <option value="name-desc">이름 내림차순</option>
            <option value="score-desc">기여도 높은 순</option>
            <option value="score-asc">기여도 낮은 순</option>
          </DropdownMenu>
        </LeftArea>

        <RightArea>
          <TextInput placeholder="멤버 이름 검색" />
        </RightArea>
      </FilterContainer>
      <MemberList>
        {sortedMember &&
          sortedMember?.map((item) => {
            const score =
              studyUserScoreList?.find((studyUserScore) => studyUserScore?.user?._id == item?._id)
                ?.score || 0;

            if (item?._id == study?.owner?._id) {
              return <StudyMemberItem member={item} role="owner" key={item?._id} score={score} />;
            }
            return <StudyMemberItem member={item} role="member" key={item?._id} score={score} />;
          })}
      </MemberList>
    </StudyMemberContainer>
  );
};

export default StudyMemberPage;
