// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginScreen from './components/LoginScreen';
import RevealScreen from './components/RevealScreenProps';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/reveal/:gender" element={<RevealScreen />} />
      </Routes>
    </Router>
  );
}

export default App;