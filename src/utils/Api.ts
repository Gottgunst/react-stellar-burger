import { IApi, IKeyPath, TMethods, TBody, THeaders, TPoint } from 'types';

export default class Api {
  _baseUrl: string;
  _headers: THeaders;
  _paths: TPoint;

  constructor({ baseUrl, headers, paths }: IApi) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._paths = paths;
  }

  _composeUrl(keyPath: string | IKeyPath): string {
    if (typeof keyPath === 'string') {
      return keyPath;
    } else {
      return keyPath.id
        ? this._paths[keyPath.key] + '/' + keyPath.id
        : this._paths[keyPath.key];
    }
  }

  updateToken(newToken: string): void {
    this._headers.authorization = newToken;
  }

  async makeRequest(
    keyPath: string | IKeyPath,
    method: TMethods = 'GET',
    body?: TBody,
  ): Promise<Response> {
    const point: string = `${this._baseUrl}${this._composeUrl(keyPath)}`;
    const options: {
      method: string;
      headers: THeaders;
      body?: string;
    } = {
      method: method.toUpperCase(),
      headers: this._headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(point, options).then((res) => {
      if (!res.ok) console.error('ErrAPI STATUS', res.status, point, options);
      return res.json();
    });
  }
}
