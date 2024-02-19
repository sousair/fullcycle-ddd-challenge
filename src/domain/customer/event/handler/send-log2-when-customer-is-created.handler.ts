import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendLog2WhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  async handle(_: CustomerCreatedEvent): Promise<void> {
    console.log("Esse é o segundo console.log do evento: CustomerCreated")
  }
}