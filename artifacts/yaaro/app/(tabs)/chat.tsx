import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Header, IconButton } from '@/components/YaaroUI';
import { useYaaro } from '@/context/YaaroContext';
import { router } from 'expo-router';

export default function ChatScreen() {
  const { chats, palette } = useYaaro();
  const insets = useSafeAreaInsets();
  return <View style={[styles.screen, { backgroundColor: palette.background }]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: 100 }}>
    <View style={styles.headerRow}><Header title="Chat" subtitle="Good conversations, closer together" colors={palette} /><IconButton icon="edit" color={palette.foreground} onPress={() => {}} background={palette.card} /></View>
    <View style={[styles.search, { backgroundColor: palette.card, borderColor: palette.border }]}><Feather name="search" size={17} color={palette.mutedForeground} /><Text style={[styles.searchText, { color: palette.mutedForeground }]}>Search conversations</Text></View>
    <View style={styles.onlineRow}><Text style={[styles.label, { color: palette.foreground }]}>Online now</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.onlineList}>{chats.filter((chat) => chat.online).map((chat) => <Pressable key={chat.id} onPress={() => router.push(`/chat/${chat.id}`)} style={styles.onlinePerson}><View><Avatar name={chat.user.name} size={48} /><View style={[styles.onlineDot, { backgroundColor: '#57cf91', borderColor: palette.background }]} /></View><Text style={[styles.onlineName, { color: palette.mutedForeground }]}>{chat.user.name.split(' ')[0]}</Text></Pressable>)}</ScrollView></View>
    <Text style={[styles.label, { color: palette.foreground, marginHorizontal: 20, marginTop: 24 }]}>All messages</Text>
    <View style={[styles.list, { backgroundColor: palette.card, borderColor: palette.border }]}>{chats.map((chat, index) => <Pressable key={chat.id} onPress={() => router.push(`/chat/${chat.id}`)} style={[styles.row, index < chats.length - 1 && { borderBottomColor: palette.border, borderBottomWidth: 1 }]}><View><Avatar name={chat.user.name} size={54} /><View style={[styles.onlineDot, { backgroundColor: chat.online ? '#57cf91' : palette.mutedForeground, borderColor: palette.card }]} /></View><View style={styles.copy}><View style={styles.top}><Text style={[styles.name, { color: palette.foreground }]}>{chat.user.name}</Text><Text style={[styles.time, { color: palette.mutedForeground }]}>{chat.time}</Text></View><View style={styles.bottom}><Text numberOfLines={1} style={[styles.preview, { color: palette.mutedForeground }]}>{chat.lastMessage}</Text>{chat.unread > 0 ? <View style={[styles.unread, { backgroundColor: palette.primary }]}><Text style={styles.unreadText}>{chat.unread}</Text></View> : <Feather name="check" size={14} color={palette.primary} />}</View></View><Feather name="chevron-right" size={18} color={palette.mutedForeground} /></Pressable>)}</View>
  </ScrollView></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  headerRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  search: { alignItems: 'center', borderRadius: 15, borderWidth: 1, flexDirection: 'row', marginHorizontal: 20, marginTop: 4, paddingHorizontal: 14, paddingVertical: 12 },
  searchText: { fontSize: 13, marginLeft: 9 },
  onlineRow: { marginTop: 24 },
  label: { fontSize: 15, fontWeight: '700' },
  onlineList: { gap: 17, paddingHorizontal: 20, paddingTop: 14 },
  onlinePerson: { alignItems: 'center' },
  onlineDot: { borderRadius: 7, borderWidth: 2, bottom: 0, height: 13, position: 'absolute', right: 0, width: 13 },
  onlineName: { fontSize: 11, marginTop: 7 },
  list: { borderRadius: 22, borderWidth: 1, marginHorizontal: 20, marginTop: 13, overflow: 'hidden' },
  row: { alignItems: 'center', flexDirection: 'row', minHeight: 86, paddingHorizontal: 15 },
  copy: { flex: 1, marginLeft: 13 },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 14, fontWeight: '700' },
  time: { fontSize: 11 },
  bottom: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  preview: { flex: 1, fontSize: 12 },
  unread: { alignItems: 'center', borderRadius: 9, height: 18, justifyContent: 'center', minWidth: 18 },
  unreadText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});