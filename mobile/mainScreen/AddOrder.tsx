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

interface ProductDetailProps {
  navigation: any;
  route: {
    params: {
      product: {
        id_menu: number;
        nama_menu: string;
        deskripsi: string;
        harga: number;
        gambar?: string;
        rating?: number;
        ingredients?: string;
        estimatedTime?: string;
      };
    };
  };
}

export default function ProductDetailScreen({ navigation, route }: ProductDetailProps) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  const addToCart = () => {
    // Di sini Anda bisa implementasi logic untuk menambahkan ke cart
    // Misalnya menggunakan Context API atau Redux
    Alert.alert(
      'Berhasil',
      `${product.nama_menu} (${quantity}x) telah ditambahkan ke keranjang`,
      [
        {
          text: 'Lanjut Belanja',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'Lihat Keranjang',
          onPress: () => navigation.navigate('Cart'),
        },
      ]
    );
  };

  const totalPrice = product.harga * quantity;

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

        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '♡'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={
                product.gambar
                ? { uri: `http://10.250.92.96:3000${product.gambar}` }
                : require('../assets/burger.jpg')
            }
            style={styles.productImage}
            resizeMode="contain"
            />
                    
          {/* Decorative elements - splash effects */}
          <Image
            source={require('../assets/burger.jpg')}
            style={styles.splashLeft}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/burger.jpg')}
            style={styles.splashRight}
            resizeMode="contain"
          />
        </View>

        {/* Rating & Quantity Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.ratingBadge}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.ratingText}>{product.rating || 4.8}</Text>
          </View>

          <View style={styles.quantityControl}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={decreaseQuantity}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantityValue}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={increaseQuantity}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Name */}
        <Text style={styles.productName}>{product.nama_menu}</Text>

        {/* Estimated Time */}
        <View style={styles.timeContainer}>
          <Text style={styles.clockIcon}>🕐</Text>
          <Text style={styles.timeText}>
            {product.estimatedTime || '10 -15 Mins'}
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.descriptionText}>{product.deskripsi}</Text>

        {/* Ingredients Section */}
        <View style={styles.ingredientsSection}>
          <Text style={styles.sectionTitle}>Ingredient</Text>
          <Text style={styles.ingredientsText}>
            {product.ingredients || 'Daging Ayam, cabai, selada, saus cabai, tomat,dll'}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Harga</Text>
          <Text style={styles.priceValue}>
            Rp {totalPrice.toLocaleString('id-ID')}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={addToCart}
        >
          <Text style={styles.addButtonText}>Tambah</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
    fontWeight: '600',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#A6171B',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  productImage: {
    width: 250,
    height: 250,
    zIndex: 2,
  },
  splashLeft: {
    position: 'absolute',
    left: 20,
    top: 60,
    width: 60,
    height: 60,
    opacity: 0.3,
    transform: [{ rotate: '-45deg' }],
  },
  splashRight: {
    position: 'absolute',
    right: 20,
    top: 40,
    width: 50,
    height: 50,
    opacity: 0.3,
    transform: [{ rotate: '30deg' }],
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  starIcon: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A6171B',
    borderRadius: 25,
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A6171B',
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    minWidth: 24,
    textAlign: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 20,
    marginBottom: 8,
    lineHeight: 32,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 6,
  },
  clockIcon: {
    fontSize: 14,
  },
  timeText: {
    fontSize: 14,
    color: '#A6171B',
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 24,
    lineHeight: 20,
  },
  ingredientsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  ingredientsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 30,
  },
  priceContainer: {
    flex: 1,
    marginRight: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A6171B',
  },
  addButton: {
    backgroundColor: '#A6171B',
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 25,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});