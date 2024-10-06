import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header id="header">
            <h2>DeSharp</h2>
            <div className="header_nav">
                <Link style={{ textDecoration: "none" }} to="/home">Home</Link>
                <Link style={{ textDecoration: "none" }} to="/admin">Admin</Link>
            </div>
        </header>
    )
}

export default Header;