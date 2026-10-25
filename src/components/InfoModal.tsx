import React, { useState } from 'react';
import { X, ExternalLink, Gamepad2, Briefcase, Sparkles, BookOpen, Utensils, Music, Film, CheckCircle2, Heart } from 'lucide-react';
import { myWorks, personalFacts, bankerPlan, BASE_NETLIFY_URL } from '../data/portfolioData';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'about' | 'works' | 'banker' | 'facts';
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'about'
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'works' | 'banker' | 'facts'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#F5F8EF] rounded-3xl border border-[#DAE7C7] shadow-2xl flex flex-col overflow-hidden text-[#101410]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#08482D]/10 bg-white/70">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#08482D]" />
            <h2 className="text-xl font-bold font-heading text-[#08482D]">
              Эрхсоёрхууны портфолио
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#5E5E61] hover:text-[#101410] transition-colors"
            aria-label="Хаах"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#08482D]/10 px-6 gap-2 bg-white/40 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'about'
                ? 'bg-[#08482D] text-white shadow-sm'
                : 'text-[#5E5E61] hover:text-[#101410]'
            }`}
          >
            Танилцуулга
          </button>
          <button
            onClick={() => setActiveTab('works')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'works'
                ? 'bg-[#08482D] text-white shadow-sm'
                : 'text-[#5E5E61] hover:text-[#101410]'
            }`}
          >
            Миний бүтээлүүд ({myWorks.length})
          </button>
          <button
            onClick={() => setActiveTab('banker')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'banker'
                ? 'bg-[#08482D] text-white shadow-sm'
                : 'text-[#5E5E61] hover:text-[#101410]'
            }`}
          >
            Банкир & Төлөвлөгөө
          </button>
          <button
            onClick={() => setActiveTab('facts')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'facts'
                ? 'bg-[#08482D] text-white shadow-sm'
                : 'text-[#5E5E61] hover:text-[#101410]'
            }`}
          >
            Сонирхолтой баримтууд
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl border border-[#DAE7C7]/60">
                <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 bg-[#DAE7C7] flex items-center justify-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3zX9IxhxLqINHNqShndPFHlEgDAdq3543JTDsUcr6A&s=10"
                    alt="Эрхсоёрхуун"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-block px-3 py-1 bg-[#DAE7C7] text-[#08482D] rounded-full text-xs font-semibold">
                    15 настай сурагч
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-[#101410]">
                    Сайн уу, намайг Эрхсоёрхуун гэдэг! :)
                  </h3>
                  <p className="text-[#5E5E61] text-sm leading-relaxed">
                    Би 15 настай. Код бичих, тоглоомын шинэ моод зохион бүтээх, спортоор хичээллэх дуртай сурагч.
                  </p>
                </div>
              </div>

              {/* Hobbies & Favorites Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#DAE7C7]/60 flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#DAE7C7]/50 text-[#08482D]">
                    <Gamepad2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-[#5E5E61]">Хобби</h4>
                    <p className="text-base font-semibold text-[#101410]">Хөл бөмбөг тоглох</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#DAE7C7]/60 flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#DAE7C7]/50 text-[#08482D]">
                    <Music size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-[#5E5E61]">Дуртай хамтлаг</h4>
                    <p className="text-base font-semibold text-[#101410]">Maroon 5</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#DAE7C7]/60 flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#DAE7C7]/50 text-[#08482D]">
                    <Film size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-[#5E5E61]">Дуртай кино</h4>
                    <p className="text-base font-semibold text-[#101410]">Despicable Me 1/2/3/4</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#DAE7C7]/60 flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#DAE7C7]/50 text-[#08482D]">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-[#5E5E61]">AI + кодоор хүсэх зүйл</h4>
                    <p className="text-base font-semibold text-[#101410]">Тоглоом бүтээх ба хак хийх</p>
                  </div>
                </div>
              </div>

              {/* Skills to learn */}
              <div className="bg-white p-5 rounded-2xl border border-[#DAE7C7]/60 space-y-2">
                <h4 className="text-sm font-bold uppercase text-[#08482D]">
                  Ямар ур чадвар сурмаар байна?
                </h4>
                <p className="text-base text-[#101410] font-medium">
                  Юм кодлох ба тоглоомуудын моод бүтээх
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: WORKS ARRAY */}
          {activeTab === 'works' && (
            <div className="space-y-4">
              <p className="text-sm text-[#5E5E61]">
                Карт бүр дээр дарж эх бүтээл, хуудсыг шинэ цонхонд үзнэ үү:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {myWorks.map((work) => (
                  <a
                    key={work.id}
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white border border-[#DAE7C7]/70 hover:border-[#08482D] hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#08482D] bg-[#DAE7C7]/50 px-2.5 py-0.5 rounded-full">
                          {work.category}
                        </span>
                        <ExternalLink size={14} className="text-[#5E5E61] group-hover:text-[#08482D]" />
                      </div>
                      <h4 className="font-bold text-base text-[#101410] group-hover:text-[#08482D] transition-colors pt-1">
                        {work.title}
                      </h4>
                      <p className="text-xs text-[#5E5E61] leading-relaxed">
                        {work.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#08482D] font-medium">
                      <span>Шинэ цонхонд нээх</span>
                      <span>→</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BANKER & PLAN */}
          {activeTab === 'banker' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#DAE7C7]/60 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <img
                    src="https://i.ytimg.com/vi/fY2k_C6sypY/maxresdefault.jpg"
                    alt="Банкир"
                    referrerPolicy="no-referrer"
                    className="w-full sm:w-48 h-32 rounded-xl object-cover shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-[#08482D] bg-[#DAE7C7]/60 px-2.5 py-0.5 rounded-full">
                      Мөрөөдлийн мэргэжил
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-[#101410]">Банкир</h3>
                    <p className="text-sm font-semibold text-[#08482D]">
                      10 жилийн дараа би банкир хүн болно
                    </p>
                    <p className="text-xs text-[#5E5E61]">
                      Юу хийдэг вэ: Зуучлал, Эрсдэл ба Хөрөнгө оруулалт
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F8EF] border border-[#DAE7C7] text-sm text-[#101410]">
                  <strong className="text-[#08482D]">Яагаад энэ ажил вэ?</strong>
                  <p className="mt-1">
                    "Би дахиж хэзээ ч мөнгөний хомсдлын асуудалтай баймааргүй байна"
                  </p>
                </div>
              </div>

              {/* Skills needed */}
              <div className="bg-white p-5 rounded-2xl border border-[#DAE7C7]/60 space-y-3">
                <h4 className="font-bold text-[#08482D] text-sm uppercase">Хэрэгтэй ур чадвар:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-[#F5F8EF] font-medium text-sm flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#08482D] shrink-0" />
                    <span>Тоон дээрээ сайн байх</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F5F8EF] font-medium text-sm flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#08482D] shrink-0" />
                    <span>Баян байх</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F5F8EF] font-medium text-sm flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#08482D] shrink-0" />
                    <span>Багаар ажиллах</span>
                  </div>
                </div>
              </div>

              {/* Step-by-step career plan */}
              <div className="bg-white p-5 rounded-2xl border border-[#DAE7C7]/60 space-y-4">
                <h4 className="font-bold text-[#08482D] text-sm uppercase">Миний төлөвлөгөө:</h4>
                <div className="space-y-3">
                  {bankerPlan.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="px-3 py-1 rounded-md bg-[#08482D] text-white text-xs font-bold shrink-0 mt-0.5">
                        {step.period}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-[#101410]">{step.title}</h5>
                        <p className="text-xs text-[#5E5E61]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* YouTube Video Embed from original page */}
              <div className="bg-white p-5 rounded-2xl border border-[#DAE7C7]/60 space-y-3">
                <h4 className="font-bold text-[#08482D] text-sm uppercase">Энэ ажлын тухай бичлэг:</h4>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/MR-e3e50-j8"
                    title="Банкир ажлын тухай"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FUN FACTS */}
          {activeTab === 'facts' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {personalFacts.map((fact) => (
                  <div
                    key={fact.id}
                    className="p-4 rounded-xl bg-white border border-[#DAE7C7]/70 flex items-start gap-4"
                  >
                    <div className="p-3 rounded-full bg-[#DAE7C7]/50 text-[#08482D] shrink-0 mt-0.5">
                      {fact.iconName === 'Utensils' && <Utensils size={18} />}
                      {fact.iconName === 'Gamepad2' && <Gamepad2 size={18} />}
                      {fact.iconName === 'Heart' && <Heart size={18} />}
                      {fact.iconName === 'BookOpen' && <BookOpen size={18} />}
                      {fact.iconName === 'Sparkles' && <Sparkles size={18} />}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase text-[#5E5E61]">{fact.label}</h4>
                      <p className="text-base font-semibold text-[#101410] mt-0.5">{fact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#08482D]/10 bg-white/60 flex items-center justify-between">
          <a
            href={`${BASE_NETLIFY_URL}Тоглоом хөгжүүлэгч.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#08482D] hover:bg-[#063924] text-white text-xs font-medium rounded-full transition-colors"
          >
            <span>MY DREAM JOB нээх</span>
            <ExternalLink size={13} />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#5E5E61] hover:text-[#101410]"
          >
            Хаах
          </button>
        </div>
      </div>
    </div>
  );
};
