const toolsIconsMap = {
  Lua: 'simple-icons:lua',
  'Roblox Studio': 'simple-icons:roblox',
  Java: 'simple-icons:openjdk',
  Eclipse: 'simple-icons:eclipseide',
  HTML: 'simple-icons:html5',
  CSS: 'simple-icons:css',
  VSCode: 'simple-icons:visualstudiocode',
  Blender: 'simple-icons:blender',
  Maya: 'simple-icons:autodeskmaya',
}

const toolIconColorsMap = {
  Lua: '#2C2D72',
  'Roblox Studio': '#000000',
  Java: '#ED8B00',
  Eclipse: '#2C2255',
  HTML: '#E34F26',
  CSS: '#1572B6',
  VSCode: '#007ACC',
  Blender: '#E87D0D',
  Maya: '#37A5CC',
}

const projectInfoModules = import.meta.glob('../assets/ProjectInfo/*.json', {
  eager: true,
  import: 'default',
})

const projectResourceModules = import.meta.glob(
  '../assets/ProjectResources/**/*.{png,jpg,jpeg,webp,gif,svg}',
  {
    eager: true,
    import: 'default',
  },
)

const resourceMap = new Map()

Object.entries(projectResourceModules).forEach(([modulePath, resolvedUrl]) => {
  const marker = '/ProjectResources/'
  const markerIndex = modulePath.indexOf(marker)

  if (markerIndex === -1) {
    return
  }

  const relativeResourcePath = modulePath.slice(markerIndex + marker.length)
  resourceMap.set(relativeResourcePath, resolvedUrl)
  resourceMap.set(`resources/${relativeResourcePath}`, resolvedUrl)
  resourceMap.set(`ProjectResources/${relativeResourcePath}`, resolvedUrl)
})

const projectInfoMap = new Map()

Object.entries(projectInfoModules).forEach(([modulePath, json]) => {
  const fileName = modulePath.split('/').pop() || ''
  const projectId = fileName.replace('.json', '')
  projectInfoMap.set(projectId, json)
})

export function getToolIconId(tool) {
  const normalized = String(tool || '').toLowerCase().replace(/\s+/g, '')
  return toolsIconsMap[tool] || `simple-icons:${normalized}`
}

export function getToolIconColor(tool) {
  return toolIconColorsMap[tool] || '#9ad1ff'
}

export function getToolIconName(tool) {
  return getToolIconId(tool)
}

function normalizeResourcePath(path) {
  return path.replace(/\\/g, '/').replace(/^\.?\//, '')
}

export function resolveProjectResourcePath(path) {
  if (!path) {
    return ''
  }

  if (path.startsWith('http')) {
    return path
  }

  const normalized = normalizeResourcePath(path)
  return resourceMap.get(normalized) || path
}

function resolveProjectData(projectData) {
  if (!projectData) {
    return null
  }

  const showcase = Array.isArray(projectData.showcase)
    ? projectData.showcase
    : projectData.showcase
      ? [projectData.showcase]
      : []

  return {
    ...projectData,
    thumbnail: resolveProjectResourcePath(projectData.thumbnail),
    showcase: showcase.map((item) => ({
      ...item,
      image: resolveProjectResourcePath(item.image),
    })),
  }
}

export function getProjectIndex() {
  const indexData = projectInfoMap.get('index')
  return Array.isArray(indexData?.projects) ? indexData.projects : []
}

export function getProjectById(projectId) {
  return resolveProjectData(projectInfoMap.get(projectId))
}

export function getAllProjects() {
  return Array.from(projectInfoMap.keys())
    .filter((id) => id !== 'index')
    .map((projectId) => ({
      projectId,
      projectData: getProjectById(projectId),
    }))
    .filter((project) => Boolean(project.projectData))
}

export function getProjectsBySection(section) {
  return getAllProjects().filter(({ projectData }) => projectData.section === section)
}
