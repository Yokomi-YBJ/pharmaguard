import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { Card, Badge } from '../components/UI';
import { pharmacies } from '../data/mockData';

export default function MedicationDetailScreen({ route, navigation }) {
  const { medication } = route.params;
  const [fav, setFav] = useState(false);

  const availablePharmacies = pharmacies.filter((p) => medication.pharmacies.includes(p.id));

  const stockLabel = { available: '● Disponible', low: '● Stock bas', out: '● Indisponible' };

  return (
    <View style={s.container}>
      {/* Hero header */}
      <View style={s.hero}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={Colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={s.favBtn} onPress={() => setFav(!fav)}>
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={16} color={Colors.neonRed} />
        </TouchableOpacity>
        <Text style={s.heroEmoji}>💊</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Title */}
        <View style={s.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.title}>{medication.name}</Text>
            <Text style={s.sub}>{medication.type} · {medication.prescription ? 'Ordonnance' : 'Générique'}</Text>
          </View>
          <Badge type={medication.stock} label={stockLabel[medication.stock]} />
        </View>

        {/* Price */}
        <Card style={s.priceCard}>
          <Text style={s.priceLabel}>Prix moyen Ngaoundéré</Text>
          <Text style={s.price}>{medication.price}</Text>
        </Card>

        {/* Infos */}
        <Text style={s.sectionLabel}>Informations</Text>
        <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
          {[
            { label: 'Sans ordonnance', value: medication.prescription ? 'NON' : 'OUI', valueType: medication.prescription ? 'out' : 'available' },
            { label: 'Dosage adulte', value: medication.dosage },
            { label: 'Classe', value: medication.class },
          ].map((row, i) => (
            <View key={row.label} style={[s.infoRow, i < 2 && s.infoBorder]}>
              <Text style={s.infoLabel}>{row.label}</Text>
              {row.valueType ? (
                <Badge type={row.valueType} label={row.value} small />
              ) : (
                <Text style={s.infoValue}>{row.value}</Text>
              )}
            </View>
          ))}
        </Card>

        {/* Available pharmacies */}
        <Text style={s.sectionLabel}>
          Disponible dans ({availablePharmacies.length})
        </Text>
        {availablePharmacies.length === 0 ? (
          <Card>
            <Text style={{ color: Colors.textSecondary, textAlign: 'center' }}>
              Aucune pharmacie disponible actuellement
            </Text>
          </Card>
        ) : (
          availablePharmacies.map((p) => (
            <Card key={p.id} leftBorder="green" style={s.pharmaCard}>
              <View style={s.pharmaRow}>
                <View style={{ flex: 1 }}>
                  <Text style={s.pharmaName}>{p.name}</Text>
                  <Text style={s.pharmaSub}>
                    📍 {p.distance} · Stock: {medication.pharmacies.includes(p.id) ? `${medication.stockCount} boîtes` : '—'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={s.callBtn}
                  onPress={() => Linking.openURL(`tel:${p.phone.replace(/\s/g, '')}`)}
                >
                  <Text style={s.callBtnText}>Appeler</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}

        {/* Warning */}
        <View style={s.warningBox}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.neonGold} style={{ marginTop: 1 }} />
          <Text style={s.warningText}>{medication.warning}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  hero: {
    height: 140,
    background: '#0d1f35',
    backgroundColor: 'rgba(0,229,255,0.06)',
    borderBottomWidth: 1, borderBottomColor: Colors.borderStd,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative', paddingTop: 40,
  },
  backBtn: {
    position: 'absolute', top: 48, left: 16,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderColor: Colors.borderStd,
    alignItems: 'center', justifyContent: 'center',
  },
  favBtn: {
    position: 'absolute', top: 48, right: 16,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderColor: Colors.borderStd,
    alignItems: 'center', justifyContent: 'center',
  },
  heroEmoji: { fontSize: 52 },
  scroll: { padding: 16, paddingBottom: 40 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  sub: { fontSize: 13, color: Colors.textSecondary },
  priceCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  priceLabel: { fontSize: 12, color: Colors.textSecondary },
  price: { fontSize: 18, fontWeight: '700', color: Colors.neonGreen, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  sectionLabel: {
    fontSize: 13, fontWeight: '600', color: Colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  infoBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderStd },
  infoLabel: { fontSize: 13, color: Colors.textSecondary },
  infoValue: { fontSize: 12, color: Colors.textPrimary },
  pharmaCard: { marginBottom: 8 },
  pharmaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pharmaName: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: 3 },
  pharmaSub: { fontSize: 12, color: Colors.textSecondary },
  callBtn: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8,
    backgroundColor: Colors.neonBlue,
  },
  callBtnText: { fontSize: 12, fontWeight: '700', color: '#000' },
  warningBox: {
    flexDirection: 'row', gap: 8,
    backgroundColor: 'rgba(255,214,0,0.08)', borderWidth: 1, borderColor: 'rgba(255,214,0,0.3)',
    borderRadius: 10, padding: 12, marginTop: 8,
  },
  warningText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
});
