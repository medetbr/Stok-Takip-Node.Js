import { Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux"
function ProtectedRoute() {
  
    const {loggedIn} = useSelector(state=> state.userLogin)
    
    return (    
            loggedIn?
            <Outlet/>:            
            <Navigate to="/sign-in" />                    
    );
}

export default ProtectedRoute