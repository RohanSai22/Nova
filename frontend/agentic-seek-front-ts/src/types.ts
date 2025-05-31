export interface Message {
  id: string;
  type: 'user' | 'agent' | 'error';
  content: string;
  reasoning?: string;
  agentName?: string;
}

export interface PlanStep {
  task_name: string;
  agent: string;
  description: string;
  requirements?: string;
}
