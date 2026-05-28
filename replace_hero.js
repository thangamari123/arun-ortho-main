const fs = require('fs');

const path = 'c:/Users/thang/OneDrive/Desktop/arun-ortho-main/index.html';
let html = fs.readFileSync(path, 'utf8');

const heroRegex = /<!-- ================================================================\r?\n\s*HERO SECTION — Full-screen background slider\r?\n================================================================ -->[\s\S]*?<\/section>/;

const newHero = `<!-- ================================================================
     HERO SECTION — Premium Clinic Layout
================================================================ -->
<section class="hero-clinic" id="home" aria-label="Hero section">
  <!-- Soft background shapes -->
  <div class="hc-bg-shape hc-bg-shape-1"></div>
  <div class="hc-bg-shape hc-bg-shape-2"></div>

  <div class="container">
    <div class="hero-clinic-grid">
      
      <!-- Left: Content -->
      <div class="hero-clinic-content">
        <span class="section-label">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.5"/>
            <path d="M7 4v3.5l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          #1 Orthopaedic Clinic in Dharmapuri
        </span>

        <h1 class="hero-title-dark">
          Advanced Orthopaedic Care for<br>
          <span class="highlight">Pain‑Free Movement</span>
        </h1>

        <p class="hero-subtitle-dark">
          Expert treatment for bones, joints, spine, trauma, sports injuries, arthritis,
          and minimally invasive orthopaedic surgery — personalized for your recovery.
        </p>

        <div class="hero-cta-clinic">
          <a href="book-appointment.html" class="btn btn-primary" id="heroBookBtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Book Appointment
          </a>
          <a href="tel:+918489992001" class="btn btn-outline" id="heroCallBtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.94a16 16 0 006.86 6.86l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call Now
          </a>
        </div>

        <div class="hero-emergency-clinic" aria-label="Emergency support available 24/7">
          <div class="emergency-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
          <div class="emergency-text">
            <small>24/7 Emergency Support</small>
            <strong>+91 84899 92001</strong>
          </div>
        </div>

      </div>

      <!-- Right: Image/Doctor -->
      <div class="hero-clinic-image-area">
        <div class="hc-shape-blob"></div>
        <!-- We use an existing image or a generic clinic image for the hero -->
        <img src="clinic_exterior.png" alt="Arun Ortho Clinic" class="hc-main-img" onerror="this.src='dr_arun_portrait.png'">
        
        <div class="hc-badge hc-badge-1 reveal-right" data-delay="200">
          <div class="icon-circle">✓</div>
          <div class="text">
            <strong>Certified</strong>
            <small>Orthopaedic Center</small>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>`;

if (heroRegex.test(html)) {
  html = html.replace(heroRegex, newHero);
  fs.writeFileSync(path, html, 'utf8');
  console.log("Replaced hero section successfully.");
} else {
  console.log("Could not find the hero section to replace.");
}
