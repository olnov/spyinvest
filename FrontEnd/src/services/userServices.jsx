const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


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

  export const updateUserInfo = async (token, userInfo) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
    };
    const response = await fetch(`${BACKEND_URL}/users`, requestOptions);
    if (response.status !== 200) {
      throw new Error("Unable to update user");
    }
    const data = await response.json();
    return data;
  }