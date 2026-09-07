import { UserProfile, UserPersonalTestimony } from '../types';

interface StoredUserRecord extends UserProfile {
  passwordHash: string;
}

const AUTH_KEYS = {
  CURRENT_USER: 'alkitab_current_user_v1',
  USERS_REGISTRY: 'alkitab_users_registry_v1',
  COMMUNITY_TESTIMONIES: 'alkitab_community_testimonies_v1',
};

// Default seed community testimonies from believers
const SEED_COMMUNITY_TESTIMONIES: UserPersonalTestimony[] = [
  {
    id: 'seed-comm-1',
    title: 'Tuhan Menyediakan Biaya Kuliah Tepat Waktu',
    category: 'Pertolongan Keuangan',
    story: 'Ketika batas akhir pembayaran semester sudah di depan mata dan keluarga kami tidak memiliki tabungan cukup, kami sekeluarga berlutut berdoa meminta belas kasihan Tuhan. Dua hari sebelum penutupan, ada saudara seiman yang tergerak mengirimkan berkat beasiswa tanpa kami pernah bercerita kepadanya. Sungguh Tuhan Yesus adalah Jehovah Jireh!',
    bibleVerse: 'Filipi 4:19',
    date: '14 Jan 2026',
    authorId: 'usr_sarah',
    authorName: 'Sarah Magdalena',
    authorAvatar: '🕊️',
    isPublic: true,
    amenCount: 42,
    createdAt: Date.now() - 86400000 * 12,
  },
  {
    id: 'seed-comm-2',
    title: 'Dipulihkan dari Depresi dan Kekhawatiran Berat',
    category: 'Pemulihan Jiwa',
    story: 'Setelah kehilangan pekerjaan di masa krisis, rasa cemas dan ketakutan membuat saya tidak bisa tidur berminggu-minggu. Suatu malam saat membaca Mazmur 91 dan menangis di kaki salib, Roh Kudus memberikan ketenangan yang luar biasa. Tuhan membuka pintu usaha baru yang bahkan jauh lebih memberkati.',
    bibleVerse: 'Mazmur 34:18',
    date: '02 Feb 2026',
    authorId: 'usr_david',
    authorName: 'David Samuel',
    authorAvatar: '✝️',
    isPublic: true,
    amenCount: 89,
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'seed-comm-3',
    title: 'Mukjizat Kesembuhan Ibu dari Sakit Kritis',
    category: 'Mukjizat Kesembuhan',
    story: 'Ibu saya sempat masuk ruang ICU karena komplikasi mendadak. Tim dokter mengatakan kemungkinan bertahan sangat tipis. Namun doa jemaat dan keluarga tak putus dinaikkan. Pada hari kelima, terjadi pemulihan drastis yang mengejutkan para perawat dan dokter. Bagi Allah tidak ada yang mustahil!',
    bibleVerse: 'Lukas 1:37',
    date: '10 Feb 2026',
    authorId: 'usr_grace',
    authorName: 'Grace Nathania',
    authorAvatar: '⭐',
    isPublic: true,
    amenCount: 115,
    createdAt: Date.now() - 86400000 * 2,
  }
];

