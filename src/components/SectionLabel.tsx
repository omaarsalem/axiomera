interface SectionLabelProps {
  number: string;
  label: string;
}

const SectionLabel = ({ number, label }: SectionLabelProps) => (
  <div className="flex items-center w-full mb-12">
    <span
      className="font-mono uppercase tracking-[0.5em] shrink-0"
      style={{ fontSize: '9px', color: 'var(--axt-gold)' }}
    >
      {number} — {label}
    </span>
    <div className="section-label-line" />
  </div>
);

export default SectionLabel;
