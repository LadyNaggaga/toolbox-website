"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Shield, BarChart3, Cookie, EyeOff } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-teal-500/10 rounded-xl">
                <Shield className="w-8 h-8 text-teal-400" />
              </div>
              <h1 className="text-4xl font-bold text-white font-fraunces">
                Privacy Policy
              </h1>
            </div>
            
            <p className="text-slate-400 mb-12">
              Last updated: April 2026
            </p>

            {/* Analytics Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-teal-400" />
                <h2 className="text-2xl font-semibold text-white">Analytics</h2>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <p className="text-slate-300 mb-4">
                  We collect anonymous usage data to improve this website, including:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 mb-4">
                  <li>Pages visited</li>
                  <li>Features used (e.g., Playground interactions)</li>
                  <li>Button clicks (e.g., &ldquo;Get Started&rdquo;, &ldquo;Try Toolbox&rdquo;)</li>
                </ul>
                <p className="text-slate-300">
                  This data is aggregated and <span className="text-teal-400 font-medium">does not identify you personally</span>. 
                  We do not collect names, emails, or any personal information.
                </p>
              </div>
            </section>

            {/* What We Don't Collect */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <EyeOff className="w-6 h-6 text-teal-400" />
                <h2 className="text-2xl font-semibold text-white">What We Don&apos;t Collect</h2>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <ul className="list-disc list-inside text-slate-300 space-y-2">
                  <li>Personal information (names, emails, addresses)</li>
                  <li>Payment or financial information</li>
                  <li>Location data</li>
                  <li>Device identifiers that could identify you</li>
                </ul>
              </div>
            </section>

            {/* Cookies Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="w-6 h-6 text-teal-400" />
                <h2 className="text-2xl font-semibold text-white">Cookies</h2>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <p className="text-slate-300 mb-4">
                  This site uses analytics cookies to understand how visitors interact with the website. 
                  These cookies collect anonymous information only.
                </p>
                <p className="text-slate-300">
                  You can disable cookies in your browser settings. The site will continue to function 
                  normally without them.
                </p>
              </div>
            </section>


          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
