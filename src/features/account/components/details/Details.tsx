import { useAuthContext } from '@contexts/AuthContext';

import Name from './Name';
import Email from './Email';
import Password from './Password';

export default function Details() {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col gap-y-10">
      <Name user={user} />
      <Email user={user} />
      <Password />
    </div>
  );
}
