import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Auth from './components/Auth';
import Composer from './components/Composer';
import Confirmation from './components/Confirmation';
import Profile from './components/Profile';

function Navbar({ view, setView }) {
  return (
    <div className="fixed bottom-4 left-0 right-0 px-4">
      <div className="mx-auto max-w-md bg-white/90 backdrop-blur border rounded-2xl shadow-lg flex items-center justify-around py-2">
        <button onClick={() => setView('home')} className={`px-3 py-1 rounded-lg ${view==='home'?'bg-gray-100':''}`}>Home</button>
        <button onClick={() => setView('profile')} className={`px-3 py-1 rounded-lg ${view==='profile'?'bg-gray-100':''}`}>Profile</button>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleAuthed = (u) => { setUser(u); localStorage.setItem('user', JSON.stringify(u)); };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <Hero />
        {!user ? (
          <Auth onAuthed={handleAuthed} />
        ) : (
          <div className="space-y-4">
            {view === 'home' && (
              sent ? <Confirmation onDone={() => { setSent(false); }} /> : (
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                      {user.avatar_url ? <img src={user.avatar_url} className="w-full h-full object-cover" /> : null}
                    </div>
                    <div>
                      <div className="font-medium">{user.name || 'Welcome'}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <Composer user={user} onSent={() => setSent(true)} />
                </div>
              )
            )}
            {view === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm">
                <Profile user={user} />
              </div>
            )}
          </div>
        )}
      </div>
      <Navbar view={view} setView={setView} />
    </div>
  );
}
