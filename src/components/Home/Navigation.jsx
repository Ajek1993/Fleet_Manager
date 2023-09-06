import React from "react";
import { useUser } from "../../providers/UserProvider";

export default function Navigation() {
  const user = useUser();
  return <div>Zalogowany użytkownik: {user ? user.email : ""}</div>;
}
