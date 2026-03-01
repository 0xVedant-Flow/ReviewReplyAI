import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#F8F7FF] selection:bg-indigo-100 selection:text-indigo-600">

            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                            <MessageSquareText className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-[#0F0F1A] tracking-tight">
                            ReviewReply <span className="text-gradient">AI</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-10">
                        <NavLink href="#features">Features</NavLink>
                        <NavLink href="#pricing">Pricing</NavLink>
                        <NavLink href="#languages">Languages</NavLink>
                        <NavLink href="#blog">Blog</NavLink>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                            Sign In
                        </Link>
                        <Link href="/signup" className="hidden sm:block px-5 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all">
                            Start Free →
                        </Link>
                    </div>

                </div>
            </nav>

            <main>{children}</main>

            {/* FOOTER */}
            <footer className="bg-[#0F0F1A] text-white pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2.5 mb-6">
                            <MessageSquareText className="w-6 h-6 text-indigo-400" />
                            <span className="text-xl font-bold tracking-tight">ReviewReply AI</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            The world's first AI that generates perfect review responses AND auto-posts them globally.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon="X" />
                            <SocialIcon icon="In" />
                            <SocialIcon icon="Fb" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><FooterLink href="#features">Features</FooterLink></li>
                            <li><FooterLink href="#pricing">Pricing</FooterLink></li>
                            <li><FooterLink href="#">API Docs</FooterLink></li>
                            <li><FooterLink href="#">Changelog</FooterLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><FooterLink href="#">About Us</FooterLink></li>
                            <li><FooterLink href="#">Blog</FooterLink></li>
                            <li><FooterLink href="#">Careers</FooterLink></li>
                            <li><FooterLink href="#">Press</FooterLink></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><FooterLink href="#">Help Center</FooterLink></li>
                            <li><FooterLink href="#">Contact</FooterLink></li>
                            <li><FooterLink href="#">Privacy</FooterLink></li>
                            <li><FooterLink href="#">Terms</FooterLink></li>
                        </ul>
                    </div>
                </div>
                <p className="text-center pt-8 text-xs text-slate-500 font-medium">
                    © 2026 ReviewReply AI. Made with ❤️ in Dhaka, Bangladesh.
                </p>
            </footer>
        </div>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
            {children}
        </Link>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="hover:text-white transition-colors">
            {children}
        </Link>
    );
}

function SocialIcon({ icon }: { icon: string }) {
    return (
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold hover:bg-white/10 cursor-pointer transition-colors">
            {icon}
        </div>
    );
}
