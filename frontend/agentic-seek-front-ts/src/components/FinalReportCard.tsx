interface Props {
  result?: string;
}

export default function FinalReportCard({ result }: Props) {
  if (!result) return null;
  return (
    <div className="mt-4 p-4 border rounded bg-slate-700">
      <h3 className="font-semibold mb-2">Final Report</h3>
      <p className="text-sm whitespace-pre-wrap">{result}</p>
    </div>
  );
}
