import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, IconButton } from '@/components/YaaroUI';
import { useYaaro } from '@/context/YaaroContext';
import { router } from 'expo-router';

export default function EditProfileScreen() {
  const { user, palette, updateUser } = useYaaro();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio ?? '');
  const save = async () => { await updateUser({ name: name.trim() || user.name, username: username.trim().replace(/^@/, '') || user.username, bio: bio.trim() }); router.back(); };
  return <View style={[styles.screen, { backgroundColor: palette.background }]}><ScrollView contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: 30 }}><View style={styles.header}><IconButton icon="chevron-left" color={palette.foreground} onPress={() => router.back()} /><Text style={[styles.title, { color: palette.foreground }]}>Edit profile</Text><Pressable onPress={save}><Text style={[styles.save, { color: palette.primary }]}>Save</Text></Pressable></View><View style={styles.avatarWrap}><View style={[styles.avatarBorder, { borderColor: palette.primary }]}><Avatar name={name} size={92} /></View><Pressable onPress={() => {}} style={styles.photoAction}><Feather name="camera" size={13} color={palette.primary} /><Text style={[styles.photoText, { color: palette.primary }]}>Change photo</Text></Pressable></View><Field label="Name" value={name} onChangeText={setName} colors={palette} /><Field label="Username" value={`@${username.replace(/^@/, '')}`} onChangeText={setUsername} colors={palette} /><Field label="Bio" value={bio} onChangeText={setBio} colors={palette} multiline /></ScrollView></View>;
}

function Field({ label, value, onChangeText, colors, multiline }: { label: string; value: string; onChangeText: (value: string) => void; colors: any; multiline?: boolean }) { return <View style={styles.field}><Text style={[styles.label, { color: colors.mutedForeground }]}>{label}</Text><TextInput value={value} onChangeText={onChangeText} multiline={multiline} textAlignVertical={multiline ? 'top' : 'center'} style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, minHeight: multiline ? 94 : 52 }]} /></View>; }

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
  title: { fontSize: 17, fontWeight: '700' },
  save: { fontSize: 14, fontWeight: '700', paddingHorizontal: 10, paddingVertical: 11 },
  avatarWrap: { alignItems: 'center', paddingVertical: 25 },
  avatarBorder: { borderRadius: 52, borderWidth: 2, padding: 3 },
  photoAction: { alignItems: 'center', flexDirection: 'row', gap: 6, marginTop: 11 },
  photoText: { fontSize: 12, fontWeight: '700' },
  field: { marginHorizontal: 20, marginTop: 16 },
  label: { fontSize: 11, fontWeight: '700', marginBottom: 7, textTransform: 'uppercase' },
  input: { borderRadius: 15, borderWidth: 1, fontSize: 14, paddingHorizontal: 15, paddingVertical: 12 },
});