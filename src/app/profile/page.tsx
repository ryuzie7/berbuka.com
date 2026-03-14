'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { User, ChevronRight, Globe, PlusCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { StaggeredScrollReveal, ScrollRevealItem } from '@/components/motion';
import { springs } from '@/lib/animations';
import { useLocaleSwitch } from '@/hooks/useLocale';
import { locales, localeNames } from '@/i18n/config';

export default function ProfilePage() {
  const { switchLocale } = useLocaleSwitch();
  const currentLocale = useLocale();
  const t = useTranslations('profile');

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* User info - Fade in on load like hero section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.gentle}
        >
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={springs.snappy}
                className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <User className="h-7 w-7 text-primary" />
              </motion.div>
              <div>
                <h2 className="font-semibold text-lg">{t('communityMember')}</h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...springs.gentle, delay: 0.15 }}
                  className="text-sm text-muted-foreground"
                >
                  {t('welcome')}
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cards - Staggered scroll reveal */}
        <StaggeredScrollReveal staggerDelay={0.1} className="space-y-4">
          {/* Settings */}
          <ScrollRevealItem>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{t('settings')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Appearance */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">{t('appearance')}</label>
                  <ThemeToggle />
                </div>

                <Separator />

                {/* Language */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">{t('language')}</span>
                  </div>
                  <div className="flex gap-2">
                    {locales.map((locale) => (
                      <Button
                        key={locale}
                        variant={currentLocale === locale ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => switchLocale(locale)}
                        className="flex-1"
                      >
                        {localeNames[locale]}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollRevealItem>

          {/* Contribute */}
          <ScrollRevealItem>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{t('contribute')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/profile/submit-venue">
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={springs.snappy}
                    className="flex items-center justify-between py-2 cursor-pointer hover:bg-muted -mx-2 px-2 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={springs.snappy}
                      >
                        <PlusCircle className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-medium">{t('submitVenue')}</p>
                        <p className="text-xs text-muted-foreground">
                          {t('submitVenueDesc')}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          </ScrollRevealItem>

          {/* About */}
          <ScrollRevealItem>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{t('about')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{t('appName')}</span>
                  <Badge variant="secondary" className="text-xs">v0.1.0</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('appDesc')}
                </p>
              </CardContent>
            </Card>
          </ScrollRevealItem>
        </StaggeredScrollReveal>
      </div>
    </div>
  );
}
