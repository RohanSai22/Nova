import os
from reportlab.pdfgen import canvas
from sources.agents.agent import Agent
from sources.memory import Memory

class ReportAgent(Agent):
    def __init__(self, name, prompt_path, provider, verbose=False):
        super().__init__(name, prompt_path, provider, verbose)
        self.role = "report"
        self.type = "report_agent"
        self.memory = Memory(self.load_prompt(prompt_path), recover_last_session=False, memory_compression=False, model_provider=provider.get_model_name())
        self.report_path: str | None = None

    async def process(self, content: str, speech_module) -> tuple[str, str]:
        os.makedirs("reports", exist_ok=True)
        path = os.path.join("reports", "final_report.pdf")
        c = canvas.Canvas(path)
        text_obj = c.beginText(40, 800)
        for line in content.split("\n"):
            text_obj.textLine(line)
        c.drawText(text_obj)
        c.save()
        self.report_path = path
        self.last_answer = f"Report generated at {path}"
        return self.last_answer, ""
