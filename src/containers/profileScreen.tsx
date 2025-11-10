import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Colors } from '../constants/styles/theme';
import { fetchEventsByUser } from '../store/slices/event/eventLogic';
import { logoutUser } from "../store/slices/user/userLogic";
// import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading: userLoading } = useSelector((state: RootState) => state.user);
  const { events } = useSelector((state: RootState) => state.events);
  const { guests } = useSelector((state: RootState) => state.guests);

  useEffect(() => {
    dispatch(fetchEventsByUser());
  }, [dispatch]);

  if (userLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryDark} />
      </View>
    );

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <LinearGradient
      colors={['#bbaaf2b8', '#ffffffb8', Colors.neutral100]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* --- HEADER --- */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            }}
            style={styles.profileImage}
          />
          <View style={{ alignItems: 'center', marginTop: 8 }}>
            <Text style={styles.nameText}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.roleText}>{user?.role || 'Organizer'}</Text>
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>
        </View>

        {/* --- DASHBOARD STATS --- */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{events.length}</Text>
            <Text style={styles.statLabel}>Événements</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{guests.length}</Text>
            <Text style={styles.statLabel}>Invités</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Billets validés</Text>
          </View>
        </View>

        {/* --- QUICK ACTIONS --- */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Accès rapide</Text>

          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton}>
              {/* <Icon name="calendar" size={24} color={Colors.primaryDark} /> */}
              <Text style={styles.actionText}>Mes Événements</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              {/* <Icon name="users" size={24} color={Colors.primaryDark} /> */}
              <Text style={styles.actionText}>Invités</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              {/* <Icon name="camera" size={24} color={Colors.primaryDark} /> */}
              <Text style={styles.actionText}>Scanner</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              {/* <Icon name="settings" size={24} color={Colors.primaryDark} /> */}
              <Text style={styles.actionText}>Paramètres</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- LOGOUT BUTTON --- */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          {/* <Icon name="log-out" size={18} color="#fff" style={{ marginRight: 8 }} /> */}
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  roleText: {
    fontSize: 14,
    color: Colors.neutral600,
  },
  emailText: {
    fontSize: 13,
    color: Colors.neutral700,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#ffffffaa',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.neutral700,
  },
  actionsContainer: {
    width: '90%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.primaryDark,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    color: Colors.primaryDark,
    marginTop: 6,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryDark,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
