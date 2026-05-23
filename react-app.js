const { useEffect, useMemo, useState } = React;

const API_BASE = 'backend/public/api.php';

async function fetchJson(params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE}?${query}`);
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

function App() {
  const [cafes, setCafes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [vibes, setVibes] = useState([]);
  const [q, setQ] = useState('');
  const [area, setArea] = useState('all');
  const [vibe, setVibe] = useState('all');

  useEffect(() => {
    fetchJson({ endpoint: 'meta' }).then((data) => {
      setAreas(data.areas || []);
      setVibes(data.vibes || []);
    });
  }, []);

  useEffect(() => {
    fetchJson({ endpoint: 'cafes', q, area, vibe }).then((data) => setCafes(data.cafes || []));
  }, [q, area, vibe]);

  const resultText = useMemo(() => `${cafes.length} cafes found`, [cafes]);

  return (
    <>
      <nav className="top-nav"><div className="container nav-inner"><strong>PP Café Finder</strong><span>150 local cafés in Phnom Penh</span></div></nav>
      <header className="hero"><div className="hero__content container">
        <h1>Discover Phnom Penh cafés</h1>
        <p className="sub">Name, rating, Wi‑Fi, vibe, Google Maps, logo, address, Facebook, phone and more.</p>
        <div className="search-row">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, address, vibe..." />
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="all">All areas</option>{areas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div className="chips"><button className={`chip ${vibe === 'all' ? 'active' : ''}`} onClick={() => setVibe('all')}>All</button>{vibes.map((v) => <button key={v} className={`chip ${vibe === v ? 'active' : ''}`} onClick={() => setVibe(v)}>{v}</button>)}</div>
      </div></header>
      <main className="container">
        <section className="section-head"><h2>Recommended cafés</h2><p>{resultText}</p></section>
        <section className="grid">
          {cafes.map((cafe) => (
            <article className="card" key={cafe.id}>
              <img src={cafe.logo} alt={`${cafe.name} logo`} width="48" height="48" />
              <h4>{cafe.name}</h4>
              <p className="meta">{cafe.area} • {cafe.price} • ⭐ {cafe.rating} • Wi‑Fi: {cafe.wifi}</p>
              <div className="row"><strong>Address:</strong><span>{cafe.address}</span></div>
              <div className="row"><strong>Phone:</strong><a href={`tel:${cafe.telephone}`}>{cafe.telephone}</a></div>
              <div className="row"><strong>Hours:</strong><span>{cafe.openingHours}</span></div>
              <div className="row"><a href={cafe.googleMap} target="_blank" rel="noreferrer">Google Map</a><a href={cafe.facebook} target="_blank" rel="noreferrer">Facebook</a></div>
              <div>{cafe.vibe.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
