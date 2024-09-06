/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = Number(searchParams.get("lat")) || 0;
  const lng = Number(searchParams.get("lng")) || 0;

  return [lat, lng];
}
