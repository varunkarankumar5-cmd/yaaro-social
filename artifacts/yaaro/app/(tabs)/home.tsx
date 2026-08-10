import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, BrandMark, IconButton, SectionTitle } from '@/components/YaaroUI';
import { statusImage, useYaaro } from '@/context/YaaroContext';

export default function HomeScreen() {
  const { user, statuses, chats, palette } = useYaaro();
  const insets = useSafeAreaInsets();
  const activeStatuses = statuses.filter((status) => Date.now() - status.createdAt < 1000 * 60 * 60 * 24);
  return <View style={[styles.screen, { backgroundColor: palette.background }]}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: 100 }}>
      <View style={styles.topBar}><BrandMark color={palette.foreground} /><View style={styles.topActions}><IconButton icon="search" color={palette.foreground} onPress={() => {}} /><IconButton icon="bell" color={palette.foreground} onPress={() => {}} background={palette.card} /></View></View>
      <View style={styles.greeting}><Text style={[styles.hello, { color: palette.mutedForeground }]}>Good morning, {user.name.split(' ')[0]}</Text><Text style={[styles.heading, { color: palette.foreground }]}>What’s happening?</Text></View>
      <SectionTitle title="Status" action="See all" onAction={() => router.push('/(tabs)/status')} colors={palette} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statusRow}>
        <Pressable testID="add-status" onPress={() => router.push('/(tabs)/status')} style={styles.storyItem}><View style={[styles.addAvatar, { borderColor: palette.border, backgroundColor: palette.card }]}><Avatar name={user.name} size={58} /><View style={[styles.plus, { backgroundColor: palette.primary }]}><Feather name="plus" size={13} color="#fff" /></View></View><Text style={[styles.storyName, { color: palette.foreground }]}>Your story</Text></Pressable>
        {activeStatuses.map((status) => <Pressable testID={`story-${status.id}`} key={status.id} onPress={() => router.push(`/story/${status.id}`)} style={styles.storyItem}><View style={[styles.storyRing, { borderColor: status.viewed ? palette.border : palette.primary }]}>{status.imageKey ? <Image source={statusImage(status.imageKey)} style={styles.storyImage} /> : <View style={[styles.textStory, { backgroundColor: palette.accent }]}><Text numberOfLines={2} style={[styles.textStoryText, { color: palette.accentForeground }]}>{status.text}</Text></View>}</View><Text numberOfLines={1} style={[styles.storyName, { color: palette.foreground }]}>{status.author.name.split(' ')[0]}</Text></Pressable>)}
      </ScrollView>
      <SectionTitle title="Recent chats" action="View all" onAction={() => router.push('/(tabs)/chat')} colors={palette} />
      <View style={[styles.chatCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
        {chats.slice(0, 3).map((chat, index) => <Pressable key={chat.id} onPress={() => router.push(`/chat/${chat.id}`)} style={[styles.chatRow, index < 2 && { borderBottomColor: palette.border, borderBottomWidth: 1 }]}>
          <View><Avatar name={chat.user.name} size={50} /><View style={[styles.online, { backgroundColor: chat.online ? '#57cf91' : palette.mutedForeground, borderColor: palette.card }]} /></View>
          <View style={styles.chatCopy}><View style={styles.chatTop}><Text style={[styles.chatName, { color: palette.foreground }]}>{chat.user.name}</Text><Text style={[styles.chatTime, { color: palette.mutedForeground }]}>{chat.time}</Text></View><View style={styles.chatBottom}><Text numberOfLines={1} style={[styles.lastMessage, { color: palette.mutedForeground }]}>{chat.lastMessage}</Text>{chat.unread > 0 ? <View style={[styles.unread, { backgroundColor: palette.primary }]}><Text style={styles.unreadText}>{chat.unread}</Text></View> : null}</View></View>
          <Feather name="chevron-right" size={18} color={palette.mutedForeground} />
        </Pressable>)}
      </View>
      <View style={[styles.tipCard, { backgroundColor: palette.accent }]}><View style={[styles.tipIcon, { backgroundColor: palette.primary }]}><Feather name="star" size={16} color="#fff" /></View><View style={{ flex: 1 }}><Text style={[styles.tipTitle, { color: palette.accentForeground }]}>Make the moment yours</Text><Text style={[styles.tipBody, { color: palette.mutedForeground }]}>Share a quick status with your people.</Text></View><Feather name="arrow-up-right" size={18} color={palette.accentForeground} /></View>
    </ScrollView>
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  topActions: { flexDirection: 'row', gap: 4 },
  greeting: { paddingHorizontal: 20, paddingTop: 28 },
  hello: { fontSize: 13, fontWeight: '500' },
  heading: { fontSize: 28, fontWeight: '700', letterSpacing: -0.9, marginTop: 4 },
  statusRow: { gap: 16, paddingHorizontal: 20 },
  storyItem: { alignItems: 'center', width: 68 },
  addAvatar: { alignItems: 'center', borderRadius: 36, borderWidth: 1, height: 70, justifyContent: 'center', position: 'relative', width: 70 },
  plus: { alignItems: 'center', borderColor: '#ffffff', borderRadius: 10, borderWidth: 2, bottom: -1, height: 21, justifyContent: 'center', position: 'absolute', right: -1, width: 21 },
  storyRing: { borderRadius: 36, borderWidth: 2, height: 70, padding: 3, width: 70 },
  storyImage: { borderRadius: 32, height: 60, width: 60 },
  textStory: { alignItems: 'center', borderRadius: 31, flex: 1, justifyContent: 'center', padding: 10 },
  textStoryText: { fontSize: 10, fontWeight: '700', textAlign: 'center' },
  storyName: { fontSize: 11, fontWeight: '600', marginTop: 8 },
  chatCard: { borderRadius: 22, borderWidth: 1, marginHorizontal: 20, overflow: 'hidden' },
  chatRow: { alignItems: 'center', flexDirection: 'row', minHeight: 79, paddingHorizontal: 15 },
  online: { borderRadius: 6, borderWidth: 2, bottom: 0, height: 12, position: 'absolute', right: 0, width: 12 },
  chatCopy: { flex: 1, marginLeft: 13 },
  chatTop: { flexDirection: 'row', justifyContent: 'space-between' },
  chatName: { fontSize: 14, fontWeight: '700' },
  chatTime: { fontSize: 11 },
  chatBottom: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  lastMessage: { flex: 1, fontSize: 12 },
  unread: { alignItems: 'center', borderRadius: 9, height: 18, justifyContent: 'center', minWidth: 18, paddingHorizontal: 5 },
  unreadText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  tipCard: { alignItems: 'center', borderRadius: 20, flexDirection: 'row', gap: 12, margin: 20, marginTop: 18, padding: 16 },
  tipIcon: { alignItems: 'center', borderRadius: 15, height: 30, justifyContent: 'center', width: 30 },
  tipTitle: { fontSize: 13, fontWeight: '700' },
  tipBody: { fontSize: 11, marginTop: 3 },
});