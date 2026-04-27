"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedLogo } from "@/components/animated-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  MessageSquare, 
  CheckCircle,
  Send,
  Bot,
  User,
  Wrench,
  ChevronRight,
  Loader2,
  ArrowLeft,
  Play
} from "lucide-react";

interface ToolCall {
  tool: string;
  action: string;
  params: string;
  result?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolCalls?: ToolCall[];
  isStreaming?: boolean;
}

const scenarios = [
  {
    id: "code-review",
    name: "Code Review",
    prompt: "Review the latest PR for security issues",
    toolCalls: [
      { tool: "GitHub", action: "fetch_pull_request", params: "pr: #1234", result: "Fetched PR #1234 with 12 changed files" },
      { tool: "CodeQL", action: "scan_for_vulnerabilities", params: "diff: true", result: "Found 2 potential SQL injection risks" },
      { tool: "Slack", action: "notify_team", params: "channel: #security", result: "Notification sent to #security channel" },
    ],
    response: "I've reviewed PR #1234 and found **2 potential security issues**:\n\n1. **SQL Injection Risk** in `src/api/users.ts` line 42\n2. **Unvalidated Input** in `src/handlers/auth.ts` line 89\n\nI've notified the security team on Slack. Would you like me to add inline comments to the PR?",
  },
  {
    id: "incident",
    name: "Incident Response",
    prompt: "Investigate the production database slowdown",
    toolCalls: [
      { tool: "Datadog", action: "get_metrics", params: "service: postgres", result: "CPU: 94%, Memory: 87%, Connections: 847" },
      { tool: "AWS RDS", action: "describe_instance", params: "id: prod-db", result: "Instance: db.r5.2xlarge, IOPS: 12,000 (limit)" },
      { tool: "PagerDuty", action: "create_incident", params: "severity: P2", result: "Incident INC-4521 created" },
    ],
    response: "**Investigation Summary:**\n\nThe production database slowdown is caused by **IOPS throttling**. Current metrics show:\n\n- CPU utilization at 94%\n- 847 active connections (unusually high)\n- IOPS at provisioned limit of 12,000\n\nI've created incident **INC-4521** in PagerDuty. Recommended actions:\n1. Scale up to db.r5.4xlarge\n2. Enable connection pooling\n3. Review slow query logs",
  },
  {
    id: "deployment",
    name: "Deployment",
    prompt: "Deploy the new feature to staging",
    toolCalls: [
      { tool: "GitHub", action: "get_latest_commit", params: "branch: main", result: "Commit: abc123f - 'Add user preferences API'" },
      { tool: "Docker", action: "build_image", params: "tag: staging-v2.3.1", result: "Image built successfully in 45s" },
      { tool: "Kubernetes", action: "apply_deployment", params: "env: staging", result: "Deployment rolled out to 3 pods" },
    ],
    response: "**Deployment Complete!** ✅\n\nSuccessfully deployed commit `abc123f` to staging:\n\n- **Image:** staging-v2.3.1\n- **Pods:** 3/3 running\n- **Health checks:** All passing\n\nStaging URL: https://staging.yourapp.com\n\nThe new user preferences API is now available for testing.",
  },
];

