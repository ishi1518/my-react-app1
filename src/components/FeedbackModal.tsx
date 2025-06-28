import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEnvelope, faUser, faComments } from '@fortawesome/free-solid-svg-icons';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Portfolio Feedback',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:21bmiit093@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nFeedback:\n${formData.message}`
      )}`;
      
      // Simple and reliable method to open email client
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', subject: 'Portfolio Feedback', message: '' });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error opening email client:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="feedback-modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <div className="feedback-modal-header">
          <h3>
            <FontAwesomeIcon icon={faComments} />
            Share Your Feedback
          </h3>
          <button className="feedback-modal-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name">
              <FontAwesomeIcon icon={faUser} />
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} />
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">
              <FontAwesomeIcon icon={faComments} />
              Your Feedback
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Share your thoughts, suggestions, or feedback about my portfolio..."
              rows={5}
              required
            />
          </div>

          <div className="feedback-form-actions">
            <button
              type="button"
              className="feedback-cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="feedback-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="feedback-success">
              <FontAwesomeIcon icon={faEnvelope} />
              <div>
                <p>Thank you! Your feedback has been sent successfully.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
                  If your email client didn't open, please send your feedback to: <strong>21bmiit093@gmail.com</strong>
                </p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="feedback-error">
              <div>
                <p>Something went wrong. Please try again or email directly to:</p>
                <p style={{ fontSize: '1rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
                  <strong>21bmiit093@gmail.com</strong>
                </p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
                  Subject: Portfolio Feedback
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal; 