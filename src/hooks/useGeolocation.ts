import { useCallback, useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';

export function useGeolocation() {
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | 'undetermined'>('undetermined');
  const [position, setPosition] = useState<Location.LocationObject | null>(null);
  const watcherRef = useRef<Location.LocationSubscription | null>(null);

  const requestPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status !== 'granted') {
      return false;
    }

    const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    setPosition(current);
    return true;
  }, []);

  const startWatching = useCallback(async () => {
    if (watcherRef.current) return;

    watcherRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 1000,
        distanceInterval: 2,
      },
      (nextPosition) => {
        setPosition(nextPosition);
      }
    );
  }, []);

  const stopWatching = useCallback(() => {
    watcherRef.current?.remove();
    watcherRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      stopWatching();
    };
  }, [stopWatching]);

  return {
    permissionStatus,
    position,
    requestPermission,
    startWatching,
    stopWatching,
  };
}
