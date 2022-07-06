import { fetchGetSupplierList } from "../../Api/supplier"
import * as ACTIONS from "../constants/supplier";
export const supplierGetListAction = (page,limit,search)=>async(dispatch)=>{
    try {
        const data = await fetchGetSupplierList(page,limit,search?.length>0?search:"")
        dispatch({type:ACTIONS.SUPPLIER_GET_LIST_SUCCESS,payload:data})
    } catch (error) {
        
    }
}