export default function PlaygroundPage() {
  const [selectedScenario, setSelectedScenario] = useState<typeof scenarios[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentToolIndex, setCurrentToolIndex] = useState(-1);
  const [streamedContent, setStreamedContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedContent, currentToolIndex]);

  const simulateChat = async (scenario: typeof scenarios[0]) => {
    setSelectedScenario(scenario);
    setMessages([]);
    setIsStreaming(true);
    setCurrentToolIndex(-1);
    setStreamedContent("");

    // Add user message
    const userMessage: Message = {
      id: "user-1",
      role: "user",
      content: scenario.prompt,
    };
    setMessages([userMessage]);

    await new Promise(r => setTimeout(r, 500));

    // Add assistant message placeholder
    const assistantMessage: Message = {
      id: "assistant-1",
      role: "assistant",
      content: "",
      toolCalls: [],
      isStreaming: true,
    };
    setMessages([userMessage, assistantMessage]);

    // Simulate tool calls one by one
    for (let i = 0; i < scenario.toolCalls.length; i++) {
      setCurrentToolIndex(i);
      await new Promise(r => setTimeout(r, 1200));
      
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === "assistant") {
          lastMessage.toolCalls = scenario.toolCalls.slice(0, i + 1);
        }
        return newMessages;
      });
    }

    setCurrentToolIndex(-1);
    await new Promise(r => setTimeout(r, 400));

    // Stream the response text
    const words = scenario.response.split(" ");
    for (let i = 0; i < words.length; i++) {
      await new Promise(r => setTimeout(r, 30));
      setStreamedContent(words.slice(0, i + 1).join(" "));
    }

    // Finalize message
    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      if (lastMessage.role === "assistant") {
        lastMessage.content = scenario.response;
        lastMessage.isStreaming = false;
      }
      return newMessages;
    });
    setIsStreaming(false);
    setStreamedContent("");
  };

  const resetPlayground = () => {
    setSelectedScenario(null);
    setMessages([]);
    setIsStreaming(false);
    setCurrentToolIndex(-1);
    setStreamedContent("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
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
                Playground
              </span>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-teal-muted text-teal-foreground border-teal/20 text-xs font-medium"
            >
              Demo
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/tools/toolbox?pivots=python" target="_blank">
              <Button variant="outline" size="sm">
                Docs ↗
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Scenario Selection */}
        <aside className="w-72 border-r border-border bg-muted/30 flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Try a Scenario
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => simulateChat(scenario)}
                disabled={isStreaming}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedScenario?.id === scenario.id
                    ? "bg-teal/10 border border-teal/30"
                    : "hover:bg-muted border border-transparent"
                } ${isStreaming ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Play className={`h-4 w-4 ${
                    selectedScenario?.id === scenario.id ? "text-teal" : "text-muted-foreground"
                  }`} />
                  <span className={`font-medium text-sm ${
                    selectedScenario?.id === scenario.id ? "text-teal" : ""
                  }`}>{scenario.name}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  &quot;{scenario.prompt}&quot;
                </p>
              </button>
            ))}
          </div>
          
          {selectedScenario && (
            <div className="p-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={resetPlayground}
                className="w-full"
                disabled={isStreaming}
              >
                Reset Conversation
              </Button>
            </div>
          )}
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-background">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 rounded-full bg-teal/10 mb-6">
                    <MessageSquare className="h-12 w-12 text-teal" />
                  </div>
                  <h4 className="text-2xl font-semibold mb-3 font-[family-name:var(--font-fraunces)]">
                    Welcome to Toolbox Playground
                  </h4>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Select a scenario from the sidebar to see how Toolbox orchestrates tool calls and generates intelligent responses in real-time.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {scenarios.map((scenario) => (
                      <Button
                        key={scenario.id}
                        variant="outline"
                        size="sm"
                        onClick={() => simulateChat(scenario)}
                        className="gap-2"
                      >
                        <Play className="h-3 w-3" />
                        {scenario.name}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-teal" />
                        </div>
                      )}
                      
                      <div className={`flex-1 max-w-3xl ${message.role === "user" ? "text-right" : ""}`}>
                        {message.role === "user" ? (
                          <div className="inline-block bg-teal text-white rounded-2xl rounded-tr-sm px-5 py-3">
                            <p className="text-sm">{message.content}</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {/* Tool Calls */}
                            {message.toolCalls && message.toolCalls.length > 0 && (
                              <div className="space-y-2">
                                {message.toolCalls.map((tool, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border"
                                  >
                                    <div className="p-2 rounded-lg bg-teal/10">
                                      <Wrench className="h-4 w-4 text-teal" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <Badge variant="secondary" className="bg-muted text-xs font-mono">
                                          {tool.tool}
                                        </Badge>
                                        <code className="text-sm font-mono text-teal">
                                          {tool.action}({tool.params})
                                        </code>
                                      </div>
                                      {tool.result && (
                                        <p className="text-sm text-muted-foreground mt-2">
                                          → {tool.result}
                                        </p>
                                      )}
                                    </div>
                                    <CheckCircle className="h-5 w-5 text-teal flex-shrink-0" />
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* Loading indicator for current tool */}
                            {message.isStreaming && currentToolIndex >= 0 && selectedScenario && currentToolIndex < selectedScenario.toolCalls.length && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-teal/5 border border-teal/20"
                              >
                                <Loader2 className="h-5 w-5 text-teal animate-spin" />
                                <span className="text-sm text-teal">
                                  Calling {selectedScenario.toolCalls[currentToolIndex].tool}.{selectedScenario.toolCalls[currentToolIndex].action}...
                                </span>
                              </motion.div>
                            )}

                            {/* Response Content */}
                            {(message.content || streamedContent) && (
                              <div className="p-4 rounded-xl bg-card border border-border">
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {message.content || streamedContent}
                                    {message.isStreaming && !message.content && streamedContent && (
                                      <span className="inline-block w-2 h-5 bg-teal/50 animate-pulse ml-0.5" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Streaming indicator when no content yet */}
                            {message.isStreaming && !message.content && !streamedContent && currentToolIndex === -1 && message.toolCalls && message.toolCalls.length > 0 && (
                              <div className="flex items-center gap-2 p-4">
                                <Loader2 className="h-4 w-4 text-teal animate-spin" />
                                <span className="text-sm text-muted-foreground">Generating response...</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {message.role === "user" && (
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-muted/20">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Select a scenario to try the demo..."
                    disabled
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground disabled:opacity-60"
                  />
                </div>
                <Button size="icon" disabled className="rounded-xl h-12 w-12">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                This is a demo showcasing Toolbox capabilities. Select a scenario from the sidebar to begin.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
