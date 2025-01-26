import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/xylo_landing/" element={<LandingPage />} />  
      </Routes>
    </Router>
  )
}
export default App