import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SimpleTable } from '../../../shared/components/ui/SimpleTable';
import type { Pest } from '../types/pest.types';

interface PestsTabProps {
  cropId: string;
}

const mockPestsData: Record<string, Pest[]> = {
  '1': [
    {
      id: '1',
      name: 'Bacterial blight',
      description: 'Bacterial disease that causes necrotic spots on rice leaves, stems and panicles. It can cause plant death and reduce crop yield.',
      solution: 'Apply copper-based fungicides and remove infected plants.',
    },
    {
      id: '2',
      name: 'Rice weevil',
      description: 'This beetle feeds on stored rice grains, causing significant damage to warehouses and silos.',
      solution: 'In cases of severe infestations, it may be necessary to resort to the use of pesticides. Dosage and application recommendations provided by agricultural experts or local authorities should be followed.',
    },
    {
      id: '3',
      name: 'Rice moth',
      description: 'The larvae of this moth feed on the leaves and stems of the rice, creating galleries and causing considerable damage to the crop.',
      solution: 'In cases of serious infestations, specific insecticides can be applied. Dosage and application recommendations provided by agricultural experts or local authorities must be followed.',
    },
    {
      id: '4',
      name: 'Rice stem borer',
      description: 'Insect larvae that feed on rice stems, causing wilting and reducing yield.',
      solution: 'Use biological control methods and apply appropriate insecticides when necessary.',
    },
    {
      id: '5',
      name: 'Brown planthopper',
      description: 'Small insect that sucks sap from rice plants, causing yellowing and stunted growth.',
      solution: 'Monitor populations regularly and apply systemic insecticides if thresholds are exceeded.',
    },
  ],
  '2': [
    {
      id: '1',
      name: 'Rice blast',
      description: 'Fungal disease affecting rice leaves and causing reduced yield.',
      solution: 'Apply fungicides and practice crop rotation.',
    },
    {
      id: '2',
      name: 'Leaf folder',
      description: 'Caterpillar that folds rice leaves and feeds on them.',
      solution: 'Use biological control agents or apply recommended insecticides.',
    },
  ],
  '3': [
    {
      id: '1',
      name: 'Rice blast',
      description: 'Fungal disease affecting rice leaves and causing reduced yield.',
      solution: 'Apply fungicides and practice crop rotation.',
    },
  ],
  '4': [
    {
      id: '1',
      name: 'Rice blast',
      description: 'Fungal disease affecting rice leaves and causing reduced yield.',
      solution: 'Apply fungicides and practice crop rotation.',
    },
  ],
};

export function PestsTab({ cropId }: PestsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const pests = mockPestsData[cropId] || mockPestsData['1'];

  const filteredPests = pests.filter((pest) =>
    pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pest.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'name', label: 'Name', width: '200px' },
    { key: 'description', label: 'Description' },
    { key: 'solution', label: 'Solution' },
  ];

  const renderCell = (pest: Pest, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return <span className="font-medium text-gray-900">{pest.name}</span>;
      case 'description':
        return pest.description;
      case 'solution':
        return pest.solution;
      default:
        return '';
    }
  };

  return (
    <div className="py-6">

      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for diseases or pests"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
          />
        </div>
      </div>


      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <SimpleTable
          columns={columns}
          data={filteredPests}
          renderCell={renderCell}
          getRowKey={(pest) => pest.id}
          itemsPerPage={3}
          totalItems={filteredPests.length}
        />
      </div>
    </div>
  );
}
