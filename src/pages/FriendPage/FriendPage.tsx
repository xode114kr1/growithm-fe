import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import { useState } from "react";
import { useSendFriendRequestMutation } from "../../shared/hooks/useFriendRequest";
import FriendList from "./components/FriendList";
import FriendRequestList from "./components/FriendRequestList";

const FriendPageContainer = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 92%;
    padding: 40px 0 40px;
    gap: 18px;
  }
`;

const AddFriendArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddFriendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const RequestToggle = styled.div`
  display: inline-flex;
  padding: 6px;
  border-radius: 999px;
  background-color: #e5e7eb;
  gap: 6px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  border: none;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;

  background-color: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  color: ${({ $active }) => ($active ? "#4f46e5" : "#4b5563")};
  box-shadow: ${({ $active }) => ($active ? "0 2px 6px rgba(148,163,184,0.4)" : "none")};

  transition:
    background-color 0.15s ease-in-out,
    color 0.15s ease-in-out,
    box-shadow 0.12s ease-in-out,
    transform 0.05s ease-in-out;

  flex: 0 0 auto;
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;

  flex: 1;
  min-width: 240px;

  input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 16px;
    background: transparent;
    color: #111827;

    &::placeholder {
      color: #9ca3af;
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
  }
`;

const SearchIcon = styled.span`
  font-size: 17px;
  color: #9ca3af;
`;

const AddFriendButton = styled.button`
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  background: #4f46e5;
  color: #f9fafb;
  transition:
    background 0.15s ease-in-out,
    transform 0.05s ease-in-out,
    box-shadow 0.12s ease-in-out;

  &:hover {
    background: #4338ca;
    box-shadow: 0 3px 8px rgba(79, 70, 229, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FriendPage = () => {
  const [friendName, setFriendName] = useState<string>("");
  const [state, setState] = useState<"friend" | "send" | "receive">("friend");

  const { mutate: sendFriendRequest } = useSendFriendRequestMutation();

  const handleAddFriendButton = async () => {
    sendFriendRequest(
      { friendName },
      {
        onSuccess: () => {
          setFriendName("");
        },
      }
    );
  };

  return (
    <Wapper>
      <FriendPageContainer>
        <TopRow>
          <AddFriendArea>
            <AddFriendRow>
              <SearchBox>
                <SearchIcon>🔍</SearchIcon>
                <input
                  placeholder="백준 ID로 친구 검색"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                />
              </SearchBox>
              <AddFriendButton onClick={handleAddFriendButton}>추가</AddFriendButton>
            </AddFriendRow>
          </AddFriendArea>

          <RequestToggle>
            <ToggleButton $active={state == "friend"} onClick={() => setState("friend")}>
              내 친구
            </ToggleButton>
            <ToggleButton $active={state == "receive"} onClick={() => setState("receive")}>
              수락 대기
            </ToggleButton>
            <ToggleButton $active={state == "send"} onClick={() => setState("send")}>
              보낸 요청
            </ToggleButton>
          </RequestToggle>
        </TopRow>

        <Section>
          {state == "friend" && <FriendList />}
          {state != "friend" && <FriendRequestList state={state} />}
        </Section>
      </FriendPageContainer>
    </Wapper>
  );
};

export default FriendPage;
