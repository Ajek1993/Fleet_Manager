import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

export default function Signup() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    const auth = getAuth(app);
    const { email, password } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    console.log("Zarejestrowano");
    setValues({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <p>Zarejestruj się</p>
      <label>
        Email
        <input
          name="email"
          type="email"
          placeholder="Podaj email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          placeholder="Podaj email"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleAdd}>Zarejestruj</button>
    </div>
  );
}
