import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const contentY = useRef(new Animated.Value(40)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(contentY, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(contentOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={s.container}>
      {/* Background glow */}
      <View style={s.glow1} />
      <View style={s.glow2} />

      {/* Logo */}
      <Animated.View style={[s.logoArea, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <View style={s.hexBorder}>
          <View style={s.hexInner}>
            <Text style={s.hexIcon}>⬡</Text>
            <Ionicons name="medical" size={28} color={Colors.neonBlue} style={s.medIcon} />
          </View>
        </View>
        <Text style={s.appName}>PharmaGuard</Text>
        <Text style={s.appSub}>Ngaoundéré</Text>
        <View style={s.langRow}>
          <View style={s.langBadge}>
            <Text style={s.langText}>🌐 FR | Fulfuldé</Text>
          </View>
        </View>
      </Animated.View>

      {/* Content */}
      <Animated.View style={[s.content, { opacity: contentOpacity, transform: [{ translateY: contentY }] }]}>
        <Text style={s.tagline}>Trouvez vos médicaments{'\n'}& pharmacies de garde</Text>
        <Text style={s.sub}>Ngaoundéré · Adamaoua · Cameroun</Text>

        <TouchableOpacity style={s.btnPrimary} onPress={() => navigation.navigate('Login')} activeOpacity={0.8}>
          <Text style={s.btnPrimaryText}>Commencer</Text>
          <Ionicons name="arrow-forward" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={s.btnSecondary} onPress={() => navigation.navigate('Main')} activeOpacity={0.8}>
          <Text style={s.btnSecondaryText}>Continuer sans compte</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <Text style={s.footer}>v1.0.0 · PharmaGuard</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  glow1: {
    position: 'absolute', width: 300, height: 300,
    borderRadius: 150, top: '10%', left: '-20%',
    backgroundColor: 'rgba(0,229,255,0.04)',
  },
  glow2: {
    position: 'absolute', width: 250, height: 250,
    borderRadius: 125, bottom: '15%', right: '-15%',
    backgroundColor: 'rgba(179,0,255,0.04)',
  },
  logoArea: { alignItems: 'center', marginBottom: 48 },
  hexBorder: {
    width: 96, height: 96, borderRadius: 20,
    borderWidth: 2, borderColor: Colors.neonBlue,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(0,229,255,0.06)',
    marginBottom: 20,
    shadowColor: Colors.neonBlue, shadowOpacity: 0.4, shadowRadius: 20, elevation: 8,
  },
  hexInner: { alignItems: 'center', justifyContent: 'center' },
  hexIcon: { position: 'absolute', fontSize: 64, color: Colors.neonBlue, opacity: 0.15 },
  medIcon: {},
  appName: { fontSize: 32, fontWeight: '900', color: Colors.neonBlue, letterSpacing: -0.5 },
  appSub: { fontSize: 14, color: Colors.textSecondary, marginTop: 2 },
  langRow: { marginTop: 12 },
  langBadge: {
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 999, borderWidth: 1, borderColor: Colors.neonBlue,
    backgroundColor: 'rgba(0,229,255,0.1)',
  },
  langText: { fontSize: 11, color: Colors.neonBlue, fontWeight: '600' },
  content: { width: '100%', alignItems: 'center' },
  tagline: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center', lineHeight: 30, marginBottom: 10 },
  sub: { fontSize: 13, color: Colors.textSecondary, marginBottom: 36 },
  btnPrimary: {
    width: '100%', height: 52, borderRadius: 14,
    backgroundColor: Colors.neonBlue,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginBottom: 12,
    shadowColor: Colors.neonBlue, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6,
  },
  btnPrimaryText: { fontSize: 16, fontWeight: '700', color: '#000' },
  btnSecondary: {
    width: '100%', height: 52, borderRadius: 14,
    borderWidth: 1.5, borderColor: Colors.borderStd,
    alignItems: 'center', justifyContent: 'center',
  },
  btnSecondaryText: { fontSize: 15, fontWeight: '500', color: Colors.textSecondary },
  footer: { position: 'absolute', bottom: 32, fontSize: 11, color: Colors.textDisabled },
});
