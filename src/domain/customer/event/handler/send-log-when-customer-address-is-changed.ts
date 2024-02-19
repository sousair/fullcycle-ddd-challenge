import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import CustomerAddressChangedEvent from '../customer-address-changed';

export default class SendLogWhenCustomerAddressIsChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  async handle(event: CustomerAddressChangedEvent): Promise<void> {
    const customer = event.eventData.updatedCustomer;

    console.log(
      `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: "${customer.Address.street}, ${customer.Address.number} - ${customer.Address.zip}, ${customer.Address.city}"`
    );
  }
}
