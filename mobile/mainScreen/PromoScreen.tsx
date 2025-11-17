import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface VoucherCardProps {
  imageSource: any;
  title: string;
  expiryDate: string;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ imageSource, title, expiryDate }) => {
  return (
    <View style={styles.voucherCard}>
      {/* Voucher Image */}
      <Image 
        source={imageSource} 
        style={styles.voucherImage}
        resizeMode="cover"
      />
      
      {/* Voucher Info */}
      <View style={styles.voucherInfo}>
        <View style={styles.voucherDetails}>
          <Text style={styles.voucherTitle}>{title}</Text>
          <View style={styles.expiryContainer}>
            <Calendar color="#6B7280" size={14} />
            <Text style={styles.expiryText}>Berlaku hingga {expiryDate}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.lihatButton}>
          <Text style={styles.lihatButtonText}>Lihat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PromoVoucherScreen = () => {
  const navigation = useNavigation();

  // Data voucher - nanti bisa diganti dengan data dari API
  const vouchers = [
    {
      id: 1,
      imageSource: require('../assets/promo1.png'),
      title: 'Voucher Diskon 50%*',
      expiryDate: 'Nov 19, 2025',
    },
    {
      id: 2,
      imageSource: require('../assets/promo2.png'),
      title: 'Voucher Diskon 50%*',
      expiryDate: 'Nov 19, 2025',
    },
    {
      id: 3,
      imageSource: require('../assets/promo3.png'),
      title: 'Voucher Diskon 50%*',
      expiryDate: 'Nov 19, 2025',
    },
    {
      id: 4,
      imageSource: require('../assets/promo4.png'),
      title: 'Voucher Diskon 50%*',
      expiryDate: 'Nov 19, 2025',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
          <Text style={styles.backText}>Promo & Voucher</Text>
        </TouchableOpacity>
      </View>

      {/* Voucher List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {vouchers.map((voucher) => (
          <VoucherCard
            key={voucher.id}
            imageSource={voucher.imageSource}
            title={voucher.title}
            expiryDate={voucher.expiryDate}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    color: '#B91C1C',
    fontSize: 32,
    fontWeight: '300',
    marginRight: 4,
  },
  backText: {
    color: '#B91C1C',
    fontSize: 18,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  voucherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  voucherImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F3F4F6',
  },
  voucherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  voucherDetails: {
    flex: 1,
  },
  voucherTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
  },
  lihatButton: {
    backgroundColor: '#B91C1C',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 12,
  },
  lihatButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PromoVoucherScreen;