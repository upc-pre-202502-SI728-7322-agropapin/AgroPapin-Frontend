import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCopy, FaCheck } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../../auth/context/AuthContext';
import { EditProfileModal } from './EditProfileModal';
import { ConfirmModal } from '../../../shared/components/ui/ConfirmModal';
import type { UserProfile, UserProfileFormData } from '../types/user-profile.types';


const mockUserProfile: UserProfile = {
  id: '1',
  firstName: 'Roberto',
  lastName: 'Juarez',
  email: 'roberto@gmail.com',
  country: 'Peru',
  phone: '+51 999 999 999',
};

export function UserProfileView() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmSaveModalOpen, setIsConfirmSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<UserProfileFormData | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSaveClick = (data: UserProfileFormData) => {
    setPendingChanges(data);
    setIsEditModalOpen(false);
    setIsConfirmSaveModalOpen(true);
  };

  const handleConfirmSave = () => {
    if (pendingChanges) {
      setProfile({
        ...profile,
        ...pendingChanges,
      });
      setPendingChanges(null);
      setIsConfirmSaveModalOpen(false);
    }
  };

  const handleDeleteAccount = () => {
    console.log('cuenta eliminada');
    setIsDeleteModalOpen(false);
  };

  const handleCopyUserId = async () => {
    if (user?.id) {
      try {
        // Limpiar el userId removiendo el prefijo "auth0|" si existe
        const cleanUserId = user.id.replace(/^auth0\|/, '');
        await navigator.clipboard.writeText(cleanUserId);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error('Error al copiar el userId:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>Back</span>
        </button>
        <div className="bg-white rounded-lg shadow-lg p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

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
                  First Name
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
                  Last Name
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
                  Email:
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
                  Country:
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
                  Edit Information
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">User ID</h2>
            <p className="text-gray-600 mb-4">
              Use this ID to identify your account in the system and get added in a cooperative.
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
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FaCopy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h2>
            <p className="text-gray-600 mb-4">
              Permanently delete your account. This action cannot be undone.
            </p>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              Delete Account
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
        title="Save Changes"
        message="Are you sure you want to save these changes to your profile?"
        confirmText="Save"
        cancelText="Cancel"
        confirmButtonColor="bg-[#3E7C59] hover:bg-[#2d5f43]"
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteAccount}
        onCancel={() => setIsDeleteModalOpen(false)}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}
