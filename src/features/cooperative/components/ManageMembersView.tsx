import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CooperativeService } from '../../../services/cooperative/CooperativeService';
import { DataTable, type TableColumn } from '../../../shared/components/ui/DataTable';
import { ConfirmModal } from '../../../shared/components/ui/ConfirmModal';
import type { MemberSummaryResource } from '../types/cooperative.types';
import { IoEyeOutline, IoArrowBack } from 'react-icons/io5';

export function ManageMembersView() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<MemberSummaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [cooperativeId, setCooperativeId] = useState<string>('');
  const [newUserId, setNewUserId] = useState('');
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [noCooperative, setNoCooperative] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<MemberSummaryResource | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const cooperative = await CooperativeService.getMyCooperative();
      setCooperativeId(cooperative.cooperativeId);
      console.log('Cooperative ID:', cooperative.cooperativeId);
      setNoCooperative(false);
      const membersData = await CooperativeService.getMembers(cooperative.cooperativeId);
      setMembers(membersData);
    } catch (error: any) {
      console.error('Error loading members:', error);
      if (error?.response?.status === 404) {
        console.error('No cooperative found for current user.');
        setNoCooperative(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!newUserId.trim()) {
      console.log('Please enter a user ID');
      return;
    }

    if (!cooperativeId) {
      console.error('Cooperative ID not available');
      return;
    }

    const fullUserId = `auth0|${newUserId.trim()}`;
    console.log('Adding member with cooperativeId:', cooperativeId, 'userId:', fullUserId);

    try {
      setIsAddingMember(true);
      await CooperativeService.addMember(cooperativeId, fullUserId);
      console.log('Member added successfully');
      setNewUserId('');
      await loadMembers();
    } catch (error) {
      console.error('Error adding member:', error);
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleDeleteMember = (member: MemberSummaryResource) => {
    setMemberToDelete(member);
  };

  const confirmDeleteMember = async () => {
    if (!memberToDelete || !cooperativeId) {
      console.error('Cooperative ID or member not available');
      return;
    }

    try {
      await CooperativeService.removeMember(cooperativeId, memberToDelete.userId);
      console.log('Member removed successfully');
      setMemberToDelete(null);
      await loadMembers();
    } catch (error) {
      console.error('Error removing member:', error);
      setMemberToDelete(null);
    }
  };

  const handleViewField = (member: MemberSummaryResource) => {
    const cleanUserId = member.userId.replace(/^auth0\|/, '');
    navigate(`/field-information?userId=${cleanUserId}`);
  };

  const columns: TableColumn[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'country', label: 'Country' },
    { key: 'phone', label: 'Phone' },
    { key: 'userId', label: 'User ID' },
    { key: 'actions', label: 'Actions', width: '120px' },
  ];

  const renderCell = (member: MemberSummaryResource, columnKey: string) => {
    switch (columnKey) {
      case 'firstName':
        return <span className="font-medium text-gray-900">{member.firstName}</span>;
      case 'lastName':
        return <span className="text-gray-900">{member.lastName}</span>;
      case 'country':
        return <span className="text-gray-600">{member.country}</span>;
      case 'phone':
        return <span className="text-gray-600">{member.phone}</span>;
      case 'userId':
        return <span className="text-gray-500 text-sm font-mono">{member.userId.replace(/^auth0\|/, '')}</span>;
      case 'actions':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewField(member);
            }}
            className="text-blue-600 hover:text-blue-800 transition-colors p-2"
            title="View Field"
          >
            <IoEyeOutline size={22} />
          </button>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading members...</div>
      </div>
    );
  }

  if (noCooperative) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Cooperative Found</h2>
            <p className="text-gray-600 mb-6">
              You need to create a cooperative before you can manage members.
            </p>
            <button
              onClick={() => window.location.href = '/create-cooperative'}
              className="bg-[#3E7C59] hover:bg-[#2d5f43] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Create Cooperative
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <IoArrowBack size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Members</h1>
          <p className="text-gray-600">Manage farmers in your cooperative</p>
        </div>

        {/* Add Member Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Member</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
              placeholder="Enter User ID"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
            />
            <button
              onClick={handleAddMember}
              disabled={isAddingMember}
              className="bg-[#3E7C59] hover:bg-[#2d5f43] text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingMember ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-lg shadow-md">
          <DataTable
            columns={columns}
            data={members}
            getRowKey={(member) => member.id}
            renderCell={renderCell}
            onDelete={handleDeleteMember}
            showActions={true}
            emptyMessage="No members found. Add your first member above."
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={!!memberToDelete}
        onConfirm={confirmDeleteMember}
        onCancel={() => setMemberToDelete(null)}
        title="Remove Member"
        message={`Are you sure you want to remove ${memberToDelete?.firstName} ${memberToDelete?.lastName} from the cooperative?`}
        confirmText="Remove"
        cancelText="Cancel"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}
