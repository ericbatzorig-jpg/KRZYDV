/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CurvedCarousel } from './components/CurvedCarousel';
import { Doodles } from './components/Doodles';
import { InfoModal } from './components/InfoModal';
import { OrderModal } from './components/OrderModal';
import { myWorks, services, BASE_NETLIFY_URL } from './data/portfolioData';
import { WorkItem } from './types';
import { Sparkles, ArrowUpRight, ShoppingBag, Mail } from 'lucide-react';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'about' | 'works' | 'banker' | 'facts'>('about');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openModal = (tab: 'about' | 'works' | 'banker' | 'facts') => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const openOrderModal = (serviceTitle = '') => {
    setSelectedService(serviceTitle);
    setOrderModalOpen(true);
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardClick = (item: WorkItem) => {
    // Each card opens in a new tab: карт бүр шинэ цонхонд нээгдэнэ
    window.open(item.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#F5F8EF] select-none font-body text-[#101410]">
      {/* 
        HERO SECTION (1440 × 1080 frame unit scale on desktop, stacked on mobile)
      */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* 
          DESKTOP CONTAINER (1440 × 1080 frame unit scale)
          Visible on screens > 820px
        */}
        <div
          className="hidden md:block relative w-[calc(var(--u)*1440)] h-[calc(var(--u)*1080)] overflow-hidden bg-[#F5F8EF]"
          style={
            {
              '--u': 'min(100vw / 1440, 100vh / 1080)'
            } as React.CSSProperties
          }
        >
          {/* ===================== TOP BAR ===================== */}
          {/* Logo at (37, 36) */}
          <div
            className="absolute z-30 flex items-center gap-[calc(var(--u)*10)] cursor-pointer"
            style={{
              left: 'calc(var(--u) * 37)',
              top: 'calc(var(--u) * 36)'
            }}
            onClick={() => openModal('about')}
          >
            {/* Leaf mark */}
            <div
              className="rounded-full bg-[#08482D] flex items-center justify-center text-white shrink-0"
              style={{
                width: 'calc(var(--u) * 34)',
                height: 'calc(var(--u) * 34)'
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[calc(var(--u)*18)] h-[calc(var(--u)*18)] fill-current"
              >
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
            </div>
            <span
              className="font-bold text-[#101410] tracking-tight font-heading whitespace-nowrap shrink-0"
              style={{ fontSize: 'calc(var(--u) * 20.5)' }}
            >
              Эрхсоёрхуун
            </span>
          </div>

          {/* Nav Links */}
          <nav
            className="absolute z-30 flex items-center"
            style={{
              left: 'calc(var(--u) * 430)',
              top: 'calc(var(--u) * 38)',
              gap: 'calc(var(--u) * 28)'
            }}
          >
            <button
              onClick={() => openModal('about')}
              className="text-[#5E5E61] hover:text-[#08482D] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:underline underline-offset-4"
              style={{ fontSize: 'calc(var(--u) * 16.4)' }}
            >
              Танилцуулга
            </button>
            <button
              onClick={() => openModal('works')}
              className="text-[#5E5E61] hover:text-[#08482D] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:underline underline-offset-4"
              style={{ fontSize: 'calc(var(--u) * 16.4)' }}
            >
              Бүтээлүүд
            </button>
            <button
              onClick={() => openModal('banker')}
              className="text-[#5E5E61] hover:text-[#08482D] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:underline underline-offset-4"
              style={{ fontSize: 'calc(var(--u) * 16.4)' }}
            >
              Төлөвлөгөө
            </button>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToServices();
              }}
              className="text-[#5E5E61] hover:text-[#08482D] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:underline underline-offset-4"
              style={{ fontSize: 'calc(var(--u) * 16.4)' }}
            >
              Services
            </a>
            <button
              onClick={() => openOrderModal('')}
              className="text-[#5E5E61] hover:text-[#08482D] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:underline underline-offset-4"
              style={{ fontSize: 'calc(var(--u) * 16.4)' }}
            >
              Contact
            </button>
          </nav>

          {/* Top Right Action Buttons */}
          <button
            onClick={() => openModal('facts')}
            className="absolute z-30 bg-white border border-[#DAE7C7] text-[#101410] font-medium rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer whitespace-nowrap shrink-0"
            style={{
              left: 'calc(var(--u) * 1180)',
              top: 'calc(var(--u) * 29)',
              width: 'calc(var(--u) * 110)',
              height: 'calc(var(--u) * 40)',
              fontSize: 'calc(var(--u) * 14.5)'
            }}
          >
            Баримтууд
          </button>

          <a
            href={`${BASE_NETLIFY_URL}Тоглоом хөгжүүлэгч.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute z-30 bg-[#08482D] hover:bg-[#063924] text-white font-medium rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            style={{
              left: 'calc(var(--u) * 1304)',
              top: 'calc(var(--u) * 29)',
              width: 'calc(var(--u) * 97)',
              height: 'calc(var(--u) * 40)',
              fontSize: 'calc(var(--u) * 14.5)'
            }}
          >
            Мөрөөдөл
          </a>

          {/* ===================== BADGE ===================== */}
          <div
            onClick={() => openModal('about')}
            className="absolute z-20 bg-[#DAE7C7] text-[#08482D] font-medium rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
            style={{
              left: 'calc(var(--u) * 575)',
              top: 'calc(var(--u) * 115)',
              width: 'calc(var(--u) * 292)',
              height: 'calc(var(--u) * 37)',
              fontSize: 'calc(var(--u) * 16.6)'
            }}
          >
            15 настай · Код & Тоглоом
          </div>

          {/* ===================== HEADLINE ===================== */}
          <div
            className="absolute z-20 text-center w-full pointer-events-none select-none font-heading font-bold"
            style={{
              top: 'calc(var(--u) * 176)',
              color: '#101410'
            }}
          >
            <div
              className="tracking-[-0.035em]"
              style={{
                fontSize: 'calc(var(--u) * 88)',
                lineHeight: 'calc(var(--u) * 92)'
              }}
            >
              Сайн уу, намайг
            </div>
            <div
              className="tracking-[-0.022em]"
              style={{
                fontSize: 'calc(var(--u) * 88)',
                lineHeight: 'calc(var(--u) * 92)'
              }}
            >
              Эрхсоёрхуун гэдэг!
            </div>
          </div>

          {/* ===================== SUBLINE ===================== */}
          <div
            className="absolute z-20 text-center w-full pointer-events-none select-none text-[#5E5E61]"
            style={{
              top: 'calc(var(--u) * 394)',
              fontSize: 'calc(var(--u) * 20.8)',
              lineHeight: 'calc(var(--u) * 32)'
            }}
          >
            <p>Тоглоом бүтээх, кодоор шинэ ертөнц бүтээх хүсэлтэй 15 настай сурагч.</p>
            <p>Ирээдүйд тоглоом хөгжүүлэгч, банкир болох зорилготой</p>
            <p>миний бүтээлүүд ба түүхтэй танилцаарай.</p>
          </div>

          {/* Hand-drawn notes, doodles, and arrows */}
          <Doodles />

          {/* ===================== CURVED VIDEO CAROUSEL ===================== */}
          <div className="absolute inset-0 z-10">
            <CurvedCarousel works={myWorks} onCardClick={handleCardClick} />
          </div>

          {/* ===================== CTA BUTTON ===================== */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              left: 'calc(var(--u) * 617)',
              top: 'calc(var(--u) * 893)',
              width: 'calc(var(--u) * 190)',
              height: 'calc(var(--u) * 74)'
            }}
          >
            <svg className="w-full h-full">
              <rect
                x="2"
                y="2"
                width="calc(100% - 4px)"
                height="calc(100% - 4px)"
                rx="37"
                fill="none"
                stroke="#08482D"
                strokeWidth="1.8"
                strokeDasharray="6 6"
                className="animate-draw"
              />
            </svg>
          </div>

          <a
            href={`${BASE_NETLIFY_URL}Тоглоом хөгжүүлэгч.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute z-20 bg-[#08482D] hover:bg-[#063924] text-white font-semibold rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer group"
            style={{
              left: 'calc(var(--u) * 626)',
              top: 'calc(var(--u) * 901)',
              width: 'calc(var(--u) * 172)',
              height: 'calc(var(--u) * 58)',
              fontSize: 'calc(var(--u) * 16.5)'
            }}
          >
            <span>MY DREAM JOB</span>
            <ArrowUpRight
              className="ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              size={16}
            />
          </a>
        </div>

        {/* 
          MOBILE LAYOUT (≤ 820px)
        */}
        <div className="md:hidden flex flex-col justify-between w-full min-h-screen p-4">
          {/* Top: Logo and Nav/Action */}
          <div className="flex items-center justify-between w-full pt-1 gap-2">
            <div
              className="flex items-center gap-2 cursor-pointer shrink-0"
              onClick={() => openModal('about')}
            >
              <div className="w-8 h-8 rounded-full bg-[#08482D] flex items-center justify-center text-white">
                <Sparkles size={16} />
              </div>
              <span className="font-bold text-lg text-[#101410] font-heading whitespace-nowrap">
                Эрхсоёрхуун
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToServices();
                }}
                className="px-3 py-1.5 text-xs font-medium text-[#08482D] hover:underline whitespace-nowrap"
              >
                Services
              </a>
              <button
                onClick={() => openOrderModal('')}
                className="px-3 py-1.5 bg-[#08482D] text-white rounded-full text-xs font-semibold shadow-sm whitespace-nowrap cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Copy: Stacked & Centred */}
          <div className="flex flex-col items-center text-center my-4 space-y-3">
            <button
              onClick={() => openModal('about')}
              className="px-4 py-1.5 bg-[#DAE7C7] text-[#08482D] text-xs font-semibold rounded-full shadow-2xs"
            >
              15 настай · Код & Тоглоом
            </button>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#101410] font-heading leading-tight">
              Сайн уу, намайг <br /> Эрхсоёрхуун гэдэг!
            </h1>

            <p className="text-xs sm:text-sm text-[#5E5E61] max-w-sm leading-relaxed">
              Тоглоом бүтээх, кодоор шинэ ертөнц бүтээх хүсэлтэй 15 настай сурагч. Ирээдүйд тоглоом хөгжүүлэгч, банкир болох зорилготой миний бүтээлүүдтэй танилцаарай.
            </p>
          </div>

          {/* Cards Band: auto-scrolling draggable curved carousel */}
          <div className="relative w-full h-[250px] my-2 overflow-hidden rounded-2xl bg-white/40 border border-[#DAE7C7]/50 shadow-inner">
            <div
              className="absolute inset-0"
              style={
                {
                  '--u': 'min(100vw / 820, 250px / 400)'
                } as React.CSSProperties
              }
            >
              <CurvedCarousel works={myWorks} onCardClick={handleCardClick} />
            </div>
          </div>

          {/* Bottom: Button and Hand-drawn note */}
          <div className="flex flex-col items-center justify-center my-3 space-y-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-2 border-2 border-dashed border-[#08482D] rounded-full pointer-events-none" />
              <a
                href={`${BASE_NETLIFY_URL}Тоглоом хөгжүүлэгч.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#08482D] text-white font-semibold rounded-full shadow-md text-sm flex items-center gap-1.5 active:scale-95 transition-transform"
              >
                <span>MY DREAM JOB</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            <p className="font-hand text-[#08482D] text-lg font-semibold rotate-3">
              Карт бүр шинэ цонхонд нээгдэнэ ✨
            </p>

            {/* Quick Details Trigger */}
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <button
                onClick={() => openModal('about')}
                className="px-3 py-1.5 text-xs font-medium text-[#5E5E61] bg-white rounded-lg border border-[#DAE7C7]"
              >
                Танилцуулга
              </button>
              <button
                onClick={() => openModal('facts')}
                className="px-3 py-1.5 text-xs font-medium text-[#5E5E61] bg-white rounded-lg border border-[#DAE7C7]"
              >
                Баримтууд
              </button>
              <button
                onClick={() => openModal('banker')}
                className="px-3 py-1.5 text-xs font-medium text-[#5E5E61] bg-white rounded-lg border border-[#DAE7C7]"
              >
                Төлөвлөгөө
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES SECTION ===================== */}
      <section
        id="services"
        className="w-full py-20 px-4 sm:px-8 border-t border-[#08482D]/10 bg-[#F5F8EF]"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#DAE7C7] text-[#08482D] text-xs font-semibold">
                My Services
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-[#101410]">
                Миний үзүүлэх үйлчилгээнүүд
              </h2>
              <p className="text-sm sm:text-base text-[#5E5E61] leading-relaxed">
                Таны видео контент, монтаж болон бүтээлд тохирсон хөгжим, меме, дүрсний эх сурвалжийг хурдан бөгөөд оновчтой олж өгнө.
              </p>
            </div>

            <button
              onClick={() => openOrderModal('')}
              className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-3 rounded-full bg-white border border-[#DAE7C7] hover:border-[#08482D] text-[#08482D] text-sm font-semibold transition-colors shadow-2xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <Mail size={16} />
              <span>Шууд холбогдох (Contact)</span>
            </button>
          </div>

          {/* Services Grid mapped from services array */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-[#DAE7C7] p-7 flex flex-col justify-between gap-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#08482D]/50 hover:shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs text-[#5E5E61] font-medium">
                    <span>Үйлчилгээ 0{service.id}</span>
                    <span className="font-bold text-base text-[#08482D] tabular-nums">
                      {service.price}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-heading text-[#101410]">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#5E5E61] leading-relaxed select-text">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#08482D]/10 flex items-center justify-between gap-4">
                  <div className="text-xs text-[#5E5E61]">
                    Үнэ: <strong className="text-[#101410] font-semibold tabular-nums">{service.price}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => openOrderModal(service.title)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#08482D] hover:bg-[#063924] text-white text-sm font-semibold rounded-full transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ShoppingBag size={15} />
                    <span>Захиалах</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="w-full py-8 px-4 sm:px-8 border-t border-[#08482D]/10 bg-[#F5F8EF]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5E5E61]">
          <span>© 2026 Эрхсоёрхуун — Хувийн портфолио</span>
          <div className="flex items-center gap-5">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToServices();
              }}
              className="hover:text-[#08482D] transition-colors"
            >
              Services
            </a>
            <button
              onClick={() => openOrderModal('')}
              className="hover:text-[#08482D] transition-colors cursor-pointer"
            >
              Contact
            </button>
            <a
              href={`${BASE_NETLIFY_URL}Тоглоом хөгжүүлэгч.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#08482D] transition-colors"
            >
              MY DREAM JOB
            </a>
          </div>
        </div>
      </footer>

      {/* Profile & Portfolio Detail Modal */}
      <InfoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
      />

      {/* Service Order & Contact Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
