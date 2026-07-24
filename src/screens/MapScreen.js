import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { Badge, Card } from '../components/UI';
import { pharmacies } from '../data/mockData';

const { width, height } = Dimensions.get('window');

const mapPharmacies = [
  { id: '1', name: 'Aoudi', top: '30%', left: '62%', status: 'garde' },
  { id: '2', name: 'Gare', top: '52%', left: '25%', status: 'garde' },
  { id: '3', name: 'Centrale', top: '65%', left: '66%', status: 'fermee' },
];

const filters = ['De Garde', 'Proche < 2km', 'Ouvert 24/7'];

export default function MapScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState(0);
  const [selected, setSelected] = useState(null);

  const selectedPharmacy = selected ? pharmacies.find((p) => p.id === selected) : null;

  return (
    <View style={s.container}>
      {/* Map background */}
      <View style={s.mapBg}>
        <View style={s.mapGrid} />

        {/* User position */}
        <View style={s.userPin}>
          <View style={s.userDot} />
          <View style={s.userPulse} />
          <Text style={s.userLabel}>Vous</Text>
        </View>

        {/* Pharmacy pins */}
        {mapPharmacies.map((mp) => (
          <TouchableOpacity
            key={mp.id}
            style={[s.pharmaPin, { top: mp.top, left: mp.left }]}
            onPress={() => setSelected(selected === mp.id ? null : mp.id)}
          >
            <View style={[
              s.pharmaPinCircle,
              mp.status === 'garde' ? s.pinGreen : s.pinRed,
              selected === mp.id && s.pinSelected,
            ]}>
              <Ionicons
                name="medkit"
                size={14}
                color={mp.status === 'garde' ? Colors.neonGreen : Colors.textSecondary}
              />
            </View>
            <View style={s.pharmaPinLabel}>
              <Text style={s.pharmaPinText}>{mp.name}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Floating actions */}
        <View style={s.floatActions}>
          <TouchableOpacity style={s.floatBtn}>
            <Ionicons name="navigate" size={18} color={Colors.neonBlue} />
          </TouchableOpacity>
          <TouchableOpacity style={[s.floatBtn, s.floatBtnOrange]}>
            <Ionicons name="scan" size={18} color={Colors.neonOrange} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search + filters overlay */}
      <View style={s.topOverlay}>
        <View style={s.searchBar}>
          <Ionicons name="search" size={18} color={Colors.textSecondary} />
          <TextInput
            style={s.searchInput}
            placeholder="Chercher une pharmacie..."
            placeholderTextColor={Colors.textDisabled}
          />
          <Ionicons name="options" size={16} color={Colors.neonBlue} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          {filters.map((f, i) => (
            <TouchableOpacity
              key={f}
              style={[s.filterChip, i === activeFilter && s.filterChipActive]}
              onPress={() => setActiveFilter(i)}
            >
              <Text style={[s.filterText, i === activeFilter && s.filterTextActive]}>
                {i === activeFilter ? `✓ ${f}` : f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Selected pharmacy bottom sheet */}
      {selectedPharmacy && (
        <TouchableOpacity
          style={s.bottomSheet}
          activeOpacity={1}
          onPress={() => navigation.navigate('PharmacyDetail', { pharmacy: selectedPharmacy })}
        >
          <Card leftBorder={selectedPharmacy.status === 'garde' ? 'green' : 'red'} style={{ margin: 0 }}>
            <View style={s.bsRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.bsName}>{selectedPharmacy.name}</Text>
                <Text style={s.bsSub}>📍 {selectedPharmacy.distance} · {selectedPharmacy.address}</Text>
              </View>
              <Badge type={selectedPharmacy.status} label={selectedPharmacy.status === 'garde' ? '● GARDE' : '● FERMÉE'} />
            </View>
            <View style={[s.bsRow, { marginTop: 8 }]}>
              <Text style={s.bsPhone}>{selectedPharmacy.phone}</Text>
              <Text style={s.bsMore}>Voir détails →</Text>
            </View>
          </Card>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  mapBg: {
    flex: 1,
    backgroundColor: '#0d1f35',
    position: 'relative',
  },
  mapGrid: {
    position: 'absolute', width: '100%', height: '100%',
    opacity: 0.08,
    // Simulated grid via border pattern
    borderWidth: 0,
  },
  topOverlay: {
    position: 'absolute', top: 48, left: 16, right: 16,
  },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(12,21,38,0.92)', borderWidth: 1, borderColor: Colors.borderStd,
    borderRadius: 24, height: 48, paddingHorizontal: 16,
  },
  searchInput: { flex: 1, color: Colors.textPrimary, fontSize: 15 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderStd,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: Colors.neonBlue, borderColor: Colors.neonBlue },
  filterText: { fontSize: 12, color: Colors.textPrimary, fontWeight: '500' },
  filterTextActive: { color: '#000', fontWeight: '700' },
  userPin: {
    position: 'absolute', top: '48%', left: '50%',
    transform: [{ translateX: -7 }, { translateY: -7 }],
    alignItems: 'center',
  },
  userDot: {
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: '#3D8EFF', borderWidth: 2, borderColor: 'white',
    shadowColor: Colors.neonBlue, shadowOpacity: 0.8, shadowRadius: 8,
  },
  userPulse: {
    position: 'absolute', width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(0,229,255,0.15)', top: -8, left: -8,
  },
  userLabel: {
    backgroundColor: 'rgba(0,0,0,0.7)', fontSize: 9, paddingHorizontal: 6,
    paddingVertical: 2, borderRadius: 4, marginTop: 6, color: Colors.textPrimary,
  },
  pharmaPin: { position: 'absolute', alignItems: 'center' },
  pharmaPinCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.surface, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  pinGreen: {
    borderColor: Colors.neonGreen,
    shadowColor: Colors.neonGreen, shadowOpacity: 0.5, shadowRadius: 8,
  },
  pinRed: { borderColor: Colors.neonRed, opacity: 0.5 },
  pinSelected: { borderWidth: 3, transform: [{ scale: 1.1 }] },
  pharmaPinLabel: {
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderStd,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 3,
  },
  pharmaPinText: { fontSize: 9, fontWeight: '600', color: Colors.textPrimary },
  floatActions: {
    position: 'absolute', bottom: 100, right: 16,
    flexDirection: 'column', gap: 10,
  },
  floatBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(12,21,38,0.85)', borderWidth: 1, borderColor: Colors.borderStd,
    alignItems: 'center', justifyContent: 'center',
  },
  floatBtnOrange: { borderColor: 'rgba(255,109,0,0.5)' },
  bottomSheet: {
    position: 'absolute', bottom: 80, left: 16, right: 16,
  },
  bsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bsName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 3 },
  bsSub: { fontSize: 12, color: Colors.textSecondary },
  bsPhone: { fontSize: 12, color: Colors.textPrimary, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  bsMore: { fontSize: 12, color: Colors.neonBlue },
});
