import styled from "styled-components";
import { useMemo, useState } from "react";
import StudyProblemItem from "./components/StudyProblemItem";
import { useOutletContext } from "react-router-dom";
import type { Study } from "../../types/studyType";

const StudyProblemContainer = styled.div`
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

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 1024px) {
    width: 100%;
    align-items: stretch;
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

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const RightFilterArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 8px;
  }
`;

const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex: 1;
    justify-content: flex-end;
  }

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const TextInput = styled.input`
  min-width: 180px;
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

const ProblemItemList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;

  max-height: min(600px, calc(100vh - 280px));
  overflow: auto;

  @media (max-width: 768px) {
    max-height: calc(100vh - 320px);
  }

  @media (max-width: 480px) {
    max-height: calc(100vh - 360px);
  }
`;

interface StudyOutletContext {
  study: Study;
}

const StudyProblemPage = () => {
  const { study } = useOutletContext<StudyOutletContext>();
  const [platform, setPlatform] = useState<string>("");
  const [tier, setTier] = useState<string>("");
  const [titleKeyword, setTitleKeyword] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const platformCategory = ["baekjoon", "programmers"];
  const tierCategory = study?.problems?.map((item) => item?.tier);
  const userCategory = study?.members?.map((item) => item?.name);

  const filteredProblems = useMemo(() => {
    const list = study?.problems ?? [];

    return list.filter((p) => {
      const passPlatform = !platform || p?.platform === platform;
      const passTier = !tier || p?.tier === tier;
      const passTitle = !titleKeyword || p?.title.includes(titleKeyword);
      const passUser = !user || p?.userId?.name === user;

      return passPlatform && passTier && passTitle && passUser;
    });
  }, [study?.problems, platform, tier, titleKeyword, user]);

  return (
    <StudyProblemContainer>
      <Header>
        <Title>Problem</Title>
      </Header>
      <FilterContainer>
        <DropdownContainer>
          <DropdownMenu value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="">전체 플랫폼</option>
            {platformCategory.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </DropdownMenu>

          <DropdownMenu value={tier} onChange={(e) => setTier(e.target.value)}>
            <option value="">전체 티어</option>
            {tierCategory?.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </DropdownMenu>
        </DropdownContainer>

        <RightFilterArea>
          <SearchGroup>
            <TextInput
              placeholder="문제 제목 검색"
              value={titleKeyword}
              onChange={(e) => setTitleKeyword(e.target.value)}
            />
          </SearchGroup>
          <DropdownMenu value={user} onChange={(e) => setUser(e.target.value)}>
            <option value="">전체 유저</option>
            {userCategory?.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </DropdownMenu>
        </RightFilterArea>
      </FilterContainer>
      <ProblemItemList>
        {filteredProblems?.map((problem) => (
          <StudyProblemItem problem={problem} key={problem._id} />
        ))}
      </ProblemItemList>
    </StudyProblemContainer>
  );
};

export default StudyProblemPage;
