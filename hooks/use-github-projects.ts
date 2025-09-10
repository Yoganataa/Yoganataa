"use client"

import { useState, useEffect } from "react"
import { fetchGitHubProjects, projects } from "@/lib/projects-data"

export function useGitHubProjects() {
  const [githubProjects, setGithubProjects] = useState(projects)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGitHubProjects = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const fetchedProjects = await fetchGitHubProjects()
        setGithubProjects(fetchedProjects)
      } catch (err) {
        console.error("Failed to load GitHub projects:", err)
        setError("Failed to load projects")
        // Keep fallback projects on error
      } finally {
        setIsLoading(false)
      }
    }

    loadGitHubProjects()
  }, [])

  return { projects: githubProjects, isLoading, error }
}
