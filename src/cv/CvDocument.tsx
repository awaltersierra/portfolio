import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import { education, experience } from '@/content/experience'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { skillGroups } from '@/content/skills'
import en from '@/i18n/locales/en.json'
import es from '@/i18n/locales/es.json'
import { localizeIn } from '@/lib/localize'
import type { Language, Localized } from '@/types/i18n'

// CV en formato estándar y legible por ATS: una columna, texto real, títulos convencionales.
// Helvetica es una fuente estándar de PDF (no se embebe) y cubre acentos, ñ, — y ·.

const labels = { es: es.cv, en: en.cv }

// Sin división de palabras con guion: los ATS pueden leer mal las palabras cortadas
Font.registerHyphenationCallback((word) => [word])

const ACCENT = '#4338ca'
const MUTED = '#475569'

const styles = StyleSheet.create({
  page: {
    paddingVertical: 34,
    paddingHorizontal: 44,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    lineHeight: 1.35,
    color: '#0f172a',
  },
  name: { fontSize: 22, lineHeight: 1.15, fontFamily: 'Helvetica-Bold' },
  role: { fontSize: 12, color: ACCENT, marginTop: 3 },
  contact: { marginTop: 4, color: MUTED, fontSize: 9 },
  link: { color: MUTED, textDecoration: 'none' },
  section: { marginTop: 11 },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: ACCENT,
    paddingBottom: 3,
    marginBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: '#cbd5e1',
  },
  paragraph: { marginBottom: 3 },
  entry: { marginBottom: 6 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  entryTitle: { fontFamily: 'Helvetica-Bold', flexShrink: 1, paddingRight: 8 },
  entryMeta: { color: MUTED },
  entrySub: { color: MUTED, fontSize: 9 },
  bold: { fontFamily: 'Helvetica-Bold' },
})

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      {/* El título no queda solo al pie de una página */}
      <Text style={styles.sectionTitle} minPresenceAhead={40}>
        {title}
      </Text>
      {children}
    </View>
  )
}

function Entry(props: { title: string; meta: string; sub?: string; children?: ReactNode }) {
  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>{props.title}</Text>
        <Text style={styles.entryMeta}>{props.meta}</Text>
      </View>
      {props.sub && <Text style={styles.entrySub}>{props.sub}</Text>}
      {props.children}
    </View>
  )
}

export function CvDocument({ language }: { language: Language }) {
  const l = localizeIn(language)
  const t = labels[language]
  const role = l(profile.role)
  const siteLabel = profile.siteUrl.replace(/^https:\/\//, '').replace(/\/$/, '')
  const githubLabel = profile.socials.github.replace(/^https:\/\//, '')
  const languages = profile.languages
    .map((lang: { name: Localized; level?: Localized }) =>
      lang.level ? `${l(lang.name)} (${l(lang.level)})` : l(lang.name),
    )
    .join(', ')

  return (
    <Document
      title={`${profile.name} — ${role}`}
      author={profile.name}
      subject={`${t.subject} — ${profile.name}`}
      keywords={skillGroups.flatMap((g) => g.items.filter((i) => typeof i === 'string')).join(', ')}
      language={language}
      creator={profile.siteUrl}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.contact}>
          <Link src={`mailto:${profile.email}`} style={styles.link}>
            {profile.email}
          </Link>
          {'  ·  '}
          <Link src={profile.siteUrl} style={styles.link}>
            {siteLabel}
          </Link>
          {'  ·  '}
          <Link src={profile.socials.github} style={styles.link}>
            {githubLabel}
          </Link>
        </Text>
        <Text style={styles.contact}>
          {t.citizenship}: {l(profile.citizenship)}
          {'  ·  '}
          {t.languages}: {languages}
        </Text>

        <Section title={t.summary}>
          {l(profile.bio).map((paragraph) => (
            <Text key={paragraph} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </Section>

        <Section title={t.experience}>
          {experience.map((item) => (
            <Entry
              key={item.id}
              title={l(item.role)}
              meta={`${item.start} — ${item.end ?? t.present}`}
              sub={[item.company, l(item.location)].filter(Boolean).join(' · ')}
            >
              <Text>{l(item.summary)}</Text>
              {item.highlights && l(item.highlights).map((h) => <Text key={h}>• {h}</Text>)}
            </Entry>
          ))}
        </Section>

        <Section title={t.projects}>
          {projects.map((project) => (
            <Entry
              key={project.slug}
              title={l(project.title)}
              meta={l(project.period)}
              sub={project.role && l(project.role)}
            >
              <Text>{l(project.summary)}</Text>
              <Text style={styles.entrySub}>
                {t.stack}: {project.stack.join(', ')}
              </Text>
            </Entry>
          ))}
        </Section>

        <Section title={t.skills}>
          {skillGroups.map((group) => (
            <Text key={group.id} style={styles.paragraph}>
              <Text style={styles.bold}>{l(group.title)}: </Text>
              {group.items.map((item) => l(item)).join(', ')}
            </Text>
          ))}
        </Section>

        <Section title={t.education}>
          {education.map((item) => (
            <Entry
              key={item.id}
              title={l(item.title)}
              meta={l(item.location)}
              sub={item.institution}
            />
          ))}
        </Section>
      </Page>
    </Document>
  )
}
