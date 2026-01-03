import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import { useEffect, useState } from "react";
import { useGetProblemList } from "../../shared/hooks/useProblem";
import ProblemItem from "./components/ProblemItem";
import ProblemPagination from "./components/ProblemPagination";
import { useLocation, useNavigate } from "react-router-dom";
import type { ProblemState } from "../../types/problemType";

const ProblemListPageContainer = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1440px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 16px 48px;
  }
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

  @media (max-width: 1440px) {
    flex-direction: column;
    align-items: stretch;
    padding: 12px 12px;
    gap: 10px;
  }
`;

const LeftFilterArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 1440px) {
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

  @media (max-width: 1440px) {
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

const DropdownFilterRow = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
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

const StateFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f3f4ff;
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
  font-size: 14px;
  min-width: 70px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#4f46e5" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#111827")};
  font-weight: 500;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    box-shadow 0.12s ease-in-out,
    transform 0.05s ease-in-out;

  &:hover {
    background: ${({ $active }) => ($active ? "#4338ca" : "rgba(79, 70, 229, 0.08)")};
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const TextInput = styled.input`
  min-width: 200px;
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

  @media (max-width: 1440px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProblemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StatusMessage = styled.div`
  padding: 18px 16px;
  border-radius: 12px;
  border: 1px dashed #e5e7eb;
  background-color: #f9fafb;
  font-size: 15px;
  color: #6b7280;
  text-align: center;
`;

const DateFilterRow = styled.div`
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

const DateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 1440px) {
    flex: 2;
    width: 100%;
    justify-content: flex-end;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const DateInput = styled.input`
  height: 36px;
  min-width: 148px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  color: #111827;
  background: #ffffff;
  outline: none;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.12);
  }

  @media (max-width: 1440px) {
    min-width: 0;
    width: 100%;
  }
`;

const DateDash = styled.span`
  font-size: 13px;
  color: #6b7280;
  user-select: none;
`;
import { AiOutlineReload } from "react-icons/ai";
const AiOutlineReloadButton = styled(AiOutlineReload)`
  width: 30px;
  height: 30px;
  padding: 5px;
  flex: 0 0 auto;
  cursor: pointer;
  border-radius: 50%;
  transition:
    transform 300ms ease-in,
    background-color 150ms ease-in;

  &:hover {
    transform: rotate(180deg);
    background-color: #f0f0f0;
  }
`;

const ProblemListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialState: ProblemState = location.state?.initialState ?? "all";
  const initalIsToday: boolean = location.state?.initalIsToday ?? false;
  const date = new Date();

  const [inputText, setInputText] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [tier, setTier] = useState<string>("");
  const [state, setState] = useState<ProblemState>(initialState);
  const [page, setPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>(
    initalIsToday ? date.toISOString().slice(0, 10) : ""
  );
  const [endDate, setEndDate] = useState<string>(
    initalIsToday ? date.toISOString().slice(0, 10) : ""
  );

  const queryState = state === "all" ? "" : state;

  const { data, isLoading, error } = useGetProblemList({
    title: inputText,
    platform,
    tier,
    state: queryState,
    page: page,
    startDate,
    endDate,
  });

  const { data: problemList, totalPages } = data ?? {
    problemList: [],
    total: 0,
    totalPages: 1,
  };

  const platformCategory = ["beakjoon", "programmers"];
  const beakjoonTier = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"];
  const programmersTier = ["level 1", "level 2", "level 3", "level 4"];

  const tierCategory =
    platform === ""
      ? [...beakjoonTier, ...programmersTier]
      : platform === "beakjoon"
        ? beakjoonTier
        : programmersTier;

  const problemCount = data?.total ?? 0;

  useEffect(() => {
    if (location.state) {
      navigate(location.pathname + location.search, {
        replace: true,
        state: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wapper>
      <ProblemListPageContainer>
        <FilterContainer>
          <LeftFilterArea>
            <DropdownFilterRow>
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
            </DropdownFilterRow>

            <DateFilterRow>
              <DateRange>
                <DateInput
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
                <DateDash>—</DateDash>
                <DateInput
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
                <AiOutlineReloadButton
                  size={30}
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                />
              </DateRange>
            </DateFilterRow>
          </LeftFilterArea>

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

        <ProblemListWrapper>
          {isLoading && <StatusMessage>문제 목록을 불러오는 중입니다...</StatusMessage>}
          {error && <StatusMessage>문제를 불러오는 중 오류가 발생했습니다.</StatusMessage>}
          {!isLoading && !error && problemCount === 0 && (
            <StatusMessage>조건에 맞는 문제가 없습니다.</StatusMessage>
          )}
          {problemList?.map((item) => (
            <ProblemItem problem={item} key={item._id} />
          ))}

          <ProblemPagination page={page} totalPages={totalPages} onChange={setPage} />
        </ProblemListWrapper>
      </ProblemListPageContainer>
    </Wapper>
  );
};

export default ProblemListPage;
