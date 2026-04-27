"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Zap, 
  CheckCircle,
  Send,
  Bot,
  User,
  Wrench,
  ChevronRight,
  Loader2
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

export function PlaygroundSection() {
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
    <section id="playground" className="py-20 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 bg-teal-muted text-teal-foreground">
            Interactive Demo
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-fraunces)]">
            See it in action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how Toolbox routes agent intents to the right tools with intelligent discovery and execution.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-border/50 shadow-xl">
            <div className="flex flex-col lg:flex-row h-[600px]">
              {/* Sidebar - Scenario Selection */}
              <div className="lg:w-72 border-b lg:border-b-0 lg:border-r border-border bg-muted/30 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 px-2">
                  Try a Scenario
                </h3>
                <div className="space-y-2">
                  {scenarios.map((scenario) => (
                    <button
                      key={scenario.id}
                      onClick={() => simulateChat(scenario)}
                      disabled={isStreaming}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        selectedScenario?.id === scenario.id
                          ? "bg-teal/10 border border-teal/30 text-teal"
                          : "hover:bg-muted border border-transparent"
                      } ${isStreaming ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          selectedScenario?.id === scenario.id ? "rotate-90 text-teal" : "text-muted-foreground"
                        }`} />
                        <span className="font-medium text-sm">{scenario.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 ml-6 line-clamp-2">
                        &quot;{scenario.prompt}&quot;
                      </p>
                    </button>
                  ))}
                </div>
                
                {selectedScenario && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetPlayground}
                    className="w-full mt-4"
                    disabled={isStreaming}
                  >
                    Reset
                  </Button>
                )}
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col bg-background">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="p-4 rounded-full bg-teal/10 mb-4">
                        <MessageSquare className="h-8 w-8 text-teal" />
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Select a scenario</h4>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Choose one of the scenarios on the left to see how Toolbox orchestrates tool calls in real-time.
                      </p>
                    </div>
                  ) : (
                    <>
                      <AnimatePresence mode="popLayout">
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                          >
                            {message.role === "assistant" && (
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center">
                                <Bot className="h-4 w-4 text-teal" />
                              </div>
                            )}
                            
                            <div className={`flex-1 max-w-2xl ${message.role === "user" ? "text-right" : ""}`}>
                              {message.role === "user" ? (
                                <div className="inline-block bg-teal text-white rounded-2xl rounded-tr-sm px-4 py-2">
                                  <p className="text-sm">{message.content}</p>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {/* Tool Calls */}
                                  {message.toolCalls && message.toolCalls.length > 0 && (
                                    <div className="space-y-2">
                                      {message.toolCalls.map((tool, idx) => (
                                        <motion.div
                                          key={idx}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border"
                                        >
                                          <div className="p-1.5 rounded bg-teal/10">
                                            <Wrench className="h-3.5 w-3.5 text-teal" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                              <Badge variant="secondary" className="bg-muted text-xs font-mono">
                                                {tool.tool}
                                              </Badge>
                                              <code className="text-xs font-mono text-teal">
                                                {tool.action}({tool.params})
                                              </code>
                                            </div>
                                            {tool.result && (
                                              <p className="text-xs text-muted-foreground mt-1">
                                                → {tool.result}
                                              </p>
                                            )}
                                          </div>
                                          <CheckCircle className="h-4 w-4 text-teal flex-shrink-0" />
                                        </motion.div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Loading indicator for current tool */}
                                  {message.isStreaming && currentToolIndex >= 0 && selectedScenario && currentToolIndex < selectedScenario.toolCalls.length && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="flex items-center gap-2 p-3 rounded-lg bg-teal/5 border border-teal/20"
                                    >
                                      <Loader2 className="h-4 w-4 text-teal animate-spin" />
                                      <span className="text-sm text-teal">
                                        Calling {selectedScenario.toolCalls[currentToolIndex].tool}.{selectedScenario.toolCalls[currentToolIndex].action}...
                                      </span>
                                    </motion.div>
                                  )}

                                  {/* Response Content */}
                                  {(message.content || streamedContent) && (
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {message.content || streamedContent}
                                        {message.isStreaming && !message.content && streamedContent && (
                                          <span className="inline-block w-2 h-4 bg-teal/50 animate-pulse ml-0.5" />
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Streaming indicator when no content yet */}
                                  {message.isStreaming && !message.content && !streamedContent && currentToolIndex === -1 && message.toolCalls && message.toolCalls.length > 0 && (
                                    <div className="flex items-center gap-2">
                                      <Loader2 className="h-4 w-4 text-teal animate-spin" />
                                      <span className="text-sm text-muted-foreground">Generating response...</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {message.role === "user" && (
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-4 w-4 text-muted-foreground" />
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
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Select a scenario above to try the demo..."
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm placeholder:text-muted-foreground disabled:opacity-60"
                      />
                    </div>
                    <Button size="icon" disabled className="rounded-xl h-11 w-11">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    This is a demo. Select a scenario to see Toolbox in action.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
