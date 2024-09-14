import { useSelector } from "react-redux";

function Username() {

    const username = useSelector((state) => state.user.username)
    return ( 
    <div className="text-sm font-semibold hidden md:block">
        {username ? username : "Who are you?"}
    </div> );
}

export default Username;