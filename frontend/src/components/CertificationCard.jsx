const CATEGORY_ACCENT = [
  ['Azure', 'bg-link'],
  ['GitHub', 'bg-success'],
  ['Microsoft', 'bg-warning'],
]

function getAccent(category) {
  for (const [prefix, cls] of CATEGORY_ACCENT) {
    if (category.startsWith(prefix)) return cls
  }
  return 'bg-muted'
}

function getLevelBadge(level) {
  if (level === 'Advanced') return 'text-warning border-warning'
  if (level === 'Intermediate') return 'text-link border-link'
  return 'text-muted border-hairline-strong'
}

export default function CertificationCard({ name, level, category, description, isNew }) {
  return (
    <div className="bg-surface-card relative flex flex-col p-7 hover:bg-surface-elevated transition-colors duration-200 group overflow-hidden cursor-pointer">

      {/* Color accent top bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${getAccent(category)} opacity-40 group-hover:opacity-90 transition-opacity duration-300`} />

      {/* Header: category + badges */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <p className="font-mono text-muted text-[10px] tracking-[2.5px] uppercase leading-none pt-0.5">
          {category}
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isNew && (
            <span className="font-mono text-[8px] tracking-[2px] uppercase text-success border border-success px-[6px] py-[3px]">
              NEW
            </span>
          )}
          <span className={`font-mono text-[8px] tracking-[1.5px] uppercase border px-[6px] py-[3px] ${getLevelBadge(level)}`}>
            {level}
          </span>
        </div>
      </div>

      {/* Certification name */}
      <h3 className="font-display text-ink text-[14px] tracking-[1.5px] uppercase leading-tight mb-4 flex-1">
        {name}
      </h3>

      {/* Description */}
      {description && (
        <p className="font-mono text-muted text-[11px] leading-[1.75] mb-6">
          {description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-hairline mt-auto">
        <span className="font-mono text-muted-soft text-[9px] tracking-[1.5px] uppercase">
          MICROSOFT CERTIFIED
        </span>
        <span className="font-mono text-muted-soft text-[13px] group-hover:text-ink transition-colors duration-200">
          →
        </span>
      </div>
    </div>
  )
}
