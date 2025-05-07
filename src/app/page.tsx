import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, ClipboardList, Building2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-12">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-br from-primary/10 via-background to-background rounded-xl shadow-lg">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
            Welcome to AbujaRide
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Digitizing passenger manifests and enhancing transportation management for a safer, more efficient Abuja.
          </p>
          <div className="mt-8 space-x-4">
            <Button size="lg" asChild>
              <Link href="/register">Register Your Company</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/emergency/report">Report an Emergency</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl space-y-8">
        <h2 className="text-3xl font-bold text-center text-foreground">Key Features</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Building2 className="h-10 w-10 text-primary" />}
            title="Company Registration"
            description="Transport companies can easily create and manage their accounts online."
          />
          <FeatureCard
            icon={<ClipboardList className="h-10 w-10 text-primary" />}
            title="Departure Logging"
            description="Log vehicle departures and passenger biodata efficiently for each trip."
          />
          <FeatureCard
            icon={<AlertTriangle className="h-10 w-10 text-accent" />}
            title="Emergency Reporting"
            description="Quickly report accidents, breakdowns, or other emergencies for swift response."
          />
          <FeatureCard
            icon={<CheckCircle className="h-10 w-10 text-primary" />}
            title="Improved Record-Keeping"
            description="Digital records for regulatory compliance and easy passenger lookup."
          />
           <FeatureCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/><path d="M12 6v6l4 2"/></svg>}
            title="Faster Emergency Response"
            description="Timely alerts enable quicker action from authorities and GTE administrators."
          />
          <FeatureCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
            title="Transparent Payments"
            description="Automated fee calculation and digital payment tracking for transport companies."
          />
        </div>
      </section>

      {/* Placeholder Image Section */}
      <section className="w-full max-w-5xl">
         <Card className="overflow-hidden shadow-lg">
            <Image
                src="https://picsum.photos/1200/400"
                alt="Abuja transportation"
                width={1200}
                height={400}
                className="w-full object-cover"
                data-ai-hint="abuja city skyline"
            />
         </Card>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center">
        {icon}
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
