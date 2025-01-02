import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class ConsumerService {
  async getCustomers() {
    // TODO: Fetch Businesses from business backend
    let customers = [];

    for (let i = 0; i < 20; i++) {
      customers.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        lastActive: faker.date.anytime(),
        dateRegistered: faker.date.anytime(),
        kycStatus: true,
      });
    }

    return customers;
  }
}
