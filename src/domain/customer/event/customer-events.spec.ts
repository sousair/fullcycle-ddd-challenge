import EventDispatcher from '../../@shared/event/event-dispatcher';
import Customer from '../entity/customer';
import Address from '../value-object/address';
import CustomerAddressChangedEvent from './customer-address-changed';
import CustomerCreatedEvent from './customer-created.event';
import SendLogWhenCustomerAddressIsChangedHandler from './handler/send-log-when-customer-address-is-changed';
import SendLog1WhenCustomerIsCreatedHandler from './handler/send-log1-when-customer-is-created.handler';
import SendLog2WhenCustomerIsCreatedHandler from './handler/send-log2-when-customer-is-created.handler';

describe('Customer Events', () => {
  let eventDispatcher: EventDispatcher;
  let customer: Customer;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();

    customer = new Customer('1', 'Customer 1');
    const customerAddress = new Address('Street 1', 123, '12345', 'City 1');
    customer.changeAddress(customerAddress);
  });

  describe('CustomerCreatedEvent', () => {
    it('should notify all handlers when a customer is created', () => {
      const handler1 = new SendLog1WhenCustomerIsCreatedHandler();
      const handler2 = new SendLog2WhenCustomerIsCreatedHandler();

      eventDispatcher.register('CustomerCreatedEvent', handler1);
      eventDispatcher.register('CustomerCreatedEvent', handler2);

      const handler1Spy = jest.spyOn(handler1, 'handle');
      const handler2Spy = jest.spyOn(handler2, 'handle');


      eventDispatcher.notify(new CustomerCreatedEvent({}));

      expect(handler1Spy).toHaveBeenCalledTimes(1);
      expect(handler2Spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('CustomerAddressChangedEvent', () => {
    it('should notify all handlers when a customer address is changed', () => {
      const handler = new SendLogWhenCustomerAddressIsChangedHandler();

      eventDispatcher.register('CustomerAddressChangedEvent', handler);

      const handlerSpy = jest.spyOn(handler, 'handle');

      const event = new CustomerAddressChangedEvent({
        updatedCustomer: customer,
      })

      eventDispatcher.notify(event);

      expect(handlerSpy).toHaveBeenCalledTimes(1);
    });
  });
});
