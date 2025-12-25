import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";

import CallbackPage from "../pages/CallbackPage/CallbackPage";

import DashboardPage from "../pages/DashboardPage/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import ProblemListPage from "../pages/ProblemListPage/ProblemListPage";
import SolvedFormPage from "../pages/SolvedFormPage/SolvedFormPage";
import MenualPage from "../pages/MenualPage/MenualPage";

import FriendPage from "../pages/FriendPage/FriendPage";
import StudyListPage from "../pages/StudyListPage/StudyListPage";
import StudyLayout from "../shared/layouts/StudyLayout";
import StudyOverviewPage from "../pages/StudyOverviewPage/StudyOverviewPage";
import StudyProblemPage from "../pages/StudyProblemPage/StudyProblemPage";
import StudyMemberPage from "../pages/StudyMemberPage/StudyMemberPage";
import StudyOwnerPage from "../pages/StudyOwnerPage/StudyOwnerPage";
import OwnerRoute from "./OwnerRoute";
import AppLayout from "../shared/layouts/AppLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard">
            <Route index element={<DashboardPage />} />
            <Route path="menual" element={<MenualPage />} />
          </Route>
          <Route path="/problem" element={<ProblemListPage />} />
          <Route path="/problem/:id" element={<SolvedFormPage />} />
          <Route path="/friend" element={<FriendPage />} />
          <Route path="/study" element={<StudyListPage />} />
          <Route path="study/:id" element={<StudyLayout />}>
            <Route path="overview" element={<StudyOverviewPage />} />
            <Route path="problem" element={<StudyProblemPage />} />
            <Route path="member" element={<StudyMemberPage />} />
            <Route element={<OwnerRoute />}>
              <Route path="owner" element={<StudyOwnerPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
