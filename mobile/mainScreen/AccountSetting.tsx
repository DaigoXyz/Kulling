import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { LogOut, Trash2, ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountSettingsScreen = ({ navigation }: any) => {
  const handleLogout = async () => {
    Alert.alert(
      'Keluar',
      'Yakin mau keluar? Pas balik masuk akun lagi, ya.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: async () => {
            try {
              // Hapus token dari AsyncStorage
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userId');
              
              // Navigate ke LoginScreen
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              });
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Gagal logout. Coba lagi ya.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Hapus akun',
      'Akunmu akan dihapus secara permanen. Jadi, kamu gak bisa lagi akses riwayat transaksi dan detail lainnya dari akunmu.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              // Ambil userId dari AsyncStorage
              const userId = await AsyncStorage.getItem('userId');
              const token = await AsyncStorage.getItem('userToken');

              if (!userId || !token) {
                Alert.alert('Error', 'Sesi login tidak valid. Silakan login kembali.');
                return;
              }

              // Panggil API untuk hapus akun
              const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              });

              if (response.ok) {
                // Hapus data lokal
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userId');

                Alert.alert(
                  'Berhasil',
                  'Akun berhasil dihapus',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'LoginScreen' }],
                        });
                      },
                    },
                  ]
                );
              } else {
                const error = await response.json();
                Alert.alert('Error', error.message || 'Gagal menghapus akun');
              }
            } catch (error) {
              console.error('Delete account error:', error);
              Alert.alert('Error', 'Terjadi kesalahan. Coba lagi ya.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft color="#B91C1C" size={28} style={{ marginRight: 2 }} />
          <Text style={styles.backText}>Pengaturan Akun</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {/* Logout */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <View style={styles.menuIconContainer}>
            <LogOut color="#1F2937" size={22} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Keluar</Text>
            <Text style={styles.menuDescription}>
              Yakin mau keluar? Pas balik masuk akun lagi, ya.
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <View style={styles.menuDivider} />

        {/* Delete Account */}
        <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
          <View style={styles.menuIconContainer}>
            <Trash2 color="#1F2937" size={22} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Hapus akun</Text>
            <Text style={styles.menuDescription}>
              Akunmu akan dihapus secara permanen. Jadi, kamu gak bisa lagi akses 
              riwayat transaksi dan detail lainnya dari akunmu.
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    color: '#B91C1C',
    fontSize: 32,
    fontWeight: '300',
    marginRight: 4,
  },
  backText: {
    color: '#B91C1C',
    fontSize: 16,
    fontWeight: '500',
  },
  menuContainer: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  menuIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  menuContent: {
    flex: 1,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  chevron: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
});

export default AccountSettingsScreen;