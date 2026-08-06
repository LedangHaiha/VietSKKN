export type AgentType = 
  | 'research'    // Agent 1: Tra cứu & Pháp lý GDPT 2018
  | 'outline'     // Agent 2: Lập đề cương chuẩn 4 phần
  | 'writing'     // Agent 3: Biên soạn học thuật & Liên kết
  | 'innovation'  // Agent 4: Đề xuất 3-6 giải pháp đột phá
  | 'evidence'    // Agent 5: Bảng khảo sát, số liệu & biểu đồ
  | 'review'      // Agent 6: Rà soát lỗi, trùng lặp & thể thức
  | 'export';     // Agent 7: Xuất Word, PDF & Slide PPTX

export interface AgentInfo {
  id: AgentType;
  name: string;
  roleTitle: string;
  avatarIcon: string;
  color: string;
  description: string;
  capabilities: string[];
}

export interface AgentChatMessage {
  id: string;
  agentType: AgentType;
  sender: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
  status?: 'thinking' | 'done' | 'error';
  suggestedActions?: { label: string; actionCode: string }[];
}

export interface QualityAuditResult {
  overallScore: number;
  spellingErrorsCount: number;
  plagiarismRiskPercent: number;
  formattingCompliancePercent: number;
  issues: {
    id: string;
    type: 'spelling' | 'structure' | 'citation' | 'format';
    severity: 'high' | 'medium' | 'low';
    message: string;
    suggestedFix: string;
    sectionId?: string;
  }[];
}
