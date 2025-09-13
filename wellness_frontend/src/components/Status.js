import React from 'react';

// PUBLIC_INTERFACE
export function Loading({ message = 'Loading...' }) {
  /** Simple loading state component. */
  return (
    <div className="card">
      <span className="kicker">Status</span>
      <div className="h1">{message}</div>
      <p className="p">Please wait while we fetch data.</p>
    </div>
  );
}

// PUBLIC_INTERFACE
export function ErrorBox({ error }) {
  /** Simple error display component. */
  if (!error) return null;
  return (
    <div className="card" style={{ borderColor: '#ef4444' }}>
      <span className="kicker">Error</span>
      <div className="h1" style={{ color: '#ef4444' }}>Something went wrong</div>
      <p className="p">{String(error)}</p>
    </div>
  );
}
