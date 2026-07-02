import { supabase } from '../lib/supabase';

export const supabaseService = {
  // ===================== AUTH =====================

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signUp(email, password, fullName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) throw error;
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // ===================== USERS (Profile) =====================

  async getCurrentUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  async fetchUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // ===================== PATIENTS =====================

  async fetchPatientsByUser(userId) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createPatient(patientData) {
    const { data, error } = await supabase
      .from('patients')
      .insert(patientData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePatient(id, patientData) {
    const { data, error } = await supabase
      .from('patients')
      .update(patientData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePatient(id) {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // ===================== APPOINTMENTS =====================

  async fetchAppointmentsByUser(userId) {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, patients(name)')
      .eq('user_id', userId)
      .order('appointment_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async fetchAllAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, patients(name), users(full_name)')
      .order('appointment_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createAppointment(appointmentData) {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateAppointmentStatus(id, status) {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async cancelAppointment(id) {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // ===================== MEDICAL HISTORIES =====================

  async createMedicalHistory(historyData) {
    const { data, error } = await supabase
      .from('medical_histories')
      .insert(historyData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async fetchMedicalHistoriesByPatient(patientId) {
    const { data, error } = await supabase
      .from('medical_histories')
      .select('*, appointments(appointment_date, appointment_time)')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async fetchMedicalHistoriesByUser(userId) {
    // 1. Ambil daftar patient_id milik user
    const { data: patientIds, error: patientError } = await supabase
      .from('patients')
      .select('id')
      .eq('user_id', userId);

    if (patientError) throw patientError;
    if (!patientIds?.length) return [];

    // 2. Ambil medical histories berdasarkan patient_ids
    const ids = patientIds.map(p => p.id);
    const { data, error } = await supabase
      .from('medical_histories')
      .select('*, appointments(appointment_date, appointment_time), patients(name)')
      .in('patient_id', ids)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};
