import { FieldInformationView } from "../../features/field-info/components/FieldInformationView";
import { AdminFieldsView } from "../../features/field-info/components/AdminFieldsView";
import { useAuth } from "../../features/auth/context/AuthContext";

export default function FieldInformationPage() {
  const { user } = useAuth();
  
  // si somos administradores, mostramos la lista de fields de la cooperativa
  if (user?.roles?.includes('ROLE_ADMINISTRATOR')) {
    return <AdminFieldsView />;
  }
  
  // cuando estamos como farmer, mostramos solamente su field
  return <FieldInformationView />;
}