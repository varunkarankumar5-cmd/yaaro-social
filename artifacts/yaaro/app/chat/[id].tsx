import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, IconButton } from '@/components/YaaroUI';
import { useYaaro } from '@/context/YaaroContext';

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { chats, messages, palette, sendMessage } = useYaaro();
  const chat = chats.find((item) => item.id === id) ?? chats[0];
  const [draft, setDraft] = useState('');
  const insets = useSafeAreaInsets();
  const send = async () => { if (!draft.trim()) return; await sendMessage(chat.id, draft); setDraft(''); };
  return <KeyboardAvoidingView behavior="padding" style={[styles.screen, { backgroundColor: palette.background }]}>
    <View style={[styles.header, { borderBottomColor: palette.border, paddingTop: insets.top + 8 }]}><IconButton icon="chevron-left" color={palette.foreground} onPress={() => router.back()} /><Avatar name={chat.user.name} size={39} /><View style={styles.headerCopy}><Text style={[styles.headerName, { color: palette.foreground }]}>{chat.user.name}</Text><Text style={[styles.headerStatus, { color: chat.online ? '#57cf91' : palette.mutedForeground }]}>{chat.online ? 'Online now' : 'Last seen yesterday'}</Text></View><IconButton icon="phone" color={palette.foreground} onPress={() => {}} /><IconButton icon="more-horizontal" color={palette.foreground} onPress={() => {}} /></View>
    <FlatList inverted data={[...(messages[chat.id] ?? [])].reverse()} keyExtractor={(item) => item.id} contentContainerStyle={styles.messages} keyboardShouldPersistTaps="handled" renderItem={({ item }) => <View style={[styles.messageLine, item.sender === 'me' ? styles.myLine : styles.theirLine]}><View style={[styles.bubble, { backgroundColor: item.sender === 'me' ? palette.primary : palette.card, borderColor: palette.border }]}><Text style={[styles.messageText, { color: item.sender === 'me' ? '#fff' : palette.foreground }]}>{item.text}</Text><Text style={[styles.messageTime, { color: item.sender === 'me' ? '#ffffffb8' : palette.mutedForeground }]}>{item.time}</Text></View></View>} ListHeaderComponent={<View style={styles.typing}><View style={[styles.typingDots, { backgroundColor: palette.card }]}><View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} /></View><Text style={[styles.typingText, { color: palette.mutedForeground }]}>{chat.user.name.split(' ')[0]} is typing...</Text></View>} />
    <View style={[styles.composer, { backgroundColor: palette.card, borderTopColor: palette.border, paddingBottom: Math.max(insets.bottom, 10) }]}><IconButton icon="plus" color={palette.primary} onPress={() => {}} background={palette.accent} /><View style={[styles.inputWrap, { backgroundColor: palette.secondary }]}><TextInput testID="chat-input" value={draft} onChangeText={setDraft} placeholder="Write a message..." placeholderTextColor={palette.mutedForeground} style={[styles.input, { color: palette.foreground }]} /></View><Pressable testID="send-message" onPress={send} style={[styles.send, { backgroundColor: draft.trim() ? palette.primary : palette.muted }]}><Feather name="arrow-up" size={18} color={draft.trim() ? '#fff' : palette.mutedForeground} /></Pressable></View>
  </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { alignItems: 'center', borderBottomWidth: 1, flexDirection: 'row', paddingBottom: 11, paddingHorizontal: 10 },
  headerCopy: { flex: 1, marginLeft: 10 },
  headerName: { fontSize: 15, fontWeight: '700' },
  headerStatus: { fontSize: 10, marginTop: 3 },
  messages: { paddingHorizontal: 16, paddingVertical: 18 },
  messageLine: { flexDirection: 'row', marginVertical: 5 },
  myLine: { justifyContent: 'flex-end' },
  theirLine: { justifyContent: 'flex-start' },
  bubble: { borderRadius: 17, borderWidth: 1, maxWidth: '78%', paddingHorizontal: 13, paddingVertical: 10 },
  messageText: { fontSize: 14, lineHeight: 20 },
  messageTime: { alignSelf: 'flex-end', fontSize: 9, marginTop: 4 },
  typing: { alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: 7, marginLeft: 2 },
  typingDots: { alignItems: 'center', borderRadius: 15, flexDirection: 'row', gap: 3, paddingHorizontal: 10, paddingVertical: 8 },
  dot: { backgroundColor: '#9ca6c4', borderRadius: 3, height: 5, width: 5 },
  typingText: { fontSize: 10 },
  composer: { alignItems: 'center', borderTopWidth: 1, flexDirection: 'row', gap: 7, paddingHorizontal: 10, paddingTop: 9 },
  inputWrap: { borderRadius: 18, flex: 1 },
  input: { fontSize: 13, minHeight: 38, paddingHorizontal: 14, paddingVertical: 8 },
  send: { alignItems: 'center', borderRadius: 19, height: 38, justifyContent: 'center', width: 38 },
});