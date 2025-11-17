import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface CartItem {
  id_menu: number;
  nama_menu: string;
  deskripsi: string;
  harga: number;
  gambar?: string;
  quantity: number;
}

interface CartScreenProps {
  navigation: any;
}

export default function CartScreen({ navigation }: CartScreenProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id_menu: 1,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      harga: 12000,
      gambar: undefined,
      quantity: 2,
    },
    {
      id_menu: 2,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      harga: 12000,
      gambar: undefined,
      quantity: 2,
    },
    {
      id_menu: 3,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      harga: 12000,
      gambar: undefined,
      quantity: 2,
    },
    {
      id_menu: 4,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      harga: 12000,
      gambar: undefined,
      quantity: 2,
    },
    {
      id_menu: 5,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      harga: 12000,
      gambar: undefined,
      quantity: 2,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id_menu === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(0, newQuantity) };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    Alert.alert(
      'Hapus Item',
      'Apakah Anda yakin ingin menghapus item ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => setCartItems(prev => prev.filter(item => item.id_menu !== id)),
        },
      ]
    );
  };

  const totalItem = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.harga * item.quantity), 0);
  const ppn = 1000;
  const totalBiaya = subtotal + ppn;

  // Update handleCheckout untuk navigasi ke orderDetail
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Keranjang Kosong', 'Silakan tambahkan item terlebih dahulu');
      return;0
    }
    
    // Navigasi ke orderDetail dengan membawa data cartItems
    navigation.navigate('OrderDetail', {
      cartItems: cartItems,
      subtotal: subtotal,
      ppn: ppn,
      totalBiaya: totalBiaya,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.header}
        resizeMode="cover"
        >
        <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kembali</Text>
    </ImageBackground>

      {/* Title */}
      <Text style={styles.pageTitle}>Pesananmu!</Text>

      {/* Cart Items */}
      <ScrollView 
        style={styles.cartList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cartListContent}
      >
        {cartItems.map((item) => (
          <View key={item.id_menu} style={styles.cartCard}>
            <View style={styles.cartItemContent}>
              {/* Product Image */}
              <View style={styles.productImageContainer}>
                <Image
                  source={require('../assets/burger.jpg')}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>

              {/* Product Info */}
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.nama_menu}</Text>
                <Text style={styles.productDescription}>{item.deskripsi}</Text>

                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id_menu, -1)}
                  >
                    <Text style={styles.quantityButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id_menu, 1)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => Alert.alert('Edit', 'Fitur edit item')}
                >
                  <Image
                    source={require('../assets/edit.png')}
                    style={styles.actionIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => removeItem(item.id_menu)}
                >
                  <Image
                    source={require('../assets/delete.png')}
                    style={styles.actionIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Price */}
            <Text style={styles.itemPrice}>
              Rp{(item.harga * item.quantity).toLocaleString('id-ID')}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Item</Text>
          <Text style={styles.summaryValue}>Rp{subtotal.toLocaleString('id-ID')}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>PPN</Text>
          <Text style={styles.summaryValue}>Rp{ppn.toLocaleString('id-ID')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Biaya</Text>
          <Text style={styles.totalValue}>Rp{totalBiaya.toLocaleString('id-ID')}</Text>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Bayar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE1D8',
  },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#A6171B',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  cartList: {
    flex: 1,
  },
  cartListContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productImage: {
    width: 60,
    height: 60,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#A6171B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#A6171B',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    minWidth: 20,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 8,
    marginLeft: 8,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: 18,
    height: 18,
    tintColor: '#A6171B',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D4AF37',
    textAlign: 'right',
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: '#A6171B',
    borderRadius: 25,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});