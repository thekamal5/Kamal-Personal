"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, Building, Calendar, Globe } from "lucide-react";

export default function WorkPage() {
    const experiences = [
        {
            company: "Professional Fieldwork",
            role: "Development Specialist",
            duration: "2020 - Present",
            location: "Nepal & International",
            desc: "Bridging the gap between policy and people, focusing on community resilience and sustainable growth."
        },
        {
            company: "Media & Branding",
            role: "Communications Consultant",
            duration: "2018 - 2020",
            location: "Kathmandu",
            desc: "Developing impactful narratives and branding strategies for international developmental organizations."
        },
        {
            company: "Research Institute",
            role: "Field Researcher",
            duration: "2016 - 2018",
            location: "Remote Districts",
            desc: "Collecting vital data and human stories from marginalized communities to inform national policy."
        }
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 font-sans">
            <Navbar />

            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mb-24"
                >
                    <span className="text-blue-600 font-black tracking-widest uppercase text-xs mb-6 block">Professional Journey</span>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8">
                        Experience
                    </h1>
                    <p className="text-2xl text-slate-500 font-medium leading-tight">
                        A retrospective of my professional contributions and fieldwork.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-slate-100 dark:border-slate-800"
                        >
                            <div className="md:col-span-1 space-y-4">
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                                    <Briefcase className="w-6 h-6 text-blue-500" />
                                </div>
                                <span className="text-sm font-black text-slate-400 block tracking-widest uppercase">
                                    {exp.duration}
                                </span>
                            </div>
                            <div className="md:col-span-3 space-y-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter">
                                        {exp.role}
                                    </h3>
                                    <div className="flex items-center gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
                                        <span className="flex items-center gap-2"><Building className="w-4 h-4" /> {exp.company}</span>
                                        <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> {exp.location}</span>
                                    </div>
                                </div>
                                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl">
                                    {exp.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
