"use client"

import { Navigation } from "@/components/navigation"
import { TypingAnimation } from "@/components/typing-animation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Star, GitFork } from "lucide-react"
import Link from "next/link"
import { useGitHubProjects } from "@/hooks/use-github-projects"

export default function HomePage() {
  const { projects: githubProjects, isLoading } = useGitHubProjects()

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("featured-work")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const featuredProjects = githubProjects.slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">Yoganata</h1>
          <div className="mb-8">
            <TypingAnimation />
          </div>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty">
            Crafting intuitive and elegant mobile and website experiences through innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-medium text-lg px-8 py-4" onClick={scrollToProjects}>
              View Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" asChild className="font-medium bg-transparent text-lg px-8 py-4">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section id="featured-work" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Featured Work</h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted rounded-t-lg"></div>
                    <div className="p-6">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-4"></div>
                      <div className="flex gap-2 mb-4">
                        <div className="h-6 w-16 bg-muted rounded"></div>
                        <div className="h-6 w-16 bg-muted rounded"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {featuredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg?height=300&width=400&query=mobile app interface"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-foreground">{project.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {(project.stars > 0 || project.forks > 0) && (
                        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                          {project.stars > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              <span>{project.stars}</span>
                            </div>
                          )}
                          {project.forks > 0 && (
                            <div className="flex items-center gap-1">
                              <GitFork className="h-3 w-3" />
                              <span>{project.forks}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-medium text-primary">
                          <Link href="/projects">
                            View Details <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick About */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">About</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Passionate about creating meaningful digital experiences through thoughtful design and clean, efficient
            code. Always learning and exploring new technologies.
          </p>
          <Button asChild variant="outline">
            <Link href="/about">Learn More About Me</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">© 2025 Yoganata. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="mailto:hello@example.com" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://github.com" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://linkedin.com" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
