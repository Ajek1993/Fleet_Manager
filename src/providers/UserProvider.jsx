import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";

const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(false);
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [carsPlates, setCarsPlates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const get = async () => {
      const carsCollection = collection(db, "cars");
      const servicesCollection = collection(db, "services");
      const querySnapshotCars = await getDocs(carsCollection);
      const querySnapshotServices = await getDocs(servicesCollection);

      querySnapshotCars.forEach((car) => {
        const carInfo = car.data();
        setCars((prev) => [...prev, carInfo]);
      });
      querySnapshotServices.forEach((service) => {
        const serviceInfo = service.data();
        setServices((prev) => [...prev, serviceInfo]);
      });
    };
    get();
  }, []);

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

  useEffect(() => {
    setCarsPlates(cars.map((car) => car.plate));
  }, [cars]);

  return (
    <UserContext.Provider
      value={{
        user,
        handleLogout,
        cars,
        services,
        carsPlates,
        setCars,
        setServices,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => useContext(UserContext);

//trzeba to naprawić

// const cars = [];
// const services = [];
// const carsPlates = [];

// export { cars, services, carsPlates };
