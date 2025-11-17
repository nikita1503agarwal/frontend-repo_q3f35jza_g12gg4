import { useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';

export default function Composer({ user, onSent }) {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [audio, setAudio] = useState(null);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [location, setLocation] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);

  const toDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(await toDataUrl(file));
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const file = new File([blob], 'voice.webm', { type: 'audio/webm' });
      const dataURL = await toDataUrl(file);
      setAudio(dataURL);
      stream.getTracks().forEach(t => t.stop());
    };
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const getLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ lat: latitude, lng: longitude });
    });
  };

  const send = async () => {
    await api.createRequest({
      email: user.email,
      text,
      photo_data_url: photo,
      audio_data_url: audio,
      contact_name: contactName,
      contact_phone: contactPhone,
      lat: location?.lat,
      lng: location?.lng,
    });
    onSent();
  };

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Write a message" className="w-full border rounded-xl p-3 min-h-[90px]" />
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center justify-center border rounded-xl p-3 text-sm cursor-pointer bg-white">
          <input onChange={handlePhoto} type="file" accept="image/*" className="hidden" />
          Upload Photo
        </label>
        {!recording ? (
          <button onClick={startRecording} className="border rounded-xl p-3 text-sm bg-white">Record Voice</button>
        ) : (
          <button onClick={stopRecording} className="border rounded-xl p-3 text-sm bg-red-50 text-red-600">Stop Recording</button>
        )}
        <button onClick={getLocation} className="border rounded-xl p-3 text-sm bg-white">Share Location</button>
        <div className="border rounded-xl p-3 bg-white">
          <input value={contactName} onChange={e=>setContactName(e.target.value)} placeholder="Contact name" className="w-full text-sm mb-2" />
          <input value={contactPhone} onChange={e=>setContactPhone(e.target.value)} placeholder="Contact phone" className="w-full text-sm" />
        </div>
      </div>
      <button onClick={send} className="w-full bg-black text-white rounded-xl py-3">Send</button>
      {(photo || audio || location) && (
        <div className="text-xs text-gray-500">Attached: {photo? 'photo ' : ''}{audio? 'voice ' : ''}{location? `location(${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})` : ''}</div>
      )}
    </div>
  );
}
