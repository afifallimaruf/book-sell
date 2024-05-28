import { Alert, Button, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        setErrorMessage(data.message);
        setLoading(false);
      } else if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="my-7">
        <h1 className="font-bold text-center text-3xl">Registration</h1>
      </div>
      <div className="mb-5 my-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Full Name
        </label>
        <input
          type="text"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Username
        </label>
        <input
          type="text"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          placeholder="abc@example.com"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        gradientDuoTone="purpleToPink"
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Spinner size="sm" />
            <span className="pl-3">Loading...</span>
          </>
        ) : (
          "Register"
        )}
      </Button>
      {errorMessage && (
        <Alert color="failure" className="mt-5">
          {errorMessage}
        </Alert>
      )}
    </form>
  );
}

export default Register;
