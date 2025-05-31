from typing import List, Dict, Any
import asyncio

class Executor:
    def __init__(self, agents_available: Dict[str, Any], max_retries: int = 2):
        self.agents_available = agents_available
        self.max_retries = max_retries
        self.subtask_status: Dict[str, str] = {}
        self.outputs: List[Dict[str, str]] = []

    async def execute_plan(self, plan: List[Dict[str, Any]]):
        for t_idx, task in enumerate(plan):
            tool = task.get("tool", "").lower()
            subtasks = task.get("subtasks", [])
            agent = self.agents_available.get(tool)
            for s_idx, sub in enumerate(subtasks):
                key = f"{t_idx}-{s_idx}"
                status = "failed"
                if agent:
                    for attempt in range(self.max_retries + 1):
                        ans, _ = await agent.process(sub, None)
                        self.outputs.append({
                            "tool": tool,
                            "subtask": sub,
                            "output": ans
                        })
                        if agent.get_success:
                            status = "success"
                            break
                    self.subtask_status[key] = status
                else:
                    self.subtask_status[key] = "failed"
        return self.outputs
