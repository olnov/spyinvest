const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const token = localStorage.getItem('token');


const login = async (email, password) => {
    const response = await fetch($`${BACKEND_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (response.status === 201) {
        let data = await response.json();
        return data.token;
    } else {
        throw new Error(`Received status ${response.status} when logging in. Expected 201`)
    }
}

const register = async (email, password, name, surname, photo,gender, dob) =>{
    const response = await fetch($`${BACKEND_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, surname, photo, gender, dob }),
}
    );
    if (response.status === 201) {
        let data = await response.json();
        return data.token;
    } else {
        alert("please check console")
        throw new Error(`Received status ${response.status} when registering. Expected 201`)
    }
}