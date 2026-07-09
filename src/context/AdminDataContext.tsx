import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article } from '../types';

// Interfaces for our customizable website content
export interface RouteItem {
  id: string;
  title: string;
  level: 'Easy' | 'Medium' | 'Challenging';
  duration: string;
  distance: string;
  categories: string[];
  image: string;
  description: string;
  maxParticipants: string;
  minParticipants: string;
  meetingPoint: string;
  age: string;
  suitableFor: string;
}

export interface CorporateProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  level: string;
  location: string;
  minParticipants: string;
  maxParticipants: string;
  certificate: string;
  evaluation: string;
  image: string;
  inclusions: string[];
  options: string[];
}

export interface LearningProgram {
  id: string;
  title: string;
  badge: string;
  description: string;
  duration: string;
  location: string;
  age: string;
  ratio: string;
  minParticipants: string;
  output: string;
  image: string;
  inclusions: string[];
  methodologies: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'trekking' | 'teambuilding' | 'gathering' | 'learning';
  image: string;
  description: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: string;
  comments: string;
  caption: string;
}

export interface GeneralConfig {
  logoText: string;
  logoSub: string;
  whatsAppNumber: string;
  adminPassword?: string;
}

export interface HeroContent {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  description: string;
  bgImage: string;
  mainImage: string;
}

export interface AboutContent {
  whoWeAre: string;
  title: string;
  description: string;
  highlightTitle: string;
  highlightDesc: string;
  image: string;
  reasons: Array<{ id: string; title: string; description: string; iconName: string }>;
  values: Array<{ id: string; title: string; desc: string; iconName: string }>;
}

export interface CMSData {
  general: GeneralConfig;
  hero: HeroContent;
  about: AboutContent;
  routes: RouteItem[];
  corporate: CorporateProgram[];
  learning: LearningProgram[];
  gallery: GalleryItem[];
  instagram: InstagramPost[];
  articles: Article[];
}

// Default Data used when localStorage is empty
const defaultCMSData: CMSData = {
  general: {
    logoText: 'JWEST',
    logoSub: 'ADVENTURE',
    whatsAppNumber: '6281234567890',
    adminPassword: 'JWest2026$' // default password, can be changed by user
  },
  hero: {
    subtitle: 'WHEN NATURE BUILDS STRONGER TEAMS',
    titleLine1: 'BUILD CONNECTION.',
    titleLine2: 'INCREASE COLLABORATION.',
    titleLine3: 'ACHIEVE TOGETHER.',
    description: 'JWest Adventure menyediakan pengalaman outdoor terbaik untuk Trekking, Team Building, Corporate Gathering, Outbound Activities, dan Event Management yang berkesan dan berdampak bagi tim Anda.',
    bgImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80',
    mainImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  about: {
    whoWeAre: 'WHO WE ARE',
    title: 'ABOUT US',
    description: 'JWest Adventure adalah penyedia layanan outdoor experience yang berkomitmen menghadirkan pengalaman terbaik di alam untuk individu, komunitas, dan perusahaan.',
    highlightTitle: 'Adventure with Purpose, Impact that Lasts',
    highlightDesc: 'Kami percaya bahwa alam adalah ruang terbaik untuk belajar, bertumbuh, dan membangun koneksi yang lebih kuat. Dengan tim profesional dan berpengalaman, kami merancang setiap program untuk menciptakan pengalaman yang aman, bermakna, dan berdampak positif bagi setiap peserta.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80',
    reasons: [
      {
        id: 'r1',
        title: 'PROGRAM BERKUALITAS',
        description: 'Program dirancang sesuai kebutuhan dengan pendekatan fun, learning, dan experience.',
        iconName: 'Award'
      },
      {
        id: 'r2',
        title: 'FASILITATOR HANDAL',
        description: 'Dipandu oleh fasilitator bersertifikasi dan berpengalaman dalam team building & leadership.',
        iconName: 'Users'
      },
      {
        id: 'r3',
        title: 'DOKUMENTASI PROFESIONAL',
        description: 'Momen terbaik Anda kami abadikan secara profesional dengan foto, video, dan drone.',
        iconName: 'Camera'
      },
      {
        id: 'r4',
        title: 'MEDICAL SUPPORT',
        description: 'Didukung tim medis & peralatan standar untuk memastikan keamanan peserta.',
        iconName: 'Heart'
      },
      {
        id: 'r5',
        title: 'LAYANAN LENGKAP',
        description: 'Transportasi, konsumsi, akomodasi, hiburan, hingga perlengkapan kegiatan tersedia.',
        iconName: 'Truck'
      }
    ],
    values: [
      {
        id: 'v1',
        title: 'Berpengalaman & Profesional',
        desc: 'Tim kami terdiri dari fasilitator berpengalaman di bidang outdoor, pelatihan, dan event management.',
        iconName: 'Award'
      },
      {
        id: 'v2',
        title: 'Aman & Terpercaya',
        desc: 'Keselamatan adalah prioritas utama dalam setiap kegiatan yang kami selenggarakan.',
        iconName: 'Shield'
      },
      {
        id: 'v3',
        title: 'Berorientasi pada Dampak',
        desc: 'Setiap program dirancang untuk memberikan pengalaman yang bermakna dan berdampak.',
        iconName: 'Target'
      },
      {
        id: 'v4',
        title: 'Peduli Alam',
        desc: 'Kami berkomitmen menjaga kelestarian alam dalam setiap kegiatan luar ruang.',
        iconName: 'Leaf'
      }
    ]
  },
  routes: [
    {
      id: 'r1',
      title: 'Curug Leuwi Hejo',
      level: 'Easy',
      duration: '2-3 Jam',
      distance: '4 Km',
      categories: ['Family Friendly'],
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      description: 'Rute trekking favorit di Sentul dengan jalur ringan dan pemandangan air terjun berwarna hijau toska yang memukau.',
      maxParticipants: 'Maks. 100 peserta',
      minParticipants: '2 Orang',
      meetingPoint: 'Sentul',
      age: '7+ Tahun',
      suitableFor: 'Team Building'
    },
    {
      id: 'r2',
      title: 'Curug Barong',
      level: 'Medium',
      duration: '3 Jam',
      distance: '5 Km',
      categories: ['Family Friendly'],
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80',
      description: 'Perjalanan menantang sedikit berbatuan menuju air terjun tersembunyi dengan formasi tebing batu alam megah.',
      maxParticipants: 'Maks. 80 peserta',
      minParticipants: '2 Orang',
      meetingPoint: 'Sentul',
      age: '10+ Tahun',
      suitableFor: 'Adventure & Sport'
    },
    {
      id: 'r3',
      title: 'Curug Kembar',
      level: 'Medium',
      duration: '4 Jam',
      distance: '6 Km',
      categories: ['Family Friendly'],
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
      description: 'Trek melintasi perkebunan kopi dan hutan bambu yang sejuk, berakhir di air terjun kembar berdampingan.',
      maxParticipants: 'Maks. 50 peserta',
      minParticipants: '2 Orang',
      meetingPoint: 'Sentul',
      age: '8+ Tahun',
      suitableFor: 'Relaxation & Nature'
    },
    {
      id: 'r4',
      title: 'Curug Ciburial',
      level: 'Medium',
      duration: '4-5 Jam',
      distance: '7 Km',
      categories: [],
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      description: 'Trek sedang menyusuri lembah hijau dan bukit berundak dengan pemandangan air terjun jernih bertingkat tiga.',
      maxParticipants: 'Maks. 40 peserta',
      minParticipants: '2 Orang',
      meetingPoint: 'Sentul',
      age: '12+ Tahun',
      suitableFor: 'Exploration'
    },
    {
      id: 'r5',
      title: 'Triple Waterfall Adventure',
      level: 'Challenging',
      duration: '5-7 Jam',
      distance: '10 Km',
      categories: [],
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      description: 'Eksplorasi puncak Sentul sejati melintasi 3 air terjun sekaligus dalam satu rute memacu adrenalin.',
      maxParticipants: 'Maks. 30 peserta',
      minParticipants: '4 Orang',
      meetingPoint: 'Sentul',
      age: '15+ Tahun',
      suitableFor: 'Challenger'
    }
  ],
  corporate: [
    {
      id: 'tb',
      title: 'Strategic Team Building',
      subtitle: 'Outbound & Experiential Learning',
      description: 'Program pelatihan intensif luar ruang yang dirancang untuk memperkuat kerja sama, komunikasi taktis, pemecahan masalah, dan penyelarasan nilai-nilai utama perusahaan Anda.',
      duration: '1-2 Hari',
      level: 'All Levels (Corporate Friendly)',
      location: 'Bogor / Sentul / Sukabumi',
      minParticipants: '20 Orang',
      maxParticipants: 'Maks. 200 peserta',
      certificate: 'Tersedia (E-Certificate)',
      evaluation: 'Included (Laporan Debrief Komprehensif)',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Trainer & Fasilitator Utama Berlisensi',
        'Atribut Tim Lengkap (Kaos Kelompok & Topi)',
        'P3K & Standard Medical Support',
        'Sound System Standard Outdoor',
        'Dokumentasi Foto & Video Drone',
        'Game Master & Semua Alat Perlengkapan Game'
      ],
      options: [
        'Akomodasi Hotel Bintang 4 / Resort Ternama',
        'Transportasi Bus Pariwisata PP Jakarta/Bogor',
        'Gala Dinner Corporate Premium',
        'Live Music Acoustic Entertainment',
        'Custom Souvenir Exclusive Perusahaan'
      ]
    },
    {
      id: 'gather',
      title: 'Corporate Gathering',
      subtitle: 'Fun, Refreshing & Recreation Outing',
      description: 'Momentum rekreasi penuh kebersamaan untuk menyegarkan pikiran karyawan, mempererat silaturahmi antar divisi, meningkatkan loyalitas, dan merayakan pencapaian besar tim Anda.',
      duration: '2-3 Hari',
      level: 'All Levels (Fun Focused)',
      location: 'Bogor / Puncak / Bandung / Bali',
      minParticipants: '30 Orang',
      maxParticipants: 'Maks. 500 peserta',
      certificate: 'Opsional',
      evaluation: 'Not Required',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Fasilitator Gathering & Event Host Profesional',
        'Fun Outbound & Ice Breaking Games',
        'Sound System & Stage Setup Outdoor',
        'Dokumentasi Foto, Video & Video Drone Full HD',
        'P3K, Safety Equipment, & Kru Medis Lapangan',
        'Atribut Banner Spanduk Selamat Datang'
      ],
      options: [
        'Gala Dinner Premium & BBQ Night',
        'Live Music Band / DJ Performance',
        'Transportasi Bus PP Executive Class',
        'Doorprize & Bingkisan Spesial JWest',
        'Penginapan Villa Mewah / Hotel Bintang 4'
      ]
    },
    {
      id: 'lead',
      title: 'Executive Leadership Camp',
      subtitle: 'Leadership & Crisis Management Development',
      description: 'Program intensif khusus bagi jajaran eksekutif, manajer, dan calon pemimpin masa depan untuk mengasah ketajaman kepemimpinan, komunikasi strategis, serta manajemen krisis.',
      duration: '3 Hari 2 Malam',
      level: 'Executive & Managerial Level',
      location: 'Sentul Highlands / Gunung Pancar Glamping',
      minParticipants: '10 Orang',
      maxParticipants: 'Maks. 50 peserta',
      certificate: 'Tersedia (Sertifikat Leadership)',
      evaluation: 'Included (Analisis Profil & Feedback Individual)',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Senior Trainer Kepemimpinan Nasional',
        'Self-Discovery Assessment Tools',
        'Sesi Coaching & Mentoring Privat',
        'Tactical Crisis Management Games',
        'Akomodasi Premium Glamping Setup',
        'Standard Medical Support & Rescue Team 24/7'
      ],
      options: [
        'Premium Catering Service (Healthy Diet Option)',
        'Private Transport Shuttle VIP',
        'Exclusive Executive Team Jersey',
        'Video Dokumentasi Cinematic Eksklusif'
      ]
    }
  ],
  learning: [
    {
      id: 'sd',
      title: 'Sekolah Dasar (SD)',
      badge: 'Nature Discovery & Fun Learning',
      description: 'Program edukasi luar ruangan yang dirancang khusus untuk menumbuhkan rasa ingin tahu, melatih keberanian dasar, kerja sama kelompok kecil, serta cinta tanah air lewat permainan edukatif sains alam bebas.',
      duration: '1 Hari (Full Day)',
      location: 'Sentul Trekking Area / Kebun Raya Bogor',
      age: '7 - 12 Tahun',
      ratio: '1:10 (Fasilitator : Siswa)',
      minParticipants: '30 Siswa',
      output: 'Karakter Mandiri & Cinta Lingkungan',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Pemandu & Edukator Bersertifikasi Profesional',
        'Tiket Masuk Wisata & Perizinan Lokasi',
        'Atribut Kegiatan (Syal Kelompok & Name Tag)',
        'Snack Box & Makan Siang Sehat',
        'Lembar Kerja Siswa (LKS) & Alat Tulis Edukatif',
        'Asuransi Kecelakaan Selama Kegiatan',
        'P3K Standar Medis & Ambulance Standby'
      ],
      methodologies: [
        'Experiential Learning (Belajar dari Pengalaman)',
        'Fun Outbound Games & Teamwork Mandiri',
        'Nature Observation (Sains Alam Sederhana)',
        'Reflective Session (Diskusi & Kesimpulan)'
      ]
    },
    {
      id: 'smp_sma',
      title: 'Sekolah Menengah (SMP/SMA)',
      badge: 'Character Building & Independence',
      description: 'Menemukan kepercayaan diri, mengasah rasa solidaritas, kemandirian pribadi, kepemimpinan dasar, serta melatih pemikiran kritis dan pemecahan masalah melalui simulasi petualangan kelompok terarah.',
      duration: '2 Hari 1 Malam (Camp)',
      location: 'Gunung Pancar / Sukabumi Adventure Camp',
      age: '13 - 18 Tahun',
      ratio: '1:12 (Fasilitator : Siswa)',
      minParticipants: '40 Siswa',
      output: 'Kepemimpinan & Ketahanan Mental Siswa',
      image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Instruktur & Fasilitator Outbound Berlisensi BNSP',
        'Tenda Dome Komplit & Sleeping Bag per Siswa',
        'Makan Utama 5x (Sistem Catering / Masak Mandiri)',
        'Tiket Retribusi & Perizinan Taman Nasional',
        'Peralatan Navigasi Darat (Kompas & Peta)',
        'Asuransi Keselamatan Komprehensif',
        'P3K Medis Lengkap & Koordinasi Puskesmas Setempat'
      ],
      methodologies: [
        'Leadership & Social Responsibility Roleplay',
        'Survival Simulation (Simulasi Bertahan Hidup)',
        'Problem Solving Task (Pemecahan Masalah Taktis)',
        'Solo Camp / Night Reflection (Perenungan Karakter)'
      ]
    },
    {
      id: 'univ',
      title: 'Universitas / Mahasiswa',
      badge: 'Advanced Leadership & Social Responsibility',
      description: 'Program akselerasi kompetensi kepemimpinan strategis, manajemen risiko lapangan, kekompakan organisasi, ketahanan fisik-mental, serta pembekalan kepedulian sosial kemasyarakatan.',
      duration: '3 Hari 2 Malam',
      location: 'Taman Nasional Gede Pangrango / Gunung Salak',
      age: '18+ Tahun',
      ratio: '1:15 (Fasilitator : Mahasiswa)',
      minParticipants: '20 Peserta',
      output: 'Sikap Tanggap, Tangguh, & Berdampak Sosial',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
      inclusions: [
        'Senior Coach & Certified Outdoor Instructors',
        'Perlengkapan Camp & Mountain Gear Lengkap',
        'Perizinan Resmi (SIMAKSI) & Asuransi TN',
        'Logistik Pendakian & Makan Utama Selama Kegiatan',
        'Tshirt Eksklusif Angkatan JWest',
        'Asuransi Kecelakaan Diri',
        'Rescue Team & Peralatan Medis Darurat + Oksigen'
      ],
      methodologies: [
        'Advanced Navigation & Search and Rescue',
        'Strategic Team Synergy Games',
        'Environmental Project & Eco-Care Action',
        'Debrief Sesi Kepemimpinan Ekskutif'
      ]
    }
  ],
  gallery: [
    {
      id: 'g1',
      title: 'Trekking Menyusuri Sungai Sentul',
      category: 'trekking',
      image: 'https://images.unsplash.com/photo-1551632811-561730d1e4a6?auto=format&fit=crop&w=600&q=80',
      description: 'Menelusuri rute persawahan dan aliran sungai jernih di kawasan Sentul.'
    },
    {
      id: 'g2',
      title: 'Outbound Team Building BUMN',
      category: 'teambuilding',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      description: 'Melatih sinergi, konsentrasi, dan kebersamaan karyawan di lapangan terbuka.'
    },
    {
      id: 'g3',
      title: 'Corporate Gathering Malam Api Unggun',
      category: 'gathering',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80',
      description: 'Malam keakraban karyawan yang dipenuhi keceriaan dan makan bersama.'
    },
    {
      id: 'g4',
      title: 'Edukasi Navigasi & Kompas Siswa SMP',
      category: 'learning',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
      description: 'Mempelajari navigasi darat dasar menggunakan kompas magnetik secara langsung.'
    },
    {
      id: 'g5',
      title: 'Pendakian Puncak Gunung Papandayan',
      category: 'trekking',
      image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80',
      description: 'Menikmati panorama kawah aktif dan padang edelweiss yang menakjubkan.'
    },
    {
      id: 'g6',
      title: 'Leadership Camp Siswa SMA',
      category: 'learning',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
      description: 'Membangun jiwa kepemimpinan mandiri dan disiplin kerja sama antar murid.'
    }
  ],
  instagram: [
    {
      id: 'ig1',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80',
      likes: '243',
      comments: '18',
      caption: 'Keseruan trekking Sentul weekend kemarin bersama keluarga besar PT. Telekomunikasi Indonesia. Segarnya alam, indahnya kebersamaan! #JWestAdventure #TrekkingSentul'
    },
    {
      id: 'ig2',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=500&q=80',
      likes: '312',
      comments: '24',
      caption: 'Membina kerja sama, komunikasi taktis, dan menyatukan visi perusahaan lewat program Strategic Team Building. Terima kasih atas kepercayaannya! 🌟 #TeamBuilding #OutboundBogor'
    },
    {
      id: 'ig3',
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=500&q=80',
      likes: '198',
      comments: '12',
      caption: 'Belajar tak melulu di dalam kelas. Serunya adik-adik SD belajar mengenal aneka flora dan mengasah kemandirian langsung di alam bebas Sentul. 🌲🎒 #AdventureLearning #EdukasiAnak'
    },
    {
      id: 'ig4',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=500&q=80',
      likes: '425',
      comments: '36',
      caption: 'Keindahan Leuwi Hejo yang tak pernah membosankan. Siapkah kamu untuk petualangan seru weekend ini? Hubungi admin kami untuk booking slot privatmu! 💧 #LeuwiHejo #ExploreSentul'
    }
  ],
  articles: [
    {
      id: 'art1',
      title: 'Tips Mempersiapkan Trekking Pertama Anda di Sentul',
      slug: 'tips-persiapan-trekking-sentul',
      excerpt: 'Bagi Anda yang baru pertama kali ingin mencoba trekking di kawasan Sentul, berikut adalah panduan lengkap persiapan mulai dari fisik, perlengkapan, hingga etika di alam.',
      content: `Trekking di Sentul telah menjadi salah satu aktivitas akhir pekan terpopuler bagi warga Jakarta dan sekitarnya. Dengan pemandangan sawah yang hijau, perbukitan yang asri, dan deretan air terjun (curug) yang menyegarkan, Sentul menawarkan pelarian sempurna dari penatnya ibu kota.

Namun, agar perjalanan Anda aman dan menyenangkan, ada beberapa hal penting yang wajib dipersiapkan terlebih dahulu:

### 1. Persiapan Fisik Ringan
Meskipun rute trekking Sentul bervariasi dari mudah hingga sedang, berjalan kaki selama 2-4 jam melewati jalan setapak, tanjakan tanah, dan sungai tetap membutuhkan stamina. Lakukan peregangan atau jogging ringan 1-2 hari sebelum keberangkatan untuk menghindari kram otot.

### 2. Pakaian dan Alas Kaki yang Tepat
*   **Alas Kaki:** Sangat disarankan menggunakan sepatu trekking atau sandal gunung dengan grip/sol yang tebal. Hindari sepatu lari biasa yang licin di atas tanah basah atau batu sungai.
*   **Pakaian:** Gunakan pakaian berbahan cepat kering (*quick-dry*) atau kaos olahraga yang menyerap keringat. Bawa baju ganti cadangan karena rute kami sering melewati sungai dan air terjun.

### 3. Perlengkapan Wajib di Dalam Ransel
*   Botol minum isi ulang (minimal 1.5 Liter) untuk mencegah dehidrasi.
*   Jas hujan plastik tipis (antisipasi cuaca pegunungan yang dinamis).
*   Obat-obatan pribadi (inhaler, obat alergi, plester luka).
*   Kamera atau smartphone yang terlindungi kantong anti air (*dry bag*).

### 4. Menjaga Kebersihan dan Kelestarian Alam
Prinsip utama berpetualang di alam bebas adalah: **"Leave nothing but footprints, take nothing but pictures, kill nothing but time."** Bawa kembali semua sampah plastik Anda dan jangan merusak tanaman di sepanjang jalur trekking.

Bersama pemandu profesional dari **JWest Adventure**, trekking pertama Anda dijamin akan berjalan aman, terarah, dan dipenuhi cerita seru!`,
      coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      category: 'Trekking',
      tags: ['Trekking', 'Sentul', 'Tips', 'Pemula'],
      author: 'Tim JWest',
      createdAt: '2026-07-01T09:00:00.000Z',
      status: 'published'
    },
    {
      id: 'art2',
      title: 'Mengapa Outbound Team Building Penting bagi Produktivitas Karyawan?',
      slug: 'pentingnya-outbound-team-building-karyawan',
      excerpt: 'Rutinitas kantor seringkali memicu kejenuhan dan menurunkan sinergi tim. Temukan bagaimana aktivitas outdoor team building secara ilmiah mampu merevitalisasi semangat kerja.',
      content: `Dalam dunia korporasi yang bergerak cepat, tekanan kerja harian seringkali memicu stres individu dan merenggangkan komunikasi antar departemen. Di sinilah program **Outbound Team Building** berperan penting sebagai sarana penyegaran sekaligus investasi strategis bagi perusahaan.

Mengapa aktivitas luar ruang sangat efektif memperbaiki performa kerja? Berikut adalah ulasan mendalamnya:

### 1. Memecah Sekat Birokrasi dan Hirarki
Di alam bebas, semua peserta setara. Melalui simulasi permainan kelompok yang membutuhkan kerja sama fisik dan strategi, direktur, manajer, hingga staf baru berkolaborasi secara horizontal. Ini meruntuhkan ego sektoral dan mencairkan kecanggungan komunikasi yang biasanya terjadi di kantor.

### 2. Mengasah Kemampuan Problem Solving di Bawah Tekanan
Banyak tantangan outbound dirancang menyerupai masalah bisnis di dunia nyata: keterbatasan waktu, sumber daya minim, dan instruksi yang berubah-ubah. Peserta dilatih untuk berpikir cepat, mendengarkan masukan rekan kerja, dan mengambil keputusan kolektif secara taktis.

### 3. Meningkatkan Kepercayaan (Trust Building)
Kerja sama tim yang solid dibangun di atas fondasi kepercayaan. Ketika seorang karyawan merasakan dukungan nyata dari rekan setimnya saat melewati rintangan tali tinggi (*high ropes*) atau menyusuri jeram sungai, hubungan emosional yang kuat akan terbentuk secara natural.

### 4. Mengurangi Stres dan Mengembalikan Energi Kreatif
Secara ilmiah, berada di area hijau dan menghirup udara segar pegunungan mampu menurunkan hormon kortisol (pemicu stres). Pikiran yang rileks akan kembali segar, melahirkan ide-ide inovatif yang siap diimplementasikan ketika kembali ke meja kerja.

**JWest Adventure** menyediakan paket *Strategic Team Building* yang dikustomisasi khusus untuk menyelaraskan nilai-nilai perusahaan Anda dengan keseruan aktivitas alam bebas. Jadwalkan program tim Anda sekarang!`,
      coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      category: 'Corporate',
      tags: ['Team Building', 'Corporate', 'Produktivitas', 'Outbound'],
      author: 'CEO JWest',
      createdAt: '2026-07-05T10:30:00.000Z',
      status: 'published'
    }
  ]
};