export const AuthService = {
  // --- USER SESSION MANAGEMENT ---
  getCurrentUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(AUTH_KEYS.CURRENT_USER);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    return null;
  },

  setCurrentUser(user: UserProfile | null): void {
    if (user) {
      localStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
    }
  },

  getAllRegisteredUsers(): StoredUserRecord[] {
    try {
      const data = localStorage.getItem(AUTH_KEYS.USERS_REGISTRY);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    return [];
  },

  // --- INSTANT REGISTRATION WITHOUT EMAIL VERIFICATION ---
  register(params: {
    name: string;
    emailOrUsername: string;
    password: string;
    avatarEmoji?: string;
    churchOrCity?: string;
    favoriteVerse?: string;
  }): { success: boolean; error?: string; user?: UserProfile } {
    const trimmedId = params.emailOrUsername.trim().toLowerCase();
    const trimmedName = params.name.trim();

    if (!trimmedName) {
      return { success: false, error: 'Nama lengkap tidak boleh kosong.' };
    }
    if (!trimmedId || trimmedId.length < 3) {
      return { success: false, error: 'Email atau username minimal 3 karakter.' };
    }
    if (!params.password || params.password.length < 4) {
      return { success: false, error: 'Kata sandi minimal 4 karakter.' };
    }

    const users = this.getAllRegisteredUsers();
    const existing = users.find(u => u.emailOrUsername.toLowerCase() === trimmedId);
    if (existing) {
      return { success: false, error: 'Email atau username ini sudah terdaftar. Silakan gunakan yang lain atau masuk.' };
    }

    const newUser: StoredUserRecord = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: trimmedName,
      emailOrUsername: trimmedId,
      avatarEmoji: params.avatarEmoji || '🕊️',
      churchOrCity: params.churchOrCity?.trim() || undefined,
      favoriteVerse: params.favoriteVerse?.trim() || 'Yohanes 3:16',
      createdAt: Date.now(),
      passwordHash: btoa(params.password), // simple client-safe encoding for local verification
    };

    users.push(newUser);
    localStorage.setItem(AUTH_KEYS.USERS_REGISTRY, JSON.stringify(users));

    const publicProfile: UserProfile = {
      id: newUser.id,
      name: newUser.name,
      emailOrUsername: newUser.emailOrUsername,
      avatarEmoji: newUser.avatarEmoji,
      churchOrCity: newUser.churchOrCity,
      favoriteVerse: newUser.favoriteVerse,
      createdAt: newUser.createdAt,
    };

    this.setCurrentUser(publicProfile);
    return { success: true, user: publicProfile };
  },

  // --- INSTANT LOGIN ---
  login(params: { emailOrUsername: string; password: string }): {
    success: boolean;
    error?: string;
    user?: UserProfile;
  } {
    const trimmedId = params.emailOrUsername.trim().toLowerCase();
    const users = this.getAllRegisteredUsers();
    const encodedPass = btoa(params.password);

    const user = users.find(
      u => u.emailOrUsername.toLowerCase() === trimmedId && u.passwordHash === encodedPass
    );

    if (!user) {
      return { success: false, error: 'Email/Username atau kata sandi tidak cocok. Silakan coba lagi.' };
    }

    const publicProfile: UserProfile = {
      id: user.id,
      name: user.name,
      emailOrUsername: user.emailOrUsername,
      avatarEmoji: user.avatarEmoji,
      churchOrCity: user.churchOrCity,
      favoriteVerse: user.favoriteVerse,
      createdAt: user.createdAt,
    };

    this.setCurrentUser(publicProfile);
    return { success: true, user: publicProfile };
  },

  // --- GUEST MODE ---
  loginAsGuest(): UserProfile {
    const guestUser: UserProfile = {
      id: `guest_${Date.now()}`,
      name: 'Sahabat Alkitab (Tamu)',
      emailOrUsername: 'tamu@alkitab.local',
      avatarEmoji: '✝️',
      favoriteVerse: 'Mazmur 23:1',
      createdAt: Date.now(),
      isGuest: true,
    };
    this.setCurrentUser(guestUser);
    return guestUser;
  },

  // --- UPDATE PROFILE ---
  updateProfile(updates: Partial<UserProfile>): UserProfile | null {
    const current = this.getCurrentUser();
    if (!current) return null;

    const updatedUser: UserProfile = {
      ...current,
      ...updates,
    };

    this.setCurrentUser(updatedUser);

    if (!current.isGuest) {
      const users = this.getAllRegisteredUsers();
      const index = users.findIndex(u => u.id === current.id);
      if (index >= 0) {
        users[index] = {
          ...users[index],
          ...updates,
        };
        localStorage.setItem(AUTH_KEYS.USERS_REGISTRY, JSON.stringify(users));
      }
    }

    return updatedUser;
  },

  logout(): void {
    this.setCurrentUser(null);
  },

  // --- COMMUNITY TESTIMONIES ---
  getCommunityTestimonies(): UserPersonalTestimony[] {
    try {
      const data = localStorage.getItem(AUTH_KEYS.COMMUNITY_TESTIMONIES);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    // Seed initial
    localStorage.setItem(AUTH_KEYS.COMMUNITY_TESTIMONIES, JSON.stringify(SEED_COMMUNITY_TESTIMONIES));
    return SEED_COMMUNITY_TESTIMONIES;
  },

  publishCommunityTestimony(testimony: UserPersonalTestimony): void {
    const list = this.getCommunityTestimonies();
    const index = list.findIndex(t => t.id === testimony.id);
    if (index >= 0) {
      list[index] = testimony;
    } else {
      list.unshift(testimony);
    }
    localStorage.setItem(AUTH_KEYS.COMMUNITY_TESTIMONIES, JSON.stringify(list));
  },

  unpublishCommunityTestimony(testimonyId: string): void {
    const list = this.getCommunityTestimonies().filter(t => t.id !== testimonyId);
    localStorage.setItem(AUTH_KEYS.COMMUNITY_TESTIMONIES, JSON.stringify(list));
  },

  toggleAmenCommunityTestimony(testimonyId: string): number {
    const list = this.getCommunityTestimonies();
    const item = list.find(t => t.id === testimonyId);
    if (item) {
      item.amenCount = (item.amenCount || 0) + 1;
      localStorage.setItem(AUTH_KEYS.COMMUNITY_TESTIMONIES, JSON.stringify(list));
      return item.amenCount;
    }
    return 0;
  }
};
