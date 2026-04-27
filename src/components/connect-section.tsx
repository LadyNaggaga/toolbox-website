"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal, Globe } from "lucide-react";
import { useState } from "react";

const codeExamples = {
  python: `from toolbox import Toolbox

toolbox = Toolbox(
    endpoint="https://api.toolbox.dev",
    api_key=os.environ["TOOLBOX_API_KEY"]
)

# Discover tools based on intent
tools = toolbox.discover(
    intent="Create a GitHub issue for the bug report"
)

# Execute the matched tool
result = toolbox.execute(tools[0], {
    "title": "Login button unresponsive",
    "body": "Users report intermittent issues...",
    "labels": ["bug", "priority:high"]
})`,
  csharp: `using Toolbox.Sdk;

var toolbox = new ToolboxClient(
    endpoint: "https://api.toolbox.dev",
    apiKey: Environment.GetEnvironmentVariable("TOOLBOX_API_KEY")
);

// Discover tools based on intent
var tools = await toolbox.DiscoverAsync(
    intent: "Create a GitHub issue for the bug report"
);

// Execute the matched tool
var result = await toolbox.ExecuteAsync(tools[0], new {
    Title = "Login button unresponsive",
    Body = "Users report intermittent issues...",
    Labels = new[] { "bug", "priority:high" }
});`,
};

