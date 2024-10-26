// import React, { useState } from "react";
// import { loginUser, registerUser } from "./utils/api"; // Make sure these functions are correctly defined in api.js
// import { useNavigate } from "react-router-dom";

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let response;
//       if (isLogin) {
//         // Call the login API
//         response = await loginUser(form.email, form.password);
//       } else {
//         // Call the registration API
//         response = await registerUser(form.name, form.email, form.password);
//       }

//       // Store token and navigate on success
//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard");
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         alert("Invalid credentials or user already exists");
//       } else {
//         console.error("Error:", error);
//         alert("Internal server error. Please try again.");
//       }
//     }
//   };

//   const handleGoogleSignIn = () => {
//     window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
//       <form
//         className="bg-white p-6 rounded shadow-md w-80"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Register"}</h2>
//         {!isLogin && (
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             className="mb-2 p-2 border rounded w-full"
//           />
//         )}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="mb-2 p-2 border rounded w-full"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="mb-4 p-2 border rounded w-full"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 rounded w-full"
//         >
//           {isLogin ? "Login" : "Register"}
//         </button>
//         <button
//           type="button"
//           onClick={handleGoogleSignIn}
//           className="bg-red-500 text-white py-2 mt-2 rounded w-full"
//         >
//           Sign in with Google
//         </button>
//         <button
//           type="button"
//           onClick={() => setIsLogin(!isLogin)}
//           className="text-blue-500 mt-4 underline"
//         >
//           {isLogin
//             ? "New user? Register here"
//             : "Already have an account? Login here"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AuthPage;
import React, { useState } from "react";
import { loginUser, registerUser } from "./utils/api";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (isLogin) {
        response = await loginUser(form.email, form.password);
      } else {
        response = await registerUser(form.name, form.email, form.password);
      }

      // Store token in localStorage and redirect
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error in AuthPage:", error);
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          alert("Invalid credentials or user already exists.");
        } else {
          alert("Server error. Please try again later.");
        }
      } else {
        alert("Network error. Check your connection.");
      }
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <form
        className="bg-white p-6 rounded shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Register"}</h2>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="mb-2 p-2 border rounded w-full"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded w-full"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white py-2 mt-2 rounded w-full"
        >
          Sign in with Google
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 mt-4 underline"
        >
          {isLogin
            ? "New user? Register here"
            : "Already have an account? Login here"}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
