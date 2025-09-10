import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, MapPin, Calendar, Award } from "lucide-react"
import Link from "next/link"

const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML5", "CSS3"],
  Backend: ["Node.js", "Python", "Express.js", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
  Mobile: ["React Native", "Flutter", "iOS", "Android"],
  "Tools & Others": ["Git", "Docker", "AWS", "Vercel", "Figma", "Adobe Creative Suite"],
}

const experience = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    location: "San Francisco, CA",
    description:
      "Lead development of scalable web applications serving 100K+ users. Architected microservices infrastructure and mentored junior developers.",
    achievements: ["Reduced page load times by 40%", "Led team of 5 developers", "Implemented CI/CD pipeline"],
  },
  {
    title: "Frontend Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    location: "New York, NY",
    description:
      "Developed responsive web applications using React and modern JavaScript. Collaborated with design teams to implement pixel-perfect UIs.",
    achievements: [
      "Built 15+ production applications",
      "Improved accessibility scores by 30%",
      "Reduced bundle size by 25%",
    ],
  },
  {
    title: "Junior Web Developer",
    company: "StartupXYZ",
    period: "2019 - 2020",
    location: "Austin, TX",
    description:
      "Started career building landing pages and small web applications. Gained experience in full-stack development and agile methodologies.",
    achievements: ["Completed 50+ client projects", "Learned 5 new technologies", "Contributed to open source"],
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="aspect-square max-w-md mx-auto bg-muted rounded-2xl overflow-hidden">
                <img
                  src="/professional-headshot.jpg"
                  alt="Professional headshot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">About Me</h1>
              <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>5+ Years Experience</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-pretty">
                I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that
                make a difference. I specialize in building scalable web applications with modern technologies and have
                a keen eye for user experience design.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or
                hiking in the beautiful California mountains. I believe in continuous learning and staying up-to-date
                with the latest industry trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category} className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Professional Experience</h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">{job.title}</h3>
                      <p className="text-primary font-medium mb-2">{job.company}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{job.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{job.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">Key Achievements:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-6">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-foreground">What Drives Me</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Innovation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Always exploring new technologies and approaches to solve complex problems in creative ways.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Quality</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Committed to writing clean, maintainable code and delivering exceptional user experiences.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Growth</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Continuous learning and helping others grow through mentorship and knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">© 2024 Portfolio. All rights reserved.</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Ready to work together?</p>
              <Button asChild variant="outline">
                <Link href="/contact">Let's Connect</Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
