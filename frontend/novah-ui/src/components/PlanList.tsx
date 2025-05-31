import PlanItem from './PlanItem';
import { PlanItem as Plan, SubtaskStatus } from '../types';

interface Props {
  plan: Plan[];
  status: SubtaskStatus;
}

export default function PlanList({ plan, status }: Props) {
  return (
    <ul className="mb-4">
      {plan.map((task, idx) => (
        <li key={idx} className="mb-2">
          <div className="font-semibold mb-1">{task.task} ({task.tool})</div>
          <ul className="ml-4">
            {task.subtasks.map((st, j) => (
              <PlanItem key={j} text={st} status={status[`${idx}-${j}`] || 'pending'} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
