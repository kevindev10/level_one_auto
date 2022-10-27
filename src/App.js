
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'



function App() {
  return (
    <>
      <Router>

        <Routes>
         <Route path='/' element={<Home/>} />
        </Routes>

        <Navbar />
        
      </Router>

    
    </>
  );
}

export default App;
