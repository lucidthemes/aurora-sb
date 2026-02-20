import type { Address } from '@schemas/shop/address.schema';

export default function Address({ address }: { address?: Address }) {
  if (!address) return;

  let country = '';

  if (address?.country) {
    switch (address.country) {
      case 'GB':
        country = 'United Kingdom';
        break;
    }
  }

  return (
    <address className="not-italic">
      <div className="flex gap-1.5">
        {address.firstName && <p>{address.firstName}</p>}
        {address.lastName && <p>{address.lastName}</p>}
      </div>
      {address.addressLine1 && <p>{address.addressLine1}</p>}
      {address.addressLine2 && <p>{address.addressLine2}</p>}
      {address.city && <p>{address.city}</p>}
      {address.county && <p>{address.county}</p>}
      {address.postcode && <p>{address.postcode}</p>}
      {country && <p>{country}</p>}
      {address.phone && <p>{address.phone}</p>}
    </address>
  );
}
