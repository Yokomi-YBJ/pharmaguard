import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { Card, PharmacyCard, Badge } from '../components/UI';
import { pharmacies, recentSearches } from '../data/mockData';

const settingsRows = [
  { icon: 'globe-outline', label: 'Langue', value: 'FR | Fulfuldé', type: 'nav' },
  { icon: 'location-outline', label: 'Localisation', value: 'Ngaoundéré', type: 'nav' },
  { icon: 'notifications-outline', label: 'Notifications', type: 'toggle', key: 'notif' },
  { icon: 'moon-outline', label: 'Mode sombre', type: 'toggle', key: 'dark', defaultOn: true },
];

export default function ProfileScreen({ navigation }) {
  const [favPharmacies, setFavPharmacies] = useState(
    pharmacies.filter((p) => p.favorite)
  );
  const [toggles, setToggles] = useState({ notif: true, dark: true });

  const toggleSwitch = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.avatar}>
            <Text style={s.avatarInitial}>K</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.userName}>Kiri Adamou</Text>
            <Text style={s.userSub}>kiri@example.cm</Text>
            <Badge type="lang" label="🌐 FR | Fulfuldé" />
          </View>
          <TouchableOpacity style={s.editBtn}>
            <Ionicons name="create-outline" size={18} color={Colors.neonBlue} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          {[
            { label: 'Recherches', value: '12' },
            { label: 'Favoris', value: favPharmacies.length.toString() },
            { label: 'Alertes', value: '3' },
          ].map((stat) => (
            <View key={stat.label} style={s.statItem}>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Favorites */}
        <Text style={s.sectionLabel}>Pharmacies favorites</Text>
        {favPharmacies.length === 0 ? (
          <Card style={s.emptyCard}>
            <Text style={{ color: Colors.textSecondary, textAlign: 'center', fontSize: 13 }}>
              Aucune pharmacie favorite
            </Text>
          </Card>
        ) : (
          favPharmacies.map((p) => (
            <PharmacyCard
              key={p.id}
              pharmacy={p}
              showFavorite
              onPress={() => navigation.navigate('PharmacyDetail', { pharmacy: p })}
              onCall={() => {}}
              onFavorite={() => setFavPharmacies((prev) => prev.filter((fp) => fp.id !== p.id))}
            />
          ))
        )}

        {/* Recent searches */}
        <Text style={s.sectionLabel}>Recherches récentes</Text>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {recentSearches.map((r, i) => (
            <View
              key={r.id}
              style={[s.recentRow, i < recentSearches.length - 1 && s.recentBorder]}
            >
              <Ionicons name="time-outline" size={15} color={Colors.textDisabled} />
              <Text style={s.recentTerm}>{r.term}</Text>
              <Text style={s.recentTime}>{r.time}</Text>
            </View>
          ))}
        </Card>

        {/* Settings */}
        <Text style={s.sectionLabel}>Paramètres</Text>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {settingsRows.map((row, i) => (
            <View
              key={row.key || row.label}
              style={[s.settingRow, i < settingsRows.length - 1 && s.settingBorder]}
            >
              <Ionicons name={row.icon} size={18} color={Colors.textSecondary} />
              <Text style={s.settingLabel}>{row.label}</Text>
              <View style={{ flex: 1 }} />
              {row.type === 'toggle' ? (
                <Switch
                  value={toggles[row.key] ?? row.defaultOn ?? false}
                  onValueChange={() => toggleSwitch(row.key)}
                  trackColor={{ false: Colors.borderStd, true: Colors.neonBlue }}
                  thumbColor="#fff"
                />
              ) : (
                <>
                  {row.value && <Text style={s.settingValue}>{row.value}</Text>}
                  <Ionicons name="chevron-forward" size={14} color={Colors.textDisabled} style={{ marginLeft: 4 }} />
                </>
              )}
            </View>
          ))}
        </Card>

        {/* Logout */}
        <TouchableOpacity
          style={s.logoutBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-out-outline" size={18} color={Colors.neonRed} />
          <Text style={s.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={s.version}>PharmaGuard v1.0.0 · Ngaoundéré</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  scroll: { paddingHorizontal: 16, paddingTop: 52, paddingBottom: 40 },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderStd,
    borderRadius: 16, padding: 16, marginBottom: 16,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: 'rgba(0,229,255,0.1)', borderWidth: 2, borderColor: Colors.neonBlue,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarInitial: { fontSize: 22, fontWeight: '800', color: Colors.neonBlue },
  userName: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  userSub: { fontSize: 12, color: Colors.textSecondary, marginBottom: 8 },
  editBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(0,229,255,0.08)', borderWidth: 1, borderColor: Colors.neonBlue,
    alignItems: 'center', justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.borderStd, borderRadius: 16,
    marginBottom: 20,
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statValue: { fontSize: 20, fontWeight: '800', color: Colors.neonBlue },
  statLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  sectionLabel: {
    fontSize: 13, fontWeight: '600', color: Colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, marginTop: 20,
  },
  emptyCard: { alignItems: 'center', paddingVertical: 20 },
  recentRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 12 },
  recentBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderStd },
  recentTerm: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  recentTime: { fontSize: 10, color: Colors.textDisabled },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14 },
  settingBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderStd },
  settingLabel: { fontSize: 14, color: Colors.textPrimary },
  settingValue: { fontSize: 13, color: Colors.textSecondary },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 48, borderRadius: 12,
    borderWidth: 1.5, borderColor: Colors.neonRed,
    backgroundColor: 'rgba(255,23,68,0.08)',
    marginTop: 24,
  },
  logoutText: { fontSize: 15, color: Colors.neonRed, fontWeight: '600' },
  version: { textAlign: 'center', fontSize: 11, color: Colors.textDisabled, marginTop: 20 },
});
