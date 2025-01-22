import './App.css';
import { JobsPage } from './components/pages/jobs/JobsPage';
import { LoginPage } from './components/pages/auth/login/LoginPage';
import { SignUpPage } from './components/pages/auth/signup/SignUpPage';
import { CreateJob } from './components/pages/jobs/CreateJob';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar/NavBar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/jobs/create" element={<CreateJob />} />
        <Route path="/jobs/display" element={<JobsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
