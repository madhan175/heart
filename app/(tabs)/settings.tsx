import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '@/store/auth';
import { Bell, Shield, CircleHelp as HelpCircle, FileText, LogOut, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';

export default function Settings() {
  const { logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconContainer}>
                  <Bell size={20} color="#6B7280" />
                </View>
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#D1D5DB', true: '#FF4757' }}
                thumbColor="#FFFFFF"
              />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconContainer}>
                  <Shield size={20} color="#6B7280" />
                </View>
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#D1D5DB', true: '#FF4757' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconContainer}>
                  <HelpCircle size={20} color="#6B7280" />
                </View>
                <Text style={styles.settingText}>Help Center</Text>
              </View>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconContainer}>
                  <FileText size={20} color="#6B7280" />
                </View>
                <Text style={styles.settingText}>Terms & Privacy Policy</Text>
              </View>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  logoutButton: {
    backgroundColor: '#FF4757',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});