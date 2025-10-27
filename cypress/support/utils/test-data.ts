import { faker } from "@faker-js/faker";

import { CreateUserPayload } from "@api/types";

export const testDataBuilder = {
  user(): { email: string; password: string } {
    const email = faker.internet.email().toLowerCase();
    const password = `${faker.internet.password({ length: 8 })}#${faker.number.int(99)}`;

    return { email, password };
  },
  userPayload(): CreateUserPayload {
    return {
      name: faker.person.fullName(),
      job: faker.person.jobTitle()
    };
  }
};
