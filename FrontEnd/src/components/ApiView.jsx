import { useEffect, useState } from "react";
import { fetchPrices } from "../services/assetsServices";
import { fetchAssetSymbol } from "../services/assetsServices";


const ApiView = (props) => {
    console.log("Test :" + props.id)

    const [symbolState, setSymbolState] = useState("")
    const [symbolDesc, setSymbolDesc] = useState("")
    const [symbolPrice, setSymbolPrice] = useState(0)



    useEffect(() => {

        const internalApi = async () => {
            try {
                const result = await fetchAssetSymbol(props.id)
                console.log("The result: " + result)
                setSymbolState(result.asset)
                setSymbolDesc(result.description)
                return result.asset
            } catch (err) {
                console.log(err)
            }
        }

        const externalAPIresponse = async () => {
            try {
                const result = await fetchPrices(symbolState, "8H")

                // console.log(result['bars']['AAPL'][0].c)
                // setSymbolState(result['bars'])
                console.log(result)

                setSymbolPrice(result['bars'][symbolState][0].c)
            } catch (err) {
                console.log(err)
            }
        }

        internalApi()
        externalAPIresponse()






    }, [symbolState])


    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const fetchedUser = await getUserById(userId, token);
    //             setUser(fetchedUser);



    return (
        <>
            <div>ApiView</div>
            <h1>{symbolState}</h1>
            <h1>{symbolDesc}</h1>
            <h1>{symbolPrice}</h1>

        </>
    )
}

export default ApiView