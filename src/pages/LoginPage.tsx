import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../contexts/useI18n';
import { login } from '../utils/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError(t('login.errorInvalid'));
      return;
    }
    const redirectTo = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen bg-base-50 dark:bg-base-900 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 density-pad">
        <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-10 density-pad text-white shadow-card density-pad hidden md:block">
          <p className="text-sm text-white/70">{t('login.brandTitle')}</p>
          <h1 className="mt-4 text-3xl font-semibold">{t('login.welcome')}</h1>
          <p className="mt-4 text-sm text-white/80">
            {t('login.welcomeDesc')}
          </p>
          <div className="mt-10 card-shell bg-white/10 p-4 density-pad text-sm">
            <p className="font-semibold">{t('login.demoAccount')}</p>
            <p>{t('login.demoUsername')}</p>
            <p>{t('login.demoPassword')}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-8 density-pad shadow-card density-pad">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('login.title')}</h2>
            <p className="text-sm text-base-500">{t('login.subtitle')}</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} aria-label="Login form">
            <div>
              <label className="text-sm text-base-500" htmlFor="login-username">{t('login.username')}</label>
              <input
                id="login-username"
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="admin"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="text-sm text-base-500" htmlFor="login-password">{t('login.password')}</label>
              <input
                id="login-password"
                type="password"
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="admin123"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 density-pad text-base-500">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-4 w-4 rounded border-base-300"
                />
                {t('login.remember')}
              </label>
              <button type="button" className="text-brand-500">
                {t('login.forgot')}
              </button>
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white shadow-card density-pad hover:bg-brand-600"
            >
              {t('login.button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
