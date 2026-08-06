import React, { useState } from 'react';
import { Bot, Send, Sparkles, Search, FileText, PenTool, BarChart3, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { SKKNProject } from '../../types/skkn';
import { AgentType, AgentChatMessage } from '../../types/agent';
import { AGENT_REGISTRY } from '../../constants/agentConstants';
import { executeAgentTask } from '../../services/agentEngine';

interface AgentWorkspaceViewProps {
  project: SKKNProject;
  onUpdateProject: (p: SKKNProject) => void;
}

export const AgentWorkspaceView: React.FC<AgentWorkspaceViewProps> = ({
  project,
  onUpdateProject,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>('research');
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    {
      id: 'm-1',
      agentType: 'research',
      sender: 'agent',
      content: `Xin chào Thầy/Cô ${project.teacherName}! Em là **Research Agent**. Em đã sẵn sàng hỗ trợ Thầy/Cô tra cứu cơ sở pháp lý GDPT 2018 và phân tích tính mới cho đề tài "${project.title}".`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isAgentBusy, setIsAgentBusy] = useState<boolean>(false);

  const activeAgentInfo = AGENT_REGISTRY[selectedAgent];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || chatInput;
    if (!textToSend.trim()) return;

    const userMsg: AgentChatMessage = {
      id: 'user-' + Date.now(),
      agentType: selectedAgent,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setChatInput('');
    setIsAgentBusy(true);

    try {
      const res = await executeAgentTask({
        agentType: selectedAgent,
        project,
        promptText: textToSend
      });

      const agentMsg: AgentChatMessage = {
        id: 'agent-' + Date.now(),
        agentType: selectedAgent,
        sender: 'agent',
        content: res.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'done'
      };

      setMessages((prev) => [...prev, agentMsg]);
      if (res.updatedProject) {
        onUpdateProject(res.updatedProject);
      }
    } finally {
      setIsAgentBusy(false);
    }
  };

  const agentIcons = {
    research: Search,
    outline: FileText,
    writing: PenTool,
    innovation: Sparkles,
    evidence: BarChart3,
    review: ShieldCheck,
    export: Download
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col md:flex-row gap-4 p-6 max-w-7xl mx-auto">
      {/* Sidebar Selector: 7 AI Agents */}
      <div className="w-full md:w-80 flex-shrink-0 bg-slate-900/60 rounded-3xl border border-slate-800 p-4 space-y-3 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-2">
          <div className="px-2 py-1 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              ĐỘI NGU 7 AI AGENTS
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {(Object.keys(AGENT_REGISTRY) as AgentType[]).map((type) => {
            const agent = AGENT_REGISTRY[type];
            const Icon = agentIcons[type];
            const isSelected = selectedAgent === type;

            return (
              <button
                key={type}
                onClick={() => setSelectedAgent(type)}
                className={`w-full p-3.5 rounded-2xl border text-left transition flex items-start space-x-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/40 border-indigo-500 text-white shadow-lg'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${agent.color} text-white flex-shrink-0 shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-slate-100 truncate">{agent.name}</h4>
                  <p className="text-[11px] text-indigo-300 font-medium truncate">{agent.roleTitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-300">Khả năng chuyên môn:</span>
          <ul className="space-y-1">
            {activeAgentInfo.capabilities.map((cap, idx) => (
              <li key={idx} className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Agent Workspace Chat & Action Panel */}
      <div className="flex-1 bg-slate-900/60 rounded-3xl border border-slate-800 flex flex-col justify-between overflow-hidden">
        {/* Agent Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${activeAgentInfo.color} text-white shadow-md`}>
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{activeAgentInfo.name}</h3>
              <p className="text-xs text-slate-400">{activeAgentInfo.roleTitle}</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono">Trạng thái: Ready</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75 pb-1 border-b border-white/10">
                    <span className="font-bold">{isUser ? 'Thầy/Cô' : AGENT_REGISTRY[msg.agentType].name}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                </div>
              </div>
            );
          })}

          {isAgentBusy && (
            <div className="flex justify-start">
              <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 text-xs text-indigo-300 flex items-center space-x-2 animate-pulse">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>{activeAgentInfo.name} đang phân tích ngữ cảnh dự án và suy luận...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar & Quick Action Chips */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 space-y-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-semibold text-slate-400 flex-shrink-0">Gợi ý nhanh:</span>
            {activeAgentInfo.capabilities.map((cap, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(`Yêu cầu ${activeAgentInfo.name}: ${cap}`)}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-[11px] font-medium flex-shrink-0 transition"
              >
                {cap}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Gửi chỉ thị cho ${activeAgentInfo.name}...`}
              className="flex-1 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-indigo-500 focus:outline-none transition"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isAgentBusy || !chatInput.trim()}
              className="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold flex items-center justify-center transition shadow-md shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
