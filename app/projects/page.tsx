"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star, GitFork } from "lucide-react"
import Link from "next/link"
import { useGitHubProjects } from "@/hooks/use-github-projects"

export default function ProjectsPage() {
  const { projects, isLoading: loading } = useGitHubProjects()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">My Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              A showcase of mobile applications I've crafted using Flutter, Swift, React Native, and Kotlin. Each
              project demonstrates innovative solutions for real-world mobile challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted rounded-t-lg"></div>
                    <div className="p-6">
                      <div className="h-6 bg-muted rounded mb-3"></div>
                      <div className="h-4 bg-muted rounded mb-4"></div>
                      <div className="flex gap-2 mb-6">
                        <div className="h-6 w-16 bg-muted rounded"></div>
                        <div className="h-6 w-20 bg-muted rounded"></div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 bg-muted rounded flex-1"></div>
                        <div className="h-8 w-12 bg-muted rounded"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                >
                  <CardContent className="p-0">
                    {/* Project Image */}
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg?height=300&width=400&query=mobile app interface"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

                      {(project.stars !== undefined || project.forks !== undefined) && (
                        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                          {project.stars !== undefined && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              <span>{project.stars}</span>
                            </div>
                          )}
                          {project.forks !== undefined && (
                            <div className="flex items-center gap-1">
                              <GitFork className="w-4 h-4" />
                              <span>{project.forks}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs font-medium">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Project Links */}
                      <div className="flex gap-3">
                        <Button size="sm" asChild className="flex-1">
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Interested in Working Together?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            I'm always open to discussing new opportunities and interesting projects. Let's create something amazing
            together.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">© 2024 Portfolio. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="mailto:hello@example.com" aria-label="Email">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://github.com" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
