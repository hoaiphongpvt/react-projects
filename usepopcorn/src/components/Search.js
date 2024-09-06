import { useEffect, useRef } from "react";

export default function Search({ onSearch }) {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
      ref={inputEl}
    />
  );
}
