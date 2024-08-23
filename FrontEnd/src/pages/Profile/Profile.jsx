import { useEffect, useState } from "react";
import { TopBar } from "../../components/TopBar/TopBar";
import { getUserProfile, updateUserProfile } from "../../services/userServices";
import { useParams, useNavigate } from "react-router-dom";
import { UploadDialog } from "../../components/ProfileImage/UploadDialog";
import ProfileImage from "../../components/ProfileImage/ProfileImage";

export const Profile = ()=> {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email,setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [message, setMessage] = useState("");
    const [terms,setTerms] = useState(false)
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    const { id } = useParams();
    const currentUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const navigate = new useNavigate();

    if (!token) {
        navigate ('/login');
    }

    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const handleSaveProfile = async (event)=> {
        event.preventDefault();
        try {
            const form = event.target;
            console.log("terms:", event.target.terms.checked);
            
            if (!birthDate) {
                alert("Please specify you birth date.");
                return;
            }

            if (getAge(birthDate)<18) {
                alert("Sorry, you have to be over 18 years old to work with SpyInvest");
                return;
            }
            
            if (!terms) {
                alert("Please accept the terms of use.");
                return;
            }
            const formData = new FormData(form);
            const name = formData.get('name');
            const surname =  formData.get('surname');
            const birth_date = formData.get('birth_date');
            console.log("Terms:", terms);
            const result = await updateUserProfile(token, currentUserId, name, surname, birth_date, terms);
            if (result.success) {
                setMessage("Changes saved");
                setTimeout(() => {
                    navigate('/portfolios'); 
                }, 2000);
            }
        } catch(error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === "checkbox") {
            setTerms(checked); 
        } else {
            if (name === "name") setName(value);
            if (name === "surname") setSurname(value);
            if (name === "birth_date") setBirthDate(value);
        }
    };

    const handleCancel = () => {
        navigate('/portfolios');
    };


    const handleOpenUploadDialog = () => {
        setShowUploadDialog(true); // Show the upload dialog
    };

    const handleCloseUploadDialog = () => {
        setShowUploadDialog(false); // Hide the upload dialog
    };

    useEffect(()=> {
        const fetchProfileData = async ()=> {
            try {
                const data = await getUserProfile (token,id);
                setName(data.name);
                setSurname(data.surname);
                setEmail(data.email);
                setBirthDate(data.birth_date);
                setTerms(!!data.terms_accepted);
                console.log("Terms from database:", data.terms_accepted);
            }catch(error){
                console.log("Error fetthing profile data:", error);
            }
        }
        fetchProfileData()
    },[]);

    return (
        <>
        <TopBar />
        <div className="container rounded border bg-white mt-5 mb-5 w-100">
        <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <ProfileImage userId={id} width="150" height="150"/>
                { id === currentUserId ? ( 
                    <span><button className="btn btn-primary" onClick={handleOpenUploadDialog}>Change profile image</button></span>
                ):
                (
                    <span></span>
                )} 
                <span className="font-weight-bold">{name}&nbsp;{surname}</span><span className="text-black-50">{email}</span><span> </span>
            </div>
        </div>
        <div className="col-md-9 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                { id === currentUserId ? (
                <>
                <form onSubmit={handleSaveProfile}>
                <div className="row mt-2">
                    <div className="col-md-6"><label className="labels" htmlFor="name">Name</label>
                    <input type="text" className="form-control" value={name} name="name" id="name" onChange={handleChange} /></div>
                    <div className="col-md-6"><label className="labels" htmlFor="surname">Surname</label>
                    <input type="text" className="form-control" value={surname} name="surname" id="surname" onChange={handleChange} /></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels" htmlFor="birth_date">Date of birth</label>
                    <input type="date" className="form-control" value={birthDate} name="birth_date" id="birth_date" onChange={handleChange}/></div>
                    <div className="col-md-12">
                        <label className="labels" htmlFor="terms"><a href="/terms">I've read and accept the terms of use:&nbsp;</a></label>
                        <input className="form-check-input" type="checkbox" defaultValue="false" id="terms" name="terms" checked={terms} onChange={handleChange}></input>
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-primary profile-button" type="submit">Save Profile</button>&nbsp;
                    <button className="btn btn-secondary profile-button" onClick={handleCancel}>Discard changes</button>
                </div>
                </form>
                </>
                ) : (
                <>
                    <div className="row mt-2">
                    <div className="col-md-6"><label className="labels" htmlFor="name">Name</label>
                    <input type="text" className="form-control" value={name} name="name" id="name" onChange={handleChange} disabled/></div>
                    <div className="col-md-6"><label className="labels" htmlFor="surname">Surname</label>
                    <input type="text" className="form-control" value={surname} name="surname" id="surname" onChange={handleChange} disabled/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels" htmlFor="birth_date">Date of birth</label>
                    <input type="date" className="form-control" value={birthDate} name="birth_date" id="birth_date" onChange={handleChange} disabled/></div>
                </div> 
                </>
                )}
            </div>
            <span><h6 className="text-success">{message}</h6></span>
            </div>
            </div>
            </div>
            {/* Conditionally render the UploadDialog */}
            {showUploadDialog && (
                <UploadDialog show={showUploadDialog} onHide={handleCloseUploadDialog} userId={id} />
            )}
        </>
    )
}

export default Profile;