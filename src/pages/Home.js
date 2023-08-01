import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export function Home() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleClick = () => {
    cookies.remove('jwt_authorization', { path: '/' });
    navigate("/");
  }
    return <>
        <h1>Home</h1>
        <button onClick={handleClick}>Logout</button>
    </>
}