import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';

interface DashboardPetugasProps {
  user: any;
}
interface Order {
  id: string;
  orderNumber: string;
  itemCount: number;
  totalPrice: number;
  status: 'terkirim' | 'menunggu' | 'sedang_dimasak';
  statusLabel: string;
  statusColor: string;
}

interface Stats {
  totalOrders: number;
  orderGrowth: string;
  totalRevenue: number;
  revenueGrowth: string;
}

export default function DashboardPetugasScreen({ user }: DashboardPetugasProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 148,
    orderGrowth: '+12%',
    totalRevenue: 135000000,
    revenueGrowth: '+8%',
  });
  const [loading, setLoading] = useState(false);

  // URL API - sesuaikan dengan URL backend Anda
  const API_URL = 'http://10.250.92.124:3000/api/orders';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Uncomment ketika API sudah siap
      // const response = await axios.get(API_URL);
      // setOrders(response.data);
      
      // Data dummy untuk testing
      const dummyOrders: Order[] = [
        {
          id: '1',
          orderNumber: '#ORD-001',
          itemCount: 3,
          totalPrice: 135000,
          status: 'terkirim',
          statusLabel: 'Terkirim',
          statusColor: '#10B981',
        },
        {
          id: '2',
          orderNumber: '#ORD-001',
          itemCount: 3,
          totalPrice: 135000,
          status: 'menunggu',
          statusLabel: 'Menunggu',
          statusColor: '#EF4444',
        },
        {
          id: '3',
          orderNumber: '#ORD-001',
          itemCount: 3,
          totalPrice: 135000,
          status: 'sedang_dimasak',
          statusLabel: 'Sedang di masak',
          statusColor: '#F59E0B',
        },
      ];
      setOrders(dummyOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Gagal mengambil data pesanan');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderPress = (orderId: string) => {
    // Navigate to order detail screen
    console.log('Order pressed:', orderId);
  };

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const formatRevenue = (amount: number) => {
    if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(0)} Jt`;
    }
    return formatCurrency(amount);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Background Image */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/background.png')}
          style={styles.headerBackground}
          resizeMode="cover"
        />
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Image
                source={require('../assets/logo1.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconButton}>
                <Image
                  source={require('../assets/lonceng.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Image
                  source={require('../assets/keranjang.png')}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {/* Total Pesanan Card */}
          <View style={styles.statsCard}>
            <View style={styles.statsIconContainer}>
              <Text style={styles.statsIcon}>📦</Text>
            </View>
            <View style={styles.statsGrowth}>
              <Text style={styles.statsGrowthText}>{stats.orderGrowth}</Text>
            </View>
            <Text style={styles.statsValue}>{stats.totalOrders}</Text>
            <Text style={styles.statsLabel}>Total Pesanan</Text>
          </View>

          {/* Pendapatan Card */}
          <View style={styles.statsCard}>
            <View style={styles.statsIconContainer}>
              <Text style={styles.statsIcon}>💰</Text>
            </View>
            <View style={styles.statsGrowth}>
              <Text style={styles.statsGrowthText}>{stats.revenueGrowth}</Text>
            </View>
            <Text style={styles.statsValue}>{formatRevenue(stats.totalRevenue)}</Text>
            <Text style={styles.statsLabel}>Pendapatan</Text>
          </View>
        </View>

        {/* Pesanan Masuk Section */}
        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>Pesanan Masuk</Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#B91C1C" />
            </View>
          ) : orders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Belum ada pesanan masuk</Text>
            </View>
          ) : (
            <View style={styles.ordersList}>
              {orders.map((order) => (
                <TouchableOpacity
                  key={order.id}
                  style={styles.orderCard}
                  onPress={() => handleOrderPress(order.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.orderHeader}>
                    <View style={styles.orderTitleContainer}>
                      <Text style={styles.orderTitle}>Darin</Text>
                      <View style={[styles.statusBadge, { backgroundColor: order.statusColor }]}>
                        <Text style={styles.statusText}>{order.statusLabel}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.arrowButton}>
                      <Text style={styles.arrowIcon}>›</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.orderNumber}>
                    {order.orderNumber} {order.itemCount} Item
                  </Text>
                  
                  <Text style={styles.orderPrice}>
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <SafeAreaView edges={['bottom']} style={styles.safeBottomArea}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require('../assets/homee.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require('../assets/history.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require('../assets/account.png')}
              style={styles.navIconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    position: 'relative',
    height: 140,
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8,
  },
  logo: {
    width: 210,
    height: 85,
    marginTop: 8,
    marginLeft: -12,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statsIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsIcon: {
    fontSize: 24,
  },
  statsGrowth: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statsGrowthText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
  },
  statsValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#B91C1C',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  ordersSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  ordersList: {
    gap: 12,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  arrowButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 28,
    color: '#D1D5DB',
    fontWeight: '300',
  },
  orderNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B91C1C',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  safeBottomArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#A6171B',
    paddingVertical: 12,
    paddingHorizontal: 32,
    justifyContent: 'space-around',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navIconImage: {
    width: 28,
    height: 28,
  },
});