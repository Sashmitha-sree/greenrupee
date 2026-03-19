import React, { useState } from 'react';
import Landing from './Pages/Landing';
import Quiz from './Pages/Quiz';
import Results from './Pages/Results';
import { calculateScores } from './data/questions';

export default function App() {
  const [page, setPage] = useState('landing'); // 'landing' | 'quiz' | 'results'
  const [results, setResults] = useState(null); // { answers, businessInfo, scores }

  const handleQuizComplete = (answers, businessInfo) => {
    const scores = calculateScores(answers);
    setResults({ answers, businessInfo, scores });
    setPage('results');
  };

  const handleRestart = () => {
    setResults(null);
    setPage('landing');
  };

  return (
    <div className="app-shell">
      {/* NAV */}
      <nav>
        <div className="nav-logo">
          Green<span>Rupee</span> 🌿
        </div>
        <div className="nav-links">
          <button
            className={page === 'landing' ? 'active' : ''}
            onClick={() => setPage('landing')}
          >
            Home
          </button>
          <button
            className={page === 'quiz' ? 'active' : ''}
            onClick={() => setPage('quiz')}
          >
            Get Scored
          </button>
          {results && (
            <button
              className={page === 'results' ? 'active' : ''}
              onClick={() => setPage('results')}
            >
              My Results
            </button>
          )}
        </div>
      </nav>

      {/* PAGES */}
      {page === 'landing' && (
        <Landing onStart={() => setPage('quiz')} />
      )}

      {page === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} />
      )}

      {page === 'results' && results && (
        <Results
          answers={results.answers}
          businessInfo={results.businessInfo}
          scores={results.scores}
          onRestart={handleRestart}
        />
      )}

      {/* FOOTER */}
      <footer style={{
        background: '#1a3a2a',
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        padding: '24px',
        fontSize: '0.82rem',
        marginTop: 'auto',
      }}>
        🌿 GreenRupee — MSME ESG Scorer &nbsp;·&nbsp; Built for India's 63 million small businesses
        <br />
        <span style={{ fontSize: '0.75rem', marginTop: 4, display: 'block' }}>
          Self-assessment tool. Scores are indicative and not officially certified.
        </span>
      </footer>
    </div>
  );
}