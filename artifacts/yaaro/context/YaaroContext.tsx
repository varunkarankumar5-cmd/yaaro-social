import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import colors from '@/constants/colors';

export type ThemeMode = 'light' | 'dark';
export type StatusKind = 'text' | 'photo' | 'video';

export interface YaaroUser {
  name: string;
  username: string;
  bio?: string;
  photoUrl?: string;
}

export interface Status {
  id: string;
  author: YaaroUser;
  kind: StatusKind;
  text?: string;
  imageKey?: 'cafe' | 'coast';
  createdAt: number;
  reactions: Record<string, number>;
  viewed?: boolean;
}

export interface ChatPreview {
  id: string;
  user: YaaroUser;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
  image?: boolean;
}

const STORAGE_KEY = '@yaaro/local-demo';
const demoUser: YaaroUser = {
  name: 'Aarav Mehta',
  username: 'aarav.m',
  bio: 'Collecting small moments and sharing the good ones.',
};
const initialChats: ChatPreview[] = [
  { id: 'maya', user: { name: 'Maya Singh', username: 'mayasingh' }, lastMessage: 'That sunset was unreal.', time: '9:42 AM', unread: 2, online: true },
  { id: 'rhea', user: { name: 'Rhea Kapoor', username: 'rhea.k' }, lastMessage: 'Send me the photos when you can', time: 'Yesterday', unread: 0, online: false },
  { id: 'dev', user: { name: 'Dev Malhotra', username: 'devm' }, lastMessage: 'Coffee this weekend?', time: 'Tue', unread: 0, online: true },
];
const initialMessages: Record<string, Message[]> = {
  maya: [
    { id: 'm1', sender: 'them', text: 'Hey! Are you around this weekend?', time: '9:38 AM' },
    { id: 'm2', sender: 'me', text: 'Yes, I am. What are you thinking?', time: '9:40 AM' },
    { id: 'm3', sender: 'them', text: 'That sunset was unreal.', time: '9:42 AM' },
  ],
  rhea: [{ id: 'r1', sender: 'them', text: 'Send me the photos when you can', time: 'Yesterday' }],
  dev: [{ id: 'd1', sender: 'them', text: 'Coffee this weekend?', time: 'Tue' }],
};
const initialStatuses: Status[] = [
  { id: 's1', author: { name: 'Maya Singh', username: 'mayasingh' }, kind: 'photo', imageKey: 'coast', createdAt: Date.now() - 1000 * 60 * 18, reactions: { '❤️': 4, '👍': 1 }, viewed: false },
  { id: 's2', author: { name: 'Rhea Kapoor', username: 'rhea.k' }, kind: 'text', text: 'Slow mornings are underrated.', createdAt: Date.now() - 1000 * 60 * 52, reactions: { '❤️': 2 }, viewed: false },
  { id: 's3', author: { name: 'Dev Malhotra', username: 'devm' }, kind: 'photo', imageKey: 'cafe', createdAt: Date.now() - 1000 * 60 * 91, reactions: { '😂': 3 }, viewed: true },
];

interface YaaroContextValue {
  ready: boolean;
  loggedIn: boolean;
  user: YaaroUser;
  statuses: Status[];
  chats: ChatPreview[];
  messages: Record<string, Message[]>;
  theme: ThemeMode;
  palette: typeof colors.light;
  signIn: (identifier: string, password: string) => Promise<boolean>;
  signUp: (name: string, identifier: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<YaaroUser>) => Promise<void>;
  addStatus: (text: string, kind?: StatusKind) => Promise<void>;
  reactToStatus: (id: string, reaction: string) => Promise<void>;
  markStatusViewed: (id: string) => Promise<void>;
  sendMessage: (chatId: string, text: string) => Promise<void>;
  toggleTheme: () => Promise<void>;
}

