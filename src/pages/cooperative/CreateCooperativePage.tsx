import { CreateCooperativeView } from '../../features/cooperative/components/CreateCooperativeView';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';

export default function CreateCooperativePage() {
  const navigate = useNavigate();

  const handleCooperativeCreated = () => {
    // redirecciona al dashboard lugo de crear la cooperativa
    navigate(ROUTES.DASHBOARD_ADMIN);
  };

  return <CreateCooperativeView onCooperativeCreated={handleCooperativeCreated} />;
}
