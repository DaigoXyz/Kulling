import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { User, ClipboardList, Gift, Settings, Trash2, ChevronLeft } from 'lucide-react-native';
import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ProfileScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('+62');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigation: any = useNavigation();

  const handleImagePicker = () => {
    Alert.alert(
      'Pilih Foto Profil',
      'Pilih sumber foto',
      [
        { text: 'Kamera', onPress: () => openCamera() },
        { text: 'Galeri', onPress: () => openGallery() },
        { text: 'Batal', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'front',
        quality: 0.8,
        saveToPhotos: true,
      },
      handleImageResponse
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      handleImageResponse
    );
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets[0].uri) {
      setProfileImage(response.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#B91C1C" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* V-Shape dengan Background Image */}
          <View style={styles.headerWrapper}>
            {/* Background Image Full */}
            <ImageBackground
              source={require('../assets/background.png')}
              style={styles.backgroundImageFull}
              resizeMode="cover"
            >
              {/* SVG Shape untuk V dengan warna merah + opacity */}
              <Svg 
                width={SCREEN_WIDTH} 
                height={290}
                style={styles.svgShape}
              >
                <Path
                  d={`
                    M 0,0 
                    L ${SCREEN_WIDTH},0
                    L ${SCREEN_WIDTH},180
                    Q ${SCREEN_WIDTH - 5},190 ${SCREEN_WIDTH - 20},195
                    L ${SCREEN_WIDTH / 2 + 10},270
                    Q ${SCREEN_WIDTH / 2},275 ${SCREEN_WIDTH / 2 - 10},270
                    L 20,195
                    Q 5,190 0,180
                    Z
                  `}
                  fill="#B91C1C"
                  opacity="0.4"
                />
              </Svg>
            </ImageBackground>

            {/* White mask untuk bagian di luar V-shape */}
            <Svg 
              width={SCREEN_WIDTH} 
              height={290}
              style={styles.svgMask}
            >
              {/* Top-left white area */}
              <Path
                d={`
                  M 0,180
                  Q 5,190 20,195
                  L 0,195
                  Z
                `}
                fill="#FFFFFF"
              />
              
              {/* Top-right white area */}
              <Path
                d={`
                  M ${SCREEN_WIDTH},180
                  Q ${SCREEN_WIDTH - 5},190 ${SCREEN_WIDTH - 20},195
                  L ${SCREEN_WIDTH},195
                  Z
                `}
                fill="#FFFFFF"
              />

              {/* Bottom white area */}
              <Path
                d={`
                  M 0,195
                  L 20,195
                  L ${SCREEN_WIDTH / 2 - 10},270
                  Q ${SCREEN_WIDTH / 2},275 ${SCREEN_WIDTH / 2 + 10},270
                  L ${SCREEN_WIDTH - 20},195
                  L ${SCREEN_WIDTH},195
                  L ${SCREEN_WIDTH},290
                  L 0,290
                  Z
                `}
                fill="#FFFFFF"
              />
            </Svg>

            {/* Header Content */}
            <View style={styles.headerContent}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <ChevronLeft style={styles.backIcon} />
                <Text style={styles.backText}>Kembali</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={[styles.profileImage, styles.defaultProfile]}>
                <User color="#9CA3AF" size={48} />
              </View>
            )}

            <TouchableOpacity style={styles.cameraButton} onPress={handleImagePicker}>
              <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>Tasya</Text>
          <Text style={styles.userLocation}>Pekayon, Jakarta Timur</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Nomor HP <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.flagText}>🇮🇩</Text>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholder="+62"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Email <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder=""
              autoCapitalize="none"
            />
          </View>

          {/* Aktivitas di Kulina */}
          <Text style={styles.sectionTitle}>Aktivitas di kulina</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <ClipboardList color="#B91C1C" size={22} />
              </View>
              <Text style={styles.menuText}>Aktivitas</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem}
            onPress={() => navigation.navigate('PromoScreen')}>
              <View style={styles.menuIconContainer}>
                <Gift color="#B91C1C" size={22} />
              </View>
              <Text style={styles.menuText}>Promo & Voucher</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Aktivasi di Kulina */}
          <Text style={styles.sectionTitle}>Aktivasi di kulling</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('AccountSettingsScreen')}
            >
              <View style={styles.menuIconContainer}>
                <Settings color="#B91C1C" size={22} />
              </View>
              <Text style={styles.menuText}>Atur akun</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Trash2 color="#B91C1C" size={22} />
              </View>
              <Text style={styles.menuText}>Hapus akun</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  profileSection: { 
    alignItems: 'center', 
    paddingBottom: 24, 
  },
  headerWrapper: {
    width: SCREEN_WIDTH,
    height: 290,
    marginBottom: -80,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundImageFull: {
    width: SCREEN_WIDTH,
    height: 290,
    position: 'absolute',
  },
  svgShape: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  svgMask: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerContent: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 10,
  },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { color: '#FFFFFF', fontSize: 32, fontWeight: '300', marginRight: 4 },
  backText: { color: '#FFFFFF', fontSize: 16, fontWeight: '400' },
  profileImageContainer: { 
    position: 'relative', 
    marginTop: 0,
    marginBottom: 16,
    zIndex: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#E5E5E5',
  },
  defaultProfile: { justifyContent: 'center', alignItems: 'center' },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#B91C1C',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: { fontSize: 16 },
  userName: { 
    fontSize: 20, 
    fontWeight: '600', 
    color: '#1F2937', 
    marginBottom: 4,
    zIndex: 2,
  },
  userLocation: { 
    fontSize: 14, 
    color: '#6B7280',
    zIndex: 2,
  },
  formSection: { paddingHorizontal: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: '#1F2937', marginBottom: 8, fontWeight: '500' },
  required: { color: '#EF4444' },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
  },
  flagText: { fontSize: 22, marginRight: 8 },
  phoneInput: { flex: 1, fontSize: 16, color: '#1F2937', padding: 0 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  sectionTitle: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginTop: 24, 
    marginBottom: 12, 
    fontWeight: '500' 
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 12,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: { flex: 1, fontSize: 16, color: '#B91C1C', fontWeight: '500' },
  chevron: { fontSize: 24, color: '#9CA3AF', fontWeight: '300' },
});

export default ProfileScreen;