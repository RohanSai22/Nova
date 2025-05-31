interface Props {
  url: string;
}

export default function FinalReportCard({ url }: Props) {
  if (!url) return null;
  return (
    <div className="p-4 bg-white/10 rounded-xl mt-4">
      <a href={url} className="text-accent underline mr-4">Download PDF</a>
      <a href={url} target="_blank" className="underline">Open in viewer</a>
    </div>
  );
}
