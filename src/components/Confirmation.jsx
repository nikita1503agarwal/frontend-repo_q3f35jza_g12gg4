export default function Confirmation({ onDone }) {
  return (
    <div className="p-8 text-center space-y-3">
      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl">✓</div>
      <h2 className="text-xl font-semibold">Request sent</h2>
      <p className="text-gray-600">We received your message and attachments.</p>
      <button onClick={onDone} className="mt-2 bg-black text-white rounded-xl px-4 py-2">Back home</button>
    </div>
  );
}
