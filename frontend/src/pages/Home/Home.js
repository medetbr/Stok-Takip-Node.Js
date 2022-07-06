import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../component/Sidebar/Sidebar';
function Home() {
     return (
        <div className='wrapper'>
            <Sidebar/>
            <div className='main-panel'>
                <div className='container-fluid'>
                 <Outlet />                
                </div>                
            </div>            
        </div>
    );
}

export default Home;