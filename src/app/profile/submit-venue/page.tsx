'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { VenueType } from '@/types';

const FACILITY_OPTIONS = [
  'Parking',
  'Ablution Facilities',
  'Air Conditioning',
  'Wheelchair Access',
  'Prayer Area',
  'ATM Nearby',
  'Fan Cooling',
  'Library',
  'Food Court Seating',
];

interface FormErrors {
  name?: string;
  address?: string;
  description?: string;
}

export default function SubmitVenuePage() {
  const t = useTranslations('submitVenue');
  const tv = useTranslations('venue');
  const [name, setName] = useState('');
  const [type, setType] = useState<VenueType>('masjid');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [facilities, setFacilities] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const toggleFacility = (facility: string) => {
    setFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = t('errors.nameRequired');
    if (!address.trim()) newErrors.address = t('errors.addressRequired');
    if (!description.trim()) newErrors.description = t('errors.descriptionRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(t('success'));

    setName('');
    setType('masjid');
    setAddress('');
    setDescription('');
    setContactNumber('');
    setFacilities([]);
    setErrors({});
    setSubmitting(false);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{t('title')}</h1>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t('details')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="venue-name">{t('name')} *</Label>
                <Input
                  id="venue-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t('type')}</Label>
                <Select value={type} onValueChange={(v) => setType(v as VenueType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masjid">{tv('masjid')}</SelectItem>
                    <SelectItem value="surau">{tv('surau')}</SelectItem>
                    <SelectItem value="bazaar">{tv('bazaar')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue-address">{t('address')} *</Label>
                <Input
                  id="venue-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t('addressPlaceholder')}
                  className={errors.address ? 'border-destructive' : ''}
                />
                {errors.address && (
                  <p className="text-xs text-destructive">{errors.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue-desc">{t('description')} *</Label>
                <Textarea
                  id="venue-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('descriptionPlaceholder')}
                  rows={3}
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-xs text-destructive">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue-contact">{t('contact')}</Label>
                <Input
                  id="venue-contact"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder={t('contactPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label>{t('facilities')}</Label>
                <div className="flex flex-wrap gap-2">
                  {FACILITY_OPTIONS.map((facility) => (
                    <Button
                      key={facility}
                      type="button"
                      variant={facilities.includes(facility) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleFacility(facility)}
                      className="rounded-full text-xs"
                    >
                      {facility}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? t('submitting') : t('submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
