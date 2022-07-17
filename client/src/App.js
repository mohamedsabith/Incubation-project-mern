import './App.css';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import Form from './pages/Form';
import HomePage from './pages/Home';
import User from './store/userContext';
import Username from './store/usernameContext';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import Applications from './pages/record';
import NotFound from './components/NotFound/NotFound';
import SlotPage from './pages/Slot';

function App() {
  return (
    <>
    <User>
      <Username>
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/form' element={<Form/>} />
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route exact path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route exact path='/admin/record' element={<Applications/>}/>
        <Route exact path='/admin/slot' element={<SlotPage/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
    </Username>
    </User>
    </>
  );
}

export default App;
