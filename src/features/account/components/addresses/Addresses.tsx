import { useAuthContext } from '@contexts/AuthContext';
import Notification from '@components/Notification';

import useAddresses from '../../hooks/addresses/useAddresses';
import Address from './Address';
import EditForm from './EditForm';

export default function Addresses() {
  const { user } = useAuthContext();

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
  } = useAddresses();

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
              <Address section="shipping" />
            ) : (
              <EditForm
                user={user}
                section="shipping"
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
              <Address section="billing" />
            ) : (
              <EditForm user={user} section="billing" handleBillingEditShow={handleBillingEditShow} setBillingFormNotification={setBillingFormNotification} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
