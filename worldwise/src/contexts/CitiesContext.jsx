/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext, useReducer, act, useCallback } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}

function reducer(state, action) {
  switch(action.type) {
    case 'loading':
      return {...state, 
        isLoading: true
      }

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      }

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {}
      }

    case 'rejected':
      return {
        ...state, 
        isLoading: false, 
        error: action.payload
      }

    default: throw new Error("Unknow action type!")
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [currentCity, setCurrentCity] = useState({});

  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchCities() {
      dispatch({type: 'loading'})

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        dispatch({type: 'cities/loaded', payload: data})
      } catch (err) {
        dispatch({type: 'rejected', payload: "Error ". err})
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {

    if (Number(id) === currentCity.id) return

    dispatch({type: 'loading'})
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok: " + res.statusText);
      }
      const data = await res.json();
      dispatch({type: 'city/loaded', payload: data})
    } catch (err) {
      dispatch({type: 'rejected', payload: "Fetching cities failed:", err})
    }
  }, [currentCity.id]);

  async function createCity(newCity) {
    dispatch({type: 'loading'})
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json()
      dispatch({type: 'city/created', payload: data})
    } catch (err) {
      dispatch({type: 'rejected', payload: "Create new city failed:", err})
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({type: 'loading'})
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({type: 'city/deleted', payload: id})
    } catch (err) {
      console.error("ERROR DELETING CITY", err);
      dispatch({type: 'rejected', payload: "Delete city failed:", err})
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, error, getCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
