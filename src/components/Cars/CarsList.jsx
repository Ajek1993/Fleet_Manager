import React from "react";
import { cars } from "../../firebase";
import { useUser } from "../../providers/UserProvider";

export default function CarsList() {
  const user = useUser();
  return (
    <div>
      Informacje o samochodach:
      {user && (
        <ul>
          {cars.map(({ plate, brand, model }) => (
            <li key={plate}>
              {brand} {model}: {plate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
