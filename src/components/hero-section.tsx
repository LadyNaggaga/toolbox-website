"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Box, Cpu, Wrench } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-muted/30 via-background to-background" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-teal/5 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-muted text-teal-foreground text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
              </span>
              Preview
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-[family-name:var(--font-fraunces)]"
          >
            Stop wiring every agent
            <br />
            <span className="text-teal">to every tool</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Toolbox enables agents to access the right tools for each task via a 
            unified endpoint, across agents, with built-in governance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/get-started">
              <Button 
                size="lg" 
                className="bg-teal text-teal-foreground hover:bg-teal/90 h-12 px-8 text-base"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/playground">
              <Button 
                variant="outline" 
                size="lg"
                className="h-12 px-8 text-base border-border hover:bg-muted"
              >
                <Play className="mr-2 h-4 w-4" />
                Try Toolbox
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20"
        >
          <FlowDiagram />
        </motion.div>
      </div>
    </section>
  );
}

function FlowDiagram() {
  const tools = [
    { name: "GitHub", icon: "🐙" },
    { name: "Slack", icon: "💬" },
    { name: "Jira", icon: "📋" },
    { name: "AWS", icon: "☁️" },
    { name: "Postgres", icon: "🗃️" },
  ];

  const agents = [
    { name: "Copilot", icon: "✨" },
    { name: "Custom Agent", icon: "🤖" },
    { name: "Agent Frameworks", icon: "⚡" },
  ];

  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
        {/* Tools Column */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-5 w-5 text-teal" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tools
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-3 w-full max-w-xs">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-teal/50 hover:shadow-lg hover:shadow-teal/5 transition-all cursor-default"
              >
                <span className="text-xl">{tool.icon}</span>
                <span className="text-sm font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Toolbox Center */}
        <div className="flex flex-col items-center">
          {/* Connecting lines - left */}
          <div className="hidden md:block absolute left-1/4 top-1/2 w-[12%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-border via-teal/50 to-teal"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="relative"
          >
            <div className="flex items-center gap-2 mb-4 justify-center">
              <Box className="h-5 w-5 text-teal" />
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Toolbox
              </span>
            </div>
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-teal/10 to-teal/5 border-2 border-teal/30 shadow-xl shadow-teal/10">
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-teal/50"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative text-center">
                <div className="text-4xl mb-3">🧰</div>
                <div className="text-lg font-semibold font-[family-name:var(--font-fraunces)]">
                  Unified Endpoint
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Discover • Route • Govern
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connecting lines - right */}
          <div className="hidden md:block absolute right-1/4 top-1/2 w-[12%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-teal to-teal/50 via-teal/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </div>

        {/* Agents Column */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="h-5 w-5 text-teal" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Agents
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-3 w-full max-w-xs">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-teal/50 hover:shadow-lg hover:shadow-teal/5 transition-all cursor-default"
              >
                <span className="text-xl">{agent.icon}</span>
                <span className="text-sm font-medium">{agent.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Flow arrows for mobile */}
      <div className="flex md:hidden justify-center my-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-2xl text-teal"
        >
          ↓ → ↓
        </motion.div>
      </div>
    </div>
  );
}
