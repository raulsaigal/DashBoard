import React, { useState, useEffect } from 'react';
import './Widgets.css'; // CSS file for styling

const Widgets = () => {
  const [metrics, setMetrics] = useState({
    userCount: 0,
    revenue: 0,
    activeSessions: 0,
  });

  // Simulate fetching real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        userCount: Math.floor(Math.random() * 1000),
        revenue: (Math.random() * 10000).toFixed(2),
        activeSessions: Math.floor(Math.random() * 500),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="widgets-container">
      {/* User Count Widget */}
      <div className="widget" title="Total Users">
        <h3>Users</h3>
        <p>{metrics.userCount}</p>
      </div>

      {/* Revenue Widget */}
      <div className="widget" title="Total Revenue">
        <h3>Revenue</h3>
        <p>${metrics.revenue}</p>
      </div>

      {/* Active Sessions Widget */}
      <div className="widget" title="Active Sessions">
        <h3>Active Sessions</h3>
        <p>{metrics.activeSessions}</p>
      </div>
    </div>
  );
};

export default Widgets;