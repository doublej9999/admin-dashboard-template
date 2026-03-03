import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import CommandPalette from '../common/CommandPalette';

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const hotkey = isMac ? event.metaKey : event.ctrlKey;
      if (hotkey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-full bg-base-50 dark:bg-base-900">
      <div className="flex h-full">
        <div className="hidden lg:block">
          <Sidebar collapsed={collapsed} onCollapse={() => setCollapsed((prev) => !prev)} />
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}
        <div
          className={`fixed z-50 inset-y-0 left-0 lg:hidden transition-transform duration-200 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar collapsed={false} onCollapse={() => setMobileOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onMenuClick={() => setMobileOpen(true)} onCommandClick={() => setCommandOpen(true)} />
          <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-6">
            <Outlet />
          </main>
        </div>
      </div>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
};

export default AppLayout;
