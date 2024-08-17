
export const fetchAssetSymbol = async (id = 1) => {
    const response = await fetch(`http://localhost:3000/assets/${id}`);
    const data = await response.json();
    console.log("Here to identify:");
    console.log(data);
    return data;
}