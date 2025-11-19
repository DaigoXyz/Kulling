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
import { Check, Clock, ChefHat, ChevronRight, Package, DollarSign,
   ShoppingBasket, Bell, Archive } from "lucide-react-native";
import axios from 'axios';
import { API_ORDERS, BASE_URL } from '../config/api';

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
  statusBgColor: string;
  statusIcon: any;
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Uncomment ketika API sudah siap
      // const response = await axios.get(API_ORDERS);
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
        statusColor: '#00751E',
        statusBgColor: '#CEFBDA',
        statusIcon: "check",
      },
      {
        id: '2',
        orderNumber: '#ORD-001',
        itemCount: 3,
        totalPrice: 135000,
        status: 'menunggu',
        statusLabel: 'Menunggu',
        statusColor: '#CA6539',
        statusBgColor: '#FFDBCB',
        statusIcon: "clock",
      },
      {
        id: '3',
        orderNumber: '#ORD-001',
        itemCount: 3,
        totalPrice: 135000,
        status: 'sedang_dimasak',
        statusLabel: 'Sedang di masak',
        statusColor: '#BE7200',
        statusBgColor: '#FFE5A7',
        statusIcon: "ChefHat",
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
                <Bell
                  size={24}
                  color="#FFFFFF"
                  strokeWidth={1.5}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <ShoppingBasket
                  size={24}
                  color="#FFFFFF"
                  strokeWidth={1.5}
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
            <Package
              size={48}
              color="#9A282B"
              strokeWidth={1.5}
            />
            <Text style={styles.statsGrowthText}>{stats.orderGrowth}</Text>
            <Text style={styles.statsValue}>{stats.totalOrders}</Text>
            <Text style={styles.statsLabel}>Total Pesanan</Text>
          </View>

          {/* Pendapatan Card */}
          <View style={styles.statsCard}>
            <DollarSign
              size={48}
              color="#982629"
              strokeWidth={1.5}
            />
            <Text style={styles.statsGrowthText}>{stats.revenueGrowth}</Text>
            <Text style={styles.statsValueRevenue}>{formatRevenue(stats.totalRevenue)}</Text>
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
                      <View style={[styles.statusBadge, { backgroundColor: order.statusBgColor }]}>
                        {order.statusIcon === "check" && (
                          <Check size={14} color={order.statusColor} strokeWidth={3} />
                        )}
                        {order.statusIcon === "clock" && (
                          <Clock size={14} color={order.statusColor} strokeWidth={3} />
                        )}
                        {order.statusIcon === "ChefHat" && (
                          <ChefHat size={14} color={order.statusColor} strokeWidth={3} />
                        )}

                        <Text style={[styles.statusText, { color: order.statusColor }]}>
                          {order.statusLabel}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.arrowButton}>
                      <ChevronRight
                        size={24}
                        color="#818181"
                        strokeWidth={3}
                      />
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
            <ChefHat
              size={28}
              color="#FFFFFF"
              strokeWidth={1.5}
            />
            <Text style={styles.navLabel}>Pesanan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Archive
              size={28}
              color="#FFFFFF"
              strokeWidth={1.5}
            />
            <Text style={styles.navLabel}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Package
              size={28}
              color="#FFFFFF"
              strokeWidth={1.5}
            />
            <Text style={styles.navLabel}>Bahan</Text>
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
  statsIconImage: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  statsGrowthText: {
    position: 'absolute',
    top: 16,
    right: 16,
    fontSize: 10,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  statsValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#9A282B',
    marginBottom: 4,
    fontFamily: 'Poppins',
  },
  statsValueRevenue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#982629',
    marginBottom: 4,
    fontFamily: 'Poppins',
  },
  statsLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  ordersSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusIcon: {
    width: 16,
    height: 16,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  arrowButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIconImage: {
    width: 24,
    height: 24,
    tintColor: '#818181',
  },
  orderNumber: {
    fontSize: 10,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#982629',
    fontFamily: 'Poppins',
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
    backgroundColor: '#952326',
    paddingVertical: 12,
    paddingHorizontal: 32,
    justifyContent: 'space-around',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navIconImage: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF',
  },
  navLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
});