import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { Card, Badge } from '../components/UI';
import { medications } from '../data/mockData';

export default function PharmacyDetailScreen({ route, navigation }) {
  const { pharmacy } = route.params;
  const [fav, setFav] = useState(pharmacy.favorite);

  const availableMeds = medications.filter((m) => m.pharmacies.includes(pharmacy.id));

  return (
    <View style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Back */}
        <TouchableOpacity style={s.backRow} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color={Colors.textSecondary} />
          <Text style={s.backText}>Retour</Text>
        </TouchableOpacity>

        {/* Header card */}
        <Card leftBorder={pharmacy.status === 'garde' ? 'green' : 'red'} style={s.headerCard}>
          <View style={s.headerTop}>
            <View style={s.headerIcon}>
              <Ionicons name="medical" size={22} color={pharmacy.status === 'garde' ? Colors.neonGreen : Colors.textSecondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.pharmacyName}>{pharmacy.name}</Text>
              <Text style={s.pharmacyAddr}>{pharmacy.address}</Text>
            </View>
            <TouchableOpacity onPress={() => setFav(!fav)}>
              <Ionicons
                name={fav ? 'heart' : 'heart-outline'}
                size={22}
                color={Colors.neonRed}
              />
            </TouchableOpacity>
          </View>

          <View style={s.headerMeta}>
            <View style={s.metaItem}>
              <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
              <Text style={s.metaText}>{pharmacy.distance}</Text>
            </View>
            <Badge
              type={pharmacy.status}
              label={pharmacy.status === 'garde' ? '● GARDE' : '● FERMÉE'}
            />
          </View>
        </Card>

        {/* Actions */}
        <View style={s.actionsRow}>
          <TouchableOpacity
            style={[s.actionBtn, s.actionBtnGreen]}
            onPress={() => Linking.openURL(`tel:${pharmacy.phone.replace(/\s/g, '')}`)}
          >
            <Ionicons name="call" size={18} color="#000" />
            <Text style={s.actionBtnText}>{pharmacy.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.actionBtnSecondary}>
            <Ionicons name="navigate-outline" size={18} color={Colors.neonBlue} />
            <Text style={s.actionBtnSecText}>Itinéraire</Text>
          </TouchableOpacity>
        </View>

        {/* Hours */}
        <Text style={s.sectionLabel}>Horaires</Text>
        <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
          {[
            { day: 'Lun – Ven', hours: '08h00 – 20h00', active: true },
            { day: 'Samedi', hours: '09h00 – 18h00', active: true },
            { day: 'Dimanche', hours: pharmacy.status === 'garde' ? '08h00 – 08h00' : 'Fermé', active: pharmacy.status === 'garde' },
            { day: 'Garde de nuit', hours: pharmacy.status === 'garde' ? 'Oui ✓' : 'Non', active: pharmacy.status === 'garde' },
          ].map((row, i, arr) => (
            <View key={row.day} style={[s.hoursRow, i < arr.length - 1 && s.hoursBorder]}>
              <Text style={s.hoursDay}>{row.day}</Text>
              <Text style={[s.hoursValue, row.active ? { color: Colors.neonGreen } : { color: Colors.textSecondary }]}>
                {row.hours}
              </Text>
            </View>
          ))}
        </Card>

        {/* Available meds */}
        <Text style={s.sectionLabel}>Médicaments disponibles ({availableMeds.length})</Text>
        {availableMeds.length === 0 ? (
          <Card>
            <Text style={{ color: Colors.textSecondary, textAlign: 'center', fontSize: 13 }}>
              Stock non renseigné
            </Text>
          </Card>
        ) : (
          availableMeds.map((med) => (
            <TouchableOpacity
              key={med.id}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('MedicationDetail', { medication: med })}
            >
              <Card style={s.medCard}>
                <View style={s.medRow}>
                  <Text style={s.medName}>💊 {med.name}</Text>
                  <View style={s.medRight}>
                    <Text style={s.medPrice}>{med.price}</Text>
                    <Badge type={med.stock} label={med.stock === 'available' ? `● Dispo (${med.stockCount})` : '● Bas'} small />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  scroll: { paddingHorizontal: 16, paddingTop: 52, paddingBottom: 40 },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  backText: { fontSize: 13, color: Colors.textSecondary },
  headerCard: { marginBottom: 14 },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  headerIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: Colors.elevated, borderWidth: 1, borderColor: Colors.borderStd,
    alignItems: 'center', justifyContent: 'center',
  },
  pharmacyName: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  pharmacyAddr: { fontSize: 12, color: Colors.textSecondary },
  headerMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: Colors.textSecondary },
  actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  actionBtn: {
    flex: 1, height: 46, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  actionBtnGreen: {
    backgroundColor: Colors.neonGreen,
    shadowColor: Colors.neonGreen, shadowOpacity: 0.35, shadowRadius: 10,
  },
  actionBtnText: { fontSize: 13, fontWeight: '700', color: '#000' },
  actionBtnSecondary: {
    flex: 1, height: 46, borderRadius: 12,
    borderWidth: 1.5, borderColor: Colors.neonBlue,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  actionBtnSecText: { fontSize: 13, fontWeight: '600', color: Colors.neonBlue },
  sectionLabel: {
    fontSize: 13, fontWeight: '600', color: Colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10,
  },
  hoursRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  hoursBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderStd },
  hoursDay: { fontSize: 14, color: Colors.textPrimary },
  hoursValue: { fontSize: 13 },
  medCard: { marginBottom: 8 },
  medRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  medName: { fontSize: 14, fontWeight: '500', color: Colors.textPrimary },
  medRight: { alignItems: 'flex-end', gap: 4 },
  medPrice: { fontSize: 12, color: Colors.textSecondary },
});
