"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Hammer, 
  Plug, 
  Shield,
  Sparkles,
  Layers,
  Lock,
  Eye
} from "lucide-react";

const features = [
  {
    id: "discover",
    title: "Discover",
    description: "Intelligent tool discovery that understands agent intent and surfaces the right tools automatically.",
    icon: Search,
    status: "available",
    highlights: [
      "Semantic search across all tools",
      "Intent-based recommendations",
      "Automatic capability matching",
    ],
  },
  {
    id: "build",
    title: "Build",
    description: "Create and publish tools with a unified SDK. Define once, use everywhere.",
    icon: Hammer,
    status: "available",
    highlights: [
      "TypeScript & Python SDKs",
      "OpenAPI spec generation",
      "Built-in testing framework",
    ],
  },
  {
    id: "consume",
    title: "Consume",
    description: "Unified endpoint for all your tools. Connect any agent to any tool through one integration.",
    icon: Plug,
    status: "available",
    highlights: [
      "One endpoint, all tools",
      "Cross-runtime support",
      "Real-time streaming",
    ],
  },
  {
    id: "govern",
    title: "Govern",
    description: "Enterprise-grade governance with fine-grained access control, audit logs, and policy enforcement.",
    icon: Shield,
    status: "coming-soon",
    highlights: [
      "Role-based access control",
      "Complete audit trail",
      "Policy-as-code",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Sparkles,
    title: "AI-Powered Routing",
    description: "Smart routing that learns from usage patterns",
  },
  {
    icon: Layers,
    title: "Version Management",
    description: "Seamless tool versioning and rollback",
  },
  {
    icon: Lock,
    title: "Credential Management",
    description: "Secure credential handling built-in",
  },
  {
    icon: Eye,
    title: "Observability",
    description: "Full visibility into tool execution",
  },
];

function StatusBadge({ status }: { status: string }) {
  const variants = {
    "available": { 
      className: "bg-teal/10 text-teal border-teal/20",
      label: "Available"
    },
    "coming-soon": { 
      className: "bg-muted text-muted-foreground border-border",
      label: "Coming Soon"
    },
    "beta": { 
      className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
      label: "Beta"
    },
  };

  const variant = variants[status as keyof typeof variants] || variants["available"];

  return (
    <Badge variant="outline" className={variant.className}>
      {variant.label}
    </Badge>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-teal-muted text-teal-foreground">
            Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-fraunces)]">
            Everything you need
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From discovery to governance, Toolbox provides a complete platform for managing AI agent tools.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:border-teal/50 hover:shadow-lg hover:shadow-teal/5 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="p-3 rounded-xl bg-teal/10 text-teal group-hover:bg-teal group-hover:text-teal-foreground transition-colors">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <StatusBadge status={feature.status} />
                  </div>
                  <CardTitle className="text-xl mt-4 font-[family-name:var(--font-fraunces)]">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-muted/50 border border-border hover:border-teal/30 hover:bg-muted/80 transition-all group cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background group-hover:bg-teal/10 transition-colors">
                    <feature.icon className="h-5 w-5 text-muted-foreground group-hover:text-teal transition-colors" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{feature.title}</div>
                    <div className="text-xs text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
