import { ApiPropType } from './prop-types';

export default class Api {
  constructor({ baseUrl, headers, paths }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._paths = paths;
  }

  _composeUrl(keyPath) {
    if (typeof keyPath === 'string') {
      return keyPath;
    } else {
      return keyPath.id
        ? this._paths[keyPath.key] + '/' + keyPath.id
        : this._paths[keyPath.key];
    }
  }

  makeRequest(keyPath, method = 'GET', body) {
    const point = `${this._baseUrl}${this._composeUrl(keyPath)}`;

    const options = {
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

/* #####################
ТИПЫ ===================
##################### */
Api.propTypes = ApiPropType;
