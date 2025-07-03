import React,{useEffect} from 'react';

const LogList = ({logs}) => {

  return (
    <ul className="log-list">
      {logs.map((log, i) => (
        <li key={i} className={`log-item ${log.level}`}>
          <div><strong>{log.level.toUpperCase()}</strong> - {log.timestamp}</div>
          <div>{log.message}</div>
          <div className="meta">Resource: {log.resourceId}</div>
        </li>
      ))}
    </ul>
  );
};

export default LogList;
