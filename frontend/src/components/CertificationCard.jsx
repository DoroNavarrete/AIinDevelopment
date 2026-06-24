export default function CertificationCard({ name, level, category, description, isNew }) {
  return (
    <div className="bg-surface-card border border-hairline p-6 flex flex-col gap-4 hover:border-hairline-strong transition-colors duration-200">
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-muted text-[10px] tracking-[2px] uppercase">
          {category}
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isNew && (
            <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-success border border-success px-2 py-0.5">
              NEW
            </span>
          )}
          <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-muted-soft border border-hairline px-2 py-0.5">
            {level}
          </span>
        </div>
      </div>

      <h3 className="font-display text-body-strong text-[14px] tracking-[1px] uppercase leading-snug">
        {name}
      </h3>

      {description && (
        <p className="font-mono text-muted-soft text-[11px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
