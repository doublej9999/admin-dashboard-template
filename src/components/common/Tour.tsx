import { useState } from 'react';
import { useI18n } from '../../contexts/useI18n';
import type { translations } from '../../i18n/translations';

type TranslationKey = keyof typeof translations;

const steps: Array<{ id: string; titleKey: TranslationKey; bodyKey: TranslationKey }> = [
  { id: 'step-1', titleKey: 'tour.step1Title', bodyKey: 'tour.step1Body' },
  { id: 'step-2', titleKey: 'tour.step2Title', bodyKey: 'tour.step2Body' },
  { id: 'step-3', titleKey: 'tour.step3Title', bodyKey: 'tour.step3Body' },
];

const Tour = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(() => !localStorage.getItem('tour-dismissed'));
  const [index, setIndex] = useState(0);

  if (!open) return null;

  const step = steps[index];
  const isLast = index === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
      <div className="card-shell bg-white dark:bg-base-800 border border-base-200 dark:border-base-700 p-6 shadow-card density-pad w-full max-w-md">
        <div className="text-xs uppercase text-base-400">{t('tour.label')}</div>
        <h3 className="mt-2 text-lg font-semibold text-base-900 dark:text-base-100">
          {t(step.titleKey)}
        </h3>
        <p className="mt-2 text-sm text-base-500">{t(step.bodyKey)}</p>
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => {
              localStorage.setItem('tour-dismissed', '1');
              setOpen(false);
            }}
            className="text-sm text-base-500"
          >
            {t('tour.skip')}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-base-400">
              {t('tour.stepCount', { current: index + 1, total: steps.length })}
            </span>
            <button
              onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
              disabled={index === 0}
              className="rounded-xl border border-base-200 dark:border-base-700 px-3 py-1 text-xs disabled:opacity-50"
            >
              {t('tour.prev')}
            </button>
            <button
              onClick={() => {
                if (isLast) {
                  localStorage.setItem('tour-dismissed', '1');
                  setOpen(false);
                } else {
                  setIndex((prev) => Math.min(prev + 1, steps.length - 1));
                }
              }}
              className="rounded-xl bg-brand-500 px-3 py-1 text-xs text-white"
            >
              {isLast ? t('tour.finish') : t('tour.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
