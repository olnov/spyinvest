const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const token = localStorage.getItem('token');


export const getUserInfo = async (token) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("token, ", token);
    const response = await fetch(`${BACKEND_URL}/users`, requestOptions);
    if (response.status !== 200) {
      throw new Error("Unable to fetch user");
    }
    const data = await response.json();
    return data;
  };