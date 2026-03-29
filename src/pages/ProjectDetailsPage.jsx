import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Link, useParams } from 'react-router-dom'
import { getProjectById, getToolIconColor, getToolIconId } from '../utils/projectData'

function ProjectDetailsPage() {
  const { projectId = '' } = useParams()
  const projectData = getProjectById(projectId)

  if (!projectData) {
    return (
      <div className="single_page_message">
        <p className="status_message error_message">Project not found</p>
        <Link className="project_links" to="/">
          Back to Home
        </Link>
      </div>
    )
  }

  const tools = Array.isArray(projectData.tools) ? projectData.tools : []
  const links = Array.isArray(projectData.links) ? projectData.links : []
  const additionalFields = projectData.additionalFields && typeof projectData.additionalFields === 'object'
    ? Object.entries(projectData.additionalFields).filter(([, values]) => Array.isArray(values) && values.length > 0)
    : []
  const infoPanels = [{ title: 'Tools', values: tools, isTools: true }, ...additionalFields.map(([title, values]) => ({ title, values, isTools: false }))]
  const showcase = Array.isArray(projectData.showcase) ? projectData.showcase : []
  const showcaseEntries = showcase.map((item, index) => ({ item, index }))
  const leftShowcase = showcaseEntries.filter(({ index }) => index % 2 === 0)
  const rightShowcase = showcaseEntries.filter(({ index }) => index % 2 !== 0)
  const [lightboxSrc, setLightboxSrc] = useState(null)

  return (
    <>
      <nav className="nav_bar">
        <div>
          <Link to="/" className="name name_link">
            Thomas Lamoureux
          </Link>
        </div>
        <div className="nav_links" role="navigation" aria-label="Project page navigation">
          <Link to="/" className="page_linker_00 home_link">
            Home
          </Link>
        </div>
      </nav>

      <main className="project_page">
        <header id="title">{projectData.title}</header>

        <section className="project_focused section_frame">
          <div>
            <p className="project_title">{projectData.title}</p>
            <p className="project_description">{projectData.descriptions}</p>

            <div className="roles_software_members section_frame roles_frame">
              {infoPanels.map((panel, panelIndex) => (
                <div key={panel.title} className={`role_panel${panelIndex < infoPanels.length - 1 ? ' panel_divider' : ''}`}>
                  <h2>{panel.title}</h2>
                  {panel.isTools ? (
                    panel.values.map((tool) => (
                      <p key={tool}>
                        <span className="used_skill_chip tool_line_chip" data-tooltip={tool}>
                          <Icon icon={getToolIconId(tool)} className="tool_line_icon" style={{ color: getToolIconColor(tool) }} aria-hidden="true" />
                        </span>
                        {tool}
                      </p>
                    ))
                  ) : (
                    <div className="additional_field_values">
                      {panel.values.map((value, valueIndex) => (
                        <span key={`${panel.title}-${valueIndex}`} className="additional_value">{value}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="project_links_wrap detail_links_wrap">
              {links.map(([label, url]) => (
                <a key={`${projectId}-${label}`} className="project_links" href={url} target="_blank" rel="noreferrer">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {showcase.length ? (
          <>
            <header id="showcase">Project Showcase</header>
            <section className="showcase_container section_frame">
              <div className="showcase_column">
                {leftShowcase.map(({ item, index }) => {
                  const title = item.title || ''
                  const description = item.description || ''
                  const hasText = title || description

                  return (
                    <div key={`${projectId}-showcase-${index}`} className="showcase_item">
                      <div
                        className={`showcase_image${item.crop === false ? ' no_crop' : ''}`}
                        onClick={() => setLightboxSrc(item.image)}
                        style={{ cursor: 'zoom-in' }}
                      >
                        <img src={item.image} alt={title || `Showcase ${index + 1}`} />
                        {hasText ? (
                          <div className="showcase_overlay">
                            {title ? <h3>{title}</h3> : null}
                            {description ? <p>{description}</p> : null}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="showcase_column">
                {rightShowcase.map(({ item, index }) => {
                  const title = item.title || ''
                  const description = item.description || ''
                  const hasText = title || description

                  return (
                    <div key={`${projectId}-showcase-${index}`} className="showcase_item">
                      <div
                        className={`showcase_image${item.crop === false ? ' no_crop' : ''}`}
                        onClick={() => setLightboxSrc(item.image)}
                        style={{ cursor: 'zoom-in' }}
                      >
                        <img src={item.image} alt={title || `Showcase ${index + 1}`} />
                        {hasText ? (
                          <div className="showcase_overlay">
                            {title ? <h3>{title}</h3> : null}
                            {description ? <p>{description}</p> : null}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </>
        ) : null}
      </main>

      {lightboxSrc ? (
        <div className="lightbox_overlay" onClick={() => setLightboxSrc(null)}>
          <img className="lightbox_image" src={lightboxSrc} alt="Full size preview" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox_close" onClick={() => setLightboxSrc(null)} aria-label="Close image">&times;</button>
        </div>
      ) : null}
    </>
  )
}

export default ProjectDetailsPage
