import React from 'react';
import { getGrade } from '../data/questions';

export default function CertificateModel({ businessInfo, scores, onClose }) {
  const { total, eScore, sScore, gScore, maxE, maxS, maxG } = scores;
  const grade = getGrade(total);
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  const certId = `GR-${Date.now().toString(36).toUpperCase()}`;

  const handleDownload = () => {
    // We'll use the browser's print-to-PDF functionality
    // by opening a new window with only the certificate
    const certHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>ESG Certificate – ${businessInfo.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'DM Sans',sans-serif;background:#fdf6ec;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:40px;}
    .cert{background:white;border:10px solid #1a3a2a;border-radius:16px;padding:52px;max-width:640px;width:100%;text-align:center;position:relative;overflow:hidden;}
    .watermark{position:absolute;font-family:'DM Serif Display',serif;font-size:100px;color:rgba(26,58,42,0.04);top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);pointer-events:none;white-space:nowrap;}
    .line{width:60px;height:5px;background:#e9c46a;margin:0 auto 14px;border-radius:3px;}
    .org{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#2d6a4f;margin-bottom:6px;}
    h1{font-family:'DM Serif Display',serif;font-size:2.2rem;color:#1a3a2a;margin-bottom:28px;}
    .body-text{font-size:14px;color:#666;line-height:1.9;margin-bottom:16px;}
    .biz{font-family:'DM Serif Display',serif;font-size:2rem;color:#1a3a2a;margin:8px 0;}
    .score-box{background:linear-gradient(135deg,#1a3a2a,#2d6a4f);color:white;border-radius:14px;padding:24px;margin:24px 0;}
    .score-big{font-family:'DM Serif Display',serif;font-size:4rem;color:#e9c46a;line-height:1;}
    .score-sub{font-size:13px;color:rgba(255,255,255,0.65);margin-top:4px;}
    .grade{display:inline-block;border:1px solid #e9c46a;color:#e9c46a;padding:6px 20px;border-radius:100px;font-size:13px;font-weight:600;margin-top:10px;}
    .breakdown{display:flex;justify-content:center;gap:32px;margin:24px 0;}
    .bk-item{text-align:center;}
    .bk-val{font-size:1.4rem;font-weight:700;color:#1a3a2a;}
    .bk-lbl{font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;}
    hr{border:none;border-top:1px solid #eee;margin:24px 0;}
    .footer{font-size:11px;color:#aaa;}
    @media print{body{padding:0;background:white;} .cert{border-radius:0;max-width:100%;}}
  </style>
</head>
<body>
  <div class="cert">
    <div class="watermark">GreenRupee</div>
    <div class="line"></div>
    <div class="org">GreenRupee ESG Platform</div>
    <h1>Certificate of ESG Assessment</h1>
    <div class="body-text">This certifies that</div>
    <div class="biz">${businessInfo.name}</div>
    <div class="body-text">(${businessInfo.type}${businessInfo.city ? ' · ' + businessInfo.city : ''})</div>
    <div class="body-text">has completed the GreenRupee MSME ESG Assessment<br/>and achieved the following sustainability score:</div>
    <div class="score-box">
      <div class="score-big">${total}<span style="font-size:1.5rem;color:rgba(255,255,255,0.5)">/100</span></div>
      <div class="score-sub">Overall ESG Score</div>
      <div class="grade">${grade.grade} — ${grade.label}</div>
    </div>
    <div class="breakdown">
      <div class="bk-item"><div class="bk-val">${eScore}/${maxE}</div><div class="bk-lbl">🌱 Environment</div></div>
      <div class="bk-item"><div class="bk-val">${sScore}/${maxS}</div><div class="bk-lbl">👥 Social</div></div>
      <div class="bk-item"><div class="bk-val">${gScore}/${maxG}</div><div class="bk-lbl">🏢 Governance</div></div>
    </div>
    <hr/>
    <div class="footer">Issued on: ${today} &nbsp;|&nbsp; Certificate ID: ${certId}</div>
    <div class="footer" style="margin-top:6px;">This is a self-assessment tool. Scores are indicative and not officially audited.</div>
  </div>
  <script>window.onload=()=>window.print();</script>
</body>
</html>`;

    const w = window.open('', '_blank');
    w.document.write(certHTML);
    w.document.close();
  };

  return (
    <div className="cert-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cert-modal">
        <div className="cert-modal-header">
          <h3>Your ESG Certificate</h3>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        {/* Certificate Preview */}
        <div id="certificate-content">
          <div className="cert-watermark">GreenRupee</div>
          <div className="cert-header-line" />
          <div className="cert-org">GreenRupee ESG Platform</div>
          <div className="cert-title">Certificate of ESG Assessment</div>

          <div className="cert-body">This certifies that</div>
          <div className="cert-business-name">{businessInfo.name}</div>
          <div className="cert-body" style={{ fontSize: '0.82rem', marginBottom: 8 }}>
            {businessInfo.type}{businessInfo.city ? ` · ${businessInfo.city}` : ''}
          </div>
          <div className="cert-body">
            has completed the GreenRupee MSME ESG Assessment<br />
            and achieved the following sustainability score:
          </div>

          <div className="cert-score-display">
            <div className="cert-score-big">
              {total}
              <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.4)' }}>/100</span>
            </div>
            <div className="cert-score-sub">Overall ESG Score</div>
            <div className="score-grade" style={{ marginTop: 10 }}>
              {grade.grade} — {grade.label}
            </div>
          </div>

          <div className="cert-breakdown-row">
            <div className="cert-breakdown-item">
              <div className="val">{eScore}/{maxE}</div>
              <div className="lbl">🌱 Environment</div>
            </div>
            <div className="cert-breakdown-item">
              <div className="val">{sScore}/{maxS}</div>
              <div className="lbl">👥 Social</div>
            </div>
            <div className="cert-breakdown-item">
              <div className="val">{gScore}/{maxG}</div>
              <div className="lbl">🏢 Governance</div>
            </div>
          </div>

          <div className="cert-footer-line" />
          <div className="cert-date">Issued on: {today}</div>
          <div className="cert-id">Certificate ID: {certId}</div>
          <div className="cert-id" style={{ marginTop: 6 }}>
            Self-assessment tool — scores are indicative and not officially audited.
          </div>
        </div>

        <button className="cert-download-btn" onClick={handleDownload}>
          📥 Download PDF Certificate
        </button>
      </div>
    </div>
  );
}