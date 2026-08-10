import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Header, IconButton } from '@/components/YaaroUI';
import { useYaaro } from '@/context/YaaroContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, statuses, palette, theme, toggleTheme, logout } = useYaaro();
  const insets = useSafeAreaInsets();
  const count = statuses.filter((status) => status.author.username === user.username).length;
  return <View style={[styles.screen, { backgroundColor: palette.background }]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 10, paddingBottom: 100 }}>
    <View style={styles.headerRow}><Header title="Profile" subtitle="Your space on Yaaro" colors={palette} /><IconButton icon="more-horizontal" color={palette.foreground} onPress={() => {}} background={palette.card} /></View>
    <View style={styles.profileTop}><View style={[styles.profileAvatar, { borderColor: palette.primary }]}><Avatar name={user.name} size={88} /></View><Text style={[styles.name, { color: palette.foreground }]}>{user.name}</Text><Text style={[styles.username, { color: palette.primary }]}>@{user.username}</Text><Text style={[styles.bio, { color: palette.mutedForeground }]}>{user.bio}</Text><Pressable onPress={() => router.push('/profile/edit')} style={[styles.editButton, { backgroundColor: palette.card, borderColor: palette.border }]}><Feather name="edit-2" size={14} color={palette.foreground} /><Text style={[styles.editText, { color: palette.foreground }]}>Edit profile</Text></Pressable></View>
    <View style={[styles.stats, { backgroundColor: palette.card, borderColor: palette.border }]}><Stat value={String(count)} label="Statuses" colors={palette} /><View style={[styles.divider, { backgroundColor: palette.border }]} /><Stat value="48" label="Friends" colors={palette} /><View style={[styles.divider, { backgroundColor: palette.border }]} /><Stat value="12" label="Following" colors={palette} /></View>
    <Text style={[styles.sectionLabel, { color: palette.foreground }]}>Preferences</Text>
    <View style={[styles.settings, { backgroundColor: palette.card, borderColor: palette.border }]}><Setting icon="moon" title="Dark mode" subtitle="A softer look for late nights" colors={palette} right={<Switch value={theme === 'dark'} onValueChange={toggleTheme} trackColor={{ false: palette.muted, true: palette.primary }} thumbColor="#fff" />} /><Setting icon="shield" title="Private & personal" subtitle="Your statuses are only for friends" colors={palette} right={<Feather name="check-circle" size={19} color="#57cf91" />} /><Setting icon="help-circle" title="Help & feedback" subtitle="Tell us what would make Yaaro better" colors={palette} right={<Feather name="chevron-right" size={18} color={palette.mutedForeground} />} /></View>
    <Pressable onPress={() => logout()} style={styles.logout}><Feather name="log-out" size={16} color={palette.destructive} /><Text style={[styles.logoutText, { color: palette.destructive }]}>Log out of demo</Text></Pressable>
    <Text style={[styles.version, { color: palette.mutedForeground }]}>Yaaro MVP · Local demo</Text>
  </ScrollView></View>;
}

function Stat({ value, label, colors }: { value: string; label: string; colors: any }) { return <View style={styles.stat}><Text style={[styles.statValue, { color: colors.foreground }]}>{value}</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{label}</Text></View>; }
function Setting({ icon, title, subtitle, colors, right }: { icon: keyof typeof Feather.glyphMap; title: string; subtitle: string; colors: any; right: React.ReactNode }) { return <View style={styles.setting}><View style={[styles.settingIcon, { backgroundColor: colors.accent }]}><Feather name={icon} size={17} color={colors.accentForeground} /></View><View style={styles.settingCopy}><Text style={[styles.settingTitle, { color: colors.foreground }]}>{title}</Text><Text style={[styles.settingSub, { color: colors.mutedForeground }]}>{subtitle}</Text></View>{right}</View>; }

const styles = StyleSheet.create({
  screen: { flex: 1 },
  headerRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  profileTop: { alignItems: 'center', paddingHorizontal: 30, paddingTop: 12 },
  profileAvatar: { borderRadius: 51, borderWidth: 2, padding: 3 },
  name: { fontSize: 22, fontWeight: '700', marginTop: 12 },
  username: { fontSize: 13, fontWeight: '600', marginTop: 3 },
  bio: { fontSize: 13, lineHeight: 19, marginTop: 10, textAlign: 'center' },
  editButton: { alignItems: 'center', borderRadius: 13, borderWidth: 1, flexDirection: 'row', gap: 7, marginTop: 15, paddingHorizontal: 15, paddingVertical: 9 },
  editText: { fontSize: 12, fontWeight: '700' },
  stats: { alignItems: 'center', borderRadius: 20, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, marginTop: 24, paddingVertical: 17 },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 20, fontWeight: '700' },
  statLabel: { fontSize: 11, marginTop: 3 },
  divider: { height: 30, width: 1 },
  sectionLabel: { fontSize: 16, fontWeight: '700', marginHorizontal: 20, marginTop: 28 },
  settings: { borderRadius: 20, borderWidth: 1, marginHorizontal: 20, marginTop: 12, overflow: 'hidden', paddingHorizontal: 15 },
  setting: { alignItems: 'center', flexDirection: 'row', minHeight: 68 },
  settingIcon: { alignItems: 'center', borderRadius: 12, height: 35, justifyContent: 'center', width: 35 },
  settingCopy: { flex: 1, marginLeft: 12 },
  settingTitle: { fontSize: 13, fontWeight: '700' },
  settingSub: { fontSize: 10, marginTop: 3 },
  logout: { alignItems: 'center', flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: 28 },
  logoutText: { fontSize: 13, fontWeight: '700' },
  version: { fontSize: 10, marginTop: 26, textAlign: 'center' },
});