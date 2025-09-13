import React, { useEffect, useState } from 'react';
import { useApi } from '../context/ApiContext';

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Home page shows API connectivity/health and quick links. */
  const api = useApi();
  const [health, setHealth] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    api.getHealth().then(setHealth).catch(e => setErr(e.message));
  }, [api]);

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <span className="kicker">Welcome</span>
          <div className="h1">Your Wellness, Simplified</div>
          <p className="p">
            Explore curated wellness resources and track daily activities like meditation, steps, water intake, and sleep.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn" href="/resources">Browse Resources</a>
            <a className="btn secondary" href="/track">Track Activity</a>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <span className="kicker">API</span>
          <div className="h1">Backend Status</div>
          {err ? (
            <p className="p" style={{ color: '#ef4444' }}>Cannot reach API: {err}</p>
          ) : (
            <p className="p">
              {health ? (
                <>
                  <strong>Status:</strong> {health.status} • <strong>Env:</strong> {health.environment} • <strong>Time:</strong> {new Date(health.timestamp).toLocaleString()}
                </>
              ) : (
                'Checking...'
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
