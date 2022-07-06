import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import StockModal from './component/Modals/StockModal';
import * as Pages from './pages';

function App() {
  
   return (
    <Router>   
      <Navbar/>
            <Routes>
                <Route element={<ProtectedRoute/>}> 
                  <Route exact path="/" element={<Pages.Home />} >
                    <Route path='/profile' element={<Pages.Profile />}/>
                    <Route path='/supplier' element={<Pages.Supplier />}/>
                    <Route path='/products' element={<Pages.ProductHome />}>
                      <Route path='/products' element={<Pages.Product/>} />
                      <Route path='/products/detail' element={<StockModal/>} />
                    </Route>
                    <Route path='/accounts' element={<Pages.AccountHome />}>
                      <Route path='/accounts' element={<Pages.Account/>} />
                      <Route path='/accounts/detail' element={<Pages.AccountDetail/>} />
                    </Route>
                    <Route path='/stock' element={<Pages.Stock />}/>
                  </Route>
                </Route>
              <Route element={<PublicRoute/>}>
                
                <Route path="/sign-in" element={<Pages.Login/>} />
                <Route path="/sign-up" element={<Pages.Register />} /> 
                <Route path="/forgot-password" element={<Pages.ForgotPassword />} /> 
                <Route path="/reset-password/:id/:token" element={<Pages.ResetPassword />} /> 
              </Route>
              <Route path='*' element={<Pages.ErrorPage/>}/>
            </Routes>          
    </Router>
  );
}

export default App;
