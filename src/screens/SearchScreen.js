import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { Card, Badge } from '../components/UI';
import { medications, recentSearches } from '../data/mockData';

const filters = ['Tous', 'Sans ord.', 'Disponible', 'Générique'];

const stockLabel = {
  available: '● Disponible',
  low: '● Stock bas',
  out: '● Indisponible',
};

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(0);

  const filtered = query.length > 0
    ? medications.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <View style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <Text style={s.title}>Rechercher</Text>
        <Text style={s.subtitle}>Yiy Daawu (Médicament)</Text>

        {/* Search bar */}
        <View style={s.searchBar}>
          <Ionicons name="search" size={18} color={Colors.neonBlue} />
          <TextInput
            style={s.searchInput}
            placeholder="Ex: Paracétamol, Quinine..."
            placeholderTextColor={Colors.textDisabled}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filtersRow}>
          {filters.map((f, i) => (
            <TouchableOpacity
              key={f}
              style={[s.filterChip, i === activeFilter && s.filterChipActive]}
              onPress={() => setActiveFilter(i)}
            >
              <Text style={[s.filterText, i === activeFilter && s.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results */}
        {query.length > 0 ? (
          <>
            <View style={s.resultsHeader}>
              <Text style={s.resultsCount}>Résultats ({filtered.length})</Text>
              <Ionicons name="options" size={16} color={Colors.textSecondary} />
            </View>
            {filtered.length === 0 ? (
              <View style={s.noResults}>
                <Text style={s.noResultsEmoji}>🔍</Text>
                <Text style={s.noResultsText}>Aucun médicament trouvé</Text>
                <Text style={s.noResultsSub}>Essayez un autre terme de recherche</Text>
              </View>
            ) : (
              filtered.map((med) => (
                <TouchableOpacity
                  key={med.id}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('MedicationDetail', { medication: med })}
                >
                  <Card style={s.medCard}>
                    <View style={s.medRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={s.medName}>💊 {med.name}</Text>
                        <Text style={s.medSub}>
                          {med.type} · {med.prescription ? 'Avec ordonnance' : 'Sans ordonnance'}
                        </Text>
                        <Text style={s.medPrice}>Prix: {med.price}</Text>
                        <View style={{ marginTop: 8 }}>
                          <Badge
                            type={med.stock}
                            label={`${stockLabel[med.stock]}${med.stock === 'available' ? ` (${med.stockCount})` : ''}`}
                          />
                        </View>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color={Colors.neonBlue} />
                    </View>
                  </Card>
                </TouchableOpacity>
              ))
            )}
          </>
        ) : (
          <>
            {/* Quick access */}
            <Text style={s.sectionLabel}>Médicaments courants</Text>
            {medications.map((med) => (
              <TouchableOpacity
                key={med.id}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('MedicationDetail', { medication: med })}
              >
                <Card style={s.medCard}>
                  <View style={s.medRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={s.medName}>💊 {med.name}</Text>
                      <Text style={s.medSub}>{med.type} · Prix: {med.price}</Text>
                      <View style={{ marginTop: 8 }}>
                        <Badge type={med.stock} label={`${stockLabel[med.stock]}`} />
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={Colors.neonBlue} />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}

            {/* Recent searches */}
            <Text style={[s.sectionLabel, { marginTop: 20 }]}>Recherches récentes</Text>
            {recentSearches.map((r, i) => (
              <TouchableOpacity
                key={r.id}
                style={[s.recentRow, i < recentSearches.length - 1 && s.recentBorder]}
                onPress={() => setQuery(r.term)}
              >
                <Ionicons name="time-outline" size={15} color={Colors.textDisabled} />
                <Text style={s.recentTerm}>{r.term}</Text>
                <Text style={s.recentTime}>{r.time}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  scroll: { paddingHorizontal: 16, paddingTop: 52, paddingBottom: 24 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  subtitle: { fontSize: 12, color: Colors.neonBlue, marginBottom: 18 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.borderStd,
    borderRadius: 24, height: 48, paddingHorizontal: 16, marginBottom: 16,
  },
  searchInput: { flex: 1, color: Colors.textPrimary, fontSize: 15 },
  filtersRow: { marginBottom: 16 },
  filterChip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderStd,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: 'rgba(0,229,255,0.15)', borderColor: Colors.neonBlue,
  },
  filterText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '500' },
  filterTextActive: { color: Colors.neonBlue, fontWeight: '700' },
  resultsHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
  },
  resultsCount: { fontSize: 13, color: Colors.textSecondary },
  medCard: { marginBottom: 10 },
  medRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  medName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  medSub: { fontSize: 12, color: Colors.textSecondary, marginBottom: 2 },
  medPrice: { fontSize: 12, color: Colors.textSecondary },
  noResults: { alignItems: 'center', paddingVertical: 40 },
  noResultsEmoji: { fontSize: 40, marginBottom: 12 },
  noResultsText: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 6 },
  noResultsSub: { fontSize: 13, color: Colors.textSecondary },
  sectionLabel: {
    fontSize: 13, fontWeight: '600', color: Colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12,
  },
  recentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10,
  },
  recentBorder: { borderBottomWidth: 1, borderBottomColor: Colors.borderStd },
  recentTerm: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  recentTime: { fontSize: 10, color: Colors.textDisabled },
});
