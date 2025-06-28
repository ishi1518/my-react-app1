import { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars, faTimes, faArrowUp, faMapMarkerAlt, faGraduationCap, faCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import resumePdf from './components/images/Resume1.pdf';
import { Typewriter } from 'react-simple-typewriter';
import MouseTrail from './MouseTrail';
import reactProfileImg from './components/images/react.png';
import ContactUs from './components/ContactUs';
import FeedbackModal from './components/FeedbackModal';

type SectionId = 'about' | 'skills' | 'projects' | 'contact';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [clickedSections, setClickedSections] = useState({
    about: false,
    skills: false,
    projects: false,
    contact: false
  });
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveNav(sectionId);
    setIsMenuOpen(false);
  };

  const handleSectionClick = (sectionId: SectionId) => {
    setClickedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const downloadResume = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = resumePdf;
      link.download = 'Isha_Patel_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => setIsDownloading(false), 1000);
    }, 3500); // Match the animation duration
  };

  return (
    <div className="portfolio-container">
      <MouseTrail />
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <h2>Isha Patel</h2>
          </div>
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <a
                key={section}
                className={`nav-link${activeNav === section ? ' active' : ''}`}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            <div className="download-container">
              <label className="download-label">
                <input 
                  type="checkbox" 
                  className="download-input" 
                  checked={isDownloading}
                  onChange={downloadResume}
                />
                <span className="download-circle">
                  <svg
                    className="download-icon"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 19V5m0 14-4-4m4 4 4-4"
                    />
                  </svg>
                  <div className="download-square"></div>
                </span>
                <p className="download-title">Download</p>
                <p className="download-title">Open</p>
              </label>
            </div>
          </div>
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hi, I'm <span className="highlight">Isha Patel</span></h1>
            <h2 className="typewriter-title">
              <Typewriter
                words={['Frontend Developer', 'Web Designer']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={90}
                deleteSpeed={60}
                delaySpeed={1200}
              />
            </h2>
            <p>
              Passionate about creating beautiful and functional web experiences. I specialize in building responsive, user-centric websites and web apps that blend creativity with performance. I love collaborating with teams, learning new technologies, and turning ideas into reality. Let's build something amazing together!
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('projects')}>
                View My Work
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={reactProfileImg} alt="Profile" className="profile-img" />
          </div>
        </div>
      </section>

      {/* About Section - Glassmorphism Card */}
      <section id="about" className="about-section about-glass-section">
        <div className="about-glass-header">
          <h2 className="about-glass-title">About <span className="about-glass-highlight">Me</span></h2>
          <p className="about-glass-subtitle">Get to know me better</p>
        </div>
        <div className="about-glass-card">
          <div className="about-glass-socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="about-glass-social"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="about-glass-social"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="about-glass-social"><FontAwesomeIcon icon={faXTwitter} /></a>
          </div>
          <div className="about-glass-content">
            <div className="about-glass-text">
              <p>
                I am a passionate <span className="about-glass-blue">Frontend developer</span> with a focus on web development using <span className="about-glass-blue">React</span> and <span className="about-glass-blue">TypeScript</span>. My journey in programming started with a fascination for <span className="about-glass-blue">problem-solving</span> and has evolved into a love for building <span className="about-glass-blue">scalable web applications</span>. I enjoy working on projects that challenge my skills and allow me to learn <span className="about-glass-blue">new technologies</span>.
              </p>
              <p>
                In my free time, I contribute to <span className="about-glass-green">open-source projects</span> and explore new <span className="about-glass-green">frameworks</span> and <span className="about-glass-green">libraries</span> to enhance my skill set. I believe in <span className="about-glass-blue">continuous learning</span> and strive to stay updated with the <span className="about-glass-blue">latest trends</span> in the tech industry.
              </p>
              <p>
                If you're looking for a <span className="about-glass-blue">dedicated developer</span> to bring your ideas to life, feel free to <a href="#contact" className="about-glass-link">reach out!</a>
              </p>
            </div>
          </div>
        </div>
        <div className="about-glass-card education-glass-card">
          <div className="education-glass-header">
            <FontAwesomeIcon icon={faGraduationCap} className="education-glass-cap" />
            <span className="education-glass-title">Education</span>
            <span className="education-glass-underline"></span>
          </div>
          <div className="education-glass-content">
            <div className="education-glass-item">
              <span className="education-glass-bullet"><FontAwesomeIcon icon={faCircle} /></span>
              <span className="education-glass-degree">Bachelor of Science in Information Technology</span>
              <span className="education-glass-university">UKA Tarsadia University, 2021 – 2024</span>
              <span className="education-glass-gpa">GPA: 6.03/10</span>
            </div>
            <div className="education-glass-item">
              <span className="education-glass-bullet"><FontAwesomeIcon icon={faCircle} /></span>
              <span className="education-glass-degree">Master of Computer Applications</span>
              <span className="education-glass-university">Jain Deemed-to-be University, Bangalore (Pursuing)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        className={`skills-section ${clickedSections.skills ? 'clicked' : ''}`}
        onClick={() => handleSectionClick('skills')}
      >
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend Development</h3>
              <div className="skill-items">
                <span className="skill-tag">React TypeScript</span>
                <span className="skill-tag">React Bootstrap</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">JavaScript</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend & Tools</h3>
              <div className="skill-items">
                <span className="skill-tag">Firebase</span>
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Responsive Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className={`projects-section ${clickedSections.projects ? 'clicked' : ''}`}
        onClick={() => handleSectionClick('projects')}
      >
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">Trepa</div>
              </div>
              <div className="project-content">
                <h3>Trepa</h3>
                <p>It looks like the site is currently a barebones placeholder titled "Trepa – Precision Predictions", with no additional visible content, features, or navigation beyond that title.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>CSS3</span>
                </div>
                <div className="project-links">
                  <a 
                    href="https://amazing-torrone-cd0d29.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-small"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                  </a>
                  <a 
                    href="#" 
                    className="btn-small secondary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">School Website</div>
              </div>
              <div className="project-content">
                <h3>Jain International Academy</h3>
                <p>Official website for Jain International Academy featuring modern design, responsive layout, and comprehensive school information</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>CSS3</span>
                  <span>Responsive</span>
                </div>
                <div className="project-links">
                  <a 
                    href="https://jaininternationalAcademy.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-small"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                  </a>
                  <a 
                    href="#" 
                    className="btn-small secondary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`contact-section ${clickedSections.contact ? 'clicked' : ''}`}
        onClick={() => handleSectionClick('contact')}
      >
        <ContactUs />
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Isha Patel</h3>
            <p>Frontend Developer & Web Designer</p>
            <p>Passionate about creating beautiful and functional web experiences</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
              <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
              <li><a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a></li>
              <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a></li>
              <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <p><FontAwesomeIcon icon={faEnvelope} /> 21bmiit093@gmail.com</p>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Navsari, Gujarat, India</p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Share Your Feedback</h4>
            <div className="feedback-section">
              <p className="feedback-text">Help me improve my portfolio!</p>
              <button className="feedback-button" onClick={() => setIsFeedbackModalOpen(true)}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Send Feedback</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <div className="designer-credit">
            <div className="designer-icon">
              <FontAwesomeIcon icon={faHeart} className="designer-icon-symbol" />
            </div>
            <p className="designer-text">Designed by <span className="designer-name">Isha Patel</span></p>
          </div>
          
          <div className="footer-connect-section">
            <h4>Connect With Me</h4>
            <div className="footer-socials">
              <a href="mailto:21bmiit093@gmail.com" className="footer-social" target="_blank" rel="noopener noreferrer" title="Email">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
              <a href="https://linkedin.com" className="footer-social" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com" className="footer-social" target="_blank" rel="noopener noreferrer" title="GitHub">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://twitter.com" className="footer-social" target="_blank" rel="noopener noreferrer" title="Twitter">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>
          
          <p className="footer-copyright">© 2024 Isha Patel. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}

      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </div>
  );
}

export default App;
