import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { ChevronLeft, MapPin, FileText, Minus, Plus, ChevronRight, BadgePercent, X } from 'lucide-react-native';

export default function OrderDetail() {
  const [quantity, setQuantity] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState('Tunai');
  const [modalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [savedNote, setSavedNote] = useState('');
  
  const pricePerItem = 12000;
  const shippingCost = 10000;
  const totalPrice = (pricePerItem * quantity) + shippingCost;

  const handleSaveNote = () => {
    setSavedNote(noteText);
    setModalVisible(false);
  };

  const handleCancelNote = () => {
    setNoteText(savedNote);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C4332A" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft color="#FFF" size={26} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kembali</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <Text style={styles.mainTitle}>Isi dulu</Text>

        {/* Address Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>Alamat Pengantaran</Text>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Ganti Alamat</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.addressTitle}>Rumah</Text>
          <Text style={styles.addressText}>jl. lubang buaya, no 11, rt 06 rw 07</Text>
          
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionButton}>
              <MapPin size={14} color="#000" />
              <Text style={styles.actionButtonText}>Isi detail alamat</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <FileText size={14} color="#000" />
              <Text style={styles.actionButtonText}>Catatan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Card */}
        <View style={styles.card}>
          <View style={styles.productContainer}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Burger</Text>
              <Text style={styles.productPrice}>
                {pricePerItem.toLocaleString('id-ID')}
              </Text>
            </View>
            
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' }}
              style={styles.productImage}
            />
          </View>

          <TouchableOpacity 
            style={styles.noteButton}
            onPress={() => setModalVisible(true)}
          >
            <FileText size={14} color="#000" />
            <Text style={styles.noteButtonText}>Catatan</Text>
          </TouchableOpacity>

          {savedNote ? (
            <View style={styles.savedNoteContainer}>
              <Text style={styles.savedNoteLabel}>Catatan:</Text>
              <Text style={styles.savedNoteText}>{savedNote}</Text>
            </View>
          ) : null}

          {/* Quantity Controls */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <View style={styles.minusButton}>
                <Minus size={18} color="#A6171B" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <View style={styles.plusButton}>
                <Plus size={18} color="#FFF" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.addMoreContainer}>
            <View style={styles.addMoreTextContainer}>
              <Text style={styles.addMoreText}>Ada lagi yang mau di beli?</Text>
              <Text style={styles.addMoreSubtext}>Masih bisa nambah menu lain, ya.</Text>
            </View>
            
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Tambah</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.card}>
          <Text style={styles.summaryTitle}>Ringkasan pembayaran</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Harga</Text>
            <Text style={styles.summaryValue}>
              {(pricePerItem * quantity).toLocaleString('id-ID')}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Biaya Penanganan dan Pengiriman</Text>
            <Text style={styles.summaryValue}>
              {shippingCost.toLocaleString('id-ID')}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Metode pembayaran</Text>
            <TouchableOpacity 
              style={styles.cashButton}
              onPress={() => {
                if (paymentMethod === 'Tunai') setPaymentMethod('QRIS');
                else if (paymentMethod === 'QRIS') setPaymentMethod('GoPay');
                else setPaymentMethod('Tunai');
              }}
            >
              <Text style={styles.cashButtonText}>{paymentMethod}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total pembayaran</Text>
            <Text style={styles.totalValue}>
              {totalPrice.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        {/* Promo Card */}
        <View style={styles.promoCard}>
          <View style={styles.warningSection}>
            <View style={styles.warningContent}>
              <View style={styles.warningIconContainer}>
                <BadgePercent size={20} color="#FFF" />
              </View>

              <View style={styles.warningTextContainer}>
                <Text style={styles.warningText}>
                  <Text style={styles.warningBold}>Diskon ongkir 11,5rb.{'\n'}</Text>
                  <Text style={styles.warningSubtext}>Promo terbaik untukmu</Text>
                </Text>
              </View>

              <TouchableOpacity style={styles.pakaiButton}>
                <Text style={styles.pakaiButtonText}>Pakai</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.promoLinkContainer}>
            <Text style={styles.promoLinkText}>Cek promo lainnya</Text>
            <ChevronRight size={20} color="#A6171B" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Pesan dan antar sekarang</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Catatan */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancelNote}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleCancelNote}
          >
            <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Tambah catatan untuk pembelian</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={handleCancelNote}
                >
                  <X size={24} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Text Input */}
              <TextInput
                style={styles.textInput}
                placeholder="Contoh: Extra pedas ya!"
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                value={noteText}
                onChangeText={setNoteText}
                autoFocus
              />

              {/* Save Button */}
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveNote}
              >
                <Text style={styles.saveButtonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6D3',
  },
  headerContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'flex-end',
    backgroundColor: '#A6171B',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
    marginRight: 0,
    marginBottom: 5,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#A6171B',
    marginTop: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '400',
  },
  changeButton: {
    borderWidth: 1,
    borderColor: '#A6171B',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  changeButtonText: {
    color: '#A6171B',
    fontSize: 11,
    fontWeight: '500',
  },
  addressTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 3,
  },
  addressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    lineHeight: 16,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 6,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 11,
    color: '#000',
    fontWeight: '400',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 13,
    color: '#666',
    fontWeight: '400',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  noteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  noteButtonText: {
    fontSize: 11,
    color: '#000',
    fontWeight: '400',
  },
  savedNoteContainer: {
    backgroundColor: '#FFF9E6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#A6171B',
  },
  savedNoteLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#A6171B',
    marginBottom: 4,
  },
  savedNoteText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 14,
    gap: 20,
  },
  quantityButton: {
    padding: 0,
  },
  minusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#A6171B',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#A6171B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    minWidth: 20,
    textAlign: 'center',
  },
  addMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  addMoreTextContainer: {
    flex: 1,
  },
  addMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  addMoreSubtext: {
    fontSize: 11,
    color: '#666',
    lineHeight: 15,
  },
  addButton: {
    backgroundColor: '#A6171B',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    lineHeight: 16,
  },
  summaryValue: {
    fontSize: 12,
    color: '#000',
    fontWeight: '400',
  },
  cashButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#A6171B',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  cashButtonText: {
    fontSize: 11,
    color: '#A6171B',
    fontWeight: '400',
  },
  totalRow: {
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  promoCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  warningSection: {
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#E8ADA6',
  },
  warningContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  warningIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 16,
    backgroundColor: '#FF0007',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningTextContainer: {
    flex: 1,
  },
  warningText: {
    fontSize: 13,
    color: '#000',
    lineHeight: 18,
  },
  warningBold: {
    fontWeight: '700',
    color: '#000',
  },
  warningSubtext: {
    fontWeight: '400',
    color: '#000',
  },
  pakaiButton: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#A6171B',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  pakaiButtonText: {
    color: '#A6171B',
    fontSize: 12,
    fontWeight: '700',
  },
  promoLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  promoLinkText: {
    fontSize: 13,
    color: '#A6171B',
    fontWeight: '700',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F5E6D3',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopWidth: 0,
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: '#A6171B',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
    minHeight: 350,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#000',
    minHeight: 150,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  saveButton: {
    backgroundColor: '#A6171B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});