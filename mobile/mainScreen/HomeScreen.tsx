import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { House, ShoppingBasket, Heart, Search, Bell, LogOut, UserRound, ClockFading } from "lucide-react-native";
import axios from 'axios';

interface MenuItem {
  id_menu: number;
  nama_menu: string;
  deskripsi: string;
  harga: number;
  gambar?: string;
  rating?: number;
  category?: string;
}

interface HomeScreen {
  user: any;
}

export default function HomeScreen({ user, navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState('Breakfast');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://192.168.137.1:3000/api/menu';

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      // Tambahkan rating dummy untuk setiap menu
      const menuWithRating = response.data.map((item: MenuItem) => ({
        ...item,
        rating: item.rating || 4.5, // Default rating 4.5 jika tidak ada
      }));
      setMenuItems(menuWithRating);
    } catch (error) {
      console.error('Error fetching menu:', error);
      Alert.alert('Error', 'Gagal mengambil data menu dari server');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Breakfast', 'Sides', 'Dessert', 'Drink'];

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (item: MenuItem) => {
    // Navigasi ke ProductDetail dengan data produk
    navigation.navigate('AddOrder', {
      product: {
        id_menu: item.id_menu,
        nama_menu: item.nama_menu,
        deskripsi: item.deskripsi,
        harga: item.harga,
        gambar: item.gambar,
        rating: item.rating,
        ingredients: 'Daging Ayam, cabai, selada, saus cabai, tomat, dll',
        estimatedTime: '10 -15 Mins',
      }
    });
  };

  // Filter menu berdasarkan search query
  const filteredMenuItems = menuItems.filter(item =>
    item.nama_menu.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      <View style={styles.menuImageContainer}>
        {item.gambar ? (
          <Image
            source={{ uri: `http://192.168.137.1:3000${item.gambar}` }}
            style={styles.menuImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.burgerEmoji}>🍔</Text>
        )}
      </View>

      <View style={styles.menuInfo}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuName} numberOfLines={1}>
            {item.nama_menu}
          </Text>
          {item.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          )}
        </View>

        <Text style={styles.menuDescription} numberOfLines={2}>
          {item.deskripsi}
        </Text>
        <Text style={styles.price}>Rp {item.harga.toLocaleString('id-ID')}</Text>
      </View>

      <View style={styles.menuActions}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id_menu)}
        >
          <Heart
            size={20}
            color={favorites.includes(item.id_menu) ? '#FF0000' : '#A6171B'}
            strokeWidth={1.5}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
                  size={22}
                  color="#FFFFFF"
                  strokeWidth={2}
                />
              </TouchableOpacity>
               <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => navigation.navigate('Cart')}
              >
                <ShoppingBasket
                  size={24}
                  color="#FFFFFF"
                  strokeWidth={2}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <LogOut
                  size={22}
                  color="#FFFFFF"
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar Inside Header */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.searchIconButton}>
                <Search
                  size={20}
                  color="#B91C1C"
                  strokeWidth={3.5}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Location */}
        <Text style={styles.location}>Lokasi Anda: Jl. anggur</Text>

        {/* Voucher Banner */}
        <View style={styles.voucherBanner}>
          <View style={styles.voucherWrapper}>
            <Image
              source={require('../assets/promo1.png')}
              style={styles.voucherPicture}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Category */}
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Loading Indicator */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#B91C1C" />
            <Text style={styles.loadingText}>Memuat menu...</Text>
          </View>
        ) : filteredMenuItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Menu tidak ditemukan' : 'Belum ada menu tersedia'}
            </Text>
          </View>
        ) : (
          /* Menu Grid */
          <FlatList
            data={filteredMenuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id_menu.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.menuRow}
            contentContainerStyle={styles.menuGrid}
          />
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <SafeAreaView edges={['bottom']} style={styles.safeBottomArea}>
        
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <House
            size={28}
            color="#FFFFFF"
            strokeWidth={2}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Favorite')}
        >
          <Heart
            size={28}
            color="#FFFFFF"
            strokeWidth={2}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('History')}
        >
          <ClockFading
            size={28}
            color="#FFFFFF"
            strokeWidth={2}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <UserRound
            size={28}
            color="#FFFFFF"
            strokeWidth={2}
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
    backgroundColor: '#EAE1D8',
  },
  headerContainer: {
    position: 'relative',
    height: 160,
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
    marginBottom: 16,
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
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 2,
  },
  brandTagline: {
    fontSize: 10,
    color: '#FFF',
    letterSpacing: 1,
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
  searchContainer: {
    paddingHorizontal: 0,
  },
  searchInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    padding: 0,
  },
  searchIconButton: {
    marginLeft: 8,
  },
  searchIconImage: {
    width: 20,
    height: 20,
  },
  location: {
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 14,
    color: '#B91C1C',
    fontWeight: '600',
  },
  voucherBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 130,
  },
  voucherWrapper: {
    width: '100%',
    height: '100%',
  },
  voucherPicture: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#B91C1C',
  },
  categoryButtonActive: {
    backgroundColor: '#B91C1C',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B91C1C',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  filterButton: {
    backgroundColor: '#FFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B91C1C',
  },
  filterIcon: {
    fontSize: 18,
    color: '#B91C1C',
  },
  menuGrid: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 80,
  },
  menuRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  menuCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  menuImageContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  menuImage: {
    width: '100%',
    height: '100%',
  },
  burgerEmoji: {
    fontSize: 50,
  },
  menuInfo: {
    marginBottom: 8,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  star: {
    fontSize: 14,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B91C1C',
  },
  menuActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#A6171B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  favoriteButton: {
    backgroundColor: '#D9D9D9',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIconImage: {
    width: 20,
    height: 20,
    tintColor: '#A6171B',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
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