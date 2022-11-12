
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Contactus from "./pages/Contactus";
import Stock from "./pages/Stock";
import Services from "./pages/Services";
import Signup from "./pages/Signup";
import Offers from './pages/Offers'
import Admin from './pages/Admin'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Car from "./pages/Car"
import AddCar from './pages/AddCar'
import EditCar from './pages/EditCar'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
         <Route path='/' element={<Home/>} />

          <Route path='/admin' element={<PrivateRoute />}>
            <Route path='/admin' element={<Admin/>}></Route>
          </Route> 

          <Route path='/add-car' element={<PrivateRoute />}>
            <Route path='/add-car' element={<AddCar/>} />
          </Route> 

          <Route path='/edit-car/:carId' element={<PrivateRoute />}>
            <Route path='/edit-car/:carId' element={<EditCar/>} />
          </Route> 


          <Route path="/contactus" element={<Contactus/>}></Route>
          <Route path="/stock" element={<Stock/>}></Route>
          <Route path="/services" element={<Services/>}></Route>
          <Route path="/sign-up" element={<Signup/>}></Route>
          <Route path='/offers' element={<Offers />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/car/:carId' element={<Car/>} />
         

        </Routes>

       
        
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
