export default function Forgot() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-primary mb-4">Reset Password</h1>
      <p className="text-teks-samping mb-6 text-sm">Enter your email and we'll send you a link to reset your password.</p>
      <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl bg-primary-light mb-6 outline-none" />
      <button className="w-full py-4 bg-primary text-white rounded-full font-bold">Send Link</button>
    </div>
  );
}