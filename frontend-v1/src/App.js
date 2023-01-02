import './index.css';
import {Routes, Route} from 'react-router-dom'
import Signin from './components/Sign-In/Signin'
import Signup from './pages/Signup'
import Account from './pages/Account';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
