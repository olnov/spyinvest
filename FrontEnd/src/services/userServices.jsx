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


  // Service to get user's details for profile
  export const getUserProfile = async (token,id) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`${BACKEND_URL}/users/${id}`, requestOptions);
      const data = await response.json();
      return data;
    }catch(error){
      console.log("Error on getting user's profile data:", error);
    }
  }

  //Service to update user's profile
  export const updateUserProfile = async (token,id,name,surname,birth_date,terms) => {
    const requestBody = {name, surname, birth_date, terms };
    try {
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      };
      const response = await fetch(`${BACKEND_URL}/users/${id}`,requestOptions);
      if (!response.ok) {
        throw new Error(`Failed to update user profile: ${response.statusText}`);
      }
      const responseData = await response.json(); 
      return {
        success: true,
        message: "Profile updated successfully",
        data: responseData
      };

    }catch(error){
      console.log("Error updating user's profile:",error);
    }
  }