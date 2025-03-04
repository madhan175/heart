import { create } from 'zustand';

interface UserProfile {
  fullName: string;
  age: number;
  dateOfBirth: string;
  gender: string;
  heartRate: number;
  height: number;
  weight: number;
  email: string;
}

interface HeartRateEntry {
  value: number;
  timestamp: string;
}

interface UserProfileState {
  profile: UserProfile | null;
  heartRateHistory: HeartRateEntry[];
  updateProfile: (profile: UserProfile) => void;
  addHeartRateEntry: (value: number) => void;
}

export const useUserProfile = create<UserProfileState>((set) => ({
  profile: null,
  heartRateHistory: [],
  updateProfile: (profile) => set({ profile }),
  addHeartRateEntry: (value) => set((state) => ({
    heartRateHistory: [
      ...state.heartRateHistory,
      { value, timestamp: new Date().toISOString() }
    ],
    profile: state.profile ? {
      ...state.profile,
      heartRate: value
    } : null
  })),
}));