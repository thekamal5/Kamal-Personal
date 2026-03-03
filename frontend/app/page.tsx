"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SectionGrid } from "@/components/SectionGrid";
import { SocialFeed } from "@/components/SocialFeed";
import { useQuery } from "@tanstack/react-query";
import { getSections } from "@/lib/api";
import { Play, ArrowRight, BookOpen, Map, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const { data: homeSections, isLoading, isError } = useQuery({
    queryKey: ['sections', 'Home'],
    queryFn: () => getSections('Home'),
  });

  const recentStories = [
    {
      title: "Gulmi & Palpa — Field Insights",
      excerpt: "In my recent visit to Gulmi and Palpa, I learned that resilience often speaks in quiet tones. Community strength is not loud — it is steady.",
      category: "Field Notes"
    },
    {
      title: "Listening Before Speaking",
      excerpt: "Every field engagement begins with observation. The most important stories are often found in silence.",
      category: "Reflections"
    },
    {
      title: "Between Policy and People",
      excerpt: "Development work exists in the space between intention and lived reality.",
      category: "Perspectives"
    }
  ];

  const journeys = [
    {
      title: "Mountain Trails",
      desc: "Exploring the high altitudes where culture meets the clouds.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"
    },
    {
      title: "Coastal Echoes",
      desc: "The rhythm of the tides and the stories they wash ashore.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073"
    },
    {
      title: "Urban Rhythms",
      desc: "Finding patterns in the chaos of modern city life.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2070"
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-blue-600/20">
      <Navbar />
      <Hero />

      {/* Recent Stories Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-4 block">Stories & Insights</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
              Recent Reflections
            </h2>
            <p className="text-xl text-slate-500 font-medium">
              Selected writings from my travels, professional fieldwork, and personal observations.
            </p>
          </div>
          <Link
            href="/stories"
            className="group flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105"
          >
            View All Stories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentStories.map((story, i) => (
            <div key={i} className="group p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-transparent hover:border-blue-500/20 transition-all duration-500">
              <div className="mb-6 flex items-center gap-4">
                <span className="bg-blue-600/10 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {story.category}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
                {story.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 line-clamp-3">
                {story.excerpt}
              </p>
              <Link href="/stories" className="text-sm font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 group/link">
                Read More
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Journeys & Field Notes Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-blue-500 font-black tracking-widest uppercase text-xs mb-4 block">Explorations</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
                Journeys & <br /><span className="text-blue-500 italic">Field Notes</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium italic">
                "Travel is not movement alone — it is perspective. Each journey reshapes how I understand people, culture, and change."
              </p>
            </div>
            <Link
              href="/journeys"
              className="group flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105"
            >
              Explore Journeys
              <Map className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journeys.map((j, i) => (
              <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-3xl">
                <img
                  src={j.image}
                  alt={j.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-50 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-3xl font-black tracking-tighter mb-2 italic">
                    {j.title}
                  </h3>
                  <p className="text-slate-300 font-medium text-sm">
                    {j.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Stories Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-4 block">Gallery</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
              Visual Stories
            </h2>
            <p className="text-xl text-slate-500 font-medium">
              Moments captured from travel, fieldwork, and professional life — where images carry narratives beyond words.
            </p>
          </div>
          <Link
            href="/visual"
            className="group flex items-center gap-3 border-2 border-slate-200 dark:border-slate-800 px-8 py-4 rounded-2xl font-bold transition-all hover:border-blue-600"
          >
            View Gallery
            <ImageIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1492691523567-6170f0295dbd?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1542204113-e935400bdc21?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1501854140801-50d01674bc4e?auto=format&fit=crop&q=80&w=1920",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2071"
          ].map((img, i) => (
            <div key={i} className={i % 3 === 0 ? "col-span-2 row-span-2" : ""}>
              <div className="h-full w-full overflow-hidden rounded-2xl relative group cursor-pointer">
                <img
                  src={img}
                  alt="Gallery"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Sections from Slot Engine */}
      {isLoading ? (
        <div className="py-24 max-w-7xl mx-auto px-4 space-y-24">
          <div className="h-96 bg-slate-50 dark:bg-slate-900 rounded-3xl animate-pulse" />
        </div>
      ) : isError ? (
        <div className="py-24 text-center">
          <p className="text-slate-400 font-medium">Currently updating editorial sections. Please check back shortly.</p>
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

      {/* Premium Social Feed Section */}
      <SocialFeed />

      {/* Static Premium Video Section */}
      <section className="bg-black py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <span className="text-blue-500 font-black tracking-widest uppercase text-xs mb-6 block">Cinema & Media</span>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none">Visceral Storytelling.</h2>
              <p className="text-xl text-slate-400 font-medium max-w-lg mb-12">Experience the narrative through a cinematic lens. Our video portfolio combines high-production value with raw, human-centered stories.</p>
              <Link href="/videos" className="px-10 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-sm tracking-widest transition-all duration-300 rounded-xl inline-block">
                Enter Cinema Hall
              </Link>
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
