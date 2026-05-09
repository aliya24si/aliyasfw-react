import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome</h1>
        <p className="text-teks-samping text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block font-bold mb-2">Email or Mobile Number</label>
          <input 
            type="text" 
            placeholder="example@example.com" 
            className="w-full p-4 rounded-2xl bg-primary-light border-none outline-none text-primary"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">Password</label>
          <input 
            type="password" 
            placeholder="*************" 
            className="w-full p-4 rounded-2xl bg-primary-light border-none outline-none"
          />
          <div className="text-right mt-2">
            <Link className="text-primary text-sm font-bold">Forget Password</Link>
          </div>
        </div>

        <button className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg shadow-primary/30">
          Log In
        </button>

        <div className="text-center mt-6">
          <p className="text-teks-samping text-sm">
            Don't have an account? <Link to="/register" className="text-primary font-bold">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;