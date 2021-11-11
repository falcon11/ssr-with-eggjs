import React, { useEffect, useState } from 'react';
import fetcher, { FetcherResponse } from '@/utils/fetcher';
import styles from './index.less';

export default function IndexPage() {
  const [requestValues, setRequestValues] = useState<{ [key: string]: any }>({
    method: 'GET',
    responseType: 'json',
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
      headers: JSON.parse(requestValues?.headers || '{}'),
      data: JSON.parse(requestValues?.body || '""'),
      params: new URLSearchParams(requestValues?.query || ''),
      responseType: requestValues.responseType,
    });
    setResponse(result);
  };
  const renderResponseBody = () => {
    if (!response) {
      return null;
    }
    const { headers } = response;
    const contentType = headers['content-type'];
    if (/image\/.*/.test(contentType)) {
      const urlCreator = window.URL || window.webkitURL;
      return (
        <img src={urlCreator.createObjectURL(response.data)} alt="image" />
      );
    }
    return (
      <pre className={styles.code}>
        {JSON.stringify(response.data, null, '\t')}
      </pre>
    );
  };
  return (
    <div className={styles.container}>
      <div>
        <h2>Request</h2>
        <form onSubmit={handleSubmit}>
          <label>Path:</label>
          <br />
          <input name="path" type="text" onChange={handleChange} />
          <br />
          <label>Query:</label>
          <br />
          <input name="query" type="text" onChange={handleChange} />
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
          <label>Response content type:</label>
          <br />
          <select
            name="responseType"
            onChange={handleChange}
            value={requestValues.responseType}
          >
            <option value="arraybuffer">arraybuffer</option>
            <option value="blob">blob</option>
            <option value="document">document</option>
            <option value="json">json</option>
            <option value="text">text</option>
            <option value="stream">stream</option>
          </select>
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
        <label>Headers:</label>
        <br />
        <pre className={styles.code}>
          {JSON.stringify(response?.headers, null, '\t')}
        </pre>
        <br />
        <label>Response body:</label>
        <br />
        {renderResponseBody()}
      </div>
    </div>
  );
}
