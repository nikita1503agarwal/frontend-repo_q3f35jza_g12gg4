import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Profile({ user }) {
  const [name, setName] = useState(user?.name || '');
  const [avatar_url, setAvatarUrl] = useState(user?.avatar_url || '');
  const [status, setStatus] = useState('');

  useEffect(() => { setName(user?.name || ''); setAvatarUrl(user?.avatar_url || ''); }, [user]);

  const save = async () => {
    await api.updateProfile({ email: user.email, name, avatar_url });
    setStatus('Saved'); setTimeout(()=>setStatus(''), 2000);
  };

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          {avatar_url ? <img src={avatar_url} alt="avatar" className="w-full h-full object-cover" /> : null}
        </div>
        <div>
          <div className="font-medium">{user.email}</div>
          <div className="text-xs text-gray-500">Profile</div>
        </div>
      </div>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border rounded-xl px-3 py-2" />
      <input value={avatar_url} onChange={e=>setAvatarUrl(e.target.value)} placeholder="Avatar URL" className="w-full border rounded-xl px-3 py-2" />
      <button onClick={save} className="w-full bg-black text-white rounded-xl py-2">Save</button>
      {status && <div className="text-center text-sm text-emerald-600">{status}</div>}
    </div>
  );
}
