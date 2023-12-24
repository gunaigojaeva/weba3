import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import FlashCard from './pages/FlashCard.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/flashcard" element={<FlashCard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
