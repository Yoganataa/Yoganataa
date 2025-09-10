import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "https://maps.google.com/?q=San+Francisco,+CA",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/example",
    username: "@example",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/example",
    username: "/in/example",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com/example",
    username: "@example",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">Let's Work Together</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Have a project in mind or just want to chat? I'd love to hear from you. Send me a message and I'll get back
            to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Send a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Get In Touch</h2>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon
                  const content = (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  )

                  return item.href ? (
                    <Link key={index} href={item.href} className="block">
                      {content}
                    </Link>
                  ) : (
                    <div key={index}>{content}</div>
                  )
                })}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-foreground">Connect With Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <Button key={index} variant="outline" size="lg" asChild>
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="hidden sm:inline">{social.username}</span>
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Availability Card */}
              <Card className="mt-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">Current Availability</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    I'm currently available for new projects and collaborations. Whether you need a full-stack
                    developer, consultant, or just want to discuss an idea, I'm here to help.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-foreground">Available for new projects</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-foreground">What's your typical response time?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I aim to respond to all inquiries within 24 hours during business days. For urgent matters, feel free
                  to mention it in your message.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Do you work with international clients?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I work with clients worldwide and am comfortable with different time zones and communication
                  preferences.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-foreground">What types of projects do you take on?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I work on web applications, mobile apps, e-commerce sites, and custom software solutions. Both
                  short-term and long-term projects are welcome.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Do you provide ongoing support?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Yes, I offer maintenance and support packages for projects I've developed. We can discuss the details
                  based on your specific needs.
                </p>
              </CardContent>
            </Card>
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
              <p className="text-muted-foreground mb-2">Thanks for visiting!</p>
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
