import { useEffect, useState, useCallback } from 'react'
import axios from 'axios';
import Config from 'react-native-config'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function useFetch(url) {
  const [dataCat, setData] = useState(null);
  const [loadingCat, setLoading] = useState(true);
  const [errorCat, setError] = useState(null);

  const result = url.split('/')
  // console.log(result[4])

  const fetchData = async () => {
    try {
      const { data: responseData } = await axios({
        method: 'GET',
        url: url,
        headers: {
          'Accepts': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Config.TOKEN}`
        },
      });
      setData(responseData.categories);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  return { errorCat, loadingCat, dataCat }
}

export default useFetch;

// const { data: responseData } = await axios({
//   method: 'POST',
//   url: url,
//   data: apiData,
//   headers: { 'Accepts':'application/json', 'Content-Type':'application/json' },
// });