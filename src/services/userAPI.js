import axios from 'axios';

// Ganti dengan URL dan API Key proyek Supabase milikmu sendiri
const API_URL = "https://oeunnebmobuqiryrlzza.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_CJXQNU4U_IpawysLTxGVLQ_CkHw6WjY";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation" // Dibutuhkan agar POST/PATCH mengembalikan objek data terbaru
};

export const userAPI = {
  // Ambil semua data user
  async fetchUsers() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  // Periksa kecocokan data login (Email & Password)
  async checkLogin(email, password) {
    const response = await axios.get(`${API_URL}?email=eq.${email}&password=eq.${password}`, { headers });
    return response.data;
  },

  // Buat/Daftarkan user baru
  async createUser(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  // Edit/Update data user
  async updateUser(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return response.data;
  },

  // Hapus data user
  async deleteUser(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  // Tambahkan ini di dalam userAPI pada file C:\aliya-sky\aliya-sky\src\services\userAPI.js

  // Ambil data pelanggan/pasien dummy CRM dengan limit dan pagination
  async fetchPatients(page = 1, limit = 10, search = "") {
    // Menghitung offset untuk pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let url = `${API_URL.replace('/users', '/patients')}?select=*&order=Customer_ID.asc`;
    
    // Jika ada pencarian berdasarkan nama
    if (search) {
      url += `&Nama=ilike.*${search}*`;
    }

    // Filter range untuk pagination di Supabase via REST API Header Prefer
    const customHeaders = {
      ...headers,
      "Range": `${from}-${to}`,
      "Prefer": "count=exact" // Supaya mengembalikan info total data
    };

    const response = await axios.get(url, { headers: customHeaders });
    
    // Mengambil total baris data dari header response content-range (misal: "0-9/10000")
    const contentRange = response.headers['content-range'];
    const totalCount = contentRange ? parseInt(contentRange.split('/')[1]) : 10000;

    return {
      data: response.data,
      total: totalCount
    };
  },
};