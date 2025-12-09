import styled from "styled-components";
import { useAuthStore } from "../../../stores/authStore";
import type { BeakjoonTierType } from "../../../types/problemType";

const TIER_GRADIENT: Record<BeakjoonTierType, string> = {
  bronze: "linear-gradient(135deg, #CC8846, #9E6430)",
  silver: "linear-gradient(135deg, #D9D9D9, #A6A6A6)",
  gold: "linear-gradient(135deg, #FFE56E, #D9B300)",
  platinum: "linear-gradient(135deg, #DDEBFF, #BBD1E8)",
  diamond: "linear-gradient(135deg, #A0FFF0, #59D6C8)",
  ruby: "linear-gradient(135deg, #FF4F7A, #B80D4F)",
};

interface ProfileProps {
  src?: string;
}

interface TierContainerProps {
  tier: BeakjoonTierType;
}

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  background: #fff;
  width: 100%;
  /* height: 80%; */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const ProfileImg = styled.div<ProfileProps>`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const ProfileName = styled.div`
  font-size: 23px;
  font-weight: 500;
  color: #2d3436;
`;

const ProfileRepo = styled.div`
  flex: 1;
  font-size: 16px;
  color: #866e72;
  margin-bottom: 15px;
`;

const TierContainer = styled.div<TierContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 40px;
  background: ${({ tier }) => TIER_GRADIENT[tier] || TIER_GRADIENT.bronze};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

const ProfileCard = () => {
  const user = useAuthStore((s) => s.user);
  return (
    <ProfileCardContainer>
      <ProfileImg src={user?.avatarUrl} />
      <ProfileName>{user?.name}</ProfileName>
      <ProfileRepo>{user?.repo}</ProfileRepo>
      <TierContainer tier="gold">Gold</TierContainer>
    </ProfileCardContainer>
  );
};

export default ProfileCard;
