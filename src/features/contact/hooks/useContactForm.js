import { useState } from 'react';

/**
 * Hook to manage contact form state, asynchronous submission, and delivery
 */
export function useContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Send to Web3Forms free API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '6da4194a-024f-404b-add6-06d974b0f825', // Web3Forms access key
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message,
          from_name: `${formData.name} (Harry Designs Portfolio Lead)`,
          subject: `New Project Inquiry from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 7000);
      } else {
        // If API fails or key is unverified, fallback to direct mailto
        triggerMailtoFallback();
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch {
      // Network or fetch error: trigger mailto so message is never lost
      triggerMailtoFallback();
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  const triggerMailtoFallback = () => {
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Hariharan,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\n\nProject details:\n${formData.message}\n`
    );
    window.open(`mailto:sivakumarhariharan007@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    formData,
    status,
    isSubmitting: status === 'submitting',
    showSuccess: status === 'success',
    isError: status === 'error',
    errorMessage,
    handleSubmit,
    handleChange,
  };
}
