"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SectionGrid } from "@/components/SectionGrid";
import { useQuery } from "@tanstack/react-query";
import { getSections } from "@/lib/api";
import { Play } from "lucide-react";

export default function Home() {
  const { data: homeSections, isLoading } = useQuery({
    queryKey: ['sections', 'Home'],
    queryFn: () => getSections('Home'),
  });

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-blue-600/20">
      <Navbar />
      <Hero />

      {/* Dynamic Sections from Slot Engine */}
      {isLoading ? (
        <div className="py-24 max-w-7xl mx-auto px-4 space-y-24">
          <div className="h-96 bg-slate-50 dark:bg-slate-900 rounded-3xl animate-pulse" />
          <div className="h-96 bg-slate-50 dark:bg-slate-900 rounded-3xl animate-pulse" />
        </div>
      ) : (
        homeSections?.map((section: any) => (
          <SectionGrid
            key={section.id}
            id={section.id}
            title={section.name}
            slots={section.slots}
          />
        ))
      )}

      {/* Static Premium Video Section */}
      <section className="bg-black py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <span className="text-blue-500 font-black tracking-widest uppercase text-xs mb-6 block">Cinema & Media</span>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none">Visceral Storytelling.</h2>
              <p className="text-xl text-slate-400 font-medium max-w-lg mb-12">Experience the narrative through a cinematic lens. Our video portfolio combines high-production value with raw, human-centered stories.</p>
              <button className="px-10 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-sm tracking-widest transition-all duration-300 rounded-xl">
                Enter Cinema Hall
              </button>
            </div>
            <div className="flex-1 aspect-video w-full rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691523567-6170f0295dbd?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center brightness-50 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" />
              <div className="h-24 w-24 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 relative z-20">
                <div className="pl-1"><Play className="fill-black" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
