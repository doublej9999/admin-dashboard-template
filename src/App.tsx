import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import RequireAuth from './components/auth/RequireAuth';
import RequirePermission from './components/auth/RequirePermission';
import AuditLogsPage from './pages/AuditLogsPage';
import DashboardPage from './pages/DashboardPage';
import FilesPage from './pages/FilesPage';
import LoginPage from './pages/LoginPage';
import NotificationsPage from './pages/NotificationsPage';
import PlaceholderPage from './pages/PlaceholderPage';
import RolesPage from './pages/RolesPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import KanbanPage from './pages/KanbanPage';
import MessageCenterPage from './pages/MessageCenterPage';
import ProfilePage from './pages/ProfilePage';
import OrgStructurePage from './pages/OrgStructurePage';
import VersionPage from './pages/VersionPage';
import { isAuthed } from './utils/auth';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={isAuthed() ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <RequirePermission permission="dashboard:view">
              <DashboardPage />
            </RequirePermission>
          }
        />
        <Route
          path="/analytics"
          element={
            <RequirePermission permission="analytics:view">
              <PlaceholderPage title="Analytics" />
            </RequirePermission>
          }
        />
        <Route
          path="/users"
          element={
            <RequirePermission permission="users:view">
              <UsersPage />
            </RequirePermission>
          }
        />
        <Route
          path="/roles"
          element={
            <RequirePermission permission="users:edit">
              <RolesPage />
            </RequirePermission>
          }
        />
        <Route
          path="/notifications"
          element={
            <RequirePermission permission="dashboard:view">
              <NotificationsPage />
            </RequirePermission>
          }
        />
        <Route
          path="/messages"
          element={
            <RequirePermission permission="dashboard:view">
              <MessageCenterPage />
            </RequirePermission>
          }
        />
        <Route
          path="/profile"
          element={
            <RequirePermission permission="dashboard:view">
              <ProfilePage />
            </RequirePermission>
          }
        />
        <Route
          path="/org"
          element={
            <RequirePermission permission="dashboard:view">
              <OrgStructurePage />
            </RequirePermission>
          }
        />
        <Route
          path="/version"
          element={
            <RequirePermission permission="dashboard:view">
              <VersionPage />
            </RequirePermission>
          }
        />
        <Route
          path="/files"
          element={
            <RequirePermission permission="dashboard:view">
              <FilesPage />
            </RequirePermission>
          }
        />
        <Route
          path="/audit-logs"
          element={
            <RequirePermission permission="users:edit">
              <AuditLogsPage />
            </RequirePermission>
          }
        />
        <Route
          path="/kanban"
          element={
            <RequirePermission permission="dashboard:view">
              <KanbanPage />
            </RequirePermission>
          }
        />
        <Route
          path="/settings"
          element={
            <RequirePermission permission="settings:view">
              <SettingsPage />
            </RequirePermission>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
