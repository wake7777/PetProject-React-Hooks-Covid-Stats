import { useState, useEffect } from 'react';
import dataApi from './dataApi'

export const useGetCountries = () => {

    const [data, setData] = useState([]);


    useEffect(() => {
        // const fetchData = async () => {
        //     const randomApi = 'http://jservice.io/api/random?count=1'
        //     const countriesApi = 'https://api.sampleapis.com/countries/countries'
        //     const response = await fetch(countriesApi)
        //     .then(res => res.json())
        //     .catch(err => console.log(err))
        //     setData(response)
        // }
        // fetchData();
        
        //Апи постоянно перегруженно, поэтому тащу все просто с файла
        setData(dataApi)
        
    }, [])
    
    return {
        data
    }
}

export const useGetStats = (country) => {
    const [data, setData] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const pause = () => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 300)
        })
    }


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError('')

            await pause()

            const api = `https://covid19.mathdro.id/api/countries/${country}`
            const response = await fetch(api)
            .then(res => res.json())
            .catch(err => console.log(err))

            if (!response.error) {
                setData(response)
            } else {
                setError(response.error.message)
            }

            setLoading(false)
        }
        fetchData();
        
    }, [country])

    return {
        data,
        error,
        loading
    }
}
