import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { chatHistory } from '../data/mockData';

const quickReplies = [
  'Pharmacie de garde ?',
  'Paracétamol disponible ?',
  'Traitement paludisme',
  'Urgences médicales',
];

export default function ChatbotScreen() {
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    const userMsg = { id: Date.now().toString(), role: 'user', message: msg, time: new Date().toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' }) };
    const botMsg = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      message: `🤖 Je recherche des informations sur "${msg}"...\n\nConsultez les pharmacies de garde à Ngaoundéré ou appelez le SAMU (15) pour les urgences.\n\n📍 Pharmacie Aoudi · 677 71 64 93`,
      time: new Date().toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={s.header}>
        <View style={s.botAvatar}>
          <Text style={{ fontSize: 18 }}>🤖</Text>
        </View>
        <View>
          <Text style={s.botName}>PharmaBot</Text>
          <View style={s.onlineRow}>
            <View style={s.onlineDot} />
            <Text style={s.onlineText}>En ligne · Fulfuldé & FR</Text>
          </View>
        </View>
        <View style={{ flex: 1 }} />
        <View style={s.iaBadge}>
          <Text style={s.iaBadgeText}>★ IA</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={s.messages}
        contentContainerStyle={s.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[s.msgWrapper, msg.role === 'user' ? s.msgWrapperUser : s.msgWrapperBot]}
          >
            {msg.role === 'bot' && (
              <View style={s.botAvatarSmall}>
                <Text style={{ fontSize: 12 }}>🤖</Text>
              </View>
            )}
            <View style={[s.bubble, msg.role === 'user' ? s.bubbleUser : s.bubbleBot]}>
              <Text style={[s.bubbleText, msg.role === 'user' && { color: Colors.textPrimary }]}>
                {msg.message}
              </Text>
              <Text style={s.bubbleTime}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Quick replies */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.quickReplies}>
        {quickReplies.map((qr) => (
          <TouchableOpacity key={qr} style={s.qrChip} onPress={() => send(qr)}>
            <Text style={s.qrText}>{qr}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input bar */}
      <View style={s.inputBar}>
        <TouchableOpacity style={s.voiceBtn}>
          <Ionicons name="mic" size={20} color={Colors.neonPurple} />
        </TouchableOpacity>
        <TextInput
          style={s.input}
          placeholder="Posez votre question..."
          placeholderTextColor={Colors.textDisabled}
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[s.sendBtn, input.trim().length > 0 && s.sendBtnActive]}
          onPress={() => send()}
          disabled={!input.trim()}
        >
          <Ionicons name="send" size={18} color={input.trim() ? '#000' : Colors.textDisabled} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 16, paddingTop: 52,
    borderBottomWidth: 1, borderBottomColor: Colors.borderStd,
    backgroundColor: Colors.surface,
  },
  botAvatar: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(179,0,255,0.15)', borderWidth: 1, borderColor: Colors.neonPurple,
    alignItems: 'center', justifyContent: 'center',
  },
  botName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.neonGreen },
  onlineText: { fontSize: 11, color: Colors.textSecondary },
  iaBadge: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
    backgroundColor: 'rgba(179,0,255,0.15)', borderWidth: 1, borderColor: Colors.neonPurple,
  },
  iaBadgeText: { fontSize: 10, color: Colors.neonPurple, fontWeight: '700' },
  messages: { flex: 1 },
  messagesContent: { padding: 16, paddingBottom: 8 },
  msgWrapper: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-end' },
  msgWrapperUser: { justifyContent: 'flex-end' },
  msgWrapperBot: { justifyContent: 'flex-start' },
  botAvatarSmall: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: 'rgba(179,0,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 8, marginBottom: 4,
  },
  bubble: { maxWidth: '82%', borderRadius: 16, padding: 12, paddingBottom: 8 },
  bubbleUser: {
    backgroundColor: 'rgba(0,229,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(179,0,255,0.3)',
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    backgroundColor: Colors.elevated,
    borderWidth: 1, borderColor: Colors.borderStd,
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, color: Colors.textPrimary, lineHeight: 20 },
  bubbleTime: { fontSize: 10, color: Colors.textDisabled, marginTop: 4, textAlign: 'right' },
  quickReplies: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderTopWidth: 1, borderTopColor: Colors.borderStd,
    maxHeight: 50,
  },
  qrChip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
    borderWidth: 1, borderColor: Colors.neonBlue,
    backgroundColor: 'rgba(0,229,255,0.08)', marginRight: 8,
  },
  qrText: { fontSize: 12, color: Colors.neonBlue },
  inputBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: Colors.borderStd,
    backgroundColor: Colors.surface,
  },
  voiceBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(179,0,255,0.1)', borderWidth: 1, borderColor: Colors.neonPurple,
    alignItems: 'center', justifyContent: 'center',
  },
  input: {
    flex: 1, backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.borderStd,
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10,
    color: Colors.textPrimary, fontSize: 14, maxHeight: 80,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.borderStd, alignItems: 'center', justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: Colors.neonBlue,
    shadowColor: Colors.neonBlue, shadowOpacity: 0.4, shadowRadius: 8,
  },
});
