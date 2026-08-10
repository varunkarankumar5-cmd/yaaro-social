import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

export function Avatar({ name, size = 54, image }: { name: string; size?: number; image?: ImageSourcePropType }) {
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  return image ? <Image source={image} style={{ width: size, height: size, borderRadius: size / 2 }} /> : (
    <LinearGradient colors={['#ff8076', '#6566e8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.34 }]}>{initials}</Text>
    </LinearGradient>
  );
}

export function IconButton({ icon, onPress, color, size = 21, background }: { icon: keyof typeof Feather.glyphMap; onPress: () => void; color: string; size?: number; background?: string }) {
  return <Pressable testID={`icon-${icon}`} onPress={onPress} style={({ pressed }) => [styles.iconButton, background ? { backgroundColor: background } : null, pressed && styles.pressed]}>
    <Feather name={icon} size={size} color={color} />
  </Pressable>;
}

export function BrandMark({ color }: { color: string }) {
  return <View style={styles.brandRow}><LinearGradient colors={['#ff8076', '#6467e9']} style={styles.brandMark}><Text style={styles.brandLetter}>Y</Text></LinearGradient><Text style={[styles.brandName, { color }]}>Yaaro</Text></View>;
}

export function Header({ title, subtitle, right, colors }: { title: string; subtitle?: string; right?: ReactNode; colors: { foreground: string; mutedForeground: string }; }) {
  return <View style={styles.header}><View><Text style={[styles.headerTitle, { color: colors.foreground }]}>{title}</Text>{subtitle ? <Text style={[styles.headerSubtitle, { color: colors.mutedForeground }]}>{subtitle}</Text> : null}</View>{right}</View>;
}

export function SectionTitle({ title, action, onAction, colors }: { title: string; action?: string; onAction?: () => void; colors: { foreground: string; primary: string } }) {
  return <View style={styles.sectionTitle}><Text style={[styles.sectionText, { color: colors.foreground }]}>{title}</Text>{action && onAction ? <Pressable onPress={onAction}><Text style={[styles.sectionAction, { color: colors.primary }]}>{action}</Text></Pressable> : null}</View>;
}

export function EmptyState({ icon, title, body, colors }: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string; colors: { foreground: string; mutedForeground: string; accent: string } }) {
  return <View style={styles.empty}><Ionicons name={icon} size={34} color={colors.accent} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>{title}</Text><Text style={[styles.emptyBody, { color: colors.mutedForeground }]}>{body}</Text></View>;
}

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#ffffff', fontWeight: '700' },
  iconButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.65, transform: [{ scale: 0.96 }] },
  brandRow: { alignItems: 'center', flexDirection: 'row', gap: 9 },
  brandMark: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  brandLetter: { color: '#ffffff', fontSize: 19, fontWeight: '800' },
  brandName: { fontSize: 23, fontWeight: '800', letterSpacing: -0.7 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 18 },
  headerTitle: { fontSize: 28, fontWeight: '700', letterSpacing: -0.8 },
  headerSubtitle: { fontSize: 13, marginTop: 4 },
  sectionTitle: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, marginTop: 22 },
  sectionText: { fontSize: 18, fontWeight: '700', letterSpacing: -0.3 },
  sectionAction: { fontSize: 13, fontWeight: '700' },
  empty: { alignItems: 'center', paddingHorizontal: 28, paddingVertical: 48 },
  emptyTitle: { fontSize: 17, fontWeight: '700', marginTop: 12 },
  emptyBody: { fontSize: 13, lineHeight: 19, marginTop: 6, textAlign: 'center' },
});