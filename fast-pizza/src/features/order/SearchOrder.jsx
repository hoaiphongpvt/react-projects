import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (!query) return
        navigate(`/order/${query}`)
        setQuery("")
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <input className="w-28 rounded-full px-4 py-2 text-sm placeholder:text-stone-400 bg-yellow-100 sm:focus:w-72 focus:ring-1 focus:ring-yellow-500 sm:w-64 focus:outline-none transition-all duration-300" placeholder="Search order #" value={query} onChange={(e) => setQuery(e.target.value)}/>
        </form> 
    );
}

export default SearchOrder;