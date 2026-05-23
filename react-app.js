const { useEffect, useMemo, useState } = React;

const API_BASE = 'backend/public/api.php';

async function fetchJson(params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE}?${query}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

function App() {
  const [cafes, setCafes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [vibes, setVibes] = useState([]);
  const [q, setQ] = useState('');
  const [area, setArea] = useState('all');
  const [vibe, setVibe] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    fetchJson({ endpoint: 'meta' })
      .then((data) => {
        if (!mounted) return;
        setAreas(data.areas || []);
        setVibes(data.vibes || []);
      })
      .catch(() => {
        if (!mounted) return;
        setError('Unable to load filters. Please try again.');
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');

    fetchJson({ endpoint: 'cafes', q, area, vibe })
      .then((data) => {
        if (!mounted) return;
        setCafes(data.cafes || []);
      })
      .catch(() => {
        if (!mounted) return;
        setError('Unable to load cafés. Please check backend server.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [q, area, vibe]);

  const resultText = useMemo(
    () => `${cafes.length} place${cafes.length === 1 ? '' : 's'} found`,
    [cafes]
  );

  return (
    <>
      <nav className="top-nav">
        <div className="container nav-inner">
          <strong>PP Café Finder</strong>
          <span>Phnom Penh, Cambodia</span>
        </div>
      </nav>

      <header className="hero">
        <div className="hero__content container">
          <h1>Best local cafés in Phnom Penh</h1>
          <p className="sub">Clean, fast, and simple recommendations for locals and visitors.</p>

          <div className="search-row">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, area, or vibe..."
              aria-label="Search cafes"
            />
            <select value={area} onChange={(e) => setArea(e.target.value)} aria-label="Filter by area">
              <option value="all">All areas</option>
              {areas.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="chips" role="group" aria-label="Filter by vibe">
            <button
              className={`chip ${vibe === 'all' ? 'active' : ''}`}
              onClick={() => setVibe('all')}
            >
              All
            </button>
            {vibes.map((item) => (
              <button
                key={item}
                className={`chip ${vibe === item ? 'active' : ''}`}
                onClick={() => setVibe(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container">
        <section className="section-head">
          <h2>Recommended cafés</h2>
          <p>{loading ? 'Loading...' : resultText}</p>
        </section>

        {error && <p className="error-message">{error}</p>}

        <section className="grid">
          {cafes.map((cafe) => (
            <article className="card" key={cafe.id}>
              <h4>{cafe.name}</h4>
              <p className="meta">{cafe.area} • {cafe.price} • ⭐ {cafe.rating}</p>
              <div className="row"><strong>Best for:</strong><span>{cafe.bestFor}</span></div>
              <div>
                {cafe.vibe.map((item) => (
                  <span className="tag" key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
