import axios from "axios";

export const fetchStockList= async(id)=>{
    const {data} = await axios.get(
      `${process.env.REACT_APP_BASE_ENDPOINT}/stocks/${id}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchAddStock= async(stockInfo)=>{
    const {data} = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/stocks/`,stockInfo,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchUpdateStock= async(id,obje)=>{
    const {data} = await axios.patch(
      `${process.env.REACT_APP_BASE_ENDPOINT}/stocks/${id}`,obje,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }