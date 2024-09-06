/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useUrlPosition } from "./useUrlPosition";

export function useGeolocation(defaultPossition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPossition);
  const [error, setError] = useState(null);
  const positionURL = useUrlPosition();

  useEffect(() => {
    if (positionURL && positionURL[0] && positionURL[1]) {
      setPosition({ lat: positionURL[0], lng: positionURL[1] });
    }
  }, [positionURL[0], positionURL[1]]);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(function(position) {

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        setPosition({lat, lng});
        setIsLoading(false);
    }, function(error) {
      setError(error.message);
      setIsLoading(false);
    });
  }

  return { isLoading, position, error, getPosition };
}
