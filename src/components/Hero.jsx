import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent pointer-events-none" />
      <div className="relative z-10 p-4 flex items-end h-full">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Identity Messenger</h1>
          <p className="text-gray-600">Send text, voice, photos, contacts and location</p>
        </div>
      </div>
    </div>
  );
}
