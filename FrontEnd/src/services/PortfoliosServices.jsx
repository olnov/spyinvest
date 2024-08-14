const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPortfolios = async (token) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await fetch(`${BACKEND_URL}/portfolios`, requestOptions); // URL subject to change
  
    console.log(response.status);
  
    if (response.status !== 200) {
      throw new Error("Unable to fetch portfolios");
    }
  
    const data = await response.json();
    return data;
  };

export const createPortfolio = async (token, content) => {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
    };

    const response = await fetch(`${BACKEND_URL}/portfolios`, requestOptions); // URL subject to change

    console.log(response.status);

    if (response.status !== 201) {
        throw new Error("Unable to create portfolio");
    }

    const data = await response.json();
    return data;
}