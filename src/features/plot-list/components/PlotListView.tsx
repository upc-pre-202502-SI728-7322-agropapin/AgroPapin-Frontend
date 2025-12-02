import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { FieldService } from "../../../services/field";
import { usePlots } from "../hooks";
import { PlotModal } from "./PlotModal";
import { AddButton } from "../../../shared/components/ui/AddButton";
import { ConfirmModal } from "../../../shared/components/ui/ConfirmModal";
import { ROUTES } from "../../../shared/constants/routes";
import { PlotList } from "./PlotList";
import { useAuth } from "../../auth/context/AuthContext";
import { FloatingChatButton } from "../../../shared/components/ui/FloatingChatButton";
import type { Plot, CreatePlotResource, UpdatePlotResource } from "../types/plot.types";

export function PlotListView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('ROLE_ADMINISTRATOR');
  const [fieldId, setFieldId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [plotToDelete, setPlotToDelete] = useState<string | null>(null);
  
  const { plots, error, createPlot, updatePlot, deletePlot, fetchPlots } = usePlots(fieldId);

  useEffect(() => {
    const loadField = async () => {
      try {
        const fieldIdFromQuery = searchParams.get('fieldId');
        if (fieldIdFromQuery) {
          console.log('Loading plots for fieldId from query:', fieldIdFromQuery);
          setFieldId(fieldIdFromQuery);
          return;
        }

        const field = await FieldService.getField();
        if (field) {
          setFieldId(field.id || field.fieldId || null);
        } else {
          console.warn('usuario no tiene field');
          navigate(ROUTES.CREATE_FIELD);
        }
      } catch (err) {
        console.error('Error cargando field:', err);
      }
    };
    loadField();
  }, [navigate, searchParams]);

  const handleSavePlot = async (data: CreatePlotResource | UpdatePlotResource) => {
    try {
      if (selectedPlot) {
        await updatePlot(selectedPlot.plotId, data as UpdatePlotResource);
      } else {
        await createPlot(data as CreatePlotResource);
      }
      await fetchPlots();
      setSelectedPlot(null);
    } catch (error) {
      console.error('Error guardando plot:', error);
    }
  };

  const handleOpenAddModal = () => {
    if (isAdmin) return;
    setSelectedPlot(null);
    setIsModalOpen(true);
  };

  const handleInfoClick = (plotId: string) => {
    console.log('ver crops del plot', plotId);
    navigate(`${ROUTES.CROP_LIST}?fieldId=${fieldId}&plotId=${plotId}`);
  };

  const handleDevicesClick = (plotId: string) => {
    navigate(ROUTES.DEVICES.replace(':plotId', plotId));
  };

  const handleMetricsClick = (plotId: string) => {
    navigate(`${ROUTES.DEVICES.replace(':plotId', plotId)}?section=metrics`);
  };

  const handleEdit = (plot: Plot) => {
    if (isAdmin) return;
    setSelectedPlot(plot);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (plotId: string) => {
    if (isAdmin) return;
    setPlotToDelete(plotId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (plotToDelete) {
      try {
        await deletePlot(plotToDelete);
        await fetchPlots();
        setIsDeleteModalOpen(false);
        setPlotToDelete(null);
      } catch (error) {
        console.error('error eliminando plot:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setPlotToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
       
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium">
          <FaArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Field Plots
          </h1>
          {!isAdmin && <AddButton onClick={handleOpenAddModal} label="Add Plot"/>}
        </div>

        {error && (
          <div className="text-center py-8 text-red-600">
            {error}
          </div>
        )}

        {!error && plots.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPlus className="text-gray-400 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  No Plots Found
                </h2>
                <p className="text-gray-600 mb-6">
                  You haven't created any plots yet. Create your first plot to start organizing your crops.
                </p>
              </div>
              
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#3E7C59] text-white rounded-lg font-semibold hover:bg-[#2d5f43] transition"
                disabled={!fieldId}
              >
                <FaPlus />
                Add Plot
              </button>
            </div>
          </div>
        )}

        {!error && plots.length > 0 && (
          <PlotList
            plots={plots}
            onInfoClick={handleInfoClick}
            onDevicesClick={handleDevicesClick}
            onMetricsClick={handleMetricsClick}
            onEdit={isAdmin ? undefined : handleEdit}
            onDelete={isAdmin ? undefined : handleDeleteRequest}
            isAdmin={isAdmin}
          />
        )}

        <PlotModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPlot(null);
          }}
          onSave={handleSavePlot}
          plot={selectedPlot}
        />

        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          title="Delete Plot"
          message="Are you sure you want to delete this plot? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          confirmButtonColor="bg-red-600 hover:bg-red-700"
        />
      </div>

      <FloatingChatButton fieldId={fieldId} />
    </div>
  );
}