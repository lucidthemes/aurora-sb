import type { User } from '@supabase/supabase-js';

import Notification from '@components/Notification';

import useEmail from '../../hooks/details/useEmail';
import EmailForm from './EmailForm';

export default function Email({ user }: { user: User | null }) {
  const { emailEditShow, handleEmailEditShow, emailFormNotification, setEmailFormNotification, resetEmailFormNotification } = useEmail();

  return (
    <div className="flex basis-1/2 flex-col gap-y-5">
      <div className="flex flex-wrap justify-between gap-y-2.5">
        <h2>Email address</h2>
        <button onClick={handleEmailEditShow} className="cursor-pointer text-lg text-boulder capitalize hover:text-shark">
          {!emailEditShow ? 'edit' : 'cancel'}
        </button>
      </div>
      <div className="flex flex-col gap-y-5">
        {emailFormNotification.type !== '' && (
          <Notification
            type={emailFormNotification.type}
            message={emailFormNotification.message}
            duration={10000}
            onClose={() => resetEmailFormNotification()}
          />
        )}
        {!emailEditShow ? (
          <p>{user?.email}</p>
        ) : (
          <EmailForm user={user} handleEmailEditShow={handleEmailEditShow} setEmailFormNotification={setEmailFormNotification} />
        )}
      </div>
    </div>
  );
}
