import { useState } from 'react';
import { api } from '../lib/api';

export default function Auth({ onAuthed }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      if (mode === 'signup') {
        const res = await api.signup({ email, name });
        onAuthed(res.user);
      } else {
        const res = await api.login({ email });
        onAuthed(res.user);
      }
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4 flex gap-2 bg-gray-100 p-1 rounded-xl">
        <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode==='login'?'bg-white shadow':''}`}>Login</button>
        <button onClick={() => setMode('signup')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${mode==='signup'?'bg-white shadow':''}`}>Sign up</button>
      </div>
      <form onSubmit={submit} className="space-y-3">
        {mode==='signup' && (
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border rounded-lg px-3 py-2" />
        )}
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full border rounded-lg px-3 py-2" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="w-full bg-black text-white rounded-lg py-2">{loading? 'Please wait...' : (mode==='signup' ? 'Create account' : 'Login')}</button>
      </form>
    </div>
  );
}