const YaaroContext = createContext<YaaroContextValue | null>(null);

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function YaaroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<YaaroUser>(demoUser);
  const [statuses, setStatuses] = useState<Status[]>(initialStatuses);
  const [chats, setChats] = useState<ChatPreview[]>(initialChats);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLoggedIn(!!parsed.loggedIn);
          setUser(parsed.user ?? demoUser);
          setStatuses(parsed.statuses ?? initialStatuses);
          setChats(parsed.chats ?? initialChats);
          setMessages(parsed.messages ?? initialMessages);
          setTheme(parsed.theme ?? 'light');
        } catch {
          setLoggedIn(false);
        }
      }
      setReady(true);
    });
  }, []);

  const persist = async (next: Partial<{ loggedIn: boolean; user: YaaroUser; statuses: Status[]; chats: ChatPreview[]; messages: Record<string, Message[]>; theme: ThemeMode }>) => {
    const current = { loggedIn, user, statuses, chats, messages, theme, ...next };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  };

  const value = useMemo<YaaroContextValue>(() => ({
    ready,
    loggedIn,
    user,
    statuses,
    chats,
    messages,
    theme,
    palette: theme === 'dark' ? colors.dark : colors.light,
    signIn: async (identifier, password) => {
      const valid = identifier.trim().length > 2 && password.trim().length > 2;
      if (valid) {
        setLoggedIn(true);
        await persist({ loggedIn: true });
      }
      return valid;
    },
    signUp: async (name, identifier, password) => {
      const valid = name.trim().length > 1 && identifier.trim().length > 2 && password.trim().length > 2;
      if (valid) {
        const nextUser = { ...demoUser, name: name.trim(), username: name.trim().toLowerCase().replace(/\s+/g, '.') };
        setUser(nextUser);
        setLoggedIn(true);
        await persist({ loggedIn: true, user: nextUser });
      }
      return valid;
    },
    logout: async () => {
      setLoggedIn(false);
      await persist({ loggedIn: false });
    },
    updateUser: async (updates) => {
      const next = { ...user, ...updates };
      setUser(next);
      await persist({ user: next });
    },
    addStatus: async (text, kind = 'text') => {
      const next: Status[] = [{ id: makeId(), author: user, kind, text: text.trim(), createdAt: Date.now(), reactions: {} }, ...statuses];
      setStatuses(next);
      await persist({ statuses: next });
    },
    reactToStatus: async (id, reaction) => {
      const next = statuses.map((status) => status.id === id ? { ...status, reactions: { ...status.reactions, [reaction]: (status.reactions[reaction] ?? 0) + 1 } } : status);
      setStatuses(next);
      await persist({ statuses: next });
    },
    markStatusViewed: async (id) => {
      const next = statuses.map((status) => status.id === id ? { ...status, viewed: true } : status);
      setStatuses(next);
      await persist({ statuses: next });
    },
    sendMessage: async (chatId, text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const nextMessages = { ...messages, [chatId]: [...(messages[chatId] ?? []), { id: makeId(), sender: 'me' as const, text: trimmed, time: 'Now' }] };
      const nextChats = chats.map((chat) => chat.id === chatId ? { ...chat, lastMessage: trimmed, time: 'Now', unread: 0 } : chat);
      setMessages(nextMessages);
      setChats(nextChats);
      await persist({ messages: nextMessages, chats: nextChats });
    },
    toggleTheme: async () => {
      const next = theme === 'light' ? 'dark' : 'light';
      setTheme(next);
      await persist({ theme: next });
    },
  }), [ready, loggedIn, user, statuses, chats, messages, theme]);

  return <YaaroContext.Provider value={value}>{children}</YaaroContext.Provider>;
}

export function useYaaro() {
  const context = useContext(YaaroContext);
  if (!context) throw new Error('useYaaro must be used inside YaaroProvider');
  return context;
}

export function statusImage(key?: Status['imageKey']): ImageSourcePropType | undefined {
  if (key === 'cafe') return require('@/assets/images/status-cafe.jpg');
  if (key === 'coast') return require('@/assets/images/status-coast.jpg');
  return undefined;
}