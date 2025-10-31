import { useParams } from 'react-router-dom';
import { ActuatorReadingsView } from './ActuatorReadingsView';
import { SensorReadingsView } from './SensorReadingsView';

const getDeviceType = (deviceId: string): 'sensor' | 'actuator' => {
  // devices with id '4' or higher are actuators
  return parseInt(deviceId) >= 4 ? 'actuator' : 'sensor';
};

export function AllReadingsView() {
  const { deviceId } = useParams<{ deviceId: string }>();
  
  const deviceType = getDeviceType(deviceId || '1');

  if (deviceType === 'actuator') {
    return <ActuatorReadingsView />;
  }

  return <SensorReadingsView />;
}
