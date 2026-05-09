import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-9xl font-poppins font-bold text-primary">404</h1>
      <p className="text-teks-samping mb-6">Ups! Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg">Back to Home</Link>
    </div>
  );
}