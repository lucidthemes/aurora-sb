import type { User } from '@supabase/supabase-js';

import Notification from '@components/Notification';

import useName from '../../hooks/details/useName';
import NameForm from './NameForm';

export default function Name({ user }: { user: User | null }) {
  const { nameEditShow, handleNameEditShow, nameFormNotification, setNameFormNotification, resetNameFormNotification } = useName();

  return (
    <div className="flex basis-1/2 flex-col gap-y-5">
      <div className="flex flex-wrap justify-between gap-y-2.5">
        <h2>Name</h2>
        <button onClick={handleNameEditShow} className="cursor-pointer text-lg text-boulder capitalize hover:text-shark">
          {!nameEditShow ? 'edit' : 'cancel'}
        </button>
      </div>
      <div className="flex flex-col gap-y-5">
        {nameFormNotification.type !== '' && (
          <Notification type={nameFormNotification.type} message={nameFormNotification.message} duration={10000} onClose={() => resetNameFormNotification()} />
        )}
        {!nameEditShow ? (
          <div className="flex gap-1.5">
            <p>Matthew</p>
            <p>James</p>
          </div>
        ) : (
          <NameForm user={user} handleNameEditShow={handleNameEditShow} setNameFormNotification={setNameFormNotification} />
        )}
      </div>
    </div>
  );
}
