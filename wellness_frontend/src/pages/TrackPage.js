import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useApi } from '../context/ApiContext';
import { Loading, ErrorBox } from '../components/Status';

const DEFAULT_LIMIT = 20;

// PUBLIC_INTERFACE
export default function TrackPage() {
  /** Allows user to log activities and view recent tracked activities. */
  const api = useApi();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const [form, setForm] = useState({
    type: 'meditation',
    value: '',
    unit: 'min',
    note: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const pageInfo = useMemo(() => {
    const page = Math.floor(offset / limit) + 1;
    const pages = Math.max(1, Math.ceil(total / limit));
    return { page, pages };
  }, [offset, limit, total]);

  const fetchItems = useCallback(() => {
    setLoading(true);
    setErr('');
    api.getTrackedActivities({ limit, offset })
      .then((res) => {
        setItems(res.items || []);
        setTotal(res.total || 0);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [api, limit, offset]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.type || form.value === '') {
      alert('Please provide type and value');
      return;
    }
    const payload = { type: form.type, value: Number(form.value), unit: form.unit || undefined, note: form.note || undefined };
    setSubmitting(true);
    setErr('');
    try {
      await api.postTrackActivity(payload);
      setForm({ type: form.type, value: '', unit: form.unit, note: '' });
      // refresh list (show newest likely at top if backend returns sorted; otherwise just refetch)
      fetchItems();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => setOffset((o) => o + limit);
  const prev = () => setOffset((o) => Math.max(0, o - limit));

  if (loading && items.length === 0) return <Loading message="Loading activities..." />;

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <span className="kicker">Daily Tracking</span>
          <div className="h1">Track a Wellness Activity</div>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
            <div className="grid">
              <div className="col-4">
                <label className="label" htmlFor="type">Type</label>
                <select id="type" name="type" value={form.type} onChange={onChange}>
                  <option value="meditation">Meditation</option>
                  <option value="steps">Steps</option>
                  <option value="water">Water</option>
                  <option value="sleep">Sleep</option>
                </select>
              </div>
              <div className="col-4">
                <label className="label" htmlFor="value">Value</label>
                <input id="value" name="value" className="input" type="number" step="any" value={form.value} onChange={onChange} placeholder="e.g., 10" />
              </div>
              <div className="col-4">
                <label className="label" htmlFor="unit">Unit</label>
                <select id="unit" name="unit" value={form.unit} onChange={onChange}>
                  <option value="min">min</option>
                  <option value="steps">steps</option>
                  <option value="ml">ml</option>
                  <option value="h">h</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label" htmlFor="note">Note</label>
              <textarea id="note" name="note" rows={3} className="input" value={form.note} onChange={onChange} placeholder="Optional note" />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn" type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Activity'}
              </button>
              <button className="btn secondary" type="button" onClick={() => setForm({ ...form, value: '', note: '' })}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {err && (
        <div className="col-12"><ErrorBox error={err} /></div>
      )}

      <div className="col-12">
        <div className="card">
          <span className="kicker">History</span>
          <div className="h1">Recent Activities</div>
          <div className="list">
            {items.length === 0 && <div className="p">No activities tracked yet.</div>}
            {items.map((a) => (
              <div key={a.id} className="card" style={{ padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <strong style={{ textTransform: 'capitalize' }}>{a.type}</strong>
                      <span className="badge">{a.value}{a.unit ? ` ${a.unit}` : ''}</span>
                    </div>
                    {a.note && <p className="p" style={{ marginTop: 6 }}>{a.note}</p>}
                  </div>
                  <div className="p">{a.timestamp ? new Date(a.timestamp).toLocaleString() : ''}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
            <button className="btn secondary" onClick={prev} disabled={offset === 0}>Previous</button>
            <div className="p">Page {pageInfo.page} of {pageInfo.pages}</div>
            <button className="btn secondary" onClick={next} disabled={offset + limit >= total}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
