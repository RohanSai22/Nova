import { useEffect, useState } from 'react';
import axios from 'axios';
import { Message, ToolOutput, PlanItem, SubtaskStatus } from '../types';

export function useChat(threadId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [blocks, setBlocks] = useState<ToolOutput[] | null>(null);
  const [status, setStatus] = useState('Agents ready');
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [subtaskStatus, setSubtaskStatus] = useState<SubtaskStatus>({});
  const [reportUrl, setReportUrl] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatest();
      fetchCurrentPlan();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchLatest = async () => {
    try {
      const res = await axios.get('/latest_answer');
      const data = res.data;
      if (data.answer) {
        setMessages(prev => [...prev, { type: 'agent', content: data.answer }]);
        setStatus(data.status);
        if (data.plan) setPlan(data.plan);
        if (data.subtask_status) setSubtaskStatus(data.subtask_status);
        if (data.final_report_url) setReportUrl(data.final_report_url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCurrentPlan = async () => {
    try {
      const res = await axios.get('/current_plan');
      if (res.data.plan) {
        setPlan(res.data.plan);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendQuery = async (q: string) => {
    setMessages(prev => [...prev, { type: 'user', content: q }]);
    await axios.post('/query', { query: q, tts_enabled: false });
  };

  const stop = async () => {
    await axios.get('/stop');
  };

  return { messages, status, sendQuery, stop, blocks, plan, subtaskStatus, reportUrl };
}
