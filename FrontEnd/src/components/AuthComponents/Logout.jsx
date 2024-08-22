
import { useNavigate } from "react-router-dom";



export const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <button onClick={handleLogout}>Logout</button>
    )

}