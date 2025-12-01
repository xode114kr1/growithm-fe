import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useAuthStore } from "../../stores/authStore";

interface ProfileProps {
  src?: string;
}

const HeaderContanier = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: white;
  z-index: 9999;
`;

const StyledFaBars = styled(FaBars)`
  position: absolute;
  left: 20px;
  top: 50%;
  width: 25px;
  height: 25px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Logo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  font-weight: 800;
  color: #6c5ce7;
  cursor: pointer;
  transition: 300ms ease-in;

  &:hover {
    transform: translateY(-55%) translateX(-50%);
  }
`;

const LoginButton = styled.button`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #191d23;
  border: none;
  color: white;
  border-radius: 8px;
  width: 70px;
  height: 40px;
  font-size: 16px;
  transition: 200ms ease-in;

  &:hover {
    opacity: 0.8;
  }
`;

const Profile = styled.div<ProfileProps>`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 200ms ease-in;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log(user);
  return (
    <HeaderContanier>
      <StyledFaBars />
      <Logo onClick={() => navigate("/")}>GROWITHM</Logo>

      {!isAuthenticated ? <LoginButton>로그인</LoginButton> : <Profile src={user?.avatarUrl} />}
    </HeaderContanier>
  );
};

export default Header;
