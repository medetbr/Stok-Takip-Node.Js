import axios from "axios";

export const fetchCreateAccount= async(obje)=>{
    const {data} = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/accounts/`,obje,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchDeleteAccount= async(id)=>{
    const {data} = await axios.delete(
      `${process.env.REACT_APP_BASE_ENDPOINT}/accounts/${id}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchGetAccountList= async(page=1,limit=10,search)=>{
    const {data} = await axios.get(
      `${process.env.REACT_APP_BASE_ENDPOINT}/accounts?page=${page}&limit=${limit}${"&search="+search}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchUpdateAccount= async(id,obje)=>{
    const {data} = await axios.patch(
      `${process.env.REACT_APP_BASE_ENDPOINT}/accounts/${id}`,obje,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchAccountDetail= async(id)=>{
    const {data} = await axios.get(
      `${process.env.REACT_APP_BASE_ENDPOINT}/accounts/${id}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }