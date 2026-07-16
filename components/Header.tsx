import Link from 'next/link';
import Image from "next/image";
export function Header(){return <header className="site-header">
<Link className="wordmark" href="/">
  <Image
    src="/images/logo.svg"
    alt="SHINEMA"
    width={230}
    height={55}
    priority
  />
</Link>
  <nav className="main-nav"><Link href="/critiques">Critiques</Link><Link href="/classements">Classements</Link><Link href="/retrospectives">Rétrospectives</Link><Link href="/actualites">Actualités</Link></nav>
</header>}
