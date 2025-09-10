export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  languages_url: string
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  topics: string[]
  private: boolean
}

export interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  location: string | null
  blog: string | null
  company: string | null
}

const GITHUB_API_BASE = "https://api.github.com"

export class GitHubService {
  private username: string
  private token?: string

  constructor(username: string, token?: string) {
    this.username = username
    this.token = token
  }

  private async fetchWithAuth(url: string) {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-Website",
    }

    if (this.token) {
      headers["Authorization"] = `token ${this.token}`
    }

    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getUser(): Promise<GitHubUser> {
    return this.fetchWithAuth(`${GITHUB_API_BASE}/users/${this.username}`)
  }

  async getRepositories(
    options: {
      sort?: "created" | "updated" | "pushed" | "full_name"
      direction?: "asc" | "desc"
      per_page?: number
      type?: "all" | "owner" | "member"
    } = {},
  ): Promise<GitHubRepo[]> {
    const params = new URLSearchParams({
      sort: options.sort || "updated",
      direction: options.direction || "desc",
      per_page: (options.per_page || 30).toString(),
      type: options.type || "owner",
    })

    return this.fetchWithAuth(`${GITHUB_API_BASE}/users/${this.username}/repos?${params}`)
  }

  async getRepositoryLanguages(repo: string): Promise<Record<string, number>> {
    return this.fetchWithAuth(`${GITHUB_API_BASE}/repos/${this.username}/${repo}/languages`)
  }

  async getFilteredRepositories(
    options: {
      excludeForks?: boolean
      excludePrivate?: boolean
      minStars?: number
      languages?: string[]
      topics?: string[]
      limit?: number
    } = {},
  ): Promise<GitHubRepo[]> {
    let repos = await this.getRepositories({ per_page: 100 })

    // Apply filters
    if (options.excludeForks) {
      repos = repos.filter((repo) => !repo.name.includes("fork"))
    }

    if (options.excludePrivate) {
      repos = repos.filter((repo) => !repo.private)
    }

    if (options.minStars && options.minStars > 0) {
      repos = repos.filter((repo) => repo.stargazers_count >= options.minStars)
    }

    if (options.languages && options.languages.length > 0) {
      repos = repos.filter((repo) => repo.language && options.languages!.includes(repo.language))
    }

    if (options.topics && options.topics.length > 0) {
      repos = repos.filter((repo) => repo.topics.some((topic) => options.topics!.includes(topic)))
    }

    // Sort by stars and recent activity
    repos.sort((a, b) => {
      const aScore = a.stargazers_count * 2 + new Date(a.updated_at).getTime() / 1000000000
      const bScore = b.stargazers_count * 2 + new Date(b.updated_at).getTime() / 1000000000
      return bScore - aScore
    })

    return options.limit ? repos.slice(0, options.limit) : repos
  }
}

export function githubRepoToProject(repo: GitHubRepo, languages: Record<string, number> = {}) {
  const languageList = Object.keys(languages).slice(0, 5) // Top 5 languages

  return {
    id: repo.id.toString(),
    title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description: repo.description || "No description available",
    image: `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(repo.name + " project")}`,
    technologies: languageList.length > 0 ? languageList : [repo.language || "Code"],
    category: repo.language || "Project",
    liveUrl: repo.homepage || repo.html_url,
    githubUrl: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    topics: repo.topics,
  }
}
