import axios from "axios";

export const fetchCreateSupplier= async(obje)=>{
    const {data} = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/supplier/`,obje,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchDeleteSupplier= async(id)=>{
    const {data} = await axios.delete(
      `${process.env.REACT_APP_BASE_ENDPOINT}/supplier/${id}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchGetSupplierList= async(page=1,limit=10,search)=>{
    const {data} = await axios.get(
      `${process.env.REACT_APP_BASE_ENDPOINT}/supplier?page=${page}&limit=${limit}${"&search="+search}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchSupplierUpdate= async(id,obje)=>{
    const {data} = await axios.patch(
      `${process.env.REACT_APP_BASE_ENDPOINT}/supplier/${id}`,obje,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }