'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Info, Edit3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollReveal, StaggeredScrollReveal, ScrollRevealItem } from '@/components/motion';
import { springs } from '@/lib/animations';

export default function LandingPage() {
  const t = useTranslations('landing');

  const steps = [
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
    },
    {
      icon: <Info className="h-8 w-8 text-primary" />,
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
    },
    {
      icon: <Edit3 className="h-8 w-8 text-primary" />,
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
    },
  ];

  return (
    <div className="min-h-full flex flex-col">
      {/* Hero Section - Fade in on load */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center bg-gradient-to-b from-primary/10 to-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.gentle}
          className="max-w-md space-y-6"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('hero.title')}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...springs.gentle, delay: 0.15 }}
            className="text-muted-foreground text-lg"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springs.bouncy, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/map">
                {t('hero.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Steps Section - Stagger on scroll */}
      <section className="px-6 py-12 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-center mb-8">
              {t('steps.title')}
            </h2>
          </ScrollReveal>
          <StaggeredScrollReveal
            staggerDelay={0.15}
            className="grid gap-6 md:grid-cols-3"
          >
            {steps.map((step, index) => (
              <ScrollRevealItem key={index}>
                <Card className="text-center h-full">
                  <CardContent className="pt-6 space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={springs.snappy}
                      className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollRevealItem>
            ))}
          </StaggeredScrollReveal>
        </div>
      </section>

      {/* Tutorial Section - Fade in on scroll */}
      <ScrollReveal className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">
            {t('tutorial.title')}
          </h2>
          <div className="aspect-video rounded-2xl border-2 border-dashed border-primary/30 bg-muted/30 flex items-center justify-center">
            <p className="text-muted-foreground text-center px-4">
              {t('tutorial.placeholder')}
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
