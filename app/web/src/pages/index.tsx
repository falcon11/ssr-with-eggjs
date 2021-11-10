import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import styles from './index.less';

export default function IndexPage() {
  const [requestValues, setRequestValues] = useState<{ [key: string]: any }>({
    method: 'GET',
  });
  const [response, setResponse] = useState<AxiosResponse>();
  useEffect(() => {
    fetch('/api/get?foo=bar').then((res) => {
      console.log('res', res);
    });
  }, []);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRequestValues((preValues) => ({ ...preValues, [name]: value }));
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log('e', e, requestValues);
    axios.defaults.headers.common['x-csrf-token'] = Cookies.get('csrfToken') || '';
    const result = await axios.request({
      url: requestValues.path,
      method: requestValues.method,
      headers: requestValues.headers,
      data: requestValues.body,
    });
    setResponse(result);
    console.log('result', result);
  };
  return (
    <div>
      <div>
        <h2>Request</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Path:
            <input name="path" type="text" onChange={handleChange} />
          </label>
          <br />
          <label>
            Method:
            <select name="method" onChange={handleChange}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </label>
          <br />
          <label>
            Headers:
            <textarea
              name="headers"
              rows={10}
              cols={30}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Body:
            <textarea name="body" rows={10} cols={30} onChange={handleChange} />
          </label>
          <br />
          <br />
          <input type="submit" />
        </form>
      </div>

      <div>
        <h2>Response</h2>
        <label>
          Status code:
          <code>{response?.status}</code>
        </label>
        <br />
        <label>
          Response body:
          <code>{JSON.stringify(response?.data, null, 2)}</code>
        </label>
        <br />
        <label>
          Headers:
          <code>{JSON.stringify(response?.headers, null, 2)}</code>
        </label>
      </div>
    </div>
  );
}
