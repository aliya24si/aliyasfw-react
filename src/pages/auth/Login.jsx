import React from "react";

const Login = () => {
  return (
    /* fixed inset-0 dan h-screen w-screen memastikan elemen memenuhi layar.
       overflow-hidden mencegah adanya scrollbar muncul. */
    <div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden bg-white font-barlow">
      {/* SISI KIRI: Background & Teks (Hanya Desktop) */}
      <div className="relative hidden lg:flex w-[45%] xl:w-[50%] flex-col justify-end p-12 text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/vet.jpeg')" }}
        />
        <div className="absolute inset-0 z-10 bg-primary/50 backdrop-blur-[1px]" />

        <div className="relative z-20">
          <h1 className="mb-4 text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
            Optimize your medicare operations with our intelligent medical admin
            dashboard
          </h1>
          <p className="mb-6 max-w-md text-base xl:text-lg text-gray-200 leading-relaxed opacity-90">
            This comprehensive digital solution centralizes and streamlines
            essential tasks, empowering providers to deliver better patient
            care.
          </p>

          <div className="flex gap-2">
            <span className="h-1 w-8 rounded-full bg-white" />
            <span className="h-1 w-2 rounded-full bg-white/30" />
            <span className="h-1 w-2 rounded-full bg-white/30" />
          </div>
        </div>
      </div>

      {/* SISI KANAN: Form (Dibuat ringkas agar muat 1 layar) */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white p-6 md:p-10">
        <div className="w-full max-w-[400px] flex flex-col">
          {/* Logo - Margin dikurangi */}
          <div className="mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-primary">
              <span className="text-lg font-bold text-primary">M</span>
            </div>
          </div>

          {/* Heading - Margin dikurangi */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-teks">Login</h2>
            <p className="mt-1 text-teks-samping text-base">
              Let's login into your PetTrack account first
            </p>
          </div>

          {/* Form - Spacing antar input dikurangi */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">
                Email
              </label>
              <InputField label="Email" type="email" placeholder="tempmail@gmail.com" />
            </div>

            <div className="space-y-1 relative">
              <label className="text-xs font-medium text-teks-samping ml-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <InputField label="Password" type="password" placeholder="*******" />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-teks-samping hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 5 12 5c4.79 0 8.601 3.049 9.964 6.678a1.012 1.012 0 010 .644C20.601 15.951 16.79 19 12 19c-4.79 0-8.601-3.049-9.964-6.678z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-garis accent-primary"
                />
                <span className="text-xs text-teks-samping group-hover:text-teks">
                  Remember me
                </span>
              </label>
              <a
                href="/Forgot"
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Forgot Password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-bold text-base hover:opacity-95 transition-all shadow-md mt-2"
            >
              Login
            </button>
          </form>

          {/* Divider - Margin dikurangi */}
          <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t border-garis"></div>
            <span className="mx-3 flex-shrink text-xs text-teks-samping">
              or
            </span>
            <div className="flex-grow border-t border-garis"></div>
          </div>

          {/* Google Login */}
          <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-garis py-3 hover:bg-gray-50 transition-all font-semibold text-sm text-teks">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Login with Google
          </button>

          <p className="mt-6 text-center text-sm text-teks-samping">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-bold text-blue-600 hover:underline ml-1"
            >
              Register Here
            </a>
          </p>

          {/* Footer Info - Menggunakan pt-4 dan margin kecil agar tetap di bawah tanpa scroll */}
          <div className="mt-auto pt-10 flex justify-between text-[11px] text-teks-samping opacity-60">
            <p>© 2023 MediCare. All rights reserved.</p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-primary">
                Terms
              </a>
              <a href="#" className="hover:text-primary">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
