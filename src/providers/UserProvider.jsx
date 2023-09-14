import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";

const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        alert("Wylogowano pomyślnie");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => useContext(UserContext);

//trzeba to naprawić

const carsCollection = collection(db, "cars");
const servicesCollection = collection(db, "services");
const querySnapshotCars = await getDocs(carsCollection);
const querySnapshotServices = await getDocs(servicesCollection);
const cars = [];
const services = [];

querySnapshotCars.forEach((car) => {
  const carInfo = car.data();
  cars.push(carInfo);
});
querySnapshotServices.forEach((service) => {
  const serviceInfo = service.data();
  services.push(serviceInfo);
});

const carsPlates = cars.map((car) => car.plate);

export { cars, services, carsPlates };
