const { useMemo, useState } = React;

const cafes = [
  { id: 1, name: 'Brown Coffee & Bakery', area: 'BKK1', price: '$$', rating: 4.7, vibe: ['Work-friendly', 'Modern'], wifi: 'Excellent', address: 'Street 214, BKK1, Phnom Penh', facebook: 'https://facebook.com/browncoffeebakery', telephone: '+855 23 000 111', openingHours: '7:00 AM - 10:00 PM', googleMap: 'https://maps.google.com/?q=Brown+Coffee+Bakery+Phnom+Penh', logo: 'https://placehold.co/96x96/png?text=Brown' },
  { id: 2, name: 'Backyard Café', area: 'BKK1', price: '$$$', rating: 4.6, vibe: ['Healthy', 'Stylish'], wifi: 'Good', address: 'Street 63, BKK1, Phnom Penh', facebook: 'https://facebook.com/backyardcafepp', telephone: '+855 12 555 222', openingHours: '7:30 AM - 9:00 PM', googleMap: 'https://maps.google.com/?q=Backyard+Cafe+Phnom+Penh', logo: 'https://placehold.co/96x96/png?text=Backyard' },
  { id: 3, name: 'Sister Srey Café', area: 'Wat Phnom', price: '$$', rating: 4.8, vibe: ['Brunch', 'Cozy'], wifi: 'Excellent', address: 'Street 178, Wat Phnom, Phnom Penh', facebook: 'https://facebook.com/sistersreycafe', telephone: '+855 15 777 333', openingHours: '8:00 AM - 5:00 PM', googleMap: 'https://maps.google.com/?q=Sister+Srey+Cafe+Phnom+Penh', logo: 'https://placehold.co/96x96/png?text=Sister' }
];

function App() {
  const [q, setQ] = useState('');
  const [area, setArea] = useState('all');
  const [vibe, setVibe] = useState('all');

  const areas = useMemo(() => [...new Set(cafes.map((c) => c.area))], []);
  const vibes = useMemo(() => [...new Set(cafes.flatMap((c) => c.vibe))], []);

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    return cafes.filter((cafe) => {
      const haystack = `${cafe.name} ${cafe.area} ${cafe.address} ${cafe.wifi} ${cafe.vibe.join(' ')}`.toLowerCase();
      const matchSearch = query === '' || haystack.includes(query);
      const matchArea = area === 'all' || cafe.area === area;
      const matchVibe = vibe === 'all' || cafe.vibe.includes(vibe);
      return matchSearch && matchArea && matchVibe;
    });
  }, [q, area, vibe]);

  return (
    <>
      <nav className="top-nav"><div className="container nav-inner"><strong>PP Café Finder</strong><span>No API required</span></div></nav>
      <header className="hero"><div className="hero__content container">
        <h1>Phnom Penh Café Recommendations</h1>
        <p className="sub">Works without backend API. Everything runs directly in frontend.</p>
        <div className="search-row">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search café..." />
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="all">All areas</option>{areas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div className="chips"><button className={`chip ${vibe === 'all' ? 'active' : ''}`} onClick={() => setVibe('all')}>All</button>{vibes.map((v) => <button key={v} className={`chip ${vibe === v ? 'active' : ''}`} onClick={() => setVibe(v)}>{v}</button>)}</div>
      </div></header>
      <main className="container">
        <section className="section-head"><h2>Recommended cafés</h2><p>{filtered.length} cafes found</p></section>
        <section className="grid">
          {filtered.map((cafe) => (
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
