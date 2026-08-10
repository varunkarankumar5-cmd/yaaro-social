import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Header, IconButton, SectionTitle } from '@/components/YaaroUI';
import { statusImage, useYaaro } from '@/context/YaaroContext';

export default function StatusScreen() {
  const { user, statuses, palette, addStatus } = useYaaro();
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const active = statuses.filter((status) => Date.now() - status.createdAt < 1000 * 60 * 60 * 24);
  const publish = async () => { if (!draft.trim()) return; await addStatus(draft); setDraft(''); setComposerOpen(false); };
  return <View style={[styles.screen, { backgroundColor: palette.background }]}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: 100 }}>
      <View style={styles.headerRow}><Header title="Status" subtitle="The little things worth sharing" colors={palette} /><IconButton icon="camera" color={palette.foreground} onPress={() => setComposerOpen(true)} background={palette.card} /></View>
      <Pressable onPress={() => setComposerOpen(true)} style={[styles.composerTrigger, { backgroundColor: palette.card, borderColor: palette.border }]}><Avatar name={user.name} size={42} /><Text style={[styles.composerPlaceholder, { color: palette.mutedForeground }]}>Share a thought with your people...</Text><Feather name="edit-3" size={18} color={palette.primary} /></Pressable>
      {composerOpen ? <View style={[styles.composer, { backgroundColor: palette.card, borderColor: palette.border }]}><TextInput autoFocus multiline value={draft} onChangeText={setDraft} placeholder="What’s on your mind?" placeholderTextColor={palette.mutedForeground} style={[styles.composerInput, { color: palette.foreground }]} /><View style={styles.composerFooter}><Text style={[styles.localLabel, { color: palette.mutedForeground }]}>Disappears in 24 hours</Text><Pressable onPress={publish} style={[styles.publish, { backgroundColor: palette.primary }]}><Text style={styles.publishText}>Post status</Text></Pressable></View></View> : null}
      <SectionTitle title="Friends' updates" action={`${active.length} active`} colors={palette} />
      <View style={styles.grid}>{active.map((status) => <Pressable key={status.id} onPress={() => import('expo-router').then(({ router }) => router.push(`/story/${status.id}`))} style={[styles.statusCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <View style={styles.cardImageWrap}>{status.imageKey ? <Image source={statusImage(status.imageKey)} style={styles.cardImage} /> : <LinearGradient colors={['#f2b5a7', '#d6d9ff']} style={styles.cardImage}><Text style={styles.cardQuote}>{status.text}</Text></LinearGradient>}<View style={styles.cardOverlay}><View style={styles.miniAvatar}><Avatar name={status.author.name} size={28} /></View><Text style={styles.cardAuthor}>{status.author.name.split(' ')[0]}</Text><Text style={styles.cardTime}>{formatAge(status.createdAt)}</Text></View></View><View style={styles.cardFooter}><Text numberOfLines={1} style={[styles.cardCaption, { color: palette.foreground }]}>{status.text ?? 'Shared a photo'}</Text><Feather name="arrow-up-right" size={17} color={palette.primary} /></View>
      </Pressable>)}</View>
      <View style={[styles.expiryNote, { backgroundColor: palette.accent }]}><Feather name="clock" size={16} color={palette.accentForeground} /><Text style={[styles.expiryText, { color: palette.accentForeground }]}>Statuses are private to your people and disappear after 24 hours.</Text></View>
    </ScrollView>
  </View>;
}

function formatAge(createdAt: number) { const mins = Math.max(1, Math.round((Date.now() - createdAt) / 60000)); return mins < 60 ? `${mins}m` : `${Math.round(mins / 60)}h`; }

const styles = StyleSheet.create({
  screen: { flex: 1 },
  headerRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  composerTrigger: { alignItems: 'center', borderRadius: 18, borderWidth: 1, flexDirection: 'row', marginHorizontal: 20, padding: 12 },
  composerPlaceholder: { flex: 1, fontSize: 12, marginLeft: 11 },
  composer: { borderRadius: 20, borderWidth: 1, marginHorizontal: 20, marginTop: 12, padding: 14 },
  composerInput: { fontSize: 15, minHeight: 74, textAlignVertical: 'top' },
  composerFooter: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  localLabel: { fontSize: 11 },
  publish: { borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9 },
  publishText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 20 },
  statusCard: { borderRadius: 20, borderWidth: 1, overflow: 'hidden', width: '47.8%' },
  cardImageWrap: { height: 178, overflow: 'hidden', position: 'relative' },
  cardImage: { alignItems: 'center', height: '100%', justifyContent: 'center', width: '100%' },
  cardQuote: { color: '#14213d', fontSize: 18, fontWeight: '700', lineHeight: 22, padding: 17 },
  cardOverlay: { alignItems: 'center', bottom: 10, flexDirection: 'row', left: 10, position: 'absolute', right: 10 },
  miniAvatar: { borderColor: '#fff', borderRadius: 16, borderWidth: 2 },
  cardAuthor: { color: '#fff', fontSize: 11, fontWeight: '700', marginLeft: 6, textShadowColor: '#0009', textShadowRadius: 4 },
  cardTime: { color: '#fff', fontSize: 10, marginLeft: 'auto', textShadowColor: '#0009', textShadowRadius: 4 },
  cardFooter: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 12 },
  cardCaption: { flex: 1, fontSize: 11, fontWeight: '600' },
  expiryNote: { alignItems: 'center', borderRadius: 16, flexDirection: 'row', gap: 10, marginHorizontal: 20, marginTop: 22, padding: 14 },
  expiryText: { flex: 1, fontSize: 11, lineHeight: 16 },
});