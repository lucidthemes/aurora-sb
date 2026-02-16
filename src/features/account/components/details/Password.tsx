import Notification from '@components/Notification';

import usePassword from '../../hooks/details/usePassword';
import PasswordForm from './PasswordForm';

export default function Password() {
  const { passwordEditShow, handlePasswordEditShow, passwordFormNotification, setPasswordFormNotification, resetPasswordFormNotification } = usePassword();

  return (
    <div className="flex basis-1/2 flex-col gap-y-5">
      <div className="flex flex-wrap justify-between gap-y-2.5">
        <h2>Password</h2>
        <button onClick={handlePasswordEditShow} className="cursor-pointer text-lg text-boulder capitalize hover:text-shark">
          {!passwordEditShow ? 'edit' : 'cancel'}
        </button>
      </div>
      <div className="flex flex-col gap-y-5">
        {passwordFormNotification.type !== '' && (
          <Notification
            type={passwordFormNotification.type}
            message={passwordFormNotification.message}
            duration={10000}
            onClose={() => resetPasswordFormNotification()}
          />
        )}
        {!passwordEditShow ? (
          <div className="flex gap-1">
            {Array.from({ length: 6 }).map((index: any) => (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-2 w-2" key={index}>
                <path d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320z" />
              </svg>
            ))}
          </div>
        ) : (
          <PasswordForm handlePasswordEditShow={handlePasswordEditShow} setPasswordFormNotification={setPasswordFormNotification} />
        )}
      </div>
    </div>
  );
}
