import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import RequireAuth from './components/auth/RequireAuth';
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
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics" element={<PlaceholderPage title="Analytics" />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/messages" element={<MessageCenterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/org" element={<OrgStructurePage />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/audit-logs" element={<AuditLogsPage />} />
        <Route path="/kanban" element={<KanbanPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
