import React from "react";
import { updateUserInfo } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
export default function Onboarding() { 
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = React.useState({
        name: "",
        surname: "",
        dateOfBirth: "",
        gender: "",
    });

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }


    
   const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await updateUserInfo(token, userInfo);
            navigate("/portfolio")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="onboarding-card">
            <form>
                <h1>About you</h1>
                <label>
                    Name: 
                <input type="text" required onChange={handleChange}/>
                </label>
                <label>
                    Surname: 
                    <input type="text" required onChange={handleChange}/>
                </label>
                <label>
                    Date of Birth: 
                    <input type="date" required onChange={handleChange}/>
                </label>
                <label>
                    Gender: 
                    <select > 
                        <ul>
                            <li>
                                Male
                            </li>
                            <li>
                                Female
                            </li>
                        </ul>
                    </select>
                </label>
                <button onSubmit={handleSubmit}>Next</button>
                </form>
        </div>
    );

}