import { HttpClient } from "./http-client";
import { CreateUserPayload, User } from "./types";

class UsersApi {
  constructor(private readonly httpClient = new HttpClient()) {}

  list(page = 1): Cypress.Chainable<User[]> {
    return this.httpClient
      .getData<{ data: User[] }>("users", { params: { page } })
      .then((payload) => payload.data);
  }

  create(payload: CreateUserPayload): Cypress.Chainable<{ id: string; createdAt: string }> {
    return this.httpClient
      .post<CreateUserPayload, { id: string; createdAt: string }>("users", payload)
      .then((response) => response.data);
  }

  delete(userId: number): Cypress.Chainable<void> {
    return this.httpClient.delete<void>(`users/${userId}`).then(() => undefined);
  }
}

export const usersApi = new UsersApi();
