
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import { useState, useEffect } from 'react';
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/api";

const useAxios = (url) => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);
  const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const abortCont = new AbortController();

      setTimeout(() => {
          fetch(url, { signal: abortCont.signal })
          .then(res => {
              if(!res.ok)
              {
                  throw Error('Could not fetch data for that resource');
              }
              return res.json();
          })
          .then((data) => {
              setData(data);
              setIsPending(false);
              setError(null);
          })
          .catch((err) => {
              if(err.name==='AbortError') {
                  console.log('Fetch aborted');
              }
              else {
                  setError(err.message);
                  setIsPending(false);
              }
          })
      }, 5);
      return () => abortCont.abort();
    },[url]);



  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: authTokens.refresh
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance, data, isPending, error;
};

export default useAxios;
