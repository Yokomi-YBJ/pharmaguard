import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [tab, setTab] = useState('login'); // login | register

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color={Colors.textSecondary} />
          <Text style={s.backText}>Retour</Text>
        </TouchableOpacity>

        <View style={s.logoRow}>
          <View style={s.logoBg}>
            <Ionicons name="medical" size={22} color={Colors.neonBlue} />
          </View>
          <Text style={s.logoText}>PharmaGuard</Text>
        </View>

        <Text style={s.title}>
          {tab === 'login' ? 'Connexion' : 'Créer un compte'}
        </Text>
        <Text style={s.sub}>
          {tab === 'login' ? 'Content de vous revoir 👋' : 'Rejoignez PharmaGuard 🏥'}
        </Text>

        {/* Tabs */}
        <View style={s.tabs}>
          <TouchableOpacity
            style={[s.tab, tab === 'login' && s.tabActive]}
            onPress={() => setTab('login')}
          >
            <Text style={[s.tabText, tab === 'login' && s.tabTextActive]}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.tab, tab === 'register' && s.tabActive]}
            onPress={() => setTab('register')}
          >
            <Text style={[s.tabText, tab === 'register' && s.tabTextActive]}>Inscription</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={s.form}>
          {tab === 'register' && (
            <View style={s.inputGroup}>
              <Ionicons name="person-outline" size={18} color={Colors.textSecondary} style={s.inputIcon} />
              <TextInput
                style={s.input}
                placeholder="Nom complet"
                placeholderTextColor={Colors.textDisabled}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={s.inputGroup}>
            <Ionicons name="mail-outline" size={18} color={Colors.textSecondary} style={s.inputIcon} />
            <TextInput
              style={s.input}
              placeholder="Email ou téléphone"
              placeholderTextColor={Colors.textDisabled}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={s.inputGroup}>
            <Ionicons name="lock-closed-outline" size={18} color={Colors.textSecondary} style={s.inputIcon} />
            <TextInput
              style={[s.input, { paddingRight: 44 }]}
              placeholder="Mot de passe"
              placeholderTextColor={Colors.textDisabled}
              secureTextEntry={!showPwd}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPwd(!showPwd)}>
              <Ionicons name={showPwd ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {tab === 'login' && (
            <TouchableOpacity style={s.forgotRow}>
              <Text style={s.forgot}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={s.btnPrimary}
          onPress={() => navigation.navigate('Main')}
          activeOpacity={0.85}
        >
          <Text style={s.btnText}>{tab === 'login' ? 'Se connecter' : "S'inscrire"}</Text>
          <Ionicons name="arrow-forward" size={18} color="#000" />
        </TouchableOpacity>

        {/* Divider */}
        <View style={s.divider}>
          <View style={s.divLine} />
          <Text style={s.divText}>ou</Text>
          <View style={s.divLine} />
        </View>

        <TouchableOpacity style={s.btnGhost}>
          <Ionicons name="phone-portrait-outline" size={18} color={Colors.textSecondary} />
          <Text style={s.btnGhostText}>Continuer avec le téléphone</Text>
        </TouchableOpacity>

        {tab === 'login' && (
          <TouchableOpacity style={s.switchRow} onPress={() => setTab('register')}>
            <Text style={s.switchText}>Pas encore de compte ? </Text>
            <Text style={s.switchLink}>S'inscrire</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  scroll: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 28 },
  backText: { fontSize: 13, color: Colors.textSecondary },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24 },
  logoBg: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(0,229,255,0.1)', borderWidth: 1, borderColor: Colors.neonBlue,
    alignItems: 'center', justifyContent: 'center',
  },
  logoText: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  title: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  sub: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24 },
  tabs: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    borderRadius: 12, padding: 4, marginBottom: 24,
    borderWidth: 1, borderColor: Colors.borderStd,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: Colors.neonBlue },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: '#000' },
  form: { gap: 14, marginBottom: 20 },
  inputGroup: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.inputBg, borderWidth: 1.5, borderColor: Colors.borderStd,
    borderRadius: 12, height: 52,
  },
  inputIcon: { marginLeft: 14, marginRight: 4 },
  input: {
    flex: 1, height: '100%', color: Colors.textPrimary, fontSize: 15, paddingHorizontal: 6,
  },
  eyeBtn: { paddingHorizontal: 14 },
  forgotRow: { alignSelf: 'flex-end' },
  forgot: { fontSize: 13, color: Colors.neonBlue },
  btnPrimary: {
    height: 52, borderRadius: 14, backgroundColor: Colors.neonBlue,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowColor: Colors.neonBlue, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6,
    marginBottom: 20,
  },
  btnText: { fontSize: 16, fontWeight: '700', color: '#000' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.borderStd },
  divText: { fontSize: 12, color: Colors.textDisabled },
  btnGhost: {
    height: 52, borderRadius: 14, borderWidth: 1, borderColor: Colors.borderStd,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24,
  },
  btnGhostText: { fontSize: 15, color: Colors.textSecondary },
  switchRow: { flexDirection: 'row', justifyContent: 'center' },
  switchText: { fontSize: 13, color: Colors.textSecondary },
  switchLink: { fontSize: 13, color: Colors.neonBlue, fontWeight: '600' },
});
