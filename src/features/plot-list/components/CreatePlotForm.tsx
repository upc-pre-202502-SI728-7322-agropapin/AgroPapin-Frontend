import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FieldService } from '../../../services/field';
import { PlotService } from '../../../services/plot';
import { PlotModal } from './PlotModal';
import type { CreatePlotResource } from '../types/plot.types';
import { ROUTES } from '../../../shared/constants/routes';

export function CreatePlotForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSavePlot = async (data: CreatePlotResource) => {
    try {
      const field = await FieldService.getField();
      if (!field) {
        console.error('No field found');
        return;
      }

      const fieldId = field.id || field.fieldId;
      if (!fieldId) {
        console.error('Invalid field ID');
        return;
      }

      await PlotService.createPlot(fieldId, data);
      navigate(ROUTES.PLOT_LIST);
    } catch (err: any) {
      console.error('error creando plot', err);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('plots.createPlot')}</h1>
        <p className="text-gray-600 text-lg mb-8">
          {t('dashboard.createFirstPlot')}
        </p>
        
        <PlotModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSave={handleSavePlot}
        />
      </div>
    </div>
  );
}
