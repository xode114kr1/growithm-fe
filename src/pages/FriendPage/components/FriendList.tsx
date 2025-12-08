import styled from "styled-components";

const FriendListContainer = styled.div`
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

const dummyFriends = [
  { id: 1, name: "yuki0", solved: 320, tier: "Gold 3" },
  { id: 2, name: "baekcoder", solved: 210, tier: "Silver 1" },
  { id: 3, name: "algomaster", solved: 580, tier: "Platinum 5" },
];

const FriendList = () => {
  return (
    <FriendListContainer>
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
    </FriendListContainer>
  );
};

export default FriendList;
