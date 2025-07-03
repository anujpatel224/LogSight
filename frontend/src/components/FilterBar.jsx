import { useEffect, useState } from 'react';
import axios from 'axios';

const FilterBar = ({ filters, setFilters, setLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

useEffect(() => {
  const fetchData = async () => {
    if (!debouncedTerm) return;
    setFilters(f => ({ ...f, message: debouncedTerm }));

    try {
      const response = await axios.get('http://localhost:5000/logs', {
        params: { q: debouncedTerm }
      });

      console.log('API results:', response.data);
      if(response.data){
        setLogs(response.data);
      }
    } catch (err) {
      console.error('API error:', err);
    }
  };

  fetchData();
}, [debouncedTerm, setFilters]);


  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      message: '',
      level: '',
      resourceId: '',
      timestamp_start: '',
      timestamp_end: '',
    });
  };

  return (
    <div className="filter-bar">
      <input
        placeholder="Search message"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select onChange={e => setFilters(f => ({ ...f, level: e.target.value }))}>
        <option value="">All Levels</option>
        <option value="info">Info</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
      </select>
      <input
        placeholder="Resource ID"
        onChange={e => setFilters(f => ({ ...f, resourceId: e.target.value }))}
      />
      <input
        type="datetime-local"
         onFocus={(e) => e.target.showPicker && e.target.showPicker()} 
        onChange={e => setFilters(f => ({ ...f, timestamp_start: e.target.value }))}
      />
      <input
        type="datetime-local"
         onFocus={(e) => e.target.showPicker && e.target.showPicker()} 
        onChange={e => setFilters(f => ({ ...f, timestamp_end: e.target.value }))}
      />
      <button onClick={clearFilters}>Clear</button>
    </div>
  );
};

export default FilterBar;
