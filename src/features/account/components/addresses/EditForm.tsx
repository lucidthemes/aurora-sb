import { Dispatch, SetStateAction } from 'react';
import type { User } from '@supabase/supabase-js';

import Input from '@components/Form/Input';
import Select from '@components/Form/Select';
import Button from '@components/UI/Button';
import type { FormNotification } from '@typings/forms/notification';

import useEditForm from '../../hooks/addresses/useEditForm';

interface EditFormProps {
  user: User | null;
  section: 'shipping' | 'billing';
  handleShippingEditShow?: () => void;
  handleBillingEditShow?: () => void;
  setShippingFormNotification?: Dispatch<SetStateAction<FormNotification>>;
  setBillingFormNotification?: Dispatch<SetStateAction<FormNotification>>;
}

export default function EditForm({
  user,
  section,
  handleShippingEditShow,
  handleBillingEditShow,
  setShippingFormNotification,
  setBillingFormNotification,
}: EditFormProps) {
  const { register, handleSubmit, onSubmit, errors } = useEditForm(
    user,
    section,
    handleShippingEditShow,
    handleBillingEditShow,
    setShippingFormNotification,
    setBillingFormNotification
  );

  const countryOptions = [{ value: 'GB', text: 'United Kingdom (UK)' }];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6" aria-label={`${section} address`} noValidate>
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="sm:basis-1/2">
          <Input
            type="text"
            {...register('firstName')}
            placeholder="First name"
            label="First name"
            autoComplete="given-name"
            error={errors.firstName?.message}
          />
        </div>
        <div className="sm:basis-1/2">
          <Input type="text" {...register('lastName')} placeholder="Last name" label="Last name" autoComplete="family-name" error={errors.lastName?.message} />
        </div>
      </div>
      <Select
        options={countryOptions}
        {...register('country')}
        placeholder="Select a country/region"
        label="Select a country/region"
        autoComplete="country"
        error={errors.country?.message}
      />
      <Input
        type="text"
        {...register('addressLine1')}
        placeholder="Address line 1"
        autoComplete="address-line1"
        label="Address line 1"
        error={errors.addressLine1?.message}
      />
      <Input
        type="text"
        {...register('addressLine2')}
        placeholder="Address line 2"
        autoComplete="address-line2"
        label="Address line 2"
        error={errors.addressLine2?.message}
      />
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="sm:basis-1/2">
          <Input type="text" {...register('city')} placeholder="City" label="City" autoComplete="address-level2" error={errors.city?.message} />
        </div>
        <div className="sm:basis-1/2">
          <Input
            type="text"
            {...register('county')}
            placeholder="County (optional)"
            label="County (optional)"
            autoComplete="address-level1"
            error={errors.county?.message}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="sm:basis-1/2">
          <Input type="text" {...register('postcode')} placeholder="Postcode" label="Postcode" autoComplete="postal-code" error={errors.postcode?.message} />
        </div>
        <div className="sm:basis-1/2">
          <Input type="text" {...register('phone')} placeholder="Phone (optional)" label="Phone (optional)" autoComplete="tel" error={errors.phone?.message} />
        </div>
      </div>
      <Button type="submit" className="max-w-fit">
        Save changes
      </Button>
    </form>
  );
}
