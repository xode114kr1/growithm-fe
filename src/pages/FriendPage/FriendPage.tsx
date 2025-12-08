import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import { useState } from "react";
import { useSendFriendRequestMutation } from "../../shared/hooks/useFriendRequest";

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
`;

const AddFriendArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const AddFriendLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #4b5563;
`;

const AddFriendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RequestToggle = styled.div`
  display: inline-flex;
  padding: 4px;
  border-radius: 999px;
  background-color: #e5e7eb;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;

  background-color: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  color: ${({ $active }) => ($active ? "#4f46e5" : "#4b5563")};
  box-shadow: ${({ $active }) => ($active ? "0 2px 6px rgba(148, 163, 184, 0.4)" : "none")};

  transition:
    background-color 0.15s ease-in-out,
    color 0.15s ease-in-out,
    box-shadow 0.12s ease-in-out,
    transform 0.05s ease-in-out;

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
  gap: 16px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;

  input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 13px;
    background: transparent;
    color: #111827;

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

const SearchIcon = styled.span`
  font-size: 14px;
  color: #9ca3af;
`;

const AddFriendButton = styled.button`
  padding: 8px 14px;
  border-radius: 999px;
  border: none;
  font-size: 13px;
  font-weight: 500;
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
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const SectionSub = styled.span`
  font-size: 12px;
  color: #9ca3af;
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FriendCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 10px 12px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
`;

const Avatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: linear-gradient(135deg, #a855f7, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  color: #f9fafb;
`;

const FriendInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const FriendName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const FriendMeta = styled.div`
  font-size: 11px;
  color: #6b7280;
`;

const FriendAction = styled.button`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 11px;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    transform 0.05s ease-in-out;

  &:hover {
    background: #eef2ff;
    border-color: #c7d2fe;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  margin-top: 4px;
  padding: 16px 14px;
  border-radius: 12px;
  border: 1px dashed #e5e7eb;
  background-color: #f9fafb;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
`;

const FriendPage = () => {
  const [friendName, setFriendName] = useState<string>("");
  const [state, setState] = useState<"all" | "wait" | "send">("all");

  const { mutate: sendFriendRequest } = useSendFriendRequestMutation();

  const dummyFriends = [
    { id: 1, name: "yuki0", solved: 320, tier: "Gold 3" },
    { id: 2, name: "baekcoder", solved: 210, tier: "Silver 1" },
    { id: 3, name: "algomaster", solved: 580, tier: "Platinum 5" },
  ];

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
            <AddFriendLabel>친구 추가</AddFriendLabel>
            <AddFriendRow>
              <SearchBox>
                <SearchIcon>🔍</SearchIcon>
                <input
                  placeholder="닉네임 또는 백준 ID로 친구 검색"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                />
              </SearchBox>
              <AddFriendButton onClick={handleAddFriendButton}>추가</AddFriendButton>
            </AddFriendRow>
          </AddFriendArea>

          <RequestToggle>
            <ToggleButton $active={state == "all"} onClick={() => setState("all")}>
              내 친구
            </ToggleButton>
            <ToggleButton $active={state == "wait"} onClick={() => setState("wait")}>
              요청 대기
            </ToggleButton>
            <ToggleButton $active={state == "send"} onClick={() => setState("send")}>
              보낸 요청
            </ToggleButton>
          </RequestToggle>
        </TopRow>

        <Section>
          <SectionHeader>
            <SectionTitle>내 친구</SectionTitle>
            <SectionSub>{dummyFriends.length}명</SectionSub>
          </SectionHeader>

          {dummyFriends.length > 0 ? (
            <FriendList>
              {dummyFriends.map((friend) => (
                <FriendCard key={friend.id}>
                  <Avatar>{friend.name.charAt(0).toUpperCase()}</Avatar>
                  <FriendInfo>
                    <FriendName>{friend.name}</FriendName>
                    <FriendMeta>
                      푼 문제 {friend.solved}개 · 현재 티어 {friend.tier}
                    </FriendMeta>
                  </FriendInfo>
                  <FriendAction type="button">상세 보기</FriendAction>
                </FriendCard>
              ))}
            </FriendList>
          ) : (
            <EmptyState>
              아직 등록된 친구가 없습니다.
              <br />
              상단의 &ldquo;친구 추가&rdquo; 버튼을 눌러 함께 공부할 친구를 추가해보세요.
            </EmptyState>
          )}
        </Section>
      </FriendPageContainer>
    </Wapper>
  );
};

export default FriendPage;
