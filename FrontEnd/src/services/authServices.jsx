const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


export const login = async (email, password) => {
    const response = await fetch(`${BACKEND_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (response.status === 201) {
        let data = await response.json();
        return { token: data.token, userId: data.userId };
    } else {
        throw new Error(`Received status ${response.status} when logging in. Expected 201`)
    }
}

export const register = async (email, password, name, surname) =>{
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, surname }),
}
    );
    if (response.status === 201) {
        let data = await response.json();
        return { token: data.token, userId: data.userId };
    } else {
        alert("please check console")
        throw new Error(`Received status ${response.status} when registering. Expected 201`)
    }
}

