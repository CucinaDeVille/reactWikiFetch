import {useState} from "react";

export default function useFetch() {

    // variable to store response in
    const [data, setData] = useState(null);

    // variable to store potential error in
    const [error, setError] = useState(null);

    // variable to store whether loading or not
    const [loading, setLoading] = useState(false);

    async function fetchData(url) {

        setLoading(true);
        setError(null);

        try{
            const response = await fetch(url); // send out request to given url
            const json = await response.json(); // convert into json
            setData(json);
        }
        catch(err){
            setError(err); // catch potential error in request
        }
        finally {
            setLoading(false); // change back to initial state - false
        }
    }

    return [data, setData, error, loading, fetchData]; // provide calling component with toolset
}