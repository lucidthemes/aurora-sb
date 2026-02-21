import { useAuthContext } from '@contexts/AuthContext';
import Notification from '@components/Notification';

import useAddresses from '../../hooks/addresses/useAddresses';
import Address from './Address';
import EditForm from './EditForm';

export default function Addresses() {
  const { user } = useAuthContext();

  const userId = user?.id ?? '';

  const {
    shippingEditShow,
    billingEditShow,
    handleShippingEditShow,
    handleBillingEditShow,
    shippingFormNotification,
    billingFormNotification,
    setShippingFormNotification,
    setBillingFormNotification,
    resetShippingFormNotification,
    resetBillingFormNotification,
    addressesQuery,
  } = useAddresses(userId);

  const firstName = addressesQuery.data?.firstName;
  const lastName = addressesQuery.data?.lastName;
  const shippingAddress = addressesQuery.data?.shippingAddress;
  const billingAddress = addressesQuery.data?.billingAddress;

  return (
    <div className="flex flex-col gap-y-5">
      <p>The following addresses will be used on the checkout page by default.</p>
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex basis-1/2 flex-col gap-y-5">
          <div className="flex flex-wrap justify-between gap-y-2.5">
            <h2>Shipping address</h2>
            <button onClick={handleShippingEditShow} className="cursor-pointer text-lg text-boulder capitalize hover:text-shark">
              {!shippingEditShow ? 'edit' : 'cancel'}
            </button>
          </div>
          <div className="flex flex-col gap-y-5">
            {shippingFormNotification.type !== '' && (
              <Notification
                type={shippingFormNotification.type}
                message={shippingFormNotification.message}
                duration={10000}
                onClose={() => resetShippingFormNotification()}
              />
            )}
            {!shippingEditShow ? (
              <>{!addressesQuery.isPending && shippingAddress ? <Address address={shippingAddress} /> : <p>You have not set up a shipping address yet</p>}</>
            ) : (
              <EditForm
                user={user}
                section="shipping"
                firstName={firstName}
                lastName={lastName}
                shippingAddress={shippingAddress}
                billingAddress={billingAddress}
                handleShippingEditShow={handleShippingEditShow}
                setShippingFormNotification={setShippingFormNotification}
              />
            )}
          </div>
        </div>
        <div className="flex basis-1/2 flex-col gap-y-5">
          <div className="flex flex-wrap justify-between gap-y-2.5">
            <h2>Billing address</h2>
            <button onClick={handleBillingEditShow} className="cursor-pointer text-lg text-boulder capitalize hover:text-shark">
              {!billingEditShow ? 'edit' : 'cancel'}
            </button>
          </div>
          <div className="flex flex-col gap-y-5">
            {billingFormNotification.type !== '' && (
              <Notification
                type={billingFormNotification.type}
                message={billingFormNotification.message}
                duration={10000}
                onClose={() => resetBillingFormNotification()}
              />
            )}
            {!billingEditShow ? (
              <>{!addressesQuery.isPending && billingAddress ? <Address address={billingAddress} /> : <p>You have not set up a billing address yet</p>}</>
            ) : (
              <EditForm
                user={user}
                section="billing"
                firstName={firstName}
                lastName={lastName}
                shippingAddress={shippingAddress}
                billingAddress={billingAddress}
                handleBillingEditShow={handleBillingEditShow}
                setBillingFormNotification={setBillingFormNotification}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
