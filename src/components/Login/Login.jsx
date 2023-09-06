import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

export default function Login() {
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
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Zalogowano pomyślnie");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Błędny login lub hasło");
      });

    setValues({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <p>Zaloguj się</p>
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
      <button onClick={handleAdd}>Zaloguj</button>
    </div>
  );
}