interface AdminContextProps {
  cmsData: CMSData;
  isLoggedIn: boolean;
  isAdminModeActive: boolean;
  setAdminModeActive: (active: boolean) => void;
  login: (password: string) => boolean;
  logout: () => void;
  updateGeneral: (data: Partial<GeneralConfig>) => void;
  updateHero: (data: Partial<HeroContent>) => void;
  updateAbout: (data: Partial<AboutContent>) => void;
  updateRoute: (id: string, data: Partial<RouteItem>) => void;
  addRoute: (route: Omit<RouteItem, 'id'>) => void;
  deleteRoute: (id: string) => void;
  updateCorporate: (id: string, data: Partial<CorporateProgram>) => void;
  updateLearning: (id: string, data: Partial<LearningProgram>) => void;
  updateGalleryItem: (id: string, data: Partial<GalleryItem>) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  updateInstagramPost: (id: string, data: Partial<InstagramPost>) => void;
  addArticle: (article: Omit<Article, 'id' | 'createdAt'>) => void;
  updateArticle: (id: string, data: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  resetAllToDefault: () => void;
}

const AdminDataContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<CMSData>(() => {
    const saved = localStorage.getItem('jwest_cms_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.general && (parsed.general.adminPassword === 'admin123' || !parsed.general.adminPassword)) {
          parsed.general.adminPassword = 'JWest2026$';
        }
        // Ensure structure matches defaults (merging keys just in case of future expansion)
        return {
          ...defaultCMSData,
          ...parsed,
          general: { ...defaultCMSData.general, ...parsed.general },
          hero: { ...defaultCMSData.hero, ...parsed.hero },
          about: { ...defaultCMSData.about, ...parsed.about },
          routes: parsed.routes || defaultCMSData.routes,
          corporate: parsed.corporate || defaultCMSData.corporate,
          learning: parsed.learning || defaultCMSData.learning,
          gallery: parsed.gallery || defaultCMSData.gallery,
          instagram: parsed.instagram || defaultCMSData.instagram,
          articles: parsed.articles || defaultCMSData.articles,
        };
      } catch (e) {
        console.error('Failed to parse saved CMS data, loading default', e);
        return defaultCMSData;
      }
    }
    return defaultCMSData;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('jwest_admin_logged_in') === 'true';
  });

  const [isAdminModeActive, setAdminModeActive] = useState(false);

  // Auto scroll to top when toggling admin mode
  useEffect(() => {
    if (isAdminModeActive) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isAdminModeActive]);

  // Persist CMS data to localStorage on change
  useEffect(() => {
    localStorage.setItem('jwest_cms_data', JSON.stringify(cmsData));
  }, [cmsData]);

  const login = (password: string): boolean => {
    const actualPassword = cmsData.general.adminPassword || 'admin123';
    if (password === actualPassword) {
      setIsLoggedIn(true);
      sessionStorage.setItem('jwest_admin_logged_in', 'true');
      setAdminModeActive(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('jwest_admin_logged_in');
    setAdminModeActive(false);
  };

  const updateGeneral = (data: Partial<GeneralConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      general: { ...prev.general, ...data }
    }));
  };

  const updateHero = (data: Partial<HeroContent>) => {
    setCmsData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...data }
    }));
  };

  const updateAbout = (data: Partial<AboutContent>) => {
    setCmsData((prev) => ({
      ...prev,
      about: { ...prev.about, ...data }
    }));
  };

  // Route operations
  const updateRoute = (id: string, data: Partial<RouteItem>) => {
    setCmsData((prev) => ({
      ...prev,
      routes: prev.routes.map((r) => (r.id === id ? { ...r, ...data } : r))
    }));
  };

  const addRoute = (route: Omit<RouteItem, 'id'>) => {
    const newId = `r_${Date.now()}`;
    setCmsData((prev) => ({
      ...prev,
      routes: [...prev.routes, { ...route, id: newId }]
    }));
  };

  const deleteRoute = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      routes: prev.routes.filter((r) => r.id !== id)
    }));
  };

  // Corporate operations
  const updateCorporate = (id: string, data: Partial<CorporateProgram>) => {
    setCmsData((prev) => ({
      ...prev,
      corporate: prev.corporate.map((c) => (c.id === id ? { ...c, ...data } : c))
    }));
  };

  // Learning operations
  const updateLearning = (id: string, data: Partial<LearningProgram>) => {
    setCmsData((prev) => ({
      ...prev,
      learning: prev.learning.map((l) => (l.id === id ? { ...l, ...data } : l))
    }));
  };

  // Gallery operations
  const updateGalleryItem = (id: string, data: Partial<GalleryItem>) => {
    setCmsData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...data } : g))
    }));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newId = `g_${Date.now()}`;
    setCmsData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { ...item, id: newId }]
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id)
    }));
  };

  // Instagram operations
  const updateInstagramPost = (id: string, data: Partial<InstagramPost>) => {
    setCmsData((prev) => ({
      ...prev,
      instagram: prev.instagram.map((ig) => (ig.id === id ? { ...ig, ...data } : ig))
    }));
  };

  // Article operations
  const addArticle = (article: Omit<Article, 'id' | 'createdAt'>) => {
    const newId = `art_${Date.now()}`;
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const newArticle: Article = {
      ...article,
      id: newId,
      slug,
      createdAt: new Date().toISOString()
    };
    setCmsData((prev) => ({
      ...prev,
      articles: [newArticle, ...(prev.articles || [])]
    }));
  };

  const updateArticle = (id: string, data: Partial<Article>) => {
    setCmsData((prev) => {
      const updatedArticles = (prev.articles || []).map((art) => {
        if (art.id === id) {
          const updated = { ...art, ...data };
          if (data.title) {
            updated.slug = data.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '');
          }
          return updated;
        }
        return art;
      });
      return {
        ...prev,
        articles: updatedArticles
      };
    });
  };

  const deleteArticle = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      articles: (prev.articles || []).filter((art) => art.id !== id)
    }));
  };

  const resetAllToDefault = () => {
    if (window.confirm('Apakah Anda yakin ingin menyetel ulang seluruh konten ke bawaan default? Semua perubahan Anda akan hilang.')) {
      setCmsData(defaultCMSData);
      localStorage.removeItem('jwest_cms_data');
    }
  };

  return (
    <AdminDataContext.Provider
      value={{
        cmsData,
        isLoggedIn,
        isAdminModeActive,
        setAdminModeActive,
        login,
        logout,
        updateGeneral,
        updateHero,
        updateAbout,
        updateRoute,
        addRoute,
        deleteRoute,
        updateCorporate,
        updateLearning,
        updateGalleryItem,
        addGalleryItem,
        deleteGalleryItem,
        updateInstagramPost,
        addArticle,
        updateArticle,
        deleteArticle,
        resetAllToDefault,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
