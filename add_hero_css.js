const fs = require('fs');

const path = 'c:/Users/thang/OneDrive/Desktop/arun-ortho-main/style.css';
let css = fs.readFileSync(path, 'utf8');

const newCSS = `
/* =========================================================================
   NEW CLINIC HERO SECTION
========================================================================= */
.hero-clinic {
  min-height: 70svh;
  min-height: 70vh;
  background-color: #f6fcfc;
  background-image: radial-gradient(circle at 10% 20%, rgba(0, 212, 212, 0.05) 0%, transparent 40%),
                    radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 40%);
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: calc(76px + 44px);
  padding-bottom: 3rem;
}

@media (max-width: 767px) {
  .hero-clinic {
    padding-top: calc(80px + 20px);
    padding-bottom: 2rem;
    min-height: auto;
  }
}

.hero-clinic-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

@media (max-width: 991px) {
  .hero-clinic-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* Left Content */
.hero-clinic-content {
  max-width: 600px;
  position: relative;
  z-index: 5;
}

@media (max-width: 991px) {
  .hero-clinic-content {
    text-align: center;
    margin: 0 auto;
  }
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: rgba(0, 212, 212, 0.1);
  color: var(--clr-primary);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

.hero-title-dark {
  font-family: var(--font-head);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--clr-dark);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.hero-title-dark .highlight {
  color: var(--clr-primary);
}

.hero-subtitle-dark {
  font-size: clamp(1rem, 2vw, 1.1rem);
  color: var(--clr-gray-600);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-cta-clinic {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (max-width: 991px) {
  .hero-cta-clinic {
    justify-content: center;
    flex-wrap: wrap;
  }
}

.hero-emergency-clinic {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: inline-flex;
}

.hero-emergency-clinic .emergency-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 212, 212, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-emergency-clinic .emergency-text small {
  display: block;
  font-size: 0.7rem;
  color: var(--clr-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-emergency-clinic .emergency-text strong {
  font-size: 1.1rem;
  color: var(--clr-dark);
  font-weight: 700;
}

/* Right Image Area */
.hero-clinic-image-area {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hc-shape-blob {
  position: absolute;
  width: 90%;
  height: 90%;
  background: var(--grad-btn);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  animation: morph 8s ease-in-out infinite;
  z-index: -1;
  opacity: 0.15;
}

@keyframes morph {
  0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
  67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
}

.hc-main-img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 2;
  object-fit: cover;
  max-height: 500px;
}

.hc-badge {
  position: absolute;
  bottom: 20px;
  left: -20px;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 10;
  animation: float 4s ease-in-out infinite;
}

@media (max-width: 991px) {
  .hc-badge {
    left: 10px;
    bottom: 10px;
  }
}

.hc-badge .icon-circle {
  width: 32px;
  height: 32px;
  background: var(--clr-accent);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.hc-badge .text strong {
  display: block;
  font-size: 0.9rem;
  color: var(--clr-dark);
}

.hc-badge .text small {
  font-size: 0.7rem;
  color: var(--clr-gray-500);
}
`;

css += newCSS;
fs.writeFileSync(path, css, 'utf8');
console.log("Added new hero CSS successfully.");
