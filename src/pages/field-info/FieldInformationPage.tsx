import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldInformationView } from "../../features/field-info/components/FieldInformationView";
import { FieldService } from '../../services/field';
import { ROUTES } from '../../shared/constants/routes';

export default function FieldInformationPage() {
  const navigate = useNavigate();
  const [hasField, setHasField] = useState(false);

  useEffect(() => {
    const checkField = async () => {
      try {
        const field = await FieldService.getField();
        
        if (field) {
          setHasField(true);
        } else {
          navigate(ROUTES.CREATE_FIELD, { replace: true });
        }
      } catch (error) {
        console.error('error verificando numero de fields', error);
        navigate(ROUTES.CREATE_FIELD, { replace: true });
      } 
    };

    checkField();
  }, [navigate]);

  if (!hasField) {
    return null;
  }

  return <FieldInformationView />;
}
