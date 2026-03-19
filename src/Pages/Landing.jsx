import React from 'react';

export default function Landing({ onStart }) {
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">🌱 Free ESG Tool for MSMEs</div>
        <h1>
          Prove your business is<br />
          <em>sustainable</em> — in 2 minutes
        </h1>
        <p>
          Answer 13 simple questions. Get your ESG score, a downloadable certificate,
          and a personalised improvement roadmap — completely free.
        </p>
        <button className="hero-cta" onClick={onStart}>
          Get My ESG Score →
        </button>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="num">63M+</div>
            <div className="lbl">MSMEs in India</div>
          </div>
          <div className="hero-stat">
            <div className="num">2 min</div>
            <div className="lbl">To get scored</div>
          </div>
          <div className="hero-stat">
            <div className="num">Free</div>
            <div className="lbl">Always</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-label">How it works</div>
        <h2 className="section-title">From zero to ESG-ready in 4 steps</h2>
        <div className="steps-grid">
          {[
            { num: '01', icon: '📝', title: 'Answer 13 Questions', desc: 'Simple yes/no and multiple-choice questions about energy, workers, and records.' },
            { num: '02', icon: '🧮', title: 'Get Your Score', desc: 'Instantly see your Environment, Social & Governance scores out of 100.' },
            { num: '03', icon: '📄', title: 'Download Certificate', desc: 'A professional PDF certificate you can share with banks and buyers.' },
            { num: '04', icon: '🚀', title: 'Improve & Grow', desc: 'Get personalised recommendations to boost your score and unlock benefits.' },
          ].map(s => (
            <div className="step-card" key={s.num}>
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section style={{ background: '#1a3a2a', padding: '72px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="section-label" style={{ color: '#52b788' }}>The problem we solve</div>
          <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: 20 }}>
            "Ravi does everything right — but has no proof."
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 40 }}>
            Ravi pays fair wages, uses sustainable cotton, and manages waste properly.
            But without an ESG document, the bank charges him higher interest,
            and the export buyer cancels his order. <strong style={{ color: '#e9c46a' }}>GreenRupee fixes this.</strong>
          </p>
          <button className="hero-cta" onClick={onStart}>
            Start My ESG Assessment →
          </button>
        </div>
      </section>
    </div>
  );
}