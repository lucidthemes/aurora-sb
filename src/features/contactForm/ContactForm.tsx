import Notification from '@components/Notification';
import Input from '@components/Form/Input';
import Textarea from '@components/Form/Textarea';
import Button from '@components/UI/Button';

import useContactForm from './useContactForm';

export default function ContactForm() {
  const { register, handleSubmit, onSubmit, errors, contactFormNotification, resetContactFormNotification } = useContactForm();

  return (
    <div className="mt-10 flex flex-col gap-y-10 rounded-md bg-white p-5 md:p-7.5 lg:p-10">
      {contactFormNotification.type !== '' && (
        <Notification
          type={contactFormNotification.type}
          message={contactFormNotification.message}
          duration={5000}
          onClose={() => resetContactFormNotification()}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6" aria-label="Contact us" noValidate>
        <Input type="text" {...register('name')} placeholder="Name" label="Name" error={errors.name?.message} />
        <Input type="email" {...register('email')} placeholder="Email address" label="Email address" error={errors.email?.message} />
        <Input type="text" {...register('subject')} placeholder="Subject" label="Subject" error={errors.subject?.message} />
        <Textarea type="text" {...register('message')} placeholder="Message" label="Message" error={errors.message?.message} />
        <Button type="submit" className="max-w-fit">
          Send message
        </Button>
      </form>
    </div>
  );
}
