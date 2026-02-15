import { useAuthContext } from '@contexts/AuthContext';

import Email from './Email';

export default function Details() {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col gap-y-10">
      <Email user={user} />
    </div>
  );
}
