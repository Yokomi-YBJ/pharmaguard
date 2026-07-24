import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Linking, StatusBar, Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { Card, Badge, PharmacyCard, PulsingDot } from '../components/UI';
import { pharmacies } from '../data/mockData';

const quickActions = [
  { id: 'garde', label: 'Garde', sub: 'Voir sur carte', icon: 'location', color: Colors.neonGreen, screen: 'Carte' },
  { id: 'search', label: 'Chercher', sub: 'Médicaments', icon: 'search', color: Colors.neonBlue, screen: 'Recherche' },
  { id: 'voice', label: 'IA Vocale', sub: 'Fulfuldé & FR', icon: 'mic', color: Colors.neonPurple, screen: 'Chatbot' },
  { id: 'ar', label: 'Scanner AR', sub: 'Vue rue 3D', icon: 'scan', color: Colors.neonOrange, screen: null },
];

const colorMap = {
  [Colors.neonGreen]: 'rgba(0,255,136,0.1)',
  [Colors.neonBlue]: 'rgba(0,229,255,0.1)',
  [Colors.neonPurple]: 'rgba(179,0,255,0.1)',
  [Colors.neonOrange]: 'rgba(255,109,0,0.1)',
};

export default function HomeScreen({ navigation }) {
  const gardePharmacies = pharmacies.filter((p) => p.status === 'garde');

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Top Bar */}
        <View style={s.topBar}>
          <View style={s.logoRow}>
            <View style={s.hexIcon}>
              <Ionicons name="medical" size={14} color={Colors.neonBlue} />
            </View>
            <Text style={s.logoText}>PharmaGuard</Text>
          </View>
          <View style={s.topRight}>
            <Badge type="lang" label="🌐 FR | Ful" />
            <TouchableOpacity
              style={{ marginLeft: 12, position: 'relative' }}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
              <View style={s.notifDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Urgence Banner */}
        <TouchableOpacity
          style={s.urgenceBanner}
          onPress={() => Linking.openURL('tel:15')}
          activeOpacity={0.8}
        >
          <View style={s.urgenceLeft}>
            <Text style={s.urgenceEmoji}>🚨</Text>
            <View>
              <Text style={s.urgenceLabel}>URGENCE</Text>
              <Text style={s.urgenceTitle}>Appeler SAMU : 15</Text>
            </View>
          </View>
          <Ionicons name="call" size={20} color={Colors.neonRed} />
        </TouchableOpacity>

        <Text style={s.greeting}>Bonsoir, Ngaoundéré 🌙</Text>

        {/* Quick Actions Grid */}
        <View style={s.grid}>
          {quickActions.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={s.gridItem}
              activeOpacity={0.75}
              onPress={() => a.screen && navigation.navigate(a.screen)}
            >
              <Card style={s.gridCard}>
                <View style={[s.gridIconBg, { backgroundColor: colorMap[a.color], borderColor: a.color }]}>
                  <Ionicons name={a.icon} size={20} color={a.color} />
                </View>
                <Text style={s.gridLabel}>{a.label}</Text>
                <Text style={s.gridSub}>{a.sub}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Garde ce soir */}
        <View style={s.sectionRow}>
          <View style={s.sectionLeft}>
            <PulsingDot color={Colors.neonGreen} />
            <Text style={s.sectionTitle}>Garde ce soir</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Carte')}>
            <Text style={s.sectionLink}>Voir tout →</Text>
          </TouchableOpacity>
        </View>

        {gardePharmacies.map((p) => (
          <TouchableOpacity
            key={p.id}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PharmacyDetail', { pharmacy: p })}
          >
            <Card leftBorder="green" style={s.pharmacyCard}>
              <View style={s.pharmacyRow}>
                <Text style={s.pharmacyName}>{p.name}</Text>
                <Badge type="garde" label="● GARDE" />
              </View>
              <View style={s.pharmacyRow}>
                <Text style={s.pharmacySub}>📍 {p.distance} — Ngaoundéré</Text>
                <Text style={s.pharmacyPhone}>{p.phone}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {/* Alerte santé */}
        <View style={s.alertBox}>
          <Ionicons name="warning-outline" size={18} color={Colors.neonOrange} style={{ marginTop: 2 }} />
          <View style={{ flex: 1 }}>
            <Text style={s.alertLabel}>ALERTE SANTÉ</Text>
            <Text style={s.alertText}>Saison des pluies : pensez aux traitements antipaludiques.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  scroll: { paddingHorizontal: 16, paddingTop: 52, paddingBottom: 24 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  hexIcon: {
    width: 28, height: 28, borderRadius: 6, borderWidth: 1.5, borderColor: Colors.neonBlue,
    alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,229,255,0.08)',
  },
  logoText: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  topRight: { flexDirection: 'row', alignItems: 'center' },
  notifDot: {
    position: 'absolute', top: -2, right: -2,
    width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.neonRed,
    borderWidth: 1, borderColor: Colors.bgDark,
  },
  urgenceBanner: {
    backgroundColor: 'rgba(255,23,68,0.1)', borderWidth: 1, borderColor: Colors.neonRed,
    borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  urgenceLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  urgenceEmoji: { fontSize: 18 },
  urgenceLabel: { fontSize: 10, color: Colors.neonRed, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  urgenceTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  greeting: { fontSize: 17, fontWeight: '600', color: Colors.textPrimary, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  gridItem: { width: '47%' },
  gridCard: { alignItems: 'center', justifyContent: 'center', paddingVertical: 20, gap: 10 },
  gridIconBg: {
    width: 44, height: 44, borderRadius: 22, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  gridLabel: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  gridSub: { fontSize: 11, color: Colors.textSecondary },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: Colors.neonBlue },
  sectionLink: { fontSize: 12, color: Colors.neonBlue },
  pharmacyCard: { marginBottom: 10 },
  pharmacyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  pharmacyName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, flex: 1, marginRight: 8 },
  pharmacySub: { fontSize: 12, color: Colors.textSecondary },
  pharmacyPhone: { fontSize: 12, color: Colors.textPrimary, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  alertBox: {
    backgroundColor: 'rgba(255,109,0,0.08)', borderLeftWidth: 4, borderLeftColor: Colors.neonOrange,
    borderRadius: 8, padding: 12, flexDirection: 'row', gap: 10, marginTop: 8,
  },
  alertLabel: { fontSize: 11, color: Colors.neonOrange, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4 },
  alertText: { fontSize: 13, color: Colors.textPrimary, lineHeight: 18 },
});
