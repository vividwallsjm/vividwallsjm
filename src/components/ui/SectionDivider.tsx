export default function SectionDivider({ className = '' }: { className?: string }) {
  return <div className={`w-16 h-[2px] bg-vivid-red my-4 ${className}`} />;
}
