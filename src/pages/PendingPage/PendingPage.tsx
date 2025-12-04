import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import { useState } from "react";
import { useGetPendingList } from "../../shared/hooks/useProblem";
import PendingLargeItem from "./components/PendingLargeItem";

const PendingPageContainer = styled.section`
  width: 80%;
  height: 100%;
  margin: 0 10%;
  padding: 60px 0;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0px 20px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 10px;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const DropdownMenu = styled.select`
  width: 150px;
  height: 35px;
  border-radius: 8px;
  border: 1px solid #2d3436;
  font-size: 17px;
  font-weight: 400;
  color: #2d3436;
  text-align: center;
`;

const TextInput = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 8px;
  border: 1px solid #2d3436;
  font-size: 17px;
  text-align: center;
  color: #2d3436;
`;

const PendingPage = () => {
  const [inputText, setInputText] = useState<string>("");

  const { data: pendingList, isLoading, error } = useGetPendingList();

  return (
    <Wapper>
      <PendingPageContainer>
        <FilterContainer>
          <DropdownContainer>
            <DropdownMenu>
              <option value="선택">선택</option>
              <option value="beakjoon">Beakjoon</option>
              <option value="programmers">Programmers</option>
            </DropdownMenu>
            <DropdownMenu>
              <option value="선택">선택</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
              <option value="diamond">Diamond</option>
              <option value="ruby">Ruby</option>
            </DropdownMenu>
          </DropdownContainer>
          <TextInput
            placeholder="검색"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </FilterContainer>
        {pendingList?.map((item) => (
          <PendingLargeItem pendingProblem={item} />
        ))}
      </PendingPageContainer>
    </Wapper>
  );
};

export default PendingPage;