const protocols = [
  {
    name: "MCP",
    fullName: "Model Context Protocol",
    description: "Native support for Anthropic's Model Context Protocol",
    icon: "🔌",
  },
  {
    name: "A2A",
    fullName: "Agent-to-Agent",
    description: "Seamless communication between AI agents",
    icon: "🤝",
  },
  {
    name: "OpenAPI",
    fullName: "OpenAPI Spec",
    description: "Standard REST APIs with OpenAPI 3.0 support",
    icon: "📄",
  },
  {
    name: "Skills",
    fullName: "Claude Skills",
    description: "Integration with Claude's reusable skills",
    icon: "✨",
    comingSoon: true,
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-8 px-2 text-muted-foreground hover:text-foreground"
    >
      {copied ? (
        <Check className="h-4 w-4 text-teal" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}

export function ConnectSection() {
  const [activeTab, setActiveTab] = useState("copilot");

  return (
    <section id="connect" className="py-20 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-teal-muted text-teal-foreground">
            Integration
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-fraunces)]">
            One endpoint, every agent
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect once and access all your tools. Works with any language, any framework, any agent.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Combined Quick Start */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden bg-card">
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Quick Start</span>
                </div>
                <CopyButton text={
                  activeTab === "copilot" 
                    ? "/mcp add https://contoso.services.ai.azure.com/api/projects/foundry-tools/toolset/toolbox-name/mcp"
                    : activeTab === "claude"
                    ? "claude mcp add --transport http --scope user toolbox-name https://contoso.services.ai.azure.com/api/projects/foundry-tools/toolset/toolbox-name/mcp"
                    : codeExamples[activeTab as keyof typeof codeExamples] || ""
                } />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="px-4 pt-2 border-b border-border overflow-x-auto">
                  <TabsList className="bg-transparent p-0 h-auto">
                    <TabsTrigger 
                      value="copilot"
                      className="data-[state=active]:bg-transparent data-[state=active]:text-teal data-[state=active]:border-b-2 data-[state=active]:border-teal rounded-none px-3 py-2 text-sm"
                    >
                      <svg className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Copilot CLI
                    </TabsTrigger>
                    <TabsTrigger 
                      value="claude"
                      className="data-[state=active]:bg-transparent data-[state=active]:text-teal data-[state=active]:border-b-2 data-[state=active]:border-teal rounded-none px-3 py-2 text-sm"
                    >
                      <svg className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.603 15.357a1.23 1.23 0 0 1-.903-.393 1.2 1.2 0 0 1-.32-.927c.063-.753.353-1.563 1.048-2.32.543-.592 1.31-1.072 2.252-1.472a.176.176 0 0 0 .103-.22.174.174 0 0 0-.206-.113c-1.164.227-2.177.67-2.986 1.306-.875.688-1.478 1.593-1.593 2.65a2.094 2.094 0 0 0 .543 1.618c.39.428.943.672 1.556.687h.073c1.072 0 2.077-.47 2.9-1.094a.175.175 0 0 0-.103-.32.173.173 0 0 0-.103.034c-.753.567-1.63.977-2.506.977-.268 0-.516-.04-.755-.117v-.296zm6.796-4.762c-.526 0-1.037.173-1.467.497-.493.37-.86.903-1.058 1.54-.197.636-.213 1.323-.043 1.976.17.653.52 1.24 1.007 1.693.487.453 1.087.75 1.73.86.643.108 1.303.023 1.903-.248.6-.27 1.107-.697 1.463-1.233.356-.537.547-1.16.547-1.8 0-.87-.347-1.703-.963-2.318a3.273 3.273 0 0 0-2.319-.967h-.8zm-.8 5.383c-.47 0-.923-.137-1.31-.393a2.417 2.417 0 0 1-.873-1.047 2.467 2.467 0 0 1-.133-1.367c.1-.46.323-.883.647-1.223a2.41 2.41 0 0 1 1.183-.713 2.38 2.38 0 0 1 1.373.04c.44.147.83.42 1.127.787.296.367.487.81.55 1.28.063.47 0 .95-.187 1.387a2.437 2.437 0 0 1-.84 1.04 2.39 2.39 0 0 1-1.297.45h-.24v-.24zm8.203-4.583c-.526 0-1.037.173-1.466.497-.494.37-.86.903-1.06 1.54-.196.636-.212 1.323-.042 1.976.17.653.52 1.24 1.006 1.693.488.453 1.088.75 1.73.86.644.108 1.304.023 1.904-.248.6-.27 1.106-.697 1.463-1.233.356-.537.546-1.16.546-1.8 0-.87-.346-1.703-.963-2.318a3.273 3.273 0 0 0-2.318-.967h-.8z"/>
                      </svg>
                      Claude Code
                    </TabsTrigger>
                    <TabsTrigger 
                      value="python"
                      className="data-[state=active]:bg-transparent data-[state=active]:text-teal data-[state=active]:border-b-2 data-[state=active]:border-teal rounded-none px-3 py-2 text-sm"
                    >
                      Python
                    </TabsTrigger>
                    <TabsTrigger 
                      value="csharp" 
                      className="data-[state=active]:bg-transparent data-[state=active]:text-teal data-[state=active]:border-b-2 data-[state=active]:border-teal rounded-none px-3 py-2 text-sm"
                    >
                      C#
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* GitHub Copilot CLI */}
                <TabsContent value="copilot" className="m-0">
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      Add Toolbox as an MCP server in GitHub Copilot CLI:
                    </p>
                    <pre className="p-4 rounded-lg bg-muted/50 border border-border overflow-x-auto text-sm font-mono">
                      <code>/mcp add https://contoso.services.ai.azure.com/api/projects/foundry-tools/toolset/toolbox-name/mcp</code>
                    </pre>
                    <p className="text-xs text-muted-foreground mt-3">
                      Replace the endpoint URL with your Toolbox unified endpoint.
                    </p>
                  </div>
                </TabsContent>

                {/* Claude Code */}
                <TabsContent value="claude" className="m-0">
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      Add Toolbox as an MCP server in Claude Code:
                    </p>
                    <pre className="p-4 rounded-lg bg-muted/50 border border-border overflow-x-auto text-sm font-mono">
                      <code>claude mcp add --transport http --scope user toolbox-name https://contoso.services.ai.azure.com/api/projects/foundry-tools/toolset/toolbox-name/mcp</code>
                    </pre>
                    <p className="text-xs text-muted-foreground mt-3">
                      Replace the endpoint URL with your Toolbox unified endpoint.
                    </p>
                  </div>
                </TabsContent>

                {/* SDK Examples */}
                {Object.entries(codeExamples).map(([lang, code]) => (
                  <TabsContent key={lang} value={lang} className="m-0">
                    <div className="p-4 overflow-x-auto">
                      <pre className="text-sm font-mono leading-relaxed">
                        <code className="text-foreground">
                          {code.split('\n').map((line, i) => (
                            <div key={i} className="flex">
                              <span className="select-none text-muted-foreground/50 w-8 text-right pr-4">
                                {i + 1}
                              </span>
                              <span>
                                {highlightSyntax(line, lang)}
                              </span>
                            </div>
                          ))}
                        </code>
                      </pre>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </Card>
          </motion.div>

          {/* Protocol Support */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2 font-[family-name:var(--font-fraunces)]">
                Universal Interoperability
              </h3>
              <p className="text-muted-foreground">
                Toolbox speaks every protocol. Connect tools and agents regardless of their native interface.
              </p>
            </div>

            <div className="space-y-4">
              {protocols.map((protocol, index) => (
                <motion.div
                  key={protocol.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`p-4 hover:border-teal/50 hover:shadow-lg hover:shadow-teal/5 transition-all group ${protocol.comingSoon ? 'opacity-75' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{protocol.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">{protocol.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {protocol.fullName}
                          </Badge>
                          {protocol.comingSoon && (
                            <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {protocol.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Endpoint highlight */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gradient-to-br from-teal/10 to-teal/5 border border-teal/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-5 w-5 text-teal" />
                <span className="font-semibold">Unified Endpoint</span>
              </div>
              <code className="text-sm font-mono text-teal bg-teal/10 px-3 py-1.5 rounded-lg">
                https://api.toolbox.dev/v1
              </code>
              <p className="text-sm text-muted-foreground mt-3">
                One integration point for all tools, all protocols, all agents. No more point-to-point wiring.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Simple syntax highlighting helper
function highlightSyntax(line: string, lang: string): React.ReactNode {
  // Keywords
  const keywords = ['import', 'from', 'const', 'await', 'async', 'export', 'return', 'if', 'else', 'def', 'class'];
  const builtins = ['process', 'os', 'console', 'true', 'false', 'null', 'undefined', 'None', 'True', 'False'];
  
  let result = line;
  
  // This is a simplified highlighter - in production you'd use a proper library
  // For now, we'll just return the line as-is with some basic coloring via CSS
  return <span>{line}</span>;
}
