import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface DetailPesananProps {
  orderId?: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  ingredients?: string[];
}

export default function DetailPesananScreen({ orderId }: DetailPesananProps) {
  const [orderData] = useState({
    customerName: 'Darin',
    phone: '081234567345',
    address: 'Jl. Sudirman, no 123, Lubang buaya Jakarta timur',
    items: [
      {
        id: '1',
        name: 'Burger',
        quantity: 2,
        price: 42000,
        ingredients: ['Selada', 'Tomat', 'Daging Ayam', 'Keju'],
      },
      {
        id: '2',
        name: 'Es teh Manis',
        quantity: 3,
        price: 15000,
        ingredients: [],
      },
    ],
    stockAvailable: true,
    notes: 'Saus nya banyakin',
    totalPrice: 15000,
  });

  const handleStartCooking = () => {
    Alert.alert('Mulai Masak', 'Pesanan akan dimulai dimasak');
  };

  const handleCancelOrder = () => {
    Alert.alert('Batalkan Pesanan', 'Apakah Anda yakin ingin membatalkan pesanan ini?');
  };

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
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
        {/* Customer Info Card */}
        <View style={styles.customerCard}>
          {/* Nama */}
          <View style={styles.infoRow}>
            <Image
              source={require('../assets/kontak.png')}
              style={[styles.infoIcon, { tintColor: '#A6171B' }]}
              resizeMode="contain"
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nama</Text>
              <Text style={styles.infoValue}>{orderData.customerName}</Text>
            </View>
          </View>

          {/* Telepon */}
          <View style={styles.infoRow}>
            <Image
              source={require('../assets/telpon.png')}
              style={[styles.infoIcon, { tintColor: '#9A282B' }]}
              resizeMode="contain"
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Telepon</Text>
              <Text style={styles.infoValue}>{orderData.phone}</Text>
            </View>
          </View>

          {/* Alamat Pengiriman */}
          <View style={styles.infoRow}>
            <Image
              source={require('../assets/alamat.png')}
              style={[styles.infoIcon, { tintColor: '#9A282B' }]}
              resizeMode="contain"
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Alamat Pengiriman</Text>
              <Text style={styles.infoValue}>{orderData.address}</Text>
            </View>
          </View>
        </View>

        {/* Detail Pesanan Section */}
        <View style={styles.orderSection}>
          <Text style={styles.sectionTitle}>Detail Pesanan</Text>

          {/* Order Items */}
          <View style={styles.itemsList}>
            {orderData.items.map((item, index) => (
              <View key={item.id}>
                <View style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
                  </View>
                  <Text style={item.id === '1' ? styles.itemQuantity : styles.itemQuantity2}>x{item.quantity}</Text>
                  {item.ingredients && item.ingredients.length > 0 && (
                    <View style={styles.ingredientsContainer}>
                      <Text style={styles.ingredientsLabel}>Bahan yang digunakan :</Text>
                      {item.ingredients.map((ingredient, idx) => (
                        <Text key={idx} style={styles.ingredientItem}>• {ingredient}</Text>
                      ))}
                    </View>
                  )}
                </View>
                {index < orderData.items.length - 1 && (
                  <View style={styles.itemDivider} />
                )}
              </View>
            ))}
          </View>

          {/* Stock Status with Progress Bar */}
          <View style={styles.stockContainerWrapper}>
            <View style={styles.stockContainer}>
              <Image
                source={require('../assets/pesanan2.png')}
                style={[styles.stockIcon, { tintColor: '#E7A036' }]}
                resizeMode="contain"
              />
              <View style={styles.stockTextContainer}>
                <Text style={styles.stockTitle}>Stock Tersedia!</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>

          {/* Notes */}
          <View style={styles.notesContainer}>
            <Image
              source={require('../assets/catatan.png')}
              style={styles.notesIcon}
              resizeMode="contain"
            />
            <View style={styles.notesTextContainer}>
              <Text style={styles.notesTitle}>Catatan Pelanggan</Text>
              <Text style={styles.notesText}>{orderData.notes}</Text>
            </View>
          </View>

          {/* Total Pembayaran */}
          <View style={styles.totalContainerWrapper}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Pembayaran</Text>
              <Text style={styles.totalPrice}>{formatCurrency(orderData.totalPrice)}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartCooking}
              activeOpacity={0.8}
            >
              <Image
                source={require('../assets/pesanan2.png')}
                style={[styles.buttonIcon, { tintColor: '#FFFFFF' }]}
                resizeMode="contain"
              />
              <Text style={styles.startButtonText}>Selesai Masak siap di kirim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 30,
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#A6171B',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 11,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  orderSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins',
    marginBottom: 16,
  },
  itemsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  itemCard: {
    padding: 16,
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#C3C3C3',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  itemQuantity: {
    fontSize: 10,
    fontWeight: '600',
    color: '#818181',
    fontFamily: 'Poppins',
    marginBottom: 8,
  },
  itemQuantity2: {
    fontSize: 10,
    fontWeight: '600',
    color: '#888989',
    fontFamily: 'Poppins',
    marginBottom: 8,
  },
  ingredientsContainer: {
    backgroundColor: 'rgba(129, 129, 129, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  ingredientsLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#818181',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  ingredientItem: {
    fontSize: 9,
    fontWeight: '400',
    color: '#818181',
    fontFamily: 'Poppins',
    marginLeft: 8,
  },
  stockContainerWrapper: {
    backgroundColor: '#FFF3D4',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  stockIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  stockTextContainer: {
    flex: 1,
  },
  stockTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#AB6B09',
    fontFamily: 'Poppins',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'transparent',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    width: '75%',
    backgroundColor: '#FDB400',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#D2F2FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  notesIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginTop: 2,
  },
  notesTextContainer: {
    flex: 1,
  },
  notesTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007CAD',
    fontFamily: 'Poppins',
    marginBottom: 2,
  },
  notesText: {
    fontSize: 9,
    fontWeight: '400',
    color: '#007CAD',
    fontFamily: 'Poppins',
  },
  totalContainerWrapper: {
    backgroundColor: '#EEEFF0',
    borderRadius: 12,
    marginBottom: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#952326',
    fontFamily: 'Poppins',
  },
  buttonsContainer: {
    gap: 12,
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#952326',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 79, 84, 0.21)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DD191E',
    fontFamily: 'Poppins',
  },
});