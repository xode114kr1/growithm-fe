import styled from "styled-components";
import { useGetFriendList } from "../../../shared/hooks/useFriend";

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

interface AvatarProps {
  src?: string;
}

const Avatar = styled.img<AvatarProps>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 200ms ease-in;
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

const FriendList = () => {
  const { data: friendList } = useGetFriendList();
  if (friendList?.length == 0) {
    return <div>친구가 없습니다</div>;
  }
  return (
    <FriendListContainer>
      {friendList?.map((friend) => (
        <FriendCard key={friend?._id}>
          <Avatar src={friend?.avatarUrl} />
          <FriendInfo>
            <FriendName>{friend?.name}</FriendName>
            <FriendMeta>{/* 푼 문제 {friend.solved}개 · 현재 티어 {friend.tier} */}</FriendMeta>
          </FriendInfo>
          <FriendAction type="button">상세 보기</FriendAction>
        </FriendCard>
      ))}
    </FriendListContainer>
  );
};

export default FriendList;
