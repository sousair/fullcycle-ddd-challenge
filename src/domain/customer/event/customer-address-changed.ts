import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

type CustomerAddressChangedEventData = {
  updatedCustomer: Customer;
}

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerAddressChangedEventData;

  constructor (data: CustomerAddressChangedEventData) {
    this.dataTimeOccurred = new Date();
    this.eventData = data;
  }
}