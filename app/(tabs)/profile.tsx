import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserProfile } from '../../store/userProfile';
import { useAuth } from '../../store/auth';
import { Calendar, User, Heart, Ruler, Weight, Clock, CreditCard as Edit2, Save, Camera } from 'lucide-react-native';

export default function Profile() {
  const { profile, updateProfile } = useUserProfile();
  const { user, isAuthenticated } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [age, setAge] = useState(profile?.age ? profile.age.toString() : '');
  const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth || '');
  const [gender, setGender] = useState(profile?.gender || '');
  const [heartRate, setHeartRate] = useState(profile?.heartRate ? profile.heartRate.toString() : '');
  const [height, setHeight] = useState(profile?.height ? profile.height.toString() : '');
  const [weight, setWeight] = useState(profile?.weight ? profile.weight.toString() : '');
  
  // Profile image
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80');
  
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notAuthenticatedContainer}>
          <Text style={styles.notAuthenticatedTitle}>Not Signed In</Text>
          <Text style={styles.notAuthenticatedText}>
            Please sign in to view and manage your profile.
          </Text>
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={() => {/* Handle sign in navigation */}}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      handleSaveProfile();
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };
  
  const handleSaveProfile = () => {
    if (!fullName || !age || !dateOfBirth || !gender || !heartRate || !height || !weight) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateProfile({
        fullName,
        age: parseInt(age),
        dateOfBirth,
        gender,
        heartRate: parseInt(heartRate),
        height: parseFloat(height),
        weight: parseFloat(weight),
        email: user?.email || '',
      });
      
      setIsEditing(false);
      // Handle navigation after saving profile
      setLoading(false);
    }, 1000);
  };
  
  const handleChangeProfileImage = () => {
    // In a real app, this would open the image picker
    Alert.alert('Change Profile Picture', 'This feature would allow you to select a new profile picture.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditToggle}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : isEditing ? (
              <Save size={20} color="#FFFFFF" />
            ) : (
              <Edit2 size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <TouchableOpacity 
              style={styles.avatarContainer}
              onPress={handleChangeProfileImage}
            >
              {profile?.fullName ? (
                <Image 
                  source={{ uri: profileImage }} 
                  style={styles.avatarImage}
                />
              ) : (
                <Text style={styles.avatarText}>
                  {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : 'U'}
                </Text>
              )}
              <View style={styles.cameraIconContainer}>
                <Camera size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              {isEditing ? (
                <TextInput
                  style={styles.editInput}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                />
              ) : (
                <Text style={styles.profileName}>{profile?.fullName || 'User'}</Text>
              )}
              <Text style={styles.profileEmail}>{profile?.email || user?.email || 'user@example.com'}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <User size={20} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editInput}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                />
              ) : (
                <Text style={styles.infoValue}>{profile?.fullName || 'Not set'}</Text>
              )}
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Clock size={20} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Age</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editInput}
                  value={age}
                  onChangeText={setAge}
                  placeholder="Enter your age"
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.infoValue}>{profile?.age || 'Not set'}</Text>
              )}
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Calendar size={20} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editInput}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholder="YYYY-MM-DD"
                />
              ) : (
                <Text style={styles.infoValue}>{profile?.dateOfBirth || 'Not set'}</Text>
              )}
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <User size={20} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Gender</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editInput}
                  value={gender}
                  onChangeText={setGender}
                  placeholder="Enter your gender"
                />
              ) : (
                <Text style={styles.infoValue}>{profile?.gender || 'Not set'}</Text>
              )}
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Health Information</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Heart size={20} color="#FF4757" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Heart Beat</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editInput}
                  value={heartRate}
                  onChangeText={setHeartRate}
                  placeholder="Enter your heart rate"
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.infoValue}>
                  {profile?.heartRate ? `${profile.heartRate} bpm` : 'Not set'}
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Ruler size={20} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Height</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editInput}
                  value={height}
                  onChangeText={setHeight}
                  placeholder="Enter your height in cm"
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.infoValue}>
                  {profile?.height ? `${profile.height} cm` : 'Not set'}
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Weight size={20} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Weight</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editInput}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="Enter your weight in kg"
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.infoValue}>
                  {profile?.weight ? `${profile.weight} kg` : 'Not set'}
                </Text>
              )}
            </View>
          </View>
        </View>
        
        {isEditing && (
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveProfile}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Save size={20} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  editButton: {
    backgroundColor: '#FF4757',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF4757',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
    overflow: 'visible',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#FF4757',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  editInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
  },
  saveButton: {
    backgroundColor: '#FF4757',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  notAuthenticatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notAuthenticatedTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 12,
  },
  notAuthenticatedText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  signInButton: {
    backgroundColor: '#FF4757',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  signInButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
