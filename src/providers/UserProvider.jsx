import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
// import { doc, deleteDoc } from "firebase/firestore";

const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(false);
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [carsPlates, setCarsPlates] = useState([]);
  const navigate = useNavigate();

  const [months, setMonths] = useState([
    "(wszystkie)",
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień",
  ]);

  const [years, setYears] = useState(["(wszystkie)", 2022, 2023, 2024, 2025]);

  useEffect(() => {
    const get = async () => {
      const carsCollection = collection(db, "cars");
      const servicesCollection = collection(db, "services");
      const fuelsCollection = collection(db, "fuel");
      const querySnapshotCars = await getDocs(carsCollection);
      const querySnapshotServices = await getDocs(servicesCollection);
      const querySnapshotFuels = await getDocs(fuelsCollection);

      querySnapshotCars.forEach((car) => {
        const carInfo = car.data();
        setCars((prev) => [...prev, carInfo]);
      });
      querySnapshotServices.forEach((service) => {
        const serviceInfo = service.data();
        setServices((prev) => [...prev, serviceInfo]);
      });
      querySnapshotFuels.forEach((fuel) => {
        const fuelInfo = fuel.data();
        setFuels((prev) => [...prev, fuelInfo]);
      });
    };
    get();
  }, []);

  useEffect(() => {
    setCarsPlates(cars.map((car) => car.plate));
  }, [cars]);

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

  const deleteCar = async (car) => {
    console.log(car);
    try {
      await deleteDoc(doc(db, "cars", car));
    } catch (e) {
      console.log(e);
    }
    await setCars((prev) => prev.filter((el) => car !== el.plate));
  };

  const deleteService = async (service) => {
    console.log(service.ID);
    try {
      await deleteDoc(doc(db, "services", service.ID));
    } catch (e) {
      console.log(e);
    }
    await setServices((prev) => prev.filter((el) => el.ID !== service.ID));
  };
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
        deleteCar,
        deleteService,
        fuels,
        setFuels,
        months,
        years,
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
