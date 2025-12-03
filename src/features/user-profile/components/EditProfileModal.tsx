import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { UserProfile, UserProfileFormData } from '../types/user-profile.types';
import { validateField } from '../../../shared/utils/validations';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserProfileFormData) => void;
  profile: UserProfile;
}

export function EditProfileModal({ isOpen, onClose, onSave, profile }: EditProfileModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UserProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phone: '',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        country: profile.country,
        phone: profile.phone,
      });
    }
  }, [profile, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const firstNameError = validateField({ value: formData.firstName, required: true });
    if (firstNameError) return setError(firstNameError);
    const lastNameError = validateField({ value: formData.lastName, required: true });
    if (lastNameError) return setError(lastNameError);
    const emailError = validateField({ value: formData.email, required: true });
    if (emailError) return setError(emailError);
    const countryError = validateField({ value: formData.country, required: true });
    if (countryError) return setError(countryError);
    const phoneError = validateField({ value: formData.phone, required: true });
    if (phoneError) return setError(phoneError);
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t('profile.editProfile')}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          {t('common.update')}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {t('auth.firstName')}
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="Roberto"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {t('auth.lastName')}
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="Gomez"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {t('profile.email')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="roberto@gmail.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {t('auth.country')}
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="Peru"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              {t('profile.phone')}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="+51 999 999 999"
              required
            />
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold">
              {t('common.save')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 px-4  rounded-lg font-semibold hover:bg-gray-400 transition-colors">
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
