import { Navigate, Outlet, useLocation, useOutletContext, useParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import type { Study } from "../types/studyType";

interface StudyOutletContext {
  study: Study;
}

const OwnerRouter = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const { study } = useOutletContext<StudyOutletContext>();

  const isOwner = study?.owner?._id === user?._id;

  if (!isOwner) {
    return <Navigate to={`/study/${id}/overview`} state={{ from: location }} replace />;
  }

  return <Outlet context={{ study }} />;
};

export default OwnerRouter;
