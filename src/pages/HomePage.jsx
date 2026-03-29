import { useMemo } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { getProjectsBySection, getToolIconColor, getToolIconId } from '../utils/projectData'

const languageIcons = [
  'simple-icons:openjdk',
  'simple-icons:cplusplus',
  'simple-icons:csharp',
  'simple-icons:python',
  'simple-icons:javascript',
  'simple-icons:lua',
  'simple-icons:mysql',
]

const softwareIcons = [
  'simple-icons:visualstudiocode',
  'simple-icons:visualstudio',
  'simple-icons:eclipseide',
  'simple-icons:unity',
  'simple-icons:roblox',
  'simple-icons:blender',
  'simple-icons:autodeskmaya',
  'simple-icons:autodesk',
]

const otherIcons = [
  'simple-icons:discord',
  'simple-icons:git',
  'simple-icons:github',
  'simple-icons:mongodb',
  'simple-icons:express',
  'simple-icons:flask',
  'simple-icons:html5',
  'simple-icons:css',
  'simple-icons:dotnet',
  'simple-icons:windows',
  'simple-icons:linux',
]

const iconColors = {
  'simple-icons:openjdk': '#ED8B00',
  'simple-icons:cplusplus': '#00599C',
  'simple-icons:csharp': '#512BD4',
  'simple-icons:python': '#3776AB',
  'simple-icons:javascript': '#F7DF1E',
  'simple-icons:lua': '#2C2D72',
  'simple-icons:mysql': '#4479A1',
  'simple-icons:visualstudiocode': '#007ACC',
  'simple-icons:visualstudio': '#5C2D91',
  'simple-icons:eclipseide': '#2C2255',
  'simple-icons:unity': '#FFFFFF',
  'simple-icons:roblox': '#000000',
  'simple-icons:discord': '#5865F2',
  'simple-icons:git': '#F05032',
  'simple-icons:github': '#FFFFFF',
  'simple-icons:mongodb': '#47A248',
  'simple-icons:express': '#FFFFFF',
  'simple-icons:flask': '#FFFFFF',
  'simple-icons:html5': '#E34F26',
  'simple-icons:css': '#1572B6',
  'simple-icons:dotnet': '#512BD4',
  'simple-icons:windows': '#0078D4',
  'simple-icons:linux': '#FCC624',
  'simple-icons:blender': '#E87D0D',
  'simple-icons:autodeskmaya': '#37A5CC',
  'simple-icons:autodesk': '#0696D7',
}

function getIconColor(iconId) {
  return iconColors[iconId] || '#9ad1ff'
}

const iconDisplayNames = {
  'simple-icons:openjdk': 'Java',
  'simple-icons:cplusplus': 'C++',
  'simple-icons:csharp': 'C#',
  'simple-icons:python': 'Python',
  'simple-icons:javascript': 'JavaScript',
  'simple-icons:lua': 'Lua',
  'simple-icons:mysql': 'MySQL',
  'simple-icons:visualstudiocode': 'VS Code',
  'simple-icons:visualstudio': 'Visual Studio',
  'simple-icons:eclipseide': 'Eclipse',
  'simple-icons:unity': 'Unity',
  'simple-icons:roblox': 'Roblox Studio',
  'simple-icons:blender': 'Blender',
  'simple-icons:autodeskmaya': 'Maya',
  'simple-icons:autodesk': 'Mudbox',
  'simple-icons:discord': 'Discord',
  'simple-icons:git': 'Git',
  'simple-icons:github': 'GitHub',
  'simple-icons:mongodb': 'MongoDB',
  'simple-icons:express': 'Express',
  'simple-icons:flask': 'Flask',
  'simple-icons:html5': 'HTML',
  'simple-icons:css': 'CSS',
  'simple-icons:dotnet': '.NET',
  'simple-icons:windows': 'Windows',
  'simple-icons:linux': 'Linux',
}

function getIconName(iconId) {
  return iconDisplayNames[iconId] || iconId.replace('simple-icons:', '')
}

