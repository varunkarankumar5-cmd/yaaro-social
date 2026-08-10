import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '@/components/YaaroUI';
import { statusImage, useYaaro } from '@/context/YaaroContext';

const reactions = ['❤️', '👍', '😂', '😮', '😢'];

export default function StoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { statuses, palette, markStatusViewed, reactToStatus } = useYaaro();
  const status = statuses.find((item) => item.id === id);
  const insets = useSafeAreaInsets();
  useEffect(() => { if (status) markStatusViewed(status.id); }, [status?.id]);
  if (!status) return <View style={[styles.missing, { backgroundColor: palette.background }]}><Text style={{ color: palette.foreground }}>Status not found</Text></View>;
  return <View style={styles.screen}>{status.imageKey ? <Image source={statusImage(status.imageKey)} style={styles.background} /> : <LinearGradient colors={['#ff9d85', '#676be6']} style={styles.background}><Text style={styles.bigQuote}>{status.text}</Text></LinearGradient>}<View style={[styles.tint, { paddingTop: insets.top + 10 }]}><View style={styles.progress}><View style={styles.progressFill} /></View><View style={styles.storyHeader}><Pressable onPress={() => router.back()} style={styles.close}><Feather name="x" size={22} color="#fff" /></Pressable><Avatar name={status.author.name} size={38} /><View style={styles.storyCopy}><Text style={styles.author}>{status.author.name}</Text><Text style={styles.age}>{formatAge(status.createdAt)} ago</Text></View><Feather name="more-horizontal" size={21} color="#fff" /></View><View style={styles.storyBottom}><Text style={styles.caption}>{status.text ?? 'A little moment from today.'}</Text><View style={styles.reactions}>{reactions.map((reaction) => <Pressable key={reaction} onPress={() => reactToStatus(status.id, reaction)} style={styles.reaction}><Text style={styles.reactionText}>{reaction}</Text></Pressable>)}</View></View></View></View>;
}

function formatAge(createdAt: number) { const mins = Math.max(1, Math.round((Date.now() - createdAt) / 60000)); return mins < 60 ? `${mins}m` : `${Math.round(mins / 60)}h`; }
const styles = StyleSheet.create({
  screen: { backgroundColor: '#111', flex: 1 },
  missing: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  background: { height: '100%', position: 'absolute', width: '100%' },
  tint: { backgroundColor: '#0003', flex: 1, paddingHorizontal: 18 },
  progress: { backgroundColor: '#ffffff55', borderRadius: 3, height: 3, overflow: 'hidden' },
  progressFill: { backgroundColor: '#fff', borderRadius: 3, height: 3, width: '45%' },
  storyHeader: { alignItems: 'center', flexDirection: 'row', marginTop: 15 },
  close: { alignItems: 'center', height: 38, justifyContent: 'center', marginRight: 9, width: 38 },
  storyCopy: { flex: 1, marginLeft: 10 },
  author: { color: '#fff', fontSize: 13, fontWeight: '700' },
  age: { color: '#ffffffbb', fontSize: 10, marginTop: 3 },
  storyBottom: { bottom: 28, left: 18, position: 'absolute', right: 18 },
  caption: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 26, marginBottom: 20, maxWidth: 300 },
  reactions: { alignItems: 'center', flexDirection: 'row', gap: 9 },
  reaction: { alignItems: 'center', backgroundColor: '#0006', borderColor: '#ffffff55', borderRadius: 21, borderWidth: 1, height: 42, justifyContent: 'center', width: 42 },
  reactionText: { fontSize: 20 },
  bigQuote: { color: '#fff', fontSize: 30, fontWeight: '700', lineHeight: 38, paddingHorizontal: 30, textAlign: 'center' },
});