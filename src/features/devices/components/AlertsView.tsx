import { useTranslation } from 'react-i18next';

export function AlertsView() {
  const { t } = useTranslation();
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('devices.alerts')}</h2>
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">{t('devices.noAlerts')}</p>
      </div>
    </div>
  );
}
