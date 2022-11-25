import { useState, useEffect } from 'react';
import axios from 'axios';
import Config from 'react-native-config'

function usePost() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const post = async (url, apiData) => {
        try {
            setLoading(true);
            // const { data: responseData } = await axios.post(url, apiData);
            const config = {
                headers: { Authorization: `Bearer ${Config.TOKEN}}` }
            };
            
            const { data: responseData } = await axios.post(
                url,
                apiData,
                {
                    headers: {
                      'Authorization': 'Bearer ' + Config.TOKEN
                    }
                 }
            )
            // const { data: responseData } = await axios({
            //     method: 'POST',
            //     url: url,
            //     data: apiData,
            //     headers: {
            //       'Accepts': 'application/json',
            //       'Content-Type': 'application/json',
            //       'Authorization': `Bearer ${Config.TOKEN}`
            //     },
            //   });
            setData(responseData);
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            setError(err);
            setLoading(false);
        }
    };

    return { data, loading, error, post }
}

export default usePost;

// axios({
//     method: 'post',
//     url: '/user/12345',
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone'
//     }
//   });