import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserProfile } from '@/store/userProfile';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Heart, Activity, TrendingUp, Weight, Ruler } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard() {
  const { profile, heartRateHistory } = useUserProfile();
  
  // Get last 7 days of heart rate data or use empty array if none exists
  const heartRateData = heartRateHistory.slice(-7);
  
  // Create labels for the last 7 days
  const labels = heartRateData.map((_, index) => `Day ${index + 1}`);
  
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {profile?.fullName || 'User'}</Text>
            <Text style={styles.subGreeting}>Welcome to your health dashboard</Text>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Heart Rate Overview</Text>
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
        
        <Text style={styles.sectionTitle}>Health Metrics</Text>
        
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              <Heart size={24} color="#FF4757" />
            </View>
            <Text style={styles.metricLabel}>Heart Rate</Text>
            <Text style={styles.metricValue}>{profile?.heartRate || '--'} <Text style={styles.metricUnit}>bpm</Text></Text>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              <Activity size={24} color="#10B981" />
            </View>
            <Text style={styles.metricLabel}>Activity</Text>
            <Text style={styles.metricValue}>Moderate</Text>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              <TrendingUp size={24} color="#3B82F6" />
            </View>
            <Text style={styles.metricLabel}>Progress</Text>
            <Text style={styles.metricValue}>Good</Text>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              <Weight size={24} color="#8B5CF6" />
            </View>
            <Text style={styles.metricLabel}>Weight</Text>
            <Text style={styles.metricValue}>{profile?.weight || '--'} <Text style={styles.metricUnit}>kg</Text></Text>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricIconContainer}>
              <Ruler size={24} color="#F59E0B" />
            </View>
            <Text style={styles.metricLabel}>Height</Text>
            <Text style={styles.metricValue}>{profile?.height || '--'} <Text style={styles.metricUnit}>cm</Text></Text>
          </View>
        </View>
        
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Update Health Data</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  subGreeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
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
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  metricUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  actionContainer: {
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: '#FF4757',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});