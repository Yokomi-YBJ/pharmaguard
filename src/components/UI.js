import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

// ─── Badge ───────────────────────────────────────────────────────────────────
export function Badge({ type = 'info', label, small }) {
  const styles = badgeStyles[type] || badgeStyles.info;
  return (
    <View style={[badge.container, styles.container, small && { paddingHorizontal: 6 }]}>
      <Text style={[badge.text, styles.text, small && { fontSize: 9 }]}>{label}</Text>
    </View>
  );
}

const badge = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
});

const badgeStyles = {
  garde: {
    container: { backgroundColor: 'rgba(0,255,136,0.15)', borderColor: Colors.neonGreen },
    text: { color: Colors.neonGreen },
  },
  fermee: {
    container: { backgroundColor: 'rgba(255,23,68,0.15)', borderColor: Colors.neonRed },
    text: { color: Colors.neonRed },
  },
  available: {
    container: { backgroundColor: 'rgba(0,255,136,0.15)', borderColor: 'transparent' },
    text: { color: Colors.neonGreen },
  },
  low: {
    container: { backgroundColor: 'rgba(255,214,0,0.15)', borderColor: 'transparent' },
    text: { color: Colors.neonGold },
  },
  out: {
    container: { backgroundColor: 'rgba(255,23,68,0.15)', borderColor: 'transparent' },
    text: { color: Colors.neonRed },
  },
  info: {
    container: { backgroundColor: 'rgba(0,229,255,0.1)', borderColor: 'rgba(0,229,255,0.3)' },
    text: { color: Colors.neonBlue },
  },
  lang: {
    container: { backgroundColor: 'rgba(0,229,255,0.15)', borderColor: Colors.neonBlue },
    text: { color: Colors.neonBlue },
  },
};

// ─── Card ────────────────────────────────────────────────────────────────────
export function Card({ children, style, leftBorder }) {
  return (
    <View
      style={[
        card.container,
        leftBorder === 'green' && card.borderGreen,
        leftBorder === 'red' && card.borderRed,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const card = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderStd,
    borderRadius: 16,
    padding: 16,
  },
  borderGreen: { borderLeftWidth: 4, borderLeftColor: Colors.neonGreen },
  borderRed: { borderLeftWidth: 4, borderLeftColor: Colors.neonRed },
});

// ─── PharmacyCard ─────────────────────────────────────────────────────────────
export function PharmacyCard({ pharmacy, onPress, onCall, onFavorite, showFavorite }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card
        leftBorder={pharmacy.status === 'garde' ? 'green' : 'red'}
        style={{ marginBottom: 10 }}
      >
        <View style={pc.row}>
          <View style={{ flex: 1 }}>
            <Text style={pc.name}>{pharmacy.name}</Text>
            <Text style={pc.sub}>📍 {pharmacy.distance} · {pharmacy.address.split(',')[0]}</Text>
            <View style={{ marginTop: 6 }}>
              <Badge
                type={pharmacy.status}
                label={pharmacy.status === 'garde' ? '● GARDE' : '● FERMÉE'}
              />
            </View>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 8 }}>
            {showFavorite && (
              <TouchableOpacity onPress={onFavorite}>
                <Ionicons
                  name={pharmacy.favorite ? 'heart' : 'heart-outline'}
                  size={18}
                  color={Colors.neonRed}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onCall}>
              <Ionicons
                name="call"
                size={18}
                color={pharmacy.status === 'garde' ? Colors.neonGreen : Colors.textDisabled}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const pc = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  sub: { fontSize: 12, color: Colors.textSecondary },
});

// ─── SectionTitle ─────────────────────────────────────────────────────────────
export function SectionTitle({ label, action, onAction }) {
  return (
    <View style={st.row}>
      <View style={st.left}>
        <View style={st.dot} />
        <Text style={st.label}>{label}</Text>
      </View>
      {action && (
        <TouchableOpacity onPress={onAction}>
          <Text style={st.action}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.neonGreen, shadowColor: Colors.neonGreen, shadowOpacity: 0.8, shadowRadius: 4 },
  label: { fontSize: 15, fontWeight: '600', color: Colors.neonBlue },
  action: { fontSize: 12, color: Colors.neonBlue },
});

// ─── PulsingDot ───────────────────────────────────────────────────────────────
export function PulsingDot({ color = Colors.neonRed, size = 8 }) {
  const anim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] });
  return <Animated.View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, opacity }} />;
}

// ─── BottomNav (shared) ───────────────────────────────────────────────────────
// Not used directly, navigation handles this via Tab.Navigator
