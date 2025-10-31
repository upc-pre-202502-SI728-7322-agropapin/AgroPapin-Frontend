import { useParams } from 'react-router-dom';
import { ActuatorDetailsView } from './ActuatorDetailsView';
import { SensorDetailsView } from './SensorDetailsView';

const getDeviceType = (deviceId: string): 'sensor' | 'actuator' => {
  // For demo: devices with id '4' or higher are actuators
  return parseInt(deviceId) >= 4 ? 'actuator' : 'sensor';
};

export function DeviceDetailsView() {
  const { deviceId } = useParams<{ deviceId: string }>();
  
  const deviceType = getDeviceType(deviceId || '1');

  if (deviceType === 'actuator') {
    return <ActuatorDetailsView />;
  }

  return <SensorDetailsView />;
}
