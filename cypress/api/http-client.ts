import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class HttpClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string = Cypress.env("apiBaseUrl") as string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  }

  request<TResponse>(
    config: AxiosRequestConfig
  ): Cypress.Chainable<AxiosResponse<TResponse>> {
    return cy.wrap(this.client.request<TResponse>(config), { log: false });
  }

  get<TResponse>(
    url: string,
    config?: AxiosRequestConfig
  ): Cypress.Chainable<AxiosResponse<TResponse>> {
    return this.request<TResponse>({ ...config, url, method: "GET" });
  }

  post<TBody, TResponse>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig
  ): Cypress.Chainable<AxiosResponse<TResponse>> {
    return this.request<TResponse>({
      ...config,
      url,
      method: "POST",
      data: body
    });
  }

  put<TBody, TResponse>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig
  ): Cypress.Chainable<AxiosResponse<TResponse>> {
    return this.request<TResponse>({
      ...config,
      url,
      method: "PUT",
      data: body
    });
  }

  delete<TResponse>(
    url: string,
    config?: AxiosRequestConfig
  ): Cypress.Chainable<AxiosResponse<TResponse>> {
    return this.request<TResponse>({
      ...config,
      url,
      method: "DELETE"
    });
  }

  getData<TResponse>(
    url: string,
    config?: AxiosRequestConfig
  ): Cypress.Chainable<TResponse> {
    return this.get<TResponse>(url, config).then((response) => response.data);
  }
}
