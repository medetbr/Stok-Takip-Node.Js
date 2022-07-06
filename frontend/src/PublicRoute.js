import { Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux"
function PublicRoute() {
  
    const {loggedIn} = useSelector(state=> state.userLogin)
    
    return (    
            !loggedIn?
            <Outlet/>:            
            <Navigate to="/" />                    
    );
}

export default PublicRoute