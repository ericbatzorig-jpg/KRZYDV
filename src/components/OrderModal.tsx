import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { DISCORD_WEBHOOK_URL, services } from '../data/portfolioData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialService = ''
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setService(initialService);
      setStatus('idle');
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setStatus('idle');

    const lines = [
      'Шинэ захиалга',
      `Нэр: ${name.trim()}`,
      `Холбоо барих: ${contact.trim()}`,
      `Үйлчилгээ: ${service.trim() || 'Сонгоогүй'}`,
      `Мессеж: ${message.trim() || 'Байхгүй'}`
    ];

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: lines.join('\n'),
          allowed_mentions: { parse: [] }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus('success');
      setName('');
      setContact('');
      setMessage('');
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#F5F8EF] rounded-3xl border border-[#DAE7C7] shadow-2xl overflow-hidden text-[#101410]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#08482D]/10 bg-white/70">
          <h2 className="text-xl font-bold font-heading text-[#08482D]">
            {initialService ? 'Үйлчилгээ захиалах' : 'Холбоо барих'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#5E5E61] hover:text-[#101410] transition-colors cursor-pointer"
            aria-label="Хаах"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="order-name"
              className="block text-sm font-semibold text-[#101410] mb-1.5"
            >
              Нэр <span className="text-[#08482D]">*</span>
            </label>
            <input
              id="order-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Таны нэр"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DAE7C7] text-[#101410] placeholder:text-[#5E5E61]/60 focus:outline-none focus:border-[#08482D] focus:ring-2 focus:ring-[#08482D]/15 transition-all text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="order-contact"
              className="block text-sm font-semibold text-[#101410] mb-1.5"
            >
              Утас эсвэл Email <span className="text-[#08482D]">*</span>
            </label>
            <input
              id="order-contact"
              name="contact"
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Утасны дугаар эсвэл имэйл хаяг"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DAE7C7] text-[#101410] placeholder:text-[#5E5E61]/60 focus:outline-none focus:border-[#08482D] focus:ring-2 focus:ring-[#08482D]/15 transition-all text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="order-service"
              className="block text-sm font-semibold text-[#101410] mb-1.5"
            >
              Үйлчилгээ
            </label>
            <select
              id="order-service"
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DAE7C7] text-[#101410] focus:outline-none focus:border-[#08482D] focus:ring-2 focus:ring-[#08482D]/15 transition-all text-sm"
            >
              <option value="">-- Үйлчилгээ сонгох (заавал биш) --</option>
              {services.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title} — {item.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="order-message"
              className="block text-sm font-semibold text-[#101410] mb-1.5"
            >
              Нэмэлт мэдээлэл
            </label>
            <textarea
              id="order-message"
              name="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Видеоны төрөл, хугацаа, хүсэлтээ энд бичнэ үү..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DAE7C7] text-[#101410] placeholder:text-[#5E5E61]/60 focus:outline-none focus:border-[#08482D] focus:ring-2 focus:ring-[#08482D]/15 transition-all text-sm resize-none"
            />
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#DAE7C7]/70 border border-[#08482D]/20 text-[#08482D] text-sm font-medium">
              <CheckCircle2 size={18} className="shrink-0" />
              <span>Баярлалаа! Удахгүй холбогдоно.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              <AlertCircle size={18} className="shrink-0" />
              <span>Алдаа гарлаа, дахин оролдоно уу.</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-[#5E5E61] hover:text-[#101410] cursor-pointer"
            >
              Хаах
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#08482D] hover:bg-[#063924] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full transition-colors shadow-sm cursor-pointer"
            >
              <Send size={15} />
              <span>{isSubmitting ? 'Илгээж байна...' : 'Илгээх'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
