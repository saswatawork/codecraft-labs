import { Button } from "@ccl/ui";
import { Badge } from "@ccl/ui";
import { Input } from "@ccl/ui";
import { Github, Mail, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center py-20">
          <Badge variant="secondary" className="mb-6">
            Portfolio & Component Library
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome to{" "}
            <span className="text-primary">CodeCraft Labs</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A modern monorepo showcasing enterprise-grade React components, 
            Next.js applications, and cutting-edge development practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto">
              <Github className="mr-2 h-4 w-4" />
              View Components
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </div>
        </section>

        {/* Demo Section */}
        <section className="max-w-4xl mx-auto py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Component Demo
          </h2>
          
          <div className="bg-card border rounded-lg p-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Try our Input component:
                </label>
                <Input 
                  type="email" 
                  placeholder="Enter your email..." 
                  className="max-w-sm"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge>TypeScript</Badge>
                <Badge variant="secondary">React 19</Badge>
                <Badge variant="outline">Tailwind</Badge>
                <Badge variant="destructive">Vitest</Badge>
              </div>
              
              <div className="flex gap-3">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-2xl mx-auto text-center py-20">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            Interested in the components or want to collaborate? 
            Let&apos;s connect!
          </p>
          
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Email Me
            </Button>
            <Button variant="outline" size="sm">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
