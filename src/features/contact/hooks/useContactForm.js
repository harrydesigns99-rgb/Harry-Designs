import { useState } from 'react';
import { sound } from '@/utils/audio';

/**
 * Hook to manage contact form state, client scoping pill selections, and submission
 */
export function useContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [selectedServices, setSelectedServices] = useState(['Packaging Architecture']);
  const [selectedTimeline, setSelectedTimeline] = useState('Standard (1-2 mo)');
  const [selectedBudget, setSelectedBudget] = useState('₹1.5L - ₹3L ($2K - $4K)');

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const toggleService = (service) => {
    setSelectedServices((prev) => {
      const exists = prev.includes(service);
      if (exists) {
        sound.playClick();
        return prev.filter((s) => s !== service);
      }
      sound.playPop();
      return [...prev, service];
    });
  };

  const selectTimeline = (timeline) => {
    sound.playPop();
    setSelectedTimeline(timeline);
  };

  const selectBudget = (budget) => {
    sound.playPop();
    setSelectedBudget(budget);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sound.playPop();
    setStatus('submitting');
    setErrorMessage('');

    const formattedServices = selectedServices.length > 0 ? selectedServices.join(', ') : 'Not specified';
    const combinedMessage = [
      `Scope / Services: ${formattedServices}`,
      `Timeline: ${selectedTimeline}`,
      `Budget Range: ${selectedBudget}`,
      `\nClient Note / Brief:\n${formData.message}`,
    ].join('\n');

    try {
      // Send to Web3Forms free API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '6da4194a-024f-404b-add6-06d974b0f825',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: combinedMessage,
          services: formattedServices,
          timeline: selectedTimeline,
          budget: selectedBudget,
          from_name: `${formData.name} (Harry Designs Inquiry)`,
          subject: `New Project Inquiry from ${formData.name} [${formattedServices}]`,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 7000);
      } else {
        triggerMailtoFallback(combinedMessage);
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch {
      triggerMailtoFallback(combinedMessage);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  const triggerMailtoFallback = (messageContent) => {
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Hariharan,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\n\n${messageContent}\n`
    );
    window.open(`mailto:sivakumarhariharan007@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // WhatsApp auto-formatted direct link
  const getWhatsAppLink = () => {
    const servicesText = selectedServices.length > 0 ? selectedServices.join(', ') : 'a new design project';
    const message = `Hi Hariharan, I'm interested in discussing a project for *${servicesText}*. Estimated timeline: *${selectedTimeline}*, budget: *${selectedBudget}*.`;
    return `https://wa.me/918610174188?text=${encodeURIComponent(message)}`;
  };

  return {
    formData,
    selectedServices,
    selectedTimeline,
    selectedBudget,
    toggleService,
    selectTimeline,
    selectBudget,
    getWhatsAppLink,
    status,
    isSubmitting: status === 'submitting',
    showSuccess: status === 'success',
    isError: status === 'error',
    errorMessage,
    handleSubmit,
    handleChange,
  };
}
