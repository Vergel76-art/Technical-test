import { useMutation } from '@apollo/client/react';
import { LOGIN } from '../graphql/queries';
import type { LoginResponse } from '../types';

interface LoginVars { username: string; password: string }

export function ActionsBar() {
  const [doLogin, { data: loginData, loading: loginLoading, error: loginError }] = useMutation<
    LoginResponse,
    LoginVars
  >(LOGIN);

  const onLogin = () => {
    doLogin({ variables: { username: 'demo', password: 'demo123' } as LoginVars });
  };

  return (
    <div className="mb-4 p-4 bg-white rounded shadow flex flex-col gap-3">
      <div className="flex gap-2">
        <button
          onClick={onLogin}
          disabled={loginLoading}
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loginLoading ? 'Logging in…' : 'Secure Login'}
        </button>
      </div>

      {/* Status area */}
      <div className="text-left text-sm">
        {loginError && (
          <div className="text-red-600">Login error: {loginError.message}</div>
        )}
        {loginData ? (
          <div className="text-green-700">
            Logged in: subject={loginData.login.subject}, role={loginData.login.roles.join(', ')}
          </div>
        ) : null}

        {/* Per-row video actions are available in the table; top-level Start Video removed */}
      </div>
    </div>
  );
}