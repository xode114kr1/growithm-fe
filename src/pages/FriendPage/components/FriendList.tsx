import styled from "styled-components";
import { useDeleteFriendMutation, useGetFriendList } from "../../../shared/hooks/useFriend";
import ProfileModal from "../../../shared/components/ProfileModal";
import { useState } from "react";
import { calculateTier } from "../../../shared/utils/tier";
import { FiSearch } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

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

const EmptyState = styled.div`
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px dashed #e5e7eb;
  background-color: #f9fafb;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`;

const FiSearchButton = styled(FiSearch)`
  cursor: pointer;

  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;

const FiTrash2Button = styled(FiTrash2)`
  cursor: pointer;

  color: #ef4444;

  &:hover {
    color: #dc2626;
  }
`;

const FriendList = () => {
  const { data: friendList } = useGetFriendList();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { mutate: deleteFriend } = useDeleteFriendMutation();

  if (!friendList || friendList.length === 0) {
    return <EmptyState>아직 친구가 없습니다. 친구를 추가해보세요 👋</EmptyState>;
  }

  const handleDeleteButton = async (friendId: string) => {
    await deleteFriend({ friendId });
  };

  return (
    <FriendListContainer>
      {friendList.map((friend) => (
        <FriendCard key={friend?._id}>
          <Avatar src={friend?.avatarUrl} />
          <FriendInfo>
            <FriendName>{friend?.name}</FriendName>
            <FriendMeta>현재 티어 {calculateTier(friend?.score || 0)}</FriendMeta>
          </FriendInfo>

          <FiSearchButton size={23} onClick={() => setModalOpen(true)} />
          <FiTrash2Button size={23} onClick={() => handleDeleteButton(friend?._id)} />

          {modalOpen && <ProfileModal onClose={() => setModalOpen(false)} member={friend} />}
        </FriendCard>
      ))}
    </FriendListContainer>
  );
};

export default FriendList;
