import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
    const base = "bg-yellow-400 text-sm uppercase tracking-wide font-semibold text-stone-800 rounded-full inline-block hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:outline-yellow-500 focus:ring focus:ring-yellow-300 focus:ring-offset-3 disabled:cursor-not-allowed"
    const styles = {
        primary: base + 'px-4 py-3 sm:px-6 sm:py-4',
        small: base + 'px-4 py-2 sm:px-4 sm:py-2 text-xs md:px-6 md:py-3',
        secondary: "inline-block text-sm rounded-full border-2 border-stone-300  font-semibold uppercase tracking-wide text-stone-400 trasition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2 md:px-6 md:py-3",
        round: base + 'px-2 py-1 sm:px-3 sm:py-2 text-sm',
    }
    if(to) return <Link className={styles[type]} to={to}>{children}</Link>

    if(onClick)  
        return ( 
            <button onClick={onClick} disabled={disabled} className={styles[type]}>
                {children}
            </button> 
        );

    return ( <button disabled={disabled} className={styles[type]}>
        {children}
    </button> );
}

export default Button;