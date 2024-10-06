import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header id="header">
            <h2>DeSharp</h2>
            {/* <Link to="../Admin.jsx">ADMIN</Link> */}
            <a>admin</a>
        </header>
    )
}

export default Header;