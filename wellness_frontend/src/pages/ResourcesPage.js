import React, { useEffect, useState } from 'react';
import { useApi } from '../context/ApiContext';
import { Loading, ErrorBox } from '../components/Status';

// PUBLIC_INTERFACE
export default function ResourcesPage() {
  /** Displays curated wellness resources from backend. */
  const api = useApi();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    setLoading(true);
    api.getResources()
      .then((res) => setItems(res.items || []))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [api]);

  if (loading) return <Loading message="Loading resources..." />;
  if (err) return <ErrorBox error={err} />;

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <span className="kicker">Explore</span>
          <div className="h1">Wellness Resources</div>
          <p className="p">
            Curated articles, videos, and exercises across mindfulness, fitness, and nutrition.
          </p>
        </div>
      </div>

      <div className="col-12">
        <div className="list">
          {items.length === 0 && <div className="card">No resources available.</div>}
          {items.map((r) => (
            <div className="card" key={r.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <strong>{r.title}</strong>
                    {r.category && <span className="badge">{r.category}</span>}
                    {r.type && <span className="badge">{r.type}</span>}
                  </div>
                  {r.description && <p className="p" style={{ marginTop: 8 }}>{r.description}</p>}
                </div>
                {r.url && (
                  <div>
                    <a className="btn" href={r.url} target="_blank" rel="noreferrer">Open</a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
