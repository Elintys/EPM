import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor, CameraDevice } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';
import jsQR from 'jsqr';
import { Colors } from '../constants/styles/theme';

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  const devices = useCameraDevices();
  const device: CameraDevice | undefined = devices.find(d => d.position === 'back');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // 🔹 Frame processor — fonctionne sans MLKit
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    try {
      const buffer = frame.toArrayBuffer(); // récupère les pixels
      const data = new Uint8ClampedArray(buffer);
      const qr = jsQR(data, frame.width, frame.height);
      if (qr && qr.data) {
        runOnJS(onCodeDetected)(qr.data);
      }
    } catch (err) {
      console.error('Erreur scan QR:', err);
    }
  }, []);

  const onCodeDetected = (value: string) => {
    if (value !== code) {
      setCode(value);
      console.log('QR détecté :', value);
      Alert.alert('QR détecté', value);
      // 👉 Ici : requête à ton API Elintys pour valider le billet
    }
  };

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>Chargement de la caméra…</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>Permission caméra requise.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scanner un QR Code</Text>

      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        frameProcessor={frameProcessor}
        // frameProcessorFps={5}
      />

      {code && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>QR détecté : {code}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryDark,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 10,
  },
  overlayText: { color: 'white', fontWeight: '600' },
});
