"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedLogo } from "@/components/animated-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  BookOpen,
  Rocket
} from "lucide-react";
import { useState } from "react";

// GitHub icon component
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 text-teal" />
      ) : (
        <Copy className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}

const pythonSteps = [
  {
    title: "Clone the repository",
    code: "git clone https://github.com/microsoft-foundry/foundry-samples.git\ncd foundry-samples/samples/python/toolbox",
  },
  {
    title: "Install dependencies",
    code: "pip install -r requirements.txt",
  },
  {
    title: "Set up environment variables",
    code: `# Create a .env file
TOOLBOX_ENDPOINT=https://your-toolbox-endpoint.azure.com
TOOLBOX_API_KEY=your-api-key`,
  },
  {
    title: "Run the sample",
    code: "python main.py",
  },
];

const csharpSteps = [
  {
    title: "Clone the repository",
    code: "git clone https://github.com/microsoft-foundry/foundry-samples.git\ncd foundry-samples/samples/csharp/toolbox",
  },
  {
    title: "Restore packages",
    code: "dotnet restore",
  },
  {
    title: "Configure settings",
    code: `// Update appsettings.json
{
  "Toolbox": {
    "Endpoint": "https://your-toolbox-endpoint.azure.com",
    "ApiKey": "your-api-key"
  }
}`,
  },
  {
    title: "Run the sample",
    code: "dotnet run",
  },
];

const resources = [
  {
    title: "Documentation",
    description: "Full API reference and guides",
    href: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/toolbox?pivots=python",
    icon: BookOpen,
  },
  {
    title: "Python Samples",
    description: "Sample code and tutorials for Python",
    href: "https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/toolbox",
    icon: GithubIcon,
  },
  {
    title: "C# Samples",
    description: "Sample code and tutorials for .NET",
    href: "https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/csharp/toolbox",
    icon: GithubIcon,
  },
];

export default function GetStartedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <AnimatedLogo size={28} />
              <span className="text-lg font-semibold tracking-tight font-[family-name:var(--font-fraunces)]">
                Get Started
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 sm:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4 bg-teal-muted text-teal-foreground">
                <Rocket className="h-3 w-3 mr-1" />
                Quick Start
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-[family-name:var(--font-fraunces)] mb-6">
                Build Your Toolbox
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get up and running in minutes with our sample projects. Choose your preferred language and follow the steps below.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Language Tabs */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs defaultValue="python" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="python" className="gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                    </svg>
                    Python
                  </TabsTrigger>
                  <TabsTrigger value="csharp" className="gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zM9.426 7.12a5.55 5.55 0 011.985.38v1.181a4.5 4.5 0 00-2.25-.566 3.439 3.439 0 00-2.625 1.087 4.099 4.099 0 00-1.012 2.906 3.9 3.9 0 00.945 2.754 3.217 3.217 0 002.482 1.023 4.657 4.657 0 002.464-.634l-.004 1.08a5.543 5.543 0 01-2.625.555 4.211 4.211 0 01-3.228-1.297 4.793 4.793 0 01-1.212-3.43 5.133 5.133 0 011.355-3.715 4.439 4.439 0 013.327-1.321l.398-.003zm3.027.27h1.08l.519 1.2.519-1.2h1.08l-.96 1.665.96 1.665h-1.08l-.519-1.2-.519 1.2h-1.08l.96-1.665zm4.5 0h1.08l.519 1.2.519-1.2h1.08l-.96 1.665.96 1.665h-1.08l-.519-1.2-.519 1.2h-1.08l.96-1.665z"/>
                    </svg>
                    C# / .NET
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="python">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-teal/10">
                          <Terminal className="h-5 w-5 text-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Python Quick Start</h3>
                          <p className="text-sm text-muted-foreground">Get started with the Python SDK</p>
                        </div>
                      </div>
                      <a
                        href="https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/toolbox"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="gap-2">
                          <GithubIcon className="h-4 w-4" />
                          View on GitHub
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>

                    <div className="space-y-6">
                      {pythonSteps.map((step, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal/10 text-teal text-sm font-medium">
                              {index + 1}
                            </span>
                            <h4 className="font-medium">{step.title}</h4>
                          </div>
                          <div className="ml-8 relative">
                            <pre className="p-4 rounded-lg bg-muted/50 border border-border overflow-x-auto text-sm">
                              <code>{step.code}</code>
                            </pre>
                            <div className="absolute top-2 right-2">
                              <CopyButton text={step.code} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="csharp">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-teal/10">
                          <Terminal className="h-5 w-5 text-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold">C# / .NET Quick Start</h3>
                          <p className="text-sm text-muted-foreground">Get started with the .NET SDK</p>
                        </div>
                      </div>
                      <a
                        href="https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/csharp/toolbox"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="gap-2">
                          <GithubIcon className="h-4 w-4" />
                          View on GitHub
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>

                    <div className="space-y-6">
                      {csharpSteps.map((step, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal/10 text-teal text-sm font-medium">
                              {index + 1}
                            </span>
                            <h4 className="font-medium">{step.title}</h4>
                          </div>
                          <div className="ml-8 relative">
                            <pre className="p-4 rounded-lg bg-muted/50 border border-border overflow-x-auto text-sm">
                              <code>{step.code}</code>
                            </pre>
                            <div className="absolute top-2 right-2">
                              <CopyButton text={step.code} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16 bg-muted/30 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-fraunces)] mb-8 text-center">
                Additional Resources
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {resources.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="p-5 h-full hover:border-teal/50 hover:shadow-lg hover:shadow-teal/5 transition-all group">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-teal/10 group-hover:bg-teal/20 transition-colors">
                          <resource.icon className="h-5 w-5 text-teal" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold">{resource.title}</span>
                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-fraunces)] mb-4">
                Ready to explore?
              </h2>
              <p className="text-muted-foreground mb-6">
                Try out the interactive playground to see Toolbox in action.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/playground">
                  <Button className="bg-teal text-white hover:bg-teal/90 gap-2">
                    <Rocket className="h-4 w-4" />
                    Open Playground
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground text-center">
            Made with ❤️ from Microsoft Foundry
          </p>
        </div>
      </footer>
    </div>
  );
}
