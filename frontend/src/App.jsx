  import React, { useState, useEffect } from 'react';
  import FilterBar from './components/FilterBar';
  import LogList from './components/LogList';
  import './App.css'
  import { fetchLogs } from './api/logs';

  const App = () => {
    const [filters, setFilters] = useState({});
    const [logs, setLogs] = useState([]);
      const [loading, setLoading] = useState(false);


    useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const data = await fetchLogs(filters);
        setLogs(data);
      } catch (err) {
        console.error('Failed to fetch logs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

    return (
    <div className="app-wrapper">
      <div className="container">
        <h1>Log Viewer</h1>
        <FilterBar filters={filters} setFilters={setFilters} setLogs={setLogs} />
        {loading ? (
          <div className="loader">Loading logs...</div>
        ) : (
          <LogList logs={logs} />
        )}
      </div>
    </div>
  );
  };

  export default App;
