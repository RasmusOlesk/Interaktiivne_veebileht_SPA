import { useState } from 'react';
import './App.css';
import { type Artwork, type ArtworkStatus } from './types';
import { GalleryControls } from './components/GalleryControls';
import { ArtworkList } from './components/ArtworkList';

let nextId = 1;

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [filter, setFilter] = useState<ArtworkStatus>('all');
  const [sortBy, setSortBy] = useState<'title' | 'year'>('title');
  const [darkMode, setDarkMode] = useState(false);

  const handleAdd = () => {
    if (!title.trim() || !artist.trim() || !year) return;
    const newArtwork: Artwork = {
      id: nextId++,
      title: title.trim(),
      artist: artist.trim(),
      year: Number(year),
      favorite: false,
    };
    setArtworks((prev) => [newArtwork, ...prev]);
    setTitle('');
    setArtist('');
    setYear('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const toggleFavorite = (id: number) => {
    setArtworks((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, favorite: !a.favorite } : a,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
  };

  const handleEditTitle = (id: number, newTitle: string) => {
    setArtworks((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, title: newTitle } : a,
      ),
    );
  };

  const filtered = artworks.filter((a) => {
    if (filter === 'favorite') return a.favorite;
    if (filter === 'unfavorite') return !a.favorite;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });

  return (
    <div className={darkMode ? 'app app--dark' : 'app'}>
      <div className="app__shell">
        <header className="app__header">
          <h1>Kunstigalerii</h1>
          <p className="app__subtitle">
            Lisa, filtreeri, sorteeri ja märgi lemmikuid.
          </p>
          <button
            className="btn btn--ghost"
            onClick={() => setDarkMode((d) => !d)}
          >
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </header>

        <section className="app__section app__section--card">
          <h2>Lisa uus teos</h2>
          <div className="form">
            <input
              className="input"
              placeholder="Pealkiri"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              className="input"
              placeholder="Kunstnik"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              className="input"
              placeholder="Aasta"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value ? Number(e.target.value) : '')}
              onKeyDown={handleKeyDown}
            />
            <button className="btn" onClick={handleAdd}>
              Lisa teos
            </button>
          </div>
        </section>

        <section className="app__section">
          <GalleryControls
            filter={filter}
            onFilterChange={setFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            count={sorted.length}
          />
        </section>

        <section className="app__section">
          {sorted.length === 0 ? (
            <div className="empty-state">
              <p>Praegu pole ühtegi teost. Lisa esimene kunstiteos!</p>
            </div>
          ) : (
            <ArtworkList
              artworks={sorted}
              onToggleFavorite={toggleFavorite}
              onDelete={handleDelete}
              onEditTitle={handleEditTitle}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
