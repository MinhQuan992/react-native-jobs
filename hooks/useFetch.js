import { useEffect, useState } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "react-native-dotenv";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };

  const fetchData = async (overriddenParams) => {
    setIsLoading(true);
    setData([]);

    try {
      if (overriddenParams) {
        options = { ...options, params: overriddenParams };
      }
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = (overriddenParams) => {
    setIsLoading(true);
    fetchData(overriddenParams);
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
