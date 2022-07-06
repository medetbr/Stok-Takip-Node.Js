import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"

function Sidebar() {
  
  return (
    <div className="sidebar"  >
      <div className="sidebar-wrapper">
        <div className="sidebar-items">
          <li><Link to="/profile" className="sidebar-item"><span><i className="fa-solid fa-user"></i></span> <p>Profilim</p></Link></li>
          <li><Link to="/supplier" className="sidebar-item"><span><i className="fa-solid fa-clipboard-list"></i></span><p>Tedarikçiler</p></Link></li>
          <li><Link to="/products" className="sidebar-item"><span><i className="fa-solid fa-tags"></i></span><p>Ürünler</p></Link></li>
          <li><Link to="/accounts" className="sidebar-item"><span><i className="fa-solid fa-users-line"></i></span><p>Hesaplar</p></Link></li>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;