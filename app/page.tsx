import Image from 'next/image'
import Link from 'next/link'
import {getReviews} from '@/lib/content'
import {urlFor} from '@/lib/sanity'

export default async function Home(){
 const reviews=await getReviews(); const lead=reviews[0]
 const image=lead.mainImage ? urlFor(lead.mainImage).width(1000).height(1400).url() : '/new-religion.jpg'
 return <>
 <section className="hero"><article className="hero-feature"><div className="hero-poster"><Image src={image} alt={`Affiche de ${lead.filmTitle}`} fill priority sizes="(max-width: 800px) 100vw, 55vw"/></div><div className="hero-copy"><div className="eyebrow"><span>CRITIQUE</span><span>{new Date(lead.publishedAt).toLocaleDateString('fr-CH')}</span></div><h1>{lead.articleTitle}</h1><p className="dek"><em>{lead.filmTitle}</em> — {lead.excerpt}</p><div className="hero-footer"><Link className="read-link" href={`/critique/${lead.slug}`}>Lire la critique ↗</Link><div className="rating"><strong>{lead.rating}</strong><span>/10</span></div></div></div></article><aside className="hero-side"><p className="manifesto">Un journal de cinéma subjectif, sentimental et parfois de mauvaise foi.</p><div className="side-card"><div className="visual-red">02</div><div><span className="tag">RÉTROSPECTIVE</span><h2>Le mal est dans la maison</h2><p>Revoir <em>Evil Dead</em>, du bricolage fiévreux à la mythologie.</p></div></div></aside></section>
 <section className="ticker"><div>À LA UNE — CINÉMA D’HORREUR — JOURNAL DE FESTIVAL — FILMS QUI RESTENT —</div></section>
 <section className="latest"><div className="section-head"><div><span>01</span><h2>Dernières critiques</h2></div><Link href="/critiques">Toutes les critiques ({String(reviews.length).padStart(2,'0')})</Link></div><div className="cards">{reviews.map((r,i)=><Link className="story" href={`/critique/${r.slug}`} key={r._id}><span className="index">{String(i+1).padStart(2,'0')}</span><div className="story-meta"><span>CRITIQUE</span><span>{r.rating}/10</span></div><h3>{r.filmTitle} — {r.articleTitle}</h3><p>{r.excerpt}</p></Link>)}</div></section>
 <section className="ranking"><div className="ranking-title"><span>CLASSEMENT — JUILLET</span><h2>Les films qui<br/><em>restent.</em></h2></div><ol><li><span>01</span><b>Les Parapluies de Cherbourg</b><span>1964</span><span>10</span></li><li><span>02</span><b>Oldboy</b><span>2003</span><span>10</span></li><li><span>03</span><b>Dancer in the Dark</b><span>2000</span><span>9.5</span></li></ol></section>
 </>}
