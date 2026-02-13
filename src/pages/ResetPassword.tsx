import { useLocation, Navigate } from 'react-router-dom';

import Container from '@components/Layout/Container';
import { useAuthContext } from '@contexts/AuthContext';
import ResetPasswordForm from '@features/auth/ResetPasswordForm';

export default function ResetPassword() {
  const { user } = useAuthContext();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/account';

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-5 rounded-md bg-white p-5 md:p-7.5 lg:p-10">
        <h2>Reset password</h2>
        <p>Please enter your new password below.</p>
        <ResetPasswordForm />
      </div>
    </Container>
  );
}
