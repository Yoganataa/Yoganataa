import { GitHubService, githubRepoToProject } from "./github-api"

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Yoganataa"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.ACCESS_TOKEN

const githubService = new GitHubService(GITHUB_USERNAME, GITHUB_TOKEN)

export async function fetchGitHubProjects() {
  try {
    const repos = await githubService.getFilteredRepositories({
      excludeForks: true,
      excludePrivate: false,
      minStars: 0,
      limit: 10,
    })

    const projectsWithLanguages = await Promise.all(
      repos.map(async (repo) => {
        try {
          const languages = await githubService.getRepositoryLanguages(repo.name)
          return githubRepoToProject(repo, languages)
        } catch (error) {
          console.warn(`Failed to fetch languages for ${repo.name}:`, error)
          return githubRepoToProject(repo)
        }
      }),
    )

    return projectsWithLanguages
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error)
    return getFallbackProjects()
  }
}

function getFallbackProjects() {
  return [
    {
      id: "1",
      title: "Fitness Tracking App",
      description:
        "A comprehensive fitness app with workout tracking, progress analytics, and social features built with Flutter.",
      image: "/fitness-tracking-app.png",
      technologies: ["Flutter", "Dart", "Firebase", "Health Kit"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/fitness-app",
      category: "Mobile Development",
      stars: 0,
      forks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      topics: [],
    },
    {
      id: "2",
      title: "E-Commerce Mobile App",
      description:
        "Native iOS shopping app with seamless checkout, push notifications, and AR product preview features.",
      image: "/ecommerce-mobile-app.png",
      technologies: ["Swift", "UIKit", "Core Data", "ARKit"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/ecommerce-ios",
      category: "Mobile Development",
      stars: 0,
      forks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      topics: [],
    },
    {
      id: "3",
      title: "Social Media Platform",
      description:
        "Cross-platform social app with real-time messaging, story features, and advanced media sharing capabilities.",
      image: "/social-media-mobile-app.jpg",
      technologies: ["React Native", "TypeScript", "Socket.io", "AWS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/social-app",
      category: "Mobile Development",
      stars: 0,
      forks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      topics: [],
    },
    {
      id: "4",
      title: "Banking & Finance App",
      description:
        "Secure mobile banking solution with biometric authentication, transaction history, and budget management tools.",
      image: "/banking-finance-mobile-app.jpg",
      technologies: ["Flutter", "Bloc", "Biometrics", "REST API"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/banking-app",
      category: "Mobile Development",
      stars: 0,
      forks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      topics: [],
    },
  ]
}

export const projects = getFallbackProjects()

export async function fetchGitHubProfile() {
  try {
    return await githubService.getUser()
  } catch (error) {
    console.error("Failed to fetch GitHub profile:", error)
    return null
  }
}
