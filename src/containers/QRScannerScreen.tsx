import * as React from 'react';

import { Alert, StyleSheet,  } from 'react-native';
import { useCameraDevice,  } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = React.useState(false);
//   const devices = useCameraDevices();
//   const device = Array.isArray(devices)
//     ? devices.find((d) => d.position === 'back') ?? devices[0]
//     : (devices as any).back;

//   const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
//     checkInverted: true,
//   });

  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission((status as unknown) === 'authorized');
    })();
  }, []);

  const device = useCameraDevice('back')
//   const { hasPermission } = useCameraPermission()

  if (!hasPermission) {
    Alert.alert(
      'Permission refusée',
      'L\'application a besoin de la permission de la caméra pour scanner les QR codes.'
    );
    return null;
  }

  if (device == null) {
    Alert.alert(
      'Aucun appareil photo',
      'Aucun appareil photo disponible pour scanner les QR codes.'
    );
    return null;
  }
//   if (!hasPermission) return <PermissionsPage />
//   if (device == null) return <NoCameraDeviceError />
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  )
}

// const styles = StyleSheet.create({
//   barcodeTextURL: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });



















// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';
// import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

// const QRScannerScreen = () => {
//   const devices = useCameraDevices();
//   const device = Array.isArray(devices)
//     ? devices.find((d) => d.position === 'back') ?? devices[0]
//     : (devices as any).back;
//   const [hasPermission, setHasPermission] = useState(false);
//   const [scannedCode, setScannedCode] = useState<string | null>(null);

//   const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);

//   useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       const isAuthorized = (status as any) === 'authorized';
//       setHasPermission(isAuthorized);
//     })();
//   }, []);

//   useEffect(() => {
//     if (barcodes.length > 0 && barcodes[0].rawValue) {
//       setScannedCode(barcodes[0].rawValue);
//       // Appel à ton API pour validation
//       console.log('QR code scanné:', barcodes[0].rawValue);
//     }
//   }, [barcodes]);

//   if (!device || !hasPermission) {
//     return <Text>Chargement de la caméra...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         frameProcessor={frameProcessor as any}
//       />
//       <View style={styles.overlay}>
//         <Text style={styles.text}>
//           {scannedCode ? `Code : ${scannedCode}` : 'Scannez un billet...'}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default QRScannerScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   overlay: {
//     position: 'absolute',
//     bottom: 50,
//     alignSelf: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 10,
//     borderRadius: 10,
//   },
//   text: { color: '#fff' },
// });
