import { useI18n } from '../contexts/I18nContext';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  const { t } = useI18n();
  return (
    <div className="card-shell border border-dashed border-base-300 dark:border-base-700 bg-white dark:bg-base-800 p-10 density-pad shadow-card density-pad">
      <h2 className="text-xl font-semibold text-base-900 dark:text-base-100">{title}</h2>
      <p className="mt-2 text-sm text-base-500">{t('placeholder.body')}</p>
    </div>
  );
};

export default PlaceholderPage;
