import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 py-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    <div className="md:col-span-5">
                        <Link href="/" className="inline-flex items-center gap-2 group mb-6">
                            <span className="text-3xl font-black tracking-tighter text-blue-600">
                                KS<span className="text-black dark:text-white">.</span>
                            </span>
                        </Link>
                        <p className="text-lg font-medium text-slate-500 max-w-sm mb-8">
                            A personal brand at the intersection of cinematic storytelling,
                            journalism, and digital transformation.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="#" label="Twitter" />
                            <SocialLink href="#" label="LinkedIn" />
                            <SocialLink href="#" label="Instagram" />
                            <SocialLink href="#" label="YouTube" />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">Narratives</h4>
                        <ul className="space-y-4">
                            <FooterLink href="/archive">Archive</FooterLink>
                            <FooterLink href="/videos">Videos</FooterLink>
                            <FooterLink href="/opinions">Opinions</FooterLink>
                            <FooterLink href="/about">About</FooterLink>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">System</h4>
                        <ul className="space-y-4">
                            <FooterLink href="/about">About Kamal</FooterLink>
                            <FooterLink href="/admin/login">Editorial Gate</FooterLink>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">Newsletter</h4>
                        <p className="text-sm font-medium text-slate-500 mb-6 italic">Deep dives delivered directly to your inbox.</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="narrative@ks.com"
                                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-600/20"
                            />
                            <button className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">
                        © 2026 Kamal Shrestha Media. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Use</Link>
                        <Link href="#">RSS Feed</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, label }: any) {
    return (
        <a href={href} className="text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
            {label}
        </a>
    );
}

function FooterLink({ href, children }: any) {
    return (
        <li>
            <Link href={href} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                {children}
            </Link>
        </li>
    );
}
