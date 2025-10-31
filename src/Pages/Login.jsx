import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
  const { signInWithGoogle, signInWithEmailAndPasswordFunc, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);
        const user = res.user;
        console.log(user);
        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data after save", data);
          })
          .catch((err) => {
            console.log(err);
          });

        navigate(location.state || "/");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log({ email, password });

    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        console.log(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center h-[69vh]">
      <div className="flex flex-col items-center gap-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSignin}>
              <fieldset className="fieldset w-90">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input w-full"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </form>

            {/* Google */}
            <button
              onClick={handleGoogleSignin}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
            <p className="text-center text-sm font-medium p-2">
              New here?{" "}
              <Link
                to="/register"
                className="link link-hover text-primary font-bold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
