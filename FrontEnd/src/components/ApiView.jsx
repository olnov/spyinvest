import { useEffect, useState } from "react";
import { fetchPrices } from "../services/assetsServices";
import { fetchSymbol } from "../services/assetsServices";


const ApiView = (id) => {

    const [symbolState, setSymbolState] = useState("AAPL")
    const [symbolPrice, setSymbolPrice] = useState(0)



    useEffect(() => {

        const internalApi = async () => {
            try {
                const result = await fetchSymbol(id)
                // console.log(result)
                return result
            } catch (err) {
                console.log(err)
            }
        }

        const response = async () => {
            try {
                const result = await fetchPrices(internalApi(), "8H")

                // console.log(result['bars']['AAPL'][0].c)
                // setSymbolState(result['bars'])

                setSymbolPrice(result['bars']['AAPL'][0].c)
            } catch (err) {
                console.log(err)
            }
        }

        // internalApi()
        response()






    }, [])

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const fetchedUser = await getUserById(userId, token);
    //             setUser(fetchedUser);



    return (
        <>
            <div>ApiView</div>
            <h1>{symbolState}</h1>
            <h1>{symbolPrice}</h1>

        </>
    )
}

export default ApiView