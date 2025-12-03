import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaCopy, FaCheck } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../../auth/context/AuthContext';
import { FarmerService } from '../../../services/farmer';
import { AdministratorService } from '../../../services/administrator';
import { EditProfileModal } from './EditProfileModal';
import { ConfirmModal } from '../../../shared/components/ui/ConfirmModal';
import type { UserProfile, UserProfileFormData } from '../types/user-profile.types';

export function UserProfileView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('ROLE_ADMINISTRATOR');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmSaveModalOpen, setIsConfirmSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<UserProfileFormData | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      
      if (isAdmin) {
        const adminData = await AdministratorService.getMyAdministratorProfile();
        setProfile({
          id: adminData.administratorId,
          firstName: adminData.firstName,
          lastName: adminData.lastName,
          email: adminData.email,
          country: adminData.country,
          phone: adminData.phoneNumber,
        });
      } else {
        const farmerData = await FarmerService.getMyFarmerProfile();
        setProfile({
          id: farmerData.farmerId,
          firstName: farmerData.firstName,
          lastName: farmerData.lastName,
          email: farmerData.email,
          country: farmerData.country,
          phone: farmerData.phone,
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClick = (data: UserProfileFormData) => {
    setPendingChanges(data);
    setIsEditModalOpen(false);
    setIsConfirmSaveModalOpen(true);
  };

  const handleConfirmSave = async () => {
    if (pendingChanges && profile) {
      try {
        setIsSaving(true);
        
        if (isAdmin) {
          const updatedAdmin = await AdministratorService.updateMyAdministratorProfile({
            firstName: pendingChanges.firstName,
            lastName: pendingChanges.lastName,
            country: pendingChanges.country,
            phoneNumber: pendingChanges.phone,
          });
          
          setProfile({
            id: updatedAdmin.administratorId,
            firstName: updatedAdmin.firstName,
            lastName: updatedAdmin.lastName,
            email: updatedAdmin.email,
            country: updatedAdmin.country,
            phone: updatedAdmin.phoneNumber,
          });
        } else {
          const updatedFarmer = await FarmerService.updateMyFarmerProfile({
            firstName: pendingChanges.firstName,
            lastName: pendingChanges.lastName,
            country: pendingChanges.country,
            phone: pendingChanges.phone,
          });
          
          setProfile({
            id: updatedFarmer.farmerId,
            firstName: updatedFarmer.firstName,
            lastName: updatedFarmer.lastName,
            email: updatedFarmer.email,
            country: updatedFarmer.country,
            phone: updatedFarmer.phone,
          });
        }
        
        console.log('Profile updated successfully');
        setPendingChanges(null);
        setIsConfirmSaveModalOpen(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleDeleteAccount = () => {
    console.log('cuenta eliminada');
    setIsDeleteModalOpen(false);
  };

  const handleCopyUserId = async () => {
    if (user?.id) {
      try {
        const cleanUserId = user.id.replace(/^auth0\|/, '');
        await navigator.clipboard.writeText(cleanUserId);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error('Error al copiar el userId:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-10">
            <div className="text-center text-gray-600">{t('common.loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-10">
            <div className="text-center text-red-600">{t('errors.loadingError')}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>{t('common.back')}</span>
        </button>
        <div className="bg-white rounded-lg shadow-lg p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('profile.title')}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CgProfile className="w-40 h-40 text-gray-400" />
                )}
              </div>
            </div>

            {/*Profile Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('auth.firstName')}
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('auth.lastName')}
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('profile.email')}:
                </label>
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {t('auth.country')}:
                </label>
                <input
                  type="text"
                  value={profile.country}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-full bg-[#3E7C59] text-white py-2.5 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  {t('profile.editProfile')}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{t('profile.userId')}</h2>
            <p className="text-gray-600 mb-4">
              {t('cooperative.enterUserId')}
            </p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={user?.id ? user.id.replace(/^auth0\|/, '') : ''}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-mono text-sm"
              />
              <button
                onClick={handleCopyUserId}
                className="flex items-center gap-2 bg-[#3E7C59] text-white py-2.5 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold"
                type="button"
              >
                {isCopied ? (
                  <>
                    <FaCheck size={16} />
                    <span>{t('common.copied')}</span>
                  </>
                ) : (
                  <>
                    <FaCopy size={16} />
                    <span>{t('common.copy')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{t('profile.changePassword')}</h2>
            <p className="text-gray-600 mb-4">
              {t('messages.dataLost')}
            </p>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              {t('common.delete')}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveClick}
        profile={profile}
      />

      <ConfirmModal
        isOpen={isConfirmSaveModalOpen}
        onConfirm={handleConfirmSave}
        onCancel={() => {
          setIsConfirmSaveModalOpen(false);
          setPendingChanges(null);
        }}
        title={t('common.save')}
        message={t('messages.confirmAction')}
        confirmText={isSaving ? t('common.loading') : t('common.save')}
        cancelText={t('common.cancel')}
        confirmButtonColor="bg-[#3E7C59] hover:bg-[#2d5f43]"
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteAccount}
        onCancel={() => setIsDeleteModalOpen(false)}
        title={t('common.delete')}
        message={t('messages.dataLost')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        confirmButtonColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}
