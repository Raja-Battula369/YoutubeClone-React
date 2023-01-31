import axios from "axios";
const BaseUrl="https://youtube138.p.rapidapi.com";
const options = {
  params: { hl: 'en', gl: 'US'},
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
  }
};


export const fetchDataApi=async(url)=> {
    const {data}=await axios.get(`${BaseUrl}/${url}`, options);
    
    return data;
};