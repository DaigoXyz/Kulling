import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface HistoryItem {
  id_order: number;
  nama_menu: string;
  deskripsi: string;
  gambar?: string;
  rating: number;
  distance: string;
  status: 'selesai' | 'dibatalkan' | 'proses';
}

interface HistoryScreenProps {
  navigation: any;
}

export default function HistoryScreen({ navigation }: HistoryScreenProps) {
  const [activeTab, setActiveTab] = useState<'riwayat' | 'proses'>('riwayat');

  const [historyItems] = useState<HistoryItem[]>([
    {
      id_order: 1,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      gambar: undefined,
      rating: 4.9,
      distance: '2.0 km',
      status: 'selesai',
    },
    {
      id_order: 2,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      gambar: undefined,
      rating: 4.9,
      distance: '2.0 km',
      status: 'dibatalkan',
    },
    {
      id_order: 3,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      gambar: undefined,
      rating: 4.9,
      distance: '2.0 km',
      status: 'selesai',
    },
    {
      id_order: 4,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      gambar: undefined,
      rating: 4.9,
      distance: '2.0 km',
      status: 'dibatalkan',
    },
  ]);

  const filteredItems = historyItems.filter(item => {
    if (activeTab === 'proses') {
      return item.status === 'proses';
    }
    return item.status === 'selesai' || item.status === 'dibatalkan';
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aktivitas</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
            style={styles.tab}
            onPress={() => setActiveTab('riwayat')}
        >
            <Text style={[
            styles.tabText,
            activeTab === 'riwayat' && styles.tabTextActive
            ]}>
            Riwayat
            </Text>

            {activeTab === 'riwayat' && <View style={styles.activeUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.tab}
            onPress={() => setActiveTab('proses')}
        >
            <Text style={[
            styles.tabText,
            activeTab === 'proses' && styles.tabTextActive
            ]}>
            Dalam Proses
            </Text>

            {activeTab === 'proses' && <View style={styles.activeUnderline} />}
        </TouchableOpacity>
        </View>


      {/* History List */}
      <ScrollView 
        style={styles.historyList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.historyListContent}
      >
        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'proses' 
                ? 'Tidak ada pesanan dalam proses' 
                : 'Belum ada riwayat pesanan'}
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <View key={item.id_order} style={styles.historyCard}>
              {/* Product Image */}
              <View style={styles.productImageContainer}>
                <Image
                  source={require('../assets/burger.jpg')}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                {/* Rating Badge */}
                <View style={styles.ratingBadge}>
                  <Text style={styles.starIcon}>⭐</Text>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>

              {/* Product Info */}
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.nama_menu}</Text>
                <Text style={styles.productDescription} numberOfLines={1}>
                  {item.deskripsi}
                </Text>
                <Text style={styles.distanceText}>{item.distance}</Text>
              </View>

              {/* Status Badge */}
              <View style={[
                styles.statusBadge,
                item.status === 'selesai' && styles.statusBadgeSuccess,
                item.status === 'dibatalkan' && styles.statusBadgeCancelled,
                item.status === 'proses' && styles.statusBadgeProcess,
              ]}>
                <Text style={[
                  styles.statusText,
                  item.status === 'selesai' && styles.statusTextSuccess,
                  item.status === 'dibatalkan' && styles.statusTextCancelled,
                  item.status === 'proses' && styles.statusTextProcess,
                ]}>
                  {item.status === 'selesai' ? 'selesai' : 
                   item.status === 'dibatalkan' ? 'dibatalkan' : 'proses'}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 12,
  },
  backIcon: {
    fontSize: 24,
    color: '#A6171B',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A6171B',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#A6171B',
    borderBottomWidth: 4,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '20%',        // biar agak kecil dari lebar teks
    right: '20%',
    height: 4,
    backgroundColor: '#A6171B',
    borderRadius: 100,  // ini buat bulet sempurna
   },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  historyList: {
    flex: 1,
  },
  historyListContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  productImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  productImage: {
    width: 70,
    height: 70,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  starIcon: {
    fontSize: 11,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 3,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  distanceText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusBadgeSuccess: {
    backgroundColor: '#D4F4DD',
  },
  statusBadgeCancelled: {
    backgroundColor: '#FFE5E5',
  },
  statusBadgeProcess: {
    backgroundColor: '#FFF4E5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusTextSuccess: {
    color: '#00A86B',
  },
  statusTextCancelled: {
    color: '#DC3545',
  },
  statusTextProcess: {
    color: '#FF8C00',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});