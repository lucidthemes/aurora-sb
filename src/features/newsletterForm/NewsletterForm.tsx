import Notification from '@components/Notification';
import Input from '@components/Form/Input';
import Button from '@components/UI/Button';

import useNewsletterForm from './useNewsletterForm';

export default function NewsletterForm({ layout = 'page' }: { layout?: 'page' | 'widget' }) {
  const { register, handleSubmit, onSubmit, errors, newsletterFormNotification, resetNewsletterFormNotification } = useNewsletterForm();

  const newsletterFormClasses = layout === 'widget' ? 'flex-col' : 'flex-col lg:flex-row';

  return (
    <div className="flex flex-col gap-y-5">
      {newsletterFormNotification.type !== '' && (
        <Notification
          type={newsletterFormNotification.type}
          message={newsletterFormNotification.message}
          duration={5000}
          onClose={() => resetNewsletterFormNotification()}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={`flex gap-6 ${newsletterFormClasses}`} aria-label="Newsletter subscribe" noValidate>
        <Input type="email" {...register('email')} placeholder="Email address" label="Email address" error={errors.email?.message} />
        <Button type="submit" className="max-h-12.5">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
