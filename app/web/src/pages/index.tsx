import React, { useEffect, useState } from 'react';
import fetcher, { FetcherResponse } from '@/utils/fetcher';
import styles from './index.less';

export default function IndexPage() {
  const [requestValues, setRequestValues] = useState<{ [key: string]: any }>({
    method: 'GET',
  });
  const [response, setResponse] = useState<FetcherResponse>();
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
    const result = await fetcher.request({
      url: requestValues.path,
      method: requestValues.method,
      headers: requestValues.headers,
      data: requestValues.body,
    });
    setResponse(result);
  };
  return (
    <div>
      <div>
        <h2>Request</h2>
        <form onSubmit={handleSubmit}>
          <label>Path:</label>
          <br />
          <input name="path" type="text" onChange={handleChange} />
          <br />
          <label>Method:</label>
          <br />
          <select name="method" onChange={handleChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
          <br />
          <label>Headers:</label>
          <br />
          <textarea
            name="headers"
            rows={10}
            cols={30}
            onChange={handleChange}
          />
          <br />
          <label>Body:</label>
          <br />
          <textarea name="body" rows={10} cols={30} onChange={handleChange} />
          <br />
          <br />
          <input type="submit" />
        </form>
      </div>

      <div>
        <h2>Response</h2>
        <label>Status code:</label>
        <code>{response?.status}</code>
        <br />
        <label>Response body:</label>
        <br />
        <code>{JSON.stringify(response?.data, null, 2)}</code>
        <br />
        <label>Headers:</label>
        <br />
        <code>{JSON.stringify(response?.headers, null, 2)}</code>
      </div>
    </div>
  );
}
