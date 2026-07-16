import Link from 'next/link'
export function Header(){return <header className="site-header">
  <Link className="wordmark" href="/">SHINEMA<span>●</span></Link>
  <nav className="main-nav"><Link href="/critiques">Critiques</Link><Link href="/classements">Classements</Link><Link href="/retrospectives">Rétrospectives</Link><Link href="/actualites">Actualités</Link></nav>
  <div className="header-meta">REVUE PERSONNELLE<br/>LAUSANNE — 2026</div>
</header>}
