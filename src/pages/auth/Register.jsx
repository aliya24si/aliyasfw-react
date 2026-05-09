import { Link } from 'react-router-dom';
export default function Register() {
  const inputStyle = "w-full p-4 rounded-2xl bg-primary-light border-none outline-none focus:ring-2 ring-primary/20 transition-all";
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold text-primary mb-2">New Account</h1>
      <div className="space-y-4 mt-6">
        <div><label className="block font-bold mb-1">Full Name</label><input type="text" placeholder="John Doe" className={inputStyle} /></div>
        <div><label className="block font-bold mb-1">Email</label><input type="email" placeholder="example@mail.com" className={inputStyle} /></div>
        <div><label className="block font-bold mb-1">Password</label><input type="password" placeholder="********" className={inputStyle} /></div>
        <button className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg mt-4 shadow-lg">Sign Up</button>
        <p className="text-center text-teks-samping text-sm">Already have an account? <Link to="/login" className="text-primary font-bold">Log In</Link></p>
      </div>
    </div>
  );
}