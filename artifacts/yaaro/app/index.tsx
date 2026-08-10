import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandMark } from '@/components/YaaroUI';
import { useYaaro } from '@/context/YaaroContext';

export default function AuthScreen() {
  const { ready, loggedIn, signIn, signUp, palette } = useYaaro();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!ready) return <View style={[styles.loading, { backgroundColor: palette.background }]}><ActivityIndicator color={palette.primary} /></View>;
  if (loggedIn) {
    router.replace('/(tabs)');
    return null;
  }

  const submit = async () => {
    setMessage('');
    setLoading(true);
    const valid = mode === 'login' ? await signIn(identifier, password) : await signUp(name, identifier, password);
    setLoading(false);
    if (valid) router.replace('/(tabs)');
    else setMessage(mode === 'login' ? 'Use any email or phone and a password to try the demo.' : 'Add your name, email or phone, and a password.');
  };

  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.screen, { backgroundColor: palette.background }]}>
    <View style={[styles.topGlow, { top: -insets.top - 60 }]} />
    <View style={[styles.container, { paddingTop: insets.top + 38 }]}>
      <BrandMark color={palette.foreground} />
      <View style={styles.welcome}>
        <Text style={[styles.kicker, { color: palette.primary }]}>A little more connected</Text>
        <Text style={[styles.title, { color: palette.foreground }]}>Your people.{'\n'}Your moments.</Text>
        <Text style={[styles.body, { color: palette.mutedForeground }]}>Share what feels real, stay close to the people who matter.</Text>
      </View>
      <View style={[styles.formCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
        {mode === 'signup' ? <Field icon="user" placeholder="Your name" value={name} onChangeText={setName} colors={palette} /> : null}
        <Field icon="at-sign" placeholder="Email or phone number" value={identifier} onChangeText={setIdentifier} colors={palette} autoCapitalize="none" />
        <Field icon="lock" placeholder="Password" value={password} onChangeText={setPassword} colors={palette} secureTextEntry />
        {message ? <Text style={[styles.message, { color: palette.destructive }]}>{message}</Text> : null}
        <Pressable testID="auth-submit" onPress={submit} style={({ pressed }) => [styles.submit, pressed && { opacity: 0.82 }]} disabled={loading}>
          <LinearGradient colors={['#ff8076', '#6467e9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.submitGradient}>
            {loading ? <ActivityIndicator color="#fff" /> : <><Text style={styles.submitText}>{mode === 'login' ? 'Log in' : 'Create account'}</Text><Feather name="arrow-up-right" size={19} color="#fff" /></>}
          </LinearGradient>
        </Pressable>
        <Pressable onPress={() => setMessage('Demo reset link sent. Check your imagination.') } style={styles.forgot}><Text style={[styles.forgotText, { color: palette.mutedForeground }]}>Forgot password?</Text></Pressable>
      </View>
      <View style={styles.switchRow}><Text style={[styles.switchText, { color: palette.mutedForeground }]}>{mode === 'login' ? 'New to Yaaro?' : 'Already have an account?'}</Text><Pressable onPress={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage(''); }}><Text style={[styles.switchAction, { color: palette.primary }]}>{mode === 'login' ? ' Create account' : ' Log in'}</Text></Pressable></View>
      <Text style={[styles.demoHint, { color: palette.mutedForeground }]}>Local demo mode · no account required</Text>
    </View>
  </KeyboardAvoidingView>;
}

function Field({ icon, placeholder, value, onChangeText, colors, secureTextEntry, autoCapitalize = 'sentences' }: { icon: keyof typeof Feather.glyphMap; placeholder: string; value: string; onChangeText: (text: string) => void; colors: any; secureTextEntry?: boolean; autoCapitalize?: 'none' | 'sentences' }) {
  return <View style={[styles.field, { backgroundColor: colors.secondary, borderColor: colors.border }]}><Feather name={icon} size={17} color={colors.mutedForeground} /><TextInput placeholder={placeholder} placeholderTextColor={colors.mutedForeground} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} autoCapitalize={autoCapitalize} style={[styles.input, { color: colors.foreground }]} /></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  loading: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  topGlow: { backgroundColor: '#e6e8ff', borderRadius: 260, height: 320, opacity: 0.55, position: 'absolute', right: -100, width: 320 },
  container: { flex: 1, paddingHorizontal: 24 },
  welcome: { marginTop: 68 },
  kicker: { fontSize: 14, fontWeight: '700', letterSpacing: 0.6, marginBottom: 12 },
  title: { fontSize: 40, fontWeight: '700', letterSpacing: -1.6, lineHeight: 43 },
  body: { fontSize: 15, lineHeight: 22, marginTop: 16, maxWidth: 300 },
  formCard: { borderRadius: 26, borderWidth: 1, marginTop: 34, padding: 16 },
  field: { alignItems: 'center', borderRadius: 15, borderWidth: 1, flexDirection: 'row', height: 54, marginBottom: 10, paddingHorizontal: 15 },
  input: { flex: 1, fontSize: 14, marginLeft: 11 },
  message: { fontSize: 12, lineHeight: 17, marginBottom: 10 },
  submit: { borderRadius: 15, overflow: 'hidden', marginTop: 3 },
  submitGradient: { alignItems: 'center', flexDirection: 'row', height: 54, justifyContent: 'center', gap: 8 },
  submitText: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  forgot: { alignItems: 'center', paddingTop: 16 },
  forgotText: { fontSize: 12, fontWeight: '600' },
  switchRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 23 },
  switchText: { fontSize: 13 },
  switchAction: { fontSize: 13, fontWeight: '700' },
  demoHint: { fontSize: 11, marginTop: 24, textAlign: 'center' },
});