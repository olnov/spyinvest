import { useEffect, useState } from 'react';
import { TopBar } from '../components/TopBar/TopBar';
import { fetchAssetSymbol } from '../services/assetServices';

export const Test = ()=> {
    const [asset,setAsset] = useState("");

    useEffect(()=> {
        const getAssets = async () => {
            try {
                const data = await fetchAssetSymbol();
                console.log("Data:", data);
                setAsset(data);
            }catch(error){
                console.log(error);
            }
        }

        getAssets();

    },[]);

    return (
        <>
        {/* <TopBar /> */}
        <h2>Asset name:</h2>
        <div>{asset.asset}</div>
        </>
    )
}