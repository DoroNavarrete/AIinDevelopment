import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CertificationCard from '../components/CertificationCard'

const MICROSOFT_CERTIFICATIONS_2026 = [
  {
    name: 'Azure AI Apps and Agents Developer Associate',
    level: 'Intermediate',
    category: 'Azure · AI',
    description: 'Design and build AI-powered apps and agents on Azure using Azure AI services and OpenAI.',
    isNew: true,
  },
  {
    name: 'Machine Learning Operations Engineer Associate',
    level: 'Intermediate',
    category: 'Azure · ML',
    description: 'Operationalize and manage machine learning models and pipelines on Azure.',
    isNew: true,
  },
  {
    name: 'Azure Databricks Data Engineer Associate',
    level: 'Intermediate',
    category: 'Azure · Data',
    description: 'Build and maintain data pipelines and lakehouses using Azure Databricks.',
    isNew: true,
  },
  {
    name: 'Microsoft Certified: SQL AI Developer Associate',
    level: 'Intermediate',
    category: 'Azure · SQL',
    description: 'Develop intelligent data solutions combining SQL Server capabilities with AI services.',
    isNew: true,
  },
  {
    name: 'Microsoft Certified: Agentic AI Business Solutions Architect',
    level: 'Advanced',
    category: 'Azure · AI',
    description: 'Architect enterprise-scale agentic AI solutions across Dynamics 365 and Power Platform.',
    isNew: true,
  },
  {
    name: 'Cloud and AI Security Engineer Associate',
    level: 'Intermediate',
    category: 'Azure · Security',
    description: 'Implement security controls and threat protection across cloud and AI workloads.',
    isNew: true,
  },
  {
    name: 'GitHub Certified: Agentic AI Developer',
    level: 'Intermediate',
    category: 'GitHub · AI',
    description: 'Build and deploy agentic AI workflows and automation using GitHub Copilot and Actions.',
    isNew: true,
  },
  {
    name: 'Microsoft 365 Certified: Copilot and Agent Administration Fundamentals',
    level: 'Fundamentals',
    category: 'Microsoft 365',
    description: 'Administer Microsoft 365 Copilot and AI agents across the Modern Work platform.',
    isNew: true,
  },
]

export default function WelcomePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">

      {/* Top navigation */}
      <nav className="flex items-center justify-between px-10 border-b border-hairline" style={{ height: '56px' }}>
        <span className="font-mono text-on-dark text-[14px] tracking-[6px] uppercase">
          AUTHENTICATION
        </span>
        <button
          onClick={handleLogout}
          className="font-mono text-[12px] tracking-[2px] uppercase text-muted hover:text-ink transition-colors duration-200"
        >
          SIGN OUT
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 pt-20 pb-16 text-center">
        <p className="font-mono text-muted text-[11px] tracking-[2px] uppercase mb-10">
          SESSION ACTIVE
        </p>

        <p className="font-display text-body-color text-[32px] tracking-[2px] uppercase leading-tight mb-1">
          WELCOME,
        </p>

        <h1 className="font-display text-ink text-[64px] tracking-[4px] uppercase leading-none">
          {user ? user.toUpperCase() : 'USER'}
        </h1>

        {/* Hairline accent */}
        <div className="h-px w-24 bg-hairline-strong mt-12 mb-20" />

        {/* Microsoft Certifications Section */}
        <section className="w-full max-w-6xl text-left">

          {/* Section label row */}
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-muted text-[11px] tracking-[2px] uppercase">
              MICROSOFT LEARN
            </p>
            <div className="flex items-center gap-6">
              <span className="font-mono text-muted-soft text-[10px] tracking-[1.5px] uppercase">
                {MICROSOFT_CERTIFICATIONS_2026.length} CERTIFICATIONS
              </span>
              <span className="font-mono text-muted-soft text-[10px] tracking-[1.5px] uppercase">
                2026
              </span>
            </div>
          </div>

          {/* Section title + subtitle */}
          <h2 className="font-display text-ink text-[28px] tracking-[2px] uppercase mb-2">
            LATEST CERTIFICATIONS
          </h2>
          <p className="font-mono text-muted text-[11px] leading-relaxed mb-5 max-w-2xl">
            New role-based certifications announced for 2026, covering AI, cloud, data engineering, and security.
          </p>

          <div className="h-px bg-hairline mb-6" />

          {/* Category legend */}
          <div className="flex items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-[2px] bg-link" />
              <span className="font-mono text-muted-soft text-[9px] tracking-[1.5px] uppercase">Azure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-[2px] bg-success" />
              <span className="font-mono text-muted-soft text-[9px] tracking-[1.5px] uppercase">GitHub</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-[2px] bg-warning" />
              <span className="font-mono text-muted-soft text-[9px] tracking-[1.5px] uppercase">Microsoft 365</span>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-hairline">
            {MICROSOFT_CERTIFICATIONS_2026.map((cert) => (
              <CertificationCard key={cert.name} {...cert} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-10 py-8 border-t border-hairline">
        <p className="font-mono text-muted-soft text-[11px] tracking-[2px] uppercase">
          JWT AUTHENTICATION API
        </p>
      </footer>

    </div>
  )
}
