import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Copy, Instagram, Mail, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const { author } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [lagosTime, setLagosTime] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'Literary Collaboration',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Dynamic Lagos (WAT - UTC+1) Timezone Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setLagosTime(timeStr);
      } catch {
        setLagosTime('12:00:00');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(author.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    
    setIsSending(true);

    try {
      // Direct form-to-email transmission to ighaegis@gmail.com
      const response = await fetch(`https://formsubmit.co/ajax/${author.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          topic: formState.topic,
          message: formState.message,
          _subject: `[haegis.com] ${formState.topic} from ${formState.name || 'Website Visitor'}`,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error('Transmission error');
      }

      setSubmitted(true);
    } catch {
      // Fallback: Trigger client mail protocol directly to ighaegis@gmail.com
      const subject = encodeURIComponent(`[${formState.topic}] Inquiry from ${formState.name || 'haegis.com visitor'}`);
      const body = encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\nTopic: ${formState.topic}\n\nMessage:\n${formState.message}`
      );
      window.location.href = `mailto:${author.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="w-full bg-[#FAFAF8] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="border-b border-[#E8E8E5] pb-8 mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#777777] mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif text-[#202020] font-normal tracking-tight mb-4">
            For conversations worth having<span className="text-[#777777]">.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#555555] font-light max-w-2xl leading-relaxed">
            For literary collaborations, thoughtful projects, speaking, or simply to share an idea, you can reach me here.
          </p>
        </div>

        {/* Contact Layout: Split Info & Direct Note Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Channels & Geographic Cadence */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-8">
              
              {/* Email Direct Card */}
              <div className="bg-white border border-[#E8E8E5] p-6 sm:p-8">
                <span className="text-[11px] uppercase tracking-widest text-[#888888] font-editorial-mono block mb-2">
                  Primary Correspondence
                </span>
                <a
                  href={`mailto:${author.email}`}
                  className="text-xl sm:text-2xl font-editorial-serif text-[#202020] hover:text-black font-medium block mb-4 transition-colors break-all"
                >
                  {author.email}
                </a>

                <div className="flex items-center gap-3 pt-4 border-t border-[#E8E8E5]">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#666666] hover:text-[#202020] transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Email copied' : 'Copy email address'}</span>
                  </button>
                  <span className="text-[#CCCCCC]">·</span>
                  <a
                    href={`mailto:${author.email}`}
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#202020] hover:underline"
                  >
                    <span>Open Mail Client</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="bg-white border border-[#E8E8E5] p-6 sm:p-8">
                <span className="text-[11px] uppercase tracking-widest text-[#888888] font-editorial-mono block mb-2">
                  Social Archive
                </span>
                <a
                  href={author.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-xl font-editorial-serif text-[#202020] hover:text-black transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-5 h-5 text-[#202020]" />
                    <span>{author.instagramHandle}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <p className="text-xs text-[#777777] mt-3 font-light">
                  Daily stanzas, book progress, and visual lines.
                </p>
              </div>

            </div>

            {/* Time & Coordinates Telemetry */}
            <div className="mt-8 pt-6 border-t border-[#E8E8E5] flex items-center justify-between text-xs font-editorial-mono text-[#888888]">
              <div>
                <span className="block text-[10px] uppercase text-[#AAAAAA]">Local Lagos Time</span>
                <span className="text-[#202020] font-medium">{lagosTime} (WAT / UTC+1)</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase text-[#AAAAAA]">Base</span>
                <span className="text-[#202020]">Lagos, Nigeria</span>
              </div>
            </div>

          </div>

          {/* Right Column: Thoughtful Note Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E8E8E5] p-8 sm:p-10">
              <h3 className="text-xl font-editorial-serif font-medium text-[#202020] mb-2">
                Send a Direct Note
              </h3>
              <p className="text-xs text-[#777777] font-light mb-8">
                Replies are sent directly via email. Please specify the nature of your correspondence.
              </p>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 bg-[#202020] text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-2xl font-editorial-serif text-[#202020]">Message Sent to {author.email}</h4>
                  <p className="text-sm text-[#666666] max-w-md mx-auto font-light leading-relaxed">
                    Your inquiry has been dispatched directly to <span className="font-medium text-[#202020]">{author.email}</span>. You can also view or follow up directly in your email client below.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${author.email}&su=${encodeURIComponent(`[${formState.topic}] Inquiry from ${formState.name || 'Visitor'}`)}&body=${encodeURIComponent(formState.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-[#202020] text-xs uppercase tracking-wider text-[#202020] hover:bg-[#202020] hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Gmail</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`mailto:${author.email}?subject=${encodeURIComponent(`[${formState.topic}] Inquiry from ${formState.name || 'Visitor'}`)}&body=${encodeURIComponent(formState.message)}`}
                      className="px-4 py-2 border border-[#E8E8E5] text-xs uppercase tracking-wider text-[#666666] hover:border-[#202020] hover:text-[#202020] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Default Email App</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: '', email: '', topic: 'Literary Collaboration', message: '' });
                      }}
                      className="text-xs uppercase tracking-widest text-[#777777] hover:text-[#202020] underline cursor-pointer"
                    >
                      Send another note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-2 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Chinua Achebe"
                        className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E8E8E5] text-sm text-[#202020] focus:outline-none focus:border-[#202020] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-2 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. editor@press.org"
                        className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E8E8E5] text-sm text-[#202020] focus:outline-none focus:border-[#202020] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-2 font-medium">
                      Nature of Collaboration
                    </label>
                    <select
                      value={formState.topic}
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E8E8E5] text-sm text-[#202020] focus:outline-none focus:border-[#202020] transition-colors"
                    >
                      <option value="Literary Collaboration">Literary Collaboration / Poetry Inquiry</option>
                      <option value="Chapbook & Publishing">Chemtrails & Constellations / Book Order</option>
                      <option value="Speaking & Panels">Speaking / Academic / Physics Discussion</option>
                      <option value="Independent Ventures">Independent Venture / MAYDAY Initiative</option>
                      <option value="General Conversation">Quiet Conversation / Sharing an Idea</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#666666] mb-2 font-medium">
                      Your Message or Inquiry
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Share your thoughts, proposal, or question..."
                      className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E8E8E5] text-sm text-[#202020] focus:outline-none focus:border-[#202020] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="group w-full py-4 bg-[#202020] text-[#FAFAF8] text-xs uppercase tracking-widest font-medium hover:bg-[#383838] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                  >
                    <span>{isSending ? 'Transmitting Message...' : 'Transmit Message'}</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
