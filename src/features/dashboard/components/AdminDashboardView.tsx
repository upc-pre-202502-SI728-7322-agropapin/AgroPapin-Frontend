import { CooperativeAdminPanel } from '../../cooperative/components/CooperativeAdminPanel';

export function AdminDashboardView() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8 ">
      <div className="max-w-8xl mx-auto p-4 ">
        <div className="mb-12 ">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Cooperative management and administrator tools.
          </p>
        </div>
        <CooperativeAdminPanel />
      </div>
    </div>
  );
}