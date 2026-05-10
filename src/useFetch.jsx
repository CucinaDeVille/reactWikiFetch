import {useState} from "react";

export default function useFetch() {

    // store the fetched response data
    const [data, setData] = useState(null);

    // store possible request errors
    const [error, setError] = useState(null);

    // indicates whether the request is currently loading
    const [loading, setLoading] = useState(false);

    async function fetchData(url) {

        setLoading(true); // request starts -> loading set to true
        setError(null); // reset previous errors

        try{
            const response = await fetch(url); // send request out to given url
            const json = await response.json(); // convert response into json
            setData(json); // store response into state of variable
        }
        catch(err){
            setError(err); // catch error/ store message in state of respective variable
        }
        finally {
            setLoading(false); // request finished -> loading set to false
        }
    }

    return [data, setData, error, loading, fetchData]; // expose states of variables and fetch function to other components
}