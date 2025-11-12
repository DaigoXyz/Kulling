import React, { useState, useEffect } from 'react';
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
  harga?: number;
  quantity?: number;
}

interface HistoryScreenProps {
  navigation: any;
}

export default function HistoryScreen({ navigation }: HistoryScreenProps) {
  const [activeTab, setActiveTab] = useState<'riwayat' | 'proses'>('riwayat');
  const [timer, setTimer] = useState({ minutes: 10, seconds: 23 });
  const [orderStatus, setOrderStatus] = useState<'diterima' | 'dimasak' | 'dikirim'>('diterima');

  const [historyItems] = useState<HistoryItem[]>([
    {
      id_order: 1,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      gambar: undefined,
      rating: 4.5,
      distance: '2.0 km',
      status: 'selesai',
    },
    {
      id_order: 2,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      gambar: undefined,
      rating: 4.5,
      distance: '2.0 km',
      status: 'dibatalkan',
    },
    {
      id_order: 3,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      gambar: undefined,
      rating: 4.5,
      distance: '2.0 km',
      status: 'selesai',
    },
    {
      id_order: 4,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      gambar: undefined,
      rating: 4.5,
      distance: '2.0 km',
      status: 'dibatalkan',
    },
    {
      id_order: 5,
      nama_menu: 'Burger',
      deskripsi: 'Burger daging sapi',
      gambar: undefined,
      rating: 4.5,
      harga: 12000,
      quantity: 2,
      distance: '2.0 km',
      status: 'proses',
    },
  ]);

  // Timer countdown effect
  useEffect(() => {
    if (activeTab === 'proses') {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev.seconds === 0) {
            if (prev.minutes === 0) {
              clearInterval(interval);
              return prev;
            }
            return { minutes: prev.minutes - 1, seconds: 59 };
          }
          return { ...prev, seconds: prev.seconds - 1 };
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const filteredItems = historyItems.filter(item => {
    if (activeTab === 'proses') {
      return item.status === 'proses';
    }
    return item.status === 'selesai' || item.status === 'dibatalkan';
  });

  const renderProsesView = () => {
    const processingItems = filteredItems.filter(item => item.status === 'proses');
    
    if (processingItems.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tidak ada pesanan dalam proses</Text>
        </View>
      );
    }

    return (
      <ScrollView 
        style={styles.prosesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.prosesContent}
      >
        {/* Timer Section */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {String(timer.minutes).padStart(2, '0')}:{' '}
            {String(timer.seconds).padStart(2, '0')}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLine}>
            <View style={[styles.progressLineFill, { width: '50%' }]} />
          </View>
          
          <View style={styles.progressSteps}>
            <View style={styles.stepContainer}>
              <View style={[styles.stepDot, styles.stepDotActive]} />
              <Text style={[styles.stepLabel, styles.stepLabelActive]}>Diterima</Text>
            </View>
            
            <View style={styles.stepContainer}>
              <View style={[styles.stepDot, orderStatus !== 'diterima' && styles.stepDotActive]} />
              <Text style={[styles.stepLabel, orderStatus !== 'diterima' && styles.stepLabelActive]}>Dimasak</Text>
            </View>
            
            <View style={styles.stepContainer}>
              <View style={[styles.stepDot, orderStatus === 'dikirim' && styles.stepDotActive]} />
              <Text style={[styles.stepLabel, orderStatus === 'dikirim' && styles.stepLabelActive]}>Dikirim</Text>
            </View>
          </View>
        </View>

        {/* Order Success Button */}
        <TouchableOpacity style={styles.successButton}>
          <Text style={styles.successButtonText}>Pesanan Berhasil</Text>
        </TouchableOpacity>

        {/* Order Items Grid */}
        <View style={styles.orderGrid}>
          {processingItems.map((item, index) => (
            <View key={item.id_order} style={styles.orderCard}>
              <View style={styles.orderImageContainer}>
                <Image
                  source={require('../assets/burger.jpg')}
                  style={styles.orderImage}
                  resizeMode="cover"
                />
              </View>
              
              <View style={styles.orderInfo}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderName}>{item.nama_menu}</Text>
                  <View style={styles.orderRating}>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.orderRatingText}>{item.rating}</Text>
                  </View>
                </View>
                
                <Text style={styles.orderDescription} numberOfLines={1}>
                  {item.deskripsi}
                </Text>
                
                <Text style={styles.orderPrice}>
                  Rp {item.harga?.toLocaleString('id-ID')}
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.orderActions}>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.favoriteButton}>
                  <Text style={styles.favoriteIcon}>♡</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

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

      {/* Content */}
      {activeTab === 'proses' ? (
        renderProsesView()
      ) : (
        <ScrollView 
          style={styles.historyList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.historyListContent}
        >
          {filteredItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Belum ada riwayat pesanan</Text>
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
      )}
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
  activeUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 4,
    backgroundColor: '#A6171B',
    borderRadius: 100,
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
  
  // Proses Tab Styles
  prosesContainer: {
    flex: 1,
  },
  prosesContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#A6171B',
    letterSpacing: 2,
  },
  progressContainer: {
    marginBottom: 32,
    position: 'relative',
  },
  progressLine: {
    position: 'absolute',
    top: 12,
    left: 50,
    right: 50,
    height: 3,
    backgroundColor: '#E0E0E0',
    zIndex: 0,
  },
  progressLineFill: {
    height: '100%',
    backgroundColor: '#A6171B',
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 1,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },
  stepDotActive: {
    backgroundColor: '#A6171B',
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginTop: 4,
  },
  stepLabelActive: {
    color: '#000',
    fontWeight: '700',
  },
  successButton: {
    backgroundColor: '#A6171B',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  successButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  orderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  orderCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  orderImageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  orderImage: {
    width: '100%',
    height: '100%',
  },
  orderInfo: {
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  orderRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  orderRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
  orderDescription: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#A6171B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#A6171B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
    color: '#A6171B',
  },

  // History List Styles
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