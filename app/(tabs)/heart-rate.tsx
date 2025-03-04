import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserProfile } from '@/store/userProfile';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Heart, Info, CircleAlert as AlertCircle } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

export default function HeartRate() {
  const { profile, heartRateHistory, addHeartRateEntry } = useUserProfile();
  const [newHeartRate, setNewHeartRate] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Get last 7 days of heart rate data or use empty array if none exists
  const heartRateData = heartRateHistory.slice(-7);
  
  // Create labels for the last 7 days
  const labels = heartRateData.map((entry) => {
    const date = new Date(entry.timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });
  
  // Extract heart rate values
  const data = heartRateData.map(entry => entry.value);
  
  // If no data, use a default dataset
  const chartData = {
    labels: data.length > 0 ? labels : ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        data: data.length > 0 ? data : [70, 72, 75, 73, 69, 72, 74],
        color: (opacity = 1) => `rgba(255, 71, 87, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
  
  const handleAddHeartRate = () => {
    if (!newHeartRate) {
      setError('Please enter a heart rate value');
      return;
    }
    
    const heartRateValue = parseInt(newHeartRate);
    
    if (isNaN(heartRateValue) || heartRateValue < 30 || heartRateValue > 220) {
      setError('Please enter a valid heart rate between 30 and 220 bpm');
      return;
    }
    
    // Add new heart rate entry
    addHeartRateEntry(heartRateValue);
    setNewHeartRate('');
    setError(null);
  };
  
  // Calculate average heart rate
  const averageHeartRate = data.length > 0 
    ? Math.round(data.reduce((sum, value) => sum + value, 0) / data.length) 
    : profile?.heartRate || 0;
  
  // Determine heart rate status
  const getHeartRateStatus = (rate: number) => {
    if (rate < 60) return { status: 'Low', color: '#3B82F6' };
    if (rate > 100) return { status: 'High', color: '#EF4444' };
    return { status: 'Normal', color: '#10B981' };
  };
  
  const heartRateStatus = getHeartRateStatus(averageHeartRate);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Heart Rate Monitor</Text>
          <Text style={styles.subtitle}>Track and analyze your heart rate</Text>
        </View>
        
        <View style={styles.currentContainer}>
          <View style={styles.currentHeartRate}>
            <Heart size={32} color="#FF4757" />
            <Text style={styles.currentHeartRateValue}>
              {averageHeartRate} <Text style={styles.currentHeartRateUnit}>bpm</Text>
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: heartRateStatus.color }]}>
              <Text style={styles.statusText}>{heartRateStatus.status}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Heart Rate History</Text>
          <Text style={styles.chartSubtitle}>Last 7 days</Text>
          
          <LineChart
            data={chartData}
            width={screenWidth - 48}
            height={220}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#FF4757',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Add New Heart Rate</Text>
          
          {error && (
            <View style={styles.errorContainer}>
              <AlertCircle size={16} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter heart rate (bpm)"
              value={newHeartRate}
              onChangeText={setNewHeartRate}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddHeartRate}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <Info size={20} color="#6B7280" />
          <Text style={styles.infoText}>
            Normal resting heart rate for adults ranges from 60 to 100 beats per minute.
          </Text>
        </View>
        
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent Entries</Text>
          
          {heartRateData.length > 0 ? (
            heartRateData.slice().reverse().map((entry, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={styles.historyItemLeft}>
                  <Heart size={16} color="#FF4757" />
                  <Text style={styles.historyItemValue}>{entry.value} bpm</Text>
                </View>
                <Text style={styles.historyItemDate}>
                  {new Date(entry.timestamp).toLocaleString()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No heart rate entries yet</Text>
          )}
        </View>
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
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  currentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  currentHeartRate: {
    alignItems: 'center',
  },
  currentHeartRateValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 8,
  },
  currentHeartRateUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  chartContainer: {
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
  chartTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  inputContainer: {
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
  inputTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#EF4444',
    marginLeft: 8,
  },
  inputRow: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#FF4757',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
    flex: 1,
  },
  historyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  historyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItemValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },
  historyItemDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 24,
  },
});