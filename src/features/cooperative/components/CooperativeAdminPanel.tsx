import { useEffect, useState } from 'react';

import type { CooperativeResource } from '../types/cooperative.types';
import { CooperativeService } from '../../../services/cooperative/CooperativeService';

export function CooperativeAdminPanel() {
  const [cooperative, setCooperative] = useState<CooperativeResource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [farmerId, setFarmerId] = useState('');
  const [addFarmerError, setAddFarmerError] = useState<string | null>(null);
  const [addFarmerLoading, setAddFarmerLoading] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    CooperativeService.getMyCooperative()
      .then((data: CooperativeResource) => {
        setCooperative(data);
        setEditName(data.cooperativeName);
      })
      .catch(() => setCooperative(null))
      .finally(() => setLoading(false));
  }, []);

  const handleEditName = async () => {
    setError(null);
    setEditMode(false);
    try {
      const updated = await CooperativeService.updateMyCooperative(editName);
      setCooperative(updated);
    } catch {
      setError('Failed to update cooperative name.');
    }
  };

  const handleAddFarmer = async () => {
    setAddFarmerError(null);
    setAddFarmerLoading(true);
    try {
      if (!farmerId.trim()) {
        setAddFarmerError('Farmer ID is required.');
        setAddFarmerLoading(false);
        return;
      }
      const updated = await CooperativeService.addFarmer(cooperative!.cooperativeId, farmerId.trim());
      setCooperative(updated);
      setFarmerId('');
    } catch {
      setAddFarmerError('Failed to add farmer.');
    } finally {
      setAddFarmerLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!cooperative) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Cooperative</h2>
        <p className="mb-4 text-gray-600">You don't have a cooperative yet. Create one to start managing your organization.</p>
        <input
          type="text"
          value={createName}
          onChange={e => setCreateName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          placeholder="Cooperative Name"
        />
        {createError && <p className="text-red-600 mb-2">{createError}</p>}
        <button
          className="bg-[#3E7C59] text-white px-4 py-2 rounded-lg w-full font-semibold"
          disabled={createLoading}
          onClick={async () => {
            setCreateError(null);
            setCreateLoading(true);
            if (!createName.trim()) {
              setCreateError('Cooperative name is required.');
              setCreateLoading(false);
              return;
            }
            try {
              const coop = await CooperativeService.createCooperative(createName.trim());
              setCooperative(coop);
            } catch {
              setCreateError('Failed to create cooperative.');
            } finally {
              setCreateLoading(false);
            }
          }}
        >Create Cooperative</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cooperative Management</h2>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Cooperative Name</label>
        {editMode ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
            <button onClick={handleEditName} className="bg-green-600 text-white px-4 py-2 rounded-lg">Save</button>
            <button onClick={() => { setEditName(cooperative.cooperativeName); setEditMode(false); }} className="bg-gray-300 px-4 py-2 rounded-lg">Cancel</button>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <span className="text-lg">{cooperative.cooperativeName}</span>
            <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Edit</button>
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Add Farmer to Cooperative</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={farmerId}
            onChange={e => setFarmerId(e.target.value)}
            className="px-4 py-2 border rounded-lg"
            placeholder="Enter Farmer ID"
          />
          <button onClick={handleAddFarmer} className="bg-[#3E7C59] text-white px-4 py-2 rounded-lg" disabled={addFarmerLoading}>Add</button>
        </div>
        {addFarmerError && <p className="text-red-600 mt-2">{addFarmerError}</p>}
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Members</label>
        <ul className="list-disc pl-6">
          {cooperative.members.length === 0 && <li>No members yet.</li>}
          {cooperative.members.map(member => (
            <li key={member.id}>
              {member.firstName} {member.lastName} ({member.country}) - {member.phone}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Administrators</label>
        <ul className="list-disc pl-6">
          {cooperative.administrators.length === 0 && <li>No administrators yet.</li>}
          {cooperative.administrators.map(admin => (
            <li key={admin.id}>
              {admin.firstName} {admin.lastName} ({admin.country}) - {admin.phone}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Fields</label>
        <a
          href={`/fields?cooperativeId=${cooperative.cooperativeId}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          View Cooperative Fields
        </a>
      </div>
    </div>
  );
}
