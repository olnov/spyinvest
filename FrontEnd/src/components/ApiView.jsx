import { useEffect, useState } from "react";
import { fetchPrices } from "../services/assetsServices";
import { fetchAssetSymbol } from "../services/assetsServices";


const ApiView = (props) => {
    console.log("Test :" + props.id)

    const [symbolTicker, setSymbolTicker] = useState("")
    const [symbolDesc, setSymbolDesc] = useState("")
    const [symbolPrice, setSymbolPrice] = useState(0)



    useEffect(() => {

        const internalApi = async () => {
            try {
                const result = await fetchAssetSymbol(props.id)
                console.log("The result: " + result)
                setSymbolTicker(result.asset)
                setSymbolDesc(result.description)
                return result.asset
            } catch (err) {
                console.log(err)
            }
        }

        const externalAPIresponse = async () => {
            try {
                const result = await fetchPrices(symbolTicker, "8H")

                // console.log(result['bars']['AAPL'][0].c)
                // setSymbolState(result['bars'])
                console.log(result)

                setSymbolPrice(result['bars'][symbolTicker][0].c)
            } catch (err) {
                console.log(err)
            }
        }

        internalApi()
        externalAPIresponse()






    }, [symbolTicker])


    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const fetchedUser = await getUserById(userId, token);
    //             setUser(fetchedUser);



    return (
        <>
            <div>Single Asset View</div>
            <h1>{symbolTicker}</h1>
            <h1>{symbolDesc}</h1>
            <h1>{symbolPrice}</h1>

        </>
    )
}

export default ApiView