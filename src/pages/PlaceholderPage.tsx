interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-base-300 dark:border-base-700 bg-white dark:bg-base-800 p-10 shadow-card">
      <h2 className="text-xl font-semibold text-base-900 dark:text-base-100">{title}</h2>
      <p className="mt-2 text-sm text-base-500">
        This section is ready for your custom content. Keep the layout consistent with the dashboard.
      </p>
    </div>
  );
};

export default PlaceholderPage;
