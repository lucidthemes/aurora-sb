import { Link } from 'react-router-dom';

import { useAuthContext } from '@contexts/AuthContext';

export default function Nav() {
  const { signOut } = useAuthContext();

  return (
    <nav className="max-h-fit basis-1/4 rounded-md bg-white p-5 md:p-7.5 lg:p-10">
      <ul className="flex flex-col gap-y-7.5 text-sm tracking-xwide uppercase">
        <li>
          <Link to="/account" className="text-shark transition-colors duration-300 ease-in-out hover:text-boulder">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/account/orders" className="text-shark transition-colors duration-300 ease-in-out hover:text-boulder">
            Orders
          </Link>
        </li>
        <li>
          <Link to="/account/addresses" className="text-shark transition-colors duration-300 ease-in-out hover:text-boulder">
            Addresses
          </Link>
        </li>
        <li>
          <Link to="/account/details" className="text-shark transition-colors duration-300 ease-in-out hover:text-boulder">
            Details
          </Link>
        </li>
        <li>
          <Link to="" onClick={signOut} className="text-shark transition-colors duration-300 ease-in-out hover:text-boulder">
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
}