function IconRow({ icons, label }) {
  return (
    <div className="used_skills used_skills_wrap" aria-label={label}>
      {icons.map((iconId) => (
        <span key={iconId} className="used_skill_chip" data-tooltip={getIconName(iconId)}>
          <Icon icon={iconId} className="used_skill_icon" style={{ color: getIconColor(iconId) }} aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}

function ProjectCard({ projectId, projectData }) {
  const title = projectData.title || projectId
  const description = projectData.descriptions || ''
  const previewImage = projectData.thumbnail || projectData.background
  const tools = Array.isArray(projectData.tools) ? projectData.tools : []
  const links = Array.isArray(projectData.links) ? projectData.links : []
  const toolIcons = tools.map((tool) => ({ tool, iconId: getToolIconId(tool) }))

  return (
    <article className="project_card">
      <Link to={`/project/${projectId}`}>
        <img className="project_image" src={previewImage} alt={title} />
      </Link>
      <div>
        <Link to={`/project/${projectId}`} className="project_title_link">
          <p className="project_title">{title}</p>
        </Link>
        <p className="project_description">{description}</p>
        <div className="project_card_footer">
          <div className="project_links_wrap">
            {links.map(([label, url]) => (
              <a key={`${projectId}-${label}`} className="project_links" href={url} target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
          </div>
          {toolIcons.length ? (
            <div className="used_skills" aria-label={`${title} tools`}>
              {toolIcons.map(({ tool, iconId }) => (
                <span key={`${projectId}-${tool}`} className="used_skill_chip" data-tooltip={tool}>
                  <Icon icon={iconId} className="used_skill_icon" style={{ color: getToolIconColor(tool) }} title={tool} />
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function HomePage() {
  const computerScienceProjects = useMemo(() => getProjectsBySection('cs'), [])
  const digitalArtProjects = useMemo(() => getProjectsBySection('da'), [])

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <nav className="nav_bar">
        <div>
          <Link
            to="/"
            className="name name_link"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Thomas Lamoureux
          </Link>
        </div>
        <div className="nav_links" role="navigation" aria-label="Main sections">
          <button type="button" className="page_linker_00" onClick={() => scrollToSection('contact_info')}>
            Contact
          </button>
          <button type="button" className="page_linker_00" onClick={() => scrollToSection('projects')}>
            Projects
          </button>
          <button type="button" className="page_linker_00" onClick={() => scrollToSection('about')}>
            About
          </button>
        </div>
      </nav>

      <header id="about">About Me</header>

      <section className="about_skills_section section_frame">
        <div>
          <h1>About Me</h1>
          <p id="about_me">
            Student at Stetson University, pursuing a degree in Computer Science and Digital Arts.
            <br />
            <br />
            You can view some of my works on this site, take a look around.
            <br />
            <br />
            Click on a project image or title to view more details.
          </p>
        </div>

        <div>
          <h1>Skills</h1>
          <label>Languages</label>
          <IconRow icons={languageIcons} label="Languages" />
          <label>Software</label>
          <IconRow icons={softwareIcons} label="Software" />
          <label>Other</label>
          <IconRow icons={otherIcons} label="Other skills" />
        </div>
      </section>

      <header id="projects">Computer Science Projects</header>
      <section className="projects section_frame" aria-live="polite">
        {computerScienceProjects.map(({ projectId, projectData }) => (
          <ProjectCard key={projectId} projectId={projectId} projectData={projectData} />
        ))}
      </section>

      <header id="digital_arts_projects">Digital Arts Projects</header>
      <section className="projects section_frame" aria-live="polite">
        {digitalArtProjects.map(({ projectId, projectData }) => (
          <ProjectCard key={projectId} projectId={projectId} projectData={projectData} />
        ))}
      </section>

      <header id="contact_info" className="contact_header">
        Contact
      </header>
      <section className="contacts section_frame contact_frame">
        <a href="https://www.linkedin.com/in/t-lamoureux/" className="contact" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="mailto:thomasglamoureux@gmail.com" className="contact">
          thomasglamoureux@gmail.com
        </a>
      </section>
    </>
  )
}

export default HomePage
