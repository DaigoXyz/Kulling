import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import { MapPin, Locate } from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AddressDetailScreen = () => {
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);

  // State
  const [latitude, setLatitude] = useState(-6.2088);
  const [longitude, setLongitude] = useState(106.8456);
  const [address, setAddress] = useState('Jl. Ery Sutrisna No.24, Kel. Pekayon, Kec. Pasar Rebo, Jakarta Timur 13710, Indonesia');
  const [detailLocation, setDetailLocation] = useState('Belakang SPN Pekayon 01');
  const [notes, setNotes] = useState('Cth: Rumah Pagar putih sebelah warung kopi');
  const [isMapReady, setIsMapReady] = useState(false);

  // HTML content untuk WebView dengan Leaflet (OpenStreetMap)
  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body, html { margin: 0; padding: 0; height: 100%; }
        #map { height: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', {
          zoomControl: false,
          attributionControl: false
        }).setView([${latitude}, ${longitude}], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        var marker = L.marker([${latitude}, ${longitude}], {
          draggable: true
        }).addTo(map);

        // Send initial position
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'mapReady'
        }));

        // Handle marker drag
        marker.on('dragend', function(e) {
          var position = marker.getLatLng();
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'markerMoved',
            latitude: position.lat,
            longitude: position.lng
          }));
        });

        // Handle map click
        map.on('click', function(e) {
          marker.setLatLng(e.latlng);
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'markerMoved',
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
          }));
        });

        // Function to update marker position from React Native
        window.updateMarker = function(lat, lng) {
          marker.setLatLng([lat, lng]);
          map.setView([lat, lng], 15);
        };
      </script>
    </body>
    </html>
  `;

  // Request location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Izin Akses Lokasi',
            message: 'Aplikasi memerlukan akses lokasi untuk menampilkan posisi Anda',
            buttonNeutral: 'Tanya Nanti',
            buttonNegative: 'Tolak',
            buttonPositive: 'Izinkan',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Get current location
  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Izin Ditolak', 'Aplikasi memerlukan izin lokasi untuk melanjutkan');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setLatitude(lat);
        setLongitude(lng);
        
        // Update marker di map
        if (isMapReady) {
          webViewRef.current?.injectJavaScript(`
            window.updateMarker(${lat}, ${lng});
            true;
          `);
        }
      },
      (error) => {
        console.log(error);
        Alert.alert('Error', 'Gagal mendapatkan lokasi saat ini');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Handle message from WebView
  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.type === 'mapReady') {
        setIsMapReady(true);
      } else if (data.type === 'markerMoved') {
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        // Di sini bisa panggil reverse geocoding API untuk update address
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const handleConfirm = () => {
    // Handle konfirmasi alamat
    console.log('Address confirmed:', {
      latitude,
      longitude,
      address,
      detailLocation,
      notes,
    });
    Alert.alert('Berhasil', 'Alamat berhasil disimpan', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handleChangeAddress = () => {
    // Handle ubah alamat
    Alert.alert('Ubah Alamat', 'Silakan tap pada map atau drag marker untuk mengubah lokasi');
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Map */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          style={styles.map}
          onMessage={handleWebViewMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        {/* Current Location Button */}
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={getCurrentLocation}
        >
          <Locate color="#1F2937" size={24} />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Header */}
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Detail alamat</Text>
          <TouchableOpacity 
            style={styles.ubahButton}
            onPress={handleChangeAddress}
          >
            <Text style={styles.ubahButtonText}>Ubah</Text>
          </TouchableOpacity>
        </View>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressIconContainer}>
            <MapPin color="#B91C1C" size={20} />
          </View>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressLabel}>Rumah</Text>
            <Text style={styles.addressText}>{address}</Text>
          </View>
        </View>

        {/* Detail Lokasi */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Detail lokasi (opsional)</Text>
          <TextInput
            style={styles.input}
            value={detailLocation}
            onChangeText={setDetailLocation}
            placeholder="Belakang SPN Pekayon 01"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Patokan */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Patokan (opsional)</Text>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Cth: Rumah Pagar putih sebelah warung kopi"
            placeholderTextColor="#9CA3AF"
            multiline
          />
        </View>

        {/* Confirm Button */}
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>Konfirmasi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapContainer: {
    height: SCREEN_HEIGHT * 0.5,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: {
    fontSize: 32,
    color: '#1F2937',
    fontWeight: '300',
    marginTop: -4,
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  ubahButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#B91C1C',
    borderRadius: 6,
  },
  ubahButtonText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '500',
  },
  addressSection: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  addressIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#B91C1C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddressDetailScreen;