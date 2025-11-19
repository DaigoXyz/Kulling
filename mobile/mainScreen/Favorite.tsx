import { ChevronLeft, Heart } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

interface FavoriteItem {
  id_menu: number;
  nama_menu: string;
  deskripsi: string;
  harga: number;
  gambar?: string;
  rating: number;
  distance: string;
}

interface FavoriteScreenProps {
  navigation: any;
}

export default function FavoriteScreen({ navigation }: FavoriteScreenProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id_menu: 1,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      harga: 12000,
      gambar: undefined,
      rating: 4.9,
      distance: '2.0 km',
    },
    {
      id_menu: 2,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      harga: 12000,
      gambar: undefined,
      rating: 4.9,
      distance: '2.0 km',
    },
    {
      id_menu: 3,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      harga: 12000,
      gambar: undefined,
      rating: 4.9,
      distance: '2.0 km',
    },
    {
      id_menu: 4,
      nama_menu: 'Burger',
      deskripsi: 'Burger dengan daging sapi',
      harga: 12000,
      gambar: undefined,
      rating: 4.9,
      distance: '2.0 km',
    },
  ]);

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id_menu !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Background */}
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.header}
        resizeMode="cover"
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft 
            size={28}
            color="#FFFFFF"
            style={{ marginRight: -5, marginTop: 2 }}   // ini valid, karena ViewStyle
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kembali</Text>
      </ImageBackground>

      {/* Title with Delete All Button */}
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Favoritmu</Text>
        <View style={styles.redBox} /> 
      </View>

      {/* Favorites List */}
      <ScrollView 
        style={styles.favoriteList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.favoriteListContent}
      >
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada favorit</Text>
          </View>
        ) : (
          favorites.map((item) => (
            <View key={item.id_menu} style={styles.favoriteCard}>
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

              {/* Favorite Button */}
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={() => removeFavorite(item.id_menu)}
              >
                <Heart 
                  size={28}
                  color="#FF0007"
                  fill="#FF0007"     // ❤️ terisi (solid)
                />
              </TouchableOpacity>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
    redBox: {
  width: 16,
  height: 16,
  borderWidth: 2,
  borderColor: 'rgba(166, 23, 27, 1)',
  borderRadius: 3,
  backgroundColor: 'transparent',
  marginRight: 8,
},

  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#A6171B',
  },
  deleteAllIcon: {
    fontSize: 20,
  },
  favoriteList: {
    flex: 1,
  },
  favoriteListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  favoriteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F5F5F5',
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
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  starIcon: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: 12,
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
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  heartIcon: {
    fontSize: 24,
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