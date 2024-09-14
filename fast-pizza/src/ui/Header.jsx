import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
    return ( 
        <header className="flex items-center justify-between bg-yellow-400 uppercase px-4 py-3 border-b border-stone-200">
            <Link to='/' className="tracking-widest">Fast Pizza</Link>
           
            <SearchOrder />

            <Username />
        </header> 
    );
}

export default Header;