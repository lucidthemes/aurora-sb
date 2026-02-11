import { Link } from 'react-router-dom';

import { useAuthContext } from '@contexts/AuthContext';

export default function Dashboard() {
  const { user, signOut } = useAuthContext();

  const userEmail = user?.email;

  return (
    <>
      <p className="mb-5">
        Hello {userEmail} (not {userEmail}?{' '}
        <Link to="" onClick={signOut} className="underline">
          Log out
        </Link>
        )
      </p>
      <p>
        From your account dashboard you can view your{' '}
        <Link to="/account/orders" className="underline">
          recent orders
        </Link>
        , manage your{' '}
        <Link to="/account/address" className="underline">
          shipping and billing addresses
        </Link>
        , and{' '}
        <Link to="/account/details" className="underline">
          edit your password and account details
        </Link>
        .
      </p>
    </>
  );
}
