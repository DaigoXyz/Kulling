import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image?: string;
}

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Breakfast');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulasi data - nanti ganti dengan API call
    const dummyData: MenuItem[] = [
      {
        id: 1,
        name: 'Burger',
        description: 'lorem ipsum dolor sit',
        price: 12000,
        rating: 4.5,
        category: 'Breakfast',
      },
      {
        id: 2,
        name: 'Burger',
        description: 'lorem ipsum dolor sit',
        price: 12000,
        rating: 4.5,
        category: 'Breakfast',
      },
      {
        id: 3,
        name: 'Burger',
        description: 'lorem ipsum dolor sit',
        price: 12000,
        rating: 4.5,
        category: 'Breakfast',
      },
      {
        id: 4,
        name: 'Burger',
        description: 'lorem ipsum dolor sit',
        price: 12000,
        rating: 4.5,
        category: 'Breakfast',
      },
    ];
    setMenuItems(dummyData);
  }, []);

  const categories = ['Breakfast', 'Sides', 'Dessert', 'Drink'];

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      <View style={styles.menuImageContainer}>
        <Text style={styles.burgerEmoji}>🍔</Text>
      </View>
      
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        
        <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
      </View>

      <View style={styles.menuActions}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Text style={styles.favoriteIcon}>
            {favorites.includes(item.id) ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>🚚</Text>
          <View>
            <Text style={styles.brandName}>KULLING</Text>
            <Text style={styles.brandTagline}>STREET FOOD</Text>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>↗️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Location */}
        <Text style={styles.location}>Lokasi Anda: Jl. anggur</Text>

        {/* Voucher Banner */}
        <View style={styles.voucherBanner}>
          <View style={styles.voucherLeft}>
            <Text style={styles.voucherTitle}>VOUCHER</Text>
            <Text style={styles.voucherValue}>VALUE $50</Text>
            <Text style={styles.voucherCode}>Code: 123.4455.7890</Text>
          </View>
          <View style={styles.voucherRight}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.voucherImage}
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

        {/* Menu Grid */}
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.menuRow}
          contentContainerStyle={styles.menuGrid}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🤍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🕐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#B91C1C',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    fontSize: 32,
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
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  icon: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  location: {
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 14,
    color: '#B91C1C',
    fontWeight: '600',
  },
  voucherBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#B91C1C',
    borderStyle: 'dashed',
  },
  voucherLeft: {
    flex: 1,
  },
  voucherTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#B91C1C',
  },
  voucherValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginTop: 4,
  },
  voucherCode: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  voucherRight: {
    width: 120,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voucherImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 16,
    paddingTop: 20,
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
  },
  burgerEmoji: {
    fontSize: 50,
  },
  menuInfo: {
    marginBottom: 8,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
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
    marginBottom: 4,
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
    backgroundColor: '#B91C1C',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#B91C1C',
    paddingVertical: 12,
    paddingHorizontal: 32,
    justifyContent: 'space-around',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
});