import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { notifications as initialNotifs } from '../data/mockData';

const borderColor = {
  garde: Colors.neonGreen,
  alerte: Colors.neonRed,
  recherche: Colors.neonBlue,
  ia: Colors.neonPurple,
};

export default function NotificationsScreen({ navigation }) {
  const [notifs, setNotifs] = useState(initialNotifs);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  const today = notifs.filter((n) => !n.read || ['1', '2'].includes(n.id));
  const yesterday = notifs.filter((n) => n.read && !['1', '2'].includes(n.id));

  return (
    <View style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Back */}
        <TouchableOpacity style={s.backRow} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color={Colors.textSecondary} />
          <Text style={s.backText}>Retour</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={s.headerRow}>
          <Text style={s.title}>🔔 Notifications</Text>
          <TouchableOpacity onPress={markAllRead}>
            <Text style={s.markAll}>Tout marquer lu</Text>
          </TouchableOpacity>
        </View>

        {/* Today */}
        <Text style={s.dayLabel}>Aujourd'hui</Text>
        {notifs.filter((n) => !n.read).map((n) => (
          <View
            key={n.id}
            style={[s.notifCard, { borderLeftColor: borderColor[n.type] || Colors.neonBlue }]}
          >
            <View style={[s.iconBox, { backgroundColor: `${borderColor[n.type]}18` }]}>
              <Text style={{ fontSize: 18 }}>{n.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.notifTitle}>{n.title}</Text>
              <Text style={s.notifMsg}>{n.message}</Text>
              <Text style={s.notifTime}>{n.time}</Text>
            </View>
            {!n.read && <View style={s.unreadDot} />}
          </View>
        ))}

        {/* Yesterday */}
        {yesterday.length > 0 && (
          <>
            <Text style={[s.dayLabel, { marginTop: 16 }]}>Hier</Text>
            {yesterday.map((n) => (
              <View key={n.id} style={[s.notifCard, { opacity: 0.7, borderLeftColor: Colors.borderStd }]}>
                <View style={[s.iconBox, { backgroundColor: Colors.elevated }]}>
                  <Text style={{ fontSize: 18 }}>{n.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.notifTitle}>{n.title}</Text>
                  <Text style={s.notifMsg}>{n.message}</Text>
                  <Text style={s.notifTime}>{n.time}</Text>
                </View>
              </View>
            ))}
          </>
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  markAll: { fontSize: 12, color: Colors.neonBlue },
  dayLabel: {
    fontSize: 11, color: Colors.textDisabled,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
  },
  notifCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderStd,
    borderLeftWidth: 3, borderRadius: 16, padding: 14, marginBottom: 8,
  },
  iconBox: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  notifTitle: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: 3 },
  notifMsg: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  notifTime: { fontSize: 10, color: Colors.textDisabled, marginTop: 6 },
  unreadDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.neonBlue, marginTop: 4,
  },
});
