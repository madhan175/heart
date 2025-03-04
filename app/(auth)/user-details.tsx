import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/store/auth';
import { useUserProfile } from '@/store/userProfile';
import { ChevronLeft } from 'lucide-react-native';

export default function UserDetails() {
  const { user } = useAuth();
  const { updateProfile } = useUserProfile();
  
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!fullName || !age || !dateOfBirth || !gender || !heartRate || !height || !weight) {
      setError('Please fill in all fields');
      return;
    }
    
    // Update user profile
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
    
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>We need some details to personalize your experience</Text>
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your gender"
              value={gender}
              onChangeText={setGender}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Resting Heart Rate (bpm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your heart rate"
              value={heartRate}
              onChangeText={setHeartRate}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your height in cm"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your weight in kg"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Complete Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#EF4444',
    marginBottom: 16,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF4757',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});