import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const FeedbackForm = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          participant_name: user?.name || 'Anonymous',
          message: feedback
        })
      });

      if (response.ok) {
        setStatus('Feedback submitted successfully!');
        setFeedback('');
      } else {
        setStatus('Failed to submit feedback.');
      }
    } catch (err) {
      setStatus('Server connection error.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <h3>Submit Project Feedback</h3>
      <textarea
        rows="4"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback here..."
        required
      />
      <button type="submit">Submit</button>
      {status && <p>{status}</p>}
    </form>
  );
};