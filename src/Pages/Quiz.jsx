import React, { useState } from 'react';
import { FaLeaf, FaUsers, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import { questions } from '../data/questions';

export default function Quiz({ onComplete }) {
  const [step, setStep] = useState('info'); // 'info' | 'quiz'
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    type: '',
    employees: '',
    city: '',
  });
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]); // [{question: id, optionIndex: n}]
  const [selected, setSelected] = useState(null);

  const totalQ = questions.length;

  const handleInfoSubmit = () => {
    if (!businessInfo.name || !businessInfo.type) return;
    setStep('quiz');
  };

  const handleSelect = (idx) => setSelected(idx);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [
      ...answers.filter(a => a.question !== questions[current].id),
      { question: questions[current].id, optionIndex: selected },
    ];
    setAnswers(newAnswers);

    if (current + 1 < totalQ) {
      setCurrent(current + 1);
      // Restore previous answer if navigating back and forth
      const prev = newAnswers.find(a => a.question === questions[current + 1]?.id);
      setSelected(prev ? prev.optionIndex : null);
    } else {
      onComplete(newAnswers, businessInfo);
    }
  };

  const handleBack = () => {
    if (current === 0) { setStep('info'); return; }
    const prev = answers.find(a => a.question === questions[current - 1].id);
    setSelected(prev ? prev.optionIndex : null);
    setCurrent(current - 1);
  };

  if (step === 'info') {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>Tell us about your business</h2>
          <p>Just a few details to personalise your ESG certificate</p>
        </div>

        <div className="business-form">
          <h3>Business Details</h3>
          <p>This information will appear on your certificate.</p>

          <div className="form-group">
            <label>Business / Shop Name *</label>
            <input
              type="text"
              placeholder="e.g. Ravi Textiles"
              value={businessInfo.name}
              onChange={e => setBusinessInfo({ ...businessInfo, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Business Type *</label>
            <select
              value={businessInfo.type}
              onChange={e => setBusinessInfo({ ...businessInfo, type: e.target.value })}
            >
              <option value="">Select your industry</option>
              <option value="Textile / Garments">Textile / Garments</option>
              <option value="Food Processing">Food Processing</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail / Trade">Retail / Trade</option>
              <option value="Agriculture / Farming">Agriculture / Farming</option>
              <option value="Handicrafts / Artisan">Handicrafts / Artisan</option>
              <option value="IT / Services">IT / Services</option>
              <option value="Construction">Construction</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Number of Employees</label>
            <select
              value={businessInfo.employees}
              onChange={e => setBusinessInfo({ ...businessInfo, employees: e.target.value })}
            >
              <option value="">Select range</option>
              <option value="1–5">1–5 (Micro)</option>
              <option value="6–20">6–20 (Small)</option>
              <option value="21–50">21–50 (Small-Medium)</option>
              <option value="51–250">51–250 (Medium)</option>
            </select>
          </div>

          <div className="form-group">
            <label>City / District</label>
            <input
              type="text"
              placeholder="e.g. Coimbatore, Tamil Nadu"
              value={businessInfo.city}
              onChange={e => setBusinessInfo({ ...businessInfo, city: e.target.value })}
            />
          </div>
        </div>

        <div className="quiz-nav">
          <div />
          <button
            className="btn-next"
            onClick={handleInfoSubmit}
            disabled={!businessInfo.name || !businessInfo.type}
          >
            Start Assessment →
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current) / totalQ) * 100;

  const catColors = { E: 'cat-E', S: 'cat-S', G: 'cat-G' };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>ESG Assessment</h2>
        <p>Answer honestly — there are no wrong answers</p>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-label">Question {current + 1} of {totalQ}</div>

      <div className="question-card" key={q.id}>
        <div className={`question-category ${catColors[q.category]}`}>
          {q.category === 'E' && <FaLeaf style={{ marginRight: 5 }} />}
          {q.category === 'S' && <FaUsers style={{ marginRight: 5 }} />}
          {q.category === 'G' && <FaBuilding style={{ marginRight: 5 }} />}
          {q.category === 'E' ? 'Environment' : q.category === 'S' ? 'Social' : 'Governance'}
        </div>
        <div className="question-text">{q.text}</div>
        <div className="options-grid">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={`option-btn ${selected === idx ? 'selected' : ''}`}
              onClick={() => handleSelect(idx)}
            >
              <span className="option-dot">
                {selected === idx}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-nav">
        <button className="btn-back" onClick={handleBack}>
          ← Back
        </button>
        <button className="btn-next" onClick={handleNext} disabled={selected === null}>
          {current + 1 === totalQ ? 'See My Score' : 'Next →'}
        </button>
      </div>
    </div>
  );
}