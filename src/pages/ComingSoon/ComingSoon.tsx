import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const ComingSoon: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-12">
          <h1 className="mb-3 text-5xl font-semibold tracking-tight text-neutral-900">
            {t('landing.product_name')}
          </h1>
          <p className="text-xl font-normal text-neutral-600">
            {t('landing.tagline')}
          </p>
        </div>

        <div className="mb-16">
          <p className="mx-auto max-w-xl text-base leading-relaxed text-neutral-500">
            {t('landing.description')}
          </p>
        </div>

        <div className="mx-auto max-w-md rounded-xl border border-neutral-100 bg-neutral-50 p-10 shadow-sm">
          <p className="mb-6 text-sm font-medium text-neutral-700">
            {t('landing.launch_message')}
          </p>
          <div className="space-y-3">
            <Input
              type="email"
              placeholder={t('common.email_placeholder')}
              fullWidth
            />
            <Button variant="primary" fullWidth>
              {t('common.notify_me')}
            </Button>
          </div>
          <p className="mt-5 text-xs text-neutral-400">
            {t('landing.privacy_notice')}
          </p>
        </div>

        <div className="mt-12 text-xs font-medium uppercase tracking-wider text-neutral-300">
          {t('common.coming_soon')}
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
