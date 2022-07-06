import axios from "axios";

export const fetchCreateProduct= async(obje)=>{
    const {data} = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/products/`,obje,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchDeleteProduct= async(id)=>{
    const {data} = await axios.delete(
      `${process.env.REACT_APP_BASE_ENDPOINT}/products/${id}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchGetProductList= async(page=1,limit=10,search)=>{
    const {data} = await axios.get(
      `${process.env.REACT_APP_BASE_ENDPOINT}/products?page=${page}&limit=${limit}${"&search="+search}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }
  export const fetchUpdateProduct= async(id,obje)=>{
    const {data} = await axios.patch(
      `${process.env.REACT_APP_BASE_ENDPOINT}/products/${id}`,obje,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
    return data
  }