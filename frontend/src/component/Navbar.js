import { Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logoutAction } from '../redux/actions/user';
function Navbar() {
  const {loggedIn,user} = useSelector(state=> state.userLogin)

  const dispatch = useDispatch()
  const logoutHandle = ()=>{
    dispatch(logoutAction())
  }
    return (
        <header>
        <nav  className="navbar navbar-expand-lg navbar">
  <div className="container-fluid">
    <Link className="navbar-brand mx-4 " to={"/"}>My Project</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div style={{justifyContent:"space-between"}} className="collapse navbar-collapse " id="navbarSupportedContent">
      <div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        {/* <Link className="navbar-link text-black" to={"/"}>Home</Link> */}
        </li>
        </ul>
      </div>
      <div><ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {!loggedIn?<>
          <li className="nav-item">
          <Link to={"/sign-in"} className="nav-link">Giriş</Link>
        </li>
        <li className="nav-item">
          <Link to={"/sign-up"} className="nav-link" >Kaydol</Link>
        </li>
        </>:<>
         <NavDropdown style={{fontSize:"17px"}}  title={
                    <>  
                      <img className="profile-img" 
                            src={user?.profileImage?`/images/${user.profileImage}`:"assets/noAvatar.png"} 
                            alt="profile img"
                        />
                        {user?.name}
                    </>
                }  id="basic-nav-dropdown">        
            <Link className='dropdown-item' to={"/profile"}>Hesabım</Link>            
            <button onClick={logoutHandle} className='dropdown-item text-danger' >Çıkış</button>            
       </NavDropdown></>
      }      
        
      </ul>      
      </div>
    </div>
  </div>
</nav>
</header>
    );
}

export default Navbar;