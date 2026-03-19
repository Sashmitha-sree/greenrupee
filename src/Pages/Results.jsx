import React, { useState, useEffect } from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts';
import { getGrade, getRecommendations } from '../data/questions';
import CertificateModel from '../components/CertificateModel';

function ScoreRing({ score }) {
  const [animated, setAnimated] = useState(0);
  const r = 64;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animated / 100) * circ;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="score-ring">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle className="score-ring-bg" cx="80" cy="80" r={r} />
        <circle
          className="score-ring-fill"
          cx="80" cy="80" r={r}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.5s ease' }}
        />
      </svg>
      <div className="score-center">
        <div className="score-num">{score}</div>
        <div className="score-denom">/100</div>
      </div>
    </div>
  );
}

const COLORS = { E: '#52b788', S: '#e9c46a', G: '#74b3ce' };

export default function Results({ answers, businessInfo, scores, onRestart }) {
  const [showCert, setShowCert] = useState(false);
  const { total, eScore, sScore, gScore, maxE, maxS, maxG } = scores;
  const grade = getGrade(total);
  const recommendations = getRecommendations(scores);

  const breakdownData = [
    { name: 'Environment', score: eScore, max: maxE, pct: Math.round((eScore / maxE) * 100), color: COLORS.E },
    { name: 'Social', score: sScore, max: maxS, pct: Math.round((sScore / maxS) * 100), color: COLORS.S },
    { name: 'Governance', score: gScore, max: maxG, pct: Math.round((gScore / maxG) * 100), color: COLORS.G },
  ];

  const radarData = [
    { subject: 'Energy', A: Math.round((eScore / maxE) * 100), fullMark: 100 },
    { subject: 'Waste', A: Math.round((eScore / maxE) * 80), fullMark: 100 },
    { subject: 'Wages', A: Math.round((sScore / maxS) * 100), fullMark: 100 },
    { subject: 'Safety', A: Math.round((sScore / maxS) * 90), fullMark: 100 },
    { subject: 'Records', A: Math.round((gScore / maxG) * 100), fullMark: 100 },
    { subject: 'Compliance', A: Math.round((gScore / maxG) * 85), fullMark: 100 },
  ];

  const priorityLabel = { high: 'High Priority', mid: 'Medium Priority', low: 'Quick Win' };
  const priorityClass = { high: 'tag-high', mid: 'tag-mid', low: 'tag-low' };

  return (
    <div className="results-container">
      {/* Score Hero Card */}
      <div className="score-hero">
        <div className="score-business">{businessInfo.name} · {businessInfo.type}</div>
        <div className="score-title">Your ESG Score</div>
        <div className="score-ring-wrap">
          <ScoreRing score={total} />
        </div>
        <div className="score-grade" style={{ marginTop: 8 }}>
          {grade.grade} — {grade.label}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', marginTop: 14, maxWidth: 400, margin: '14px auto 0' }}>
          {total >= 70
            ? 'Great job! Your business demonstrates strong sustainability practices.'
            : total >= 50
            ? 'Good foundation! A few improvements could unlock major benefits.'
            : 'There is real opportunity here. Small changes can improve your score quickly.'
          }
        </p>
      </div>

      {/* Breakdown Cards */}
      <div className="breakdown-grid">
        {breakdownData.map(b => (
          <div className="breakdown-card" key={b.name}>
            <div className="breakdown-icon">
              {b.name === 'Environment' ? '🌱' : b.name === 'Social' ? '👥' : '🏢'}
            </div>
            <div className="breakdown-label">{b.name}</div>
            <div className="breakdown-score">{b.score}</div>
            <div className="breakdown-max">out of {b.max}</div>
            <div className="breakdown-bar-wrap">
              <div
                className="breakdown-bar"
                style={{ width: `${b.pct}%`, background: b.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="chart-card">
        <h3>Score Breakdown by Category</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={breakdownData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#666' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#aaa' }} />
            <Tooltip
              formatter={(v, n, p) => [`${p.payload.score}/${p.payload.max} pts`, 'Score']}
              contentStyle={{ borderRadius: 10, border: '1px solid #eee', fontSize: 13 }}
            />
            <Bar dataKey="pct" radius={[8, 8, 0, 0]} maxBarSize={80}>
              {breakdownData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div className="chart-card">
        <h3>ESG Radar — How balanced are you?</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
            <PolarGrid stroke="#e8e8e8" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#666' }} />
            <Radar
              name="Your Score"
              dataKey="A"
              stroke="#2d6a4f"
              fill="#52b788"
              fillOpacity={0.35}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendations */}
      <div className="reco-card">
        <h3>💡 Your Personalised Recommendations</h3>
        {recommendations.map((r, i) => (
          <div className="reco-item" key={i}>
            <div className="reco-icon">{r.icon}</div>
            <div className="reco-content">
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
              <span className={`reco-tag ${priorityClass[r.priority]}`}>
                {priorityLabel[r.priority]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="action-btns">
        <button className="btn-cert" onClick={() => setShowCert(true)}>
          📄 Download Certificate
        </button>
        <button className="btn-restart" onClick={onRestart}>
          🔄 Retake Assessment
        </button>
      </div>

      {showCert && (
        <CertificateModel
          businessInfo={businessInfo}
          scores={scores}
          onClose={() => setShowCert(false)}
        />
      )}
    </div>
  );
}
