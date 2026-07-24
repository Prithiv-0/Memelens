import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import AnnotatePage from './pages/AnnotatePage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
          <Route path="/annotate" element={<AnnotatePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
