import styled from "styled-components";
import { useGetFriendList } from "../../../shared/hooks/useFriend";
import ProfileModal from "../../../shared/components/ProfileModal";
import { useState } from "react";

const FriendListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FriendCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 12px 14px;
  border-radius: 14px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.03);

  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

interface AvatarProps {
  src?: string;
}

const Avatar = styled.img<AvatarProps>`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  object-fit: cover;
  background-color: #e5e7eb;
  flex-shrink: 0;
`;

const FriendInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const FriendName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

const FriendMeta = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

const FriendAction = styled.button`
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 13px;
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
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px dashed #e5e7eb;
  background-color: #f9fafb;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`;

const FriendList = () => {
  const { data: friendList } = useGetFriendList();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  if (!friendList || friendList.length === 0) {
    return <EmptyState>아직 친구가 없습니다. 친구를 추가해보세요 👋</EmptyState>;
  }

  return (
    <FriendListContainer>
      {friendList.map((friend) => (
        <FriendCard key={friend?._id}>
          <Avatar src={friend?.avatarUrl} />
          <FriendInfo>
            <FriendName>{friend?.name}</FriendName>
            <FriendMeta>푼 문제 10개 · 현재 티어 Gold</FriendMeta>
          </FriendInfo>
          <FriendAction type="button" onClick={() => setModalOpen(true)}>
            상세 보기
          </FriendAction>
          {modalOpen && <ProfileModal onClose={() => setModalOpen(false)} member={friend} />}
        </FriendCard>
      ))}
    </FriendListContainer>
  );
};

export default FriendList;
