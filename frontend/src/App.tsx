import React, { useState, useEffect, useCallback } from 'react';
import { ERROR_MESSAGES } from './utils/errorMessages';
import { validateUrl, validateParams } from './utils/validation';

const API_URL = 'http://localhost:3001/api/v1';

interface Link {
  _id: string;
  originalUrl: string;
  parameters: Record<string, string>;
  newUrl: string;
}

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [params, setParams] = useState('');
  const [result, setResult] = useState<Link | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [paramsError, setParamsError] = useState('');

  const fetchLinks = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/links?page=${page}&limit=10`);  
      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }
      const data = await response.json();
      setLinks(data.links);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(ERROR_MESSAGES.FETCH_LINKS_ERROR);
      console.error('Fetch error:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!validateUrl(url, setUrlError) || !validateParams(params, setParamsError)) {
      return;
    }

 
    try {
      const paramsObj = params.split('&').reduce((acc, param) => {
        const [key, value] = param.split('=');
        return Object.assign(acc, { [decodeURIComponent(key)]: decodeURIComponent(value) });
    }, {});
    
     
      const response = await fetch(`${API_URL}/append-parameters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, parameters: paramsObj }),
      });

      if (!response.ok) {
        // If not ok, get the error message from the response
        const errorData = await response.json(); // This will be the error object from your backend
        throw new Error(errorData.error); 
      }



      const data = await response.json();
      setResult(data);
      fetchLinks();
    } catch (error: any) {
      setError(error.message || ERROR_MESSAGES.APPEND_PARAMS_ERROR);
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">URL Parameter Appender</h1>
      <form onSubmit={handleSubmit} className="mb-8 max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="url" className="block mb-2 font-semibold">URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {urlError && <p className="text-red-500 mt-1">{urlError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="params" className="block mb-2 font-semibold">Parameters (key1=value1&key2=value2):</label>
          <input
            type="text"
            id="params"
            value={params}
            onChange={(e) => {
              setParams(e.target.value);
            }}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {paramsError && <p className="text-red-500 mt-1">{paramsError}</p>}
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
         >
          Append Parameters
        </button>
      </form>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {result && (
        <div className="mb-8 p-4 bg-green-100 rounded">
          <h2 className="text-xl font-bold mb-2">Result:</h2>
          <p><strong>Original URL:</strong> {result.originalUrl}</p>
          <p><strong>Parameters:</strong> {JSON.stringify(result.parameters)}</p>
          <p><strong>New URL:</strong> {result.newUrl}</p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Recent Links:</h2>
      <ul className="mb-4 space-y-4">
        {links.map((link) => (
          <li key={link._id} className="p-4 bg-gray-100 rounded">
            <p><strong>Original:</strong> {link.originalUrl}</p>
            <p><strong>New:</strong> {link.newUrl}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition duration-200"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
