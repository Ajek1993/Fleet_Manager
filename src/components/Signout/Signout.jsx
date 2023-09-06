import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase";

export default function Signout() {
  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        alert("Wylogowano pomyślnie");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return <button onClick={handleLogout}>WYLOGUJ</button>;
}
