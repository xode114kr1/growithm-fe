import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import { useState } from "react";
import { useGetProblemList } from "../../shared/hooks/useProblem";
import ProblemItem from "./components/ProblemItem";

const ProblemListPageContainer = styled.section`
  width: 80%;
  height: 100%;
  margin: 0 10%;
  padding: 60px 0;

  @media (max-width: 1024px) {
    width: 90%;
    margin: 0 5%;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 40px 16px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  width: 100%;
  min-height: 60px;
  padding: 10px 20px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;

  @media (max-width: 768px) {
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

const DropdownMenu = styled.select`
  width: 150px;
  height: 35px;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
  font-size: 14px;
  font-weight: 400;
  color: #2d3436;
  padding: 0 10px;
  background: #ffffff;
  outline: none;

  &:focus {
    border-color: #0984e3;
    box-shadow: 0 0 0 2px rgba(9, 132, 227, 0.15);
  }

  @media (max-width: 768px) {
    flex: 1;
    width: auto;
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

const StateFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f5f6fa;
  padding: 4px;
  border-radius: 999px;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const StateFilterButton = styled.button<{ $active?: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#0984e3" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#2d3436")};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: ${({ $active }) => ($active ? "#0984e3" : "rgba(9, 132, 227, 0.08)")};
  }
`;

const TextInput = styled.input`
  width: 260px;
  height: 35px;
  border-radius: 999px;
  border: 1px solid #dfe6e9;
  font-size: 14px;
  padding: 0 14px;
  color: #2d3436;
  background: #ffffff;
  outline: none;

  &::placeholder {
    color: #b2bec3;
  }

  &:focus {
    border-color: #0984e3;
    box-shadow: 0 0 0 2px rgba(9, 132, 227, 0.15);
  }

  @media (max-width: 1024px) {
    width: 220px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProblemListPage = () => {
  const [inputText, setInputText] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [tier, setTier] = useState<string>("");
  const [state, setState] = useState<"all" | "pending" | "solved">("all");

  const queryState = state === "all" ? "" : state;

  const {
    data: problemList,
    isLoading,
    error,
  } = useGetProblemList({ title: inputText, platform, tier, state: queryState });

  const platformCategory = ["beakjoon", "programmers"];
  const tierCategory = Array.from(new Set(problemList?.map((item) => item.tier) ?? []));

  return (
    <Wapper>
      <ProblemListPageContainer>
        <FilterContainer>
          <DropdownContainer>
            <DropdownMenu value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="">전체 플랫폼</option>
              {platformCategory?.map((item) => (
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
            <StateFilterGroup>
              <StateFilterButton $active={state === "all"} onClick={() => setState("all")}>
                All
              </StateFilterButton>
              <StateFilterButton $active={state === "pending"} onClick={() => setState("pending")}>
                Pending
              </StateFilterButton>
              <StateFilterButton $active={state === "solved"} onClick={() => setState("solved")}>
                Solved
              </StateFilterButton>
            </StateFilterGroup>

            <TextInput
              placeholder="제목 검색"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </RightFilterArea>
        </FilterContainer>

        {isLoading && <div>불러오는 중...</div>}
        {error && <div>문제를 불러오는 중 오류가 발생했습니다.</div>}
        {problemList?.map((item) => (
          <ProblemItem problem={item} key={item._id} />
        ))}
      </ProblemListPageContainer>
    </Wapper>
  );
};

export default ProblemListPage;
