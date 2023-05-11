const enId = {
  title: 'Sistem penagihan',
  okText: 'OK',
  cancelText: 'batal',
  confirMsend: 'Kirim',
  close: 'tutup',
  quit: 'keluar',
  loadingText: 'loading',
  noData: 'Tidak ada data',
  selectPrefix: 'pilih ',
  curLanguage: 'Bahasa saat ini',
  timeHorizon: 'batas waktu',
  getSmstext: 'Buat SMS',
  all: 'Semua',
  noFound: {
    title: 'maaf, halaman yang Anda kunjungi tidak ada',
    back: 'kembali ke halaman utama'
  },
  resetPassword: 'ubah kata sandi',
  inputPrefix: 'masukkan ',
  selectPrefix: 'pilih ',
  shuzi: 'digital',
  day: 'hari',
  listModule: {
    handle: 'pengoperasian',
    dealWith: 'memproses',
    viewBtn: 'lihat',
    editBtn: 'ubah',
    Whatsapp: 'Whatsapp',
    userInfoList: {
      accountNumber: 'Nomor Akun',
      name: 'nama',
      isDivide: 'Status Microsip',
      mobile: 'Nomor Microsip ',
      status: 'status',
      createTime: 'waktu penambahan'
    },
    historyList: {
      orderId: 'kode pesanan',
      userName: 'nama peminjam',
      city: 'kota',
      collectionDate: 'Tanggal keluar dari sistem penagihan',
      sitTable: 'Penagih saat keluar dari sistem penagihan',
      collectionDueDay: 'Jumlah hari keterlambatan saat keluar dari sistem'
    },
    taskList: {
      orderId: 'kode pesanan',
      customerName: 'nama peminjam',
      city: 'kota',
      mobile: 'nomor telepon',
      overDays: 'jumlah hari keterlambatan',
      contactResult: 'hasil kontak',
      repaymentWillingness: 'Hasil Follow Up',
      loanTerm: 'Tenor Pendanaan',
      followUpTime: 'waktu follow up',
      updateTime: 'waktu operasi terakhir',
      collection: 'penagihan'
    },
    taskOrder: {
      orderNo: 'Kode pesanan',
      userName: 'Nama Peminjam',
      city: 'Kota',
      mobile: 'Nomor Akun',
      collectionDate: 'Tanggal keluar dari sistem penagihan'
    },
    loanedList: {
      orderNo: 'Kode pesanan',
      mobile: 'Nomor Akun',
      dueTime: 'Tanggal jatuh tempo',
      followResult: 'Hasil follow up',
      userName: 'Nama nasabah',
      JinanTime: 'Waktu orderan masuk',
      callTimes: 'Jumlah follow up',
      lastFollowTime: 'Waktu follow up terakhir',
      search: 'cari',
      followUser: 'Nama Staff',
      taskStatus: 'Status',
      repayWill: 'Kesediaan untuk membayar kembali',
      stateArray: [{
        key: 1,
        value: "Tidak diproses"
      }, {
        key: 2,
        value: "Pengolahan"
      }, {
        key: 3,
        value: "Diproses"
      }, {
        key: 4,
        value: "Tidak diproses/diproses"
      }]
    },
    personnel: {
      commodityPhase: 'Penyaringan tugas setelah pengiriman',
      commodityPersonnel: 'Skrining spesialis setelah melahirkan',
      collectionPhase: 'fase pemilihan untuk kolektor',
      collectionPersonnel: "pilihan untuk staf kolektor",
      date: 'Tanggal',
      follower_name: 'nama kolektor',
      total: 'data kasus',
      allRecycle: 'daur ulang total',
      allRate: 'pemulihan total',
      t0_recycle: 'T0 daur ulang',
      t0_rate: 'T0 Tingkat pemulihan',
      t1_recycle: 'pengembalian hari pertama',
      t1_rate: 'presentase pengembalian pada hari pertama',
      t2_recycle: 'pengembalian hari ke dua',
      t2_rate: 'presentase pengembalian pada hari dua',
      t3_recycle: 'pengembalian hari ke tiga',
      t3_rate: 'presentase pengembalian pada hari ke tiga',
      t4_recycle: 'pengembalian hari ke empat',
      t4_rate: 'presentase pengembalian pada hari ke empat',
      t5_recycle: 'pengembalian hari ke 5',
      t5_rate: 'presentase pengembalian pada hari ke 5',
      t6_recycle: 'pengembalian hari ke 6',
      t6_rate: 'presentase pengembalian pada hari ke 6',
      t7_recycle: 'pengembalian hari ke 7',
      t7_rate: 'presentase pengembalian pada hari ke 7',
      totalAllNumber: 'jumlah data collection',
      settleContractAmount: 'jumlah dana pelunasan',
      extensionContractAmount: 'jumlah perpanjangan dana',
      H0_recycle: 'H0 pengembalian dana',
      H0_rate: 'presentase pengembalian dana H0',
      H1_recycle: 'H1 pengembalian dana',
      H1_rate: 'presentase pengembalian dana H1',
      H2_recycle: 'H2 pengembalian dana',
      H2_rate: 'presentase pengembalian dana H2',
      H3_recycle: 'H3 pengembalian dana',
      H3_rate: 'presentase pengembalian dana H3',
      unrecycle: 'preentase pinjaman yang belum dibayar',
      recycle_rate: 'presentase uang kembali',
      taskPhase: 'jumlah pengembalian dana yang kembali pasca pinjaman',
      rushnumber: 'pinjaman yang belum dibayar',
      taskPhase_recycle: 'presentase pengembalian dana pasca pinjaman',
      userQuery: 'mencari pengguna',

      date: 'Tanggal',
      follower_name: 'nama kolektor',
      Task_number: 'jumlah tugas',
      unexcuted_num: "tugas yang belum dikerjakan",
      excuted_num: "yang sedang dikerjakan",
      repay_num: 'jumlah pengembalian pada hari tersebut',
      call_num: "jumlah kontak darurat yang dihubungi",
      agree_num: 'jumlah PTP',
      connect_num: 'jumlah call yang terhubung (collection)',
      callback_answer: 'jumlah call yang terhubung (microsip)',
      unconnect_num: 'jumlah call yang tidak tersambung (collection)',
      callback_unanswer: 'jumlah call tidak yang terhubung (microsip)',
      sop_num: 'sesuai dengan SOP yang berlaku',

      compellation: 'Nama',
      unexecuted: 'Tidak dilakukan',
      implemented: 'Itu telah dieksekusi',
      promiseRefund: 'Berjanjilah untuk membayar',
      beenPayment: 'Dibayar kembali',
    },
    loanedTask: {
      orderNo: 'Kode pesanan',
      mobile: 'Nomor Akun',
      dueTime: 'Tanggal jatuh tempo',
      followResult: 'Hasil follow up',
      userName: 'Nama nasabah',
      JinanTime: 'Waktu orderan masuk',
      callTimes: 'Jumlah follow up',
      lastFollowTime: 'Waktu follow up terakhir',
      search: 'cari'
    },
    loanedHistory: {
      outTaskTime: 'Waktu tugas setelah pinjaman',
      outTaskDesc: 'Kondisi tugas setelah pinjaman pesanan',
      orderNo: 'Kode pesanan',
      mobile: 'Nomor Akun',
      dueTime: 'Tanggal jatuh tempo',
      followResult: 'Hasil follow up',
      userName: 'Nama nasabah',
      JinanTime: 'Waktu orderan masuk',
      callTimes: 'Jumlah follow up',
      lastFollowTime: 'Waktu follow up terakhir',
      search: 'cari'
    },
    performance: {
      rank: 'Ranking insentif',
      followerName: 'Penagih',
      principalInterest: 'Pokok pinjaman beserta bunga pembayaran hari ini',
      overdueInterest: 'Denda keterlambatan pembayaran hari ini',
      returnSum: 'Total pembayaran hari ini',
      performance: 'Insentif hari ini',

    }
  },
  pageSlot: {
    total: 'total',
    count: 'catatan'
  },
  sildeNav: [{
      title: 'pengelolaan sistem',
      url: '/management',
      role: ['role_daihou_admin',],
      sunNav: [{
          title: 'Manajemen Akun  Penagihan',
          role: ['role_daihou_admin', 'role_cuishou_admin'],
          url: '/management/userList'
        },
        {
          title: 'Manajemen Akun Pengingat',
          role: ['role_daihou_admin', 'role_cuishou_admin'],
          url: '/management/accountList'
        }
      ]
    },
    {
      title: 'pengelolaan pesanan',
      url: '/order',
      role: ['role_cuishouer', 'role_daihou_checker','role_daihou_admin', 'role_cuishou_admin'],
      sunNav: [{
          title: 'Pengelolaan Data Penagihan',
          role: ['role_cuishou_admin'],
          url: '/order/case'
        },
        {
          title: 'Riwayat Data Penagihan',
          role: ['role_cuishou_admin'],
          url: '/order/history'
        },
        {
          title: 'Pengelolaan Data Pengingat',
          role: ['role_daihou_admin'],
          url: '/order/loaned'
        },
        {
          title: 'Laporan Hasil Tagihan',
          role: ['role_cuishouer', 'role_daihou_checker', 'role_cuishou_admin'],
          url: '/order/TaksRecovery'
        },
      ]
    },
    {
      title: 'tugas saya',
      url: '/task',
      role: ['role_cuishouer', 'role_daihou_checker',],
      sunNav: [{
          title: 'tugas penagihan saya',
          role: ['role_cuishouer'],
          url: '/task/tasklist'
        },
        {
          title: 'Riwayat tugas saya',
          role: ['role_cuishouer'],
          url: '/task/taskorder'
        },
        {
          title: 'Pengelolaan Data Pengingat saya',
          role: ['role_daihou_checker'],
          url: '/task/loanedlist'
        },
        {
          title: 'Riwayat Pembayaran',
          role: ['role_daihou_checker'],
          url: '/task/loanedhistory'
        },
        // {
        //   title: 'Insentif saya',
        //   role: ['role_cuishouer', 'role_cuishou_admin'],
        //   url: '/task/performance'
        // }, {
        //   title: 'Kinerja tugas pasca-kargo',
        //   role: ['role_cuishouer', 'role_cuishou_admin'],
        //   url: '/task/taskPhase'
        // },
        // {

        //   role: ['role_cuishou_admin'],
        //   url: '/task/taskRecycleTotal'
        // }, {

        //   role: ['role_cuishouer', 'role_cuishou_admin'],
        //   url: '/task/taskRecycle'
        // },
      ]
    },
    /*{
      title: 'Laporan data',
      url: '/datareport',
      role: ['role_cuishouer', 'role_daihou_checker', 'role_cuishou_admin', 'role_daihou_admin', ],
      sunNav: [
        // {
        //   title: 'Kinerja koleksi',
        //   role: ['role_cuishouer', 'role_cuishou_admin'],
        //   url: '/datareport/collectionStatistics'
        // },
        //  {
        //    title: 'Pemantauan koleksi',
        //    role: ['role_cuishouer', 'role_cuishou_admin'],
        //    url: '/datareport/collectionSOPprocess'
        //  },
        //  {
        //    title: 'Tabel pemantauan tugas pasca-pinjaman',
        //    role: ['role_cuishouer', 'role_cuishou_admin'],
        //    url: '/datareport/cargoTasksMonitoring'
        //  },
        //  {
        //    title: 'Formulir Pemulihan Pasca Pinjaman',
        //    role: ['role_daihou_checker', ],
        //    url: '/datareport/collectionRecycle'
        //  }, {
        //    title: 'Daftar Pemulihan Pasca Pinjaman',
        //    role: ['role_daihou_admin'],
        //    url: '/datareport/collectionRecycleAll'
        //  },
        {
          title: 'Statistik',
          role: ['role_cuishouer', 'role_cuishou_admin'],
          url: '/datareport/repayWish'
        }
      ]
    }*/
  ],
  userManagement: {
    editInfo: {
      editUserInfo: 'ubah informasi penagih',
      viewUserInfo: 'lihat informasi penagih',
      userName: 'nama penagih',
      email: 'email',
      role: 'peran',
      state: 'status',
      createTime: 'waktu pembuatan',
      assignNumber: 'Status Microsip',
      phone: 'Nomor Microsip',
      phonePassword: 'kata sandi ekstensi',
      task: 'tugas',
      yes: 'iya',
      no: 'tidak',
      assignNumberRules: 'yakin akan menambahkan nomor ekstensi？'
    },
    serachBlock: {
      account: 'Nomor Akun',
      userName: 'nama penagih',
      isAssignNumber: 'tambah nomor ekstensi',
      state: 'status'
    }
  },
  caseManage: {
    serachBlock: {
      orderNum: 'kode pesanan',
      phone: 'Nomor Akun ',
      city: 'kota',
      userName: 'Nama Nasabah',
      belongTask: 'tugas',
      principal: 'Nama Staff',
      contactResult: 'Hasil Follow Up',
      repaymentWillingness: 'Status Nasabah',
      changeFollowTip: 'pilih staff follow up yang perlu diubah',
      search: 'cari',
      noFollowUser: 'sementara tidak ada staff follow up',
      followUpTimes: 'jumlah panggilan',
      createCollectionTime: 'Waktu masuk sistem penagihan',
      todayCallCount: 'Jumlah panggilan keluar harian',
      lastCallTime: 'Waktu panggilan keluar terakhir',
      collectionDueDay: 'Jumlah hari keterlambatan saat keluar dari sistem',
      organization:'PJP',
      CollectionTime:'Waktu pengumpulan',
      recoveryRate:'Persentase Hasil',
      recoveryAmount:'Nominal Tertagih',
      fenanAmount:'Nominal Tagihan',
      productId:'Produk',
      orderstatus:'Jenis Status Pinjaman',
      all:'Semua',
      isRollover:'Perpanjangan',
      unRollover:'Umum',
      groupId:'Collection Group',
    },
    tableBlock: {
      orderId: 'kode pesanan',
      userName: 'nama peminjam',
      followName: 'nama penagih',
      city: 'kota',
      action: 'pengoperasian',
      repaymentWish: 'Status Nasabah',
      contactStatus: 'Hasil Follow Up',
      belongTask: 'tugas',
      overdueRange: 'jumlah hari keterlambatan',
      principal: 'staff follow up',
      contactResult: 'hasil kontak',
      repaymentWillingness: 'Hasil Follow Up',
      contactNum: 'jumlah panggilan',
      collection: 'penagihan',
      changePrincipal: 'ganti staff follow up',
      bathChangeUser: 'Ubah staff follow up secara banyak',
      inputExplain: 'Keterangan',
      selectedOrder: 'Jumlah pesanan yang telah dicentang',
      existOrders: 'Tugas ini sudah ada pesanan',
      followOrders: 'Jumlah pesanan yang sedang difollow up',
      distributeOrderNum: 'Jumlah pesanan yang diatur',
      pleaseSelectTask: 'Silahkan pilih tugas terlebih dahulu',
      inputInteger: 'Hanya dapat mengisi angka bilangan positif!',
      required: 'Jumlah pesanan yang diatur harus lebih besar dari "0 (nol)", silahkan isi ulang!',
      greaterThan: 'Jumlah pesanan yang diatur melebihi jumlah pesanan yang dapat diatur, silahkan isi ulang!',
      explainContent: [
        '1.Hanya dapat menulis angka bilangan positif, jika tidak mengisi maka dianggap "0 (nol)"',
        '2.Jumlah pesanan yang diatur harus kurang dari atau sama dengan "jumlah pesanan yang telah dicentang", dan lebih besar dari 0 (nol)'
      ],
      todayCallCount: 'Jumlah panggilan keluar harian',
      lastCallTime: 'Waktu panggilan keluar terakhir',
      collectionDueDay: 'Jumlah hari keterlambatan saat keluar dari sistem',
      followUser:'Nama Staff',
    }
  },
  login: {
    accountPlaceholder: 'masukkan nomor akun',
    passwordPlaceholder: 'masukkan kata sandi',
    vcodePlaceholder: 'masukkan kode verifikasi',
    buttonText: 'masuk'
  },
  reset: {
    passwordPlaceholder: 'masukkan kata sandi baru',
    oldPasswordPlaceholder: 'masukkan kata sandi lama',
    confirmPasswordPlaceholder: 'masukkan kembali kata sandi baru',
    buttonText: 'OK'
  },
  taskDetail: {
    baseInfo: {
      coustomBaseInfo: 'informasi umum peminjam',
      orderBaseInfo: 'informasi umum pesanan',
      userName: 'nama',
      idCard: 'nomor KTP',
      sex: 'jenis kelamin',
      homeplace: 'tempat lahir',
      presentAddress: 'alamat saat ini',
      jobType: 'jenis pekerjaan',
      loanUse: 'penggunaan pinjaman',
      religion: 'agama',
      eduStatus: 'tingkat pendidikan',
      maritalStatus: 'status perkawinan',
      orderId: 'kode pesanan',
      age: 'usia',
      applyProduct: 'produk pengajuan',
      loanAmount: 'jumlah  pinjaman',
      loanTerm: 'Tenor Pendanaan',
      loanDate: 'tanggal jatuh tempo',
      bankName: 'nama bank',
      bankcard: 'nomor rekening',
      overDays: 'jumlah hari keterlambatan',
      companyName: 'Nama perusahaan',
      approvalType: 'Jenis pemeriksaan',
      approvalRemark: 'Keterangan Pemeriksaan',
      monthIncome: 'Pendapatan bulanan',
      orderChannel: 'Jalur peminjaman',
      loanCount: 'Jumlah pinjaman',
      ocrImage: 'OCR Foto',
      repayAccountNo: 'Kode transaksi',
      repayVoucher: 'bukti pencairan dana',
      voucherDetails: 'bukti pencairan dana',
      repayType: 'Cara pembayaran',
      repayCode: 'Bank pembayaran',
      repayEndTime: 'Kode transaksi berlaku hingga',
      livingPhoto: 'Foto dari tubuh yang hidup',
      rolloverInfo: 'Informasi Perpanjangan',
      root_order_no: 'Order Utama',
      higher_order_no: 'Order Sebelumnya',
      next_order_no: 'Order Selanjutnya',
      rolloverInfoTip: 'Misalnya Order A diperpanjang menghasilkan Order B, B diperpanjang menghasilkan C, C diperpanjang menghasilkan D.Saat melakukan pemeriksaan informasi pinjaman order C, bisa ngelihat order utama itu adalah A, Order sebelumnya adalah B, Order berikutnya adalah D.',
      orderChannel:'Jalur peminjaman',
    },
    overdueCondition: {
      title: 'kondisi keterlambatan',
      dateOfReturn: 'tanggal jatuh tempo',
      principal: 'pinjaman pokok',
      interest: 'bunga',
      managementExpense: 'biaya layanan',
      overdueNewCost: 'Denda',
      rolloverServiceFee: 'Biaya layanan pembaruan',

      amountReturned: 'jumlah yang telah dibayar',
      receivables: 'jumlah yang harus dibayar periode ini',
      status: 'status',
      periodNo: 'Tenor'
    },
    collectFollowUp: {
      title: 'follow up penagihan',
      userName: 'nama',
      relationship: 'hubungan',
      mobile: 'nomor telepon',
      dial: 'hubungi',
      hangup: 'akhiri',
      dialCall: 'Telepon',
      remarks: 'keterangan',
      mainCallCount: 'jumlah panggilan keluar',
      callCount: 'jumlah panggilan masuk',
      totalCount: 'total',
      callStatus: 'status panggilan terakhir',
      followUpTime: 'waktu follow up',
      saveReminder: 'Hasil Follow Up',
      saveRest:'Simpan',
      addContract: 'Tambah Kontak',
      contactResult: 'hasil kontak',
      repaymentWillingness: 'Hasil Follow Up',
      contractName: 'nama kontak',
      contractMobile: 'Nomor Akun kontak',
      contractRelationship: 'hubungan dengan kontak',
      add: 'tambah',
      save: 'simpan',
      select: 'pilih',
      send: 'Kirim',
      sendMsg: 'Kirim SMS',
      msgTemplate: 'Format SMS',
      msgContent: 'Isi SMS',
      repayChannel: 'Jalur pembayaran',
      retrieveAddressBook: 'Refresh Kontak'
    },
    taskFollowUp: {
      title: 'follow up tugas',
      userName: 'nama',
      relationship: 'hubungan',
      mobile: 'nomor telepon',
      dial: 'hubungi',
      phoneType: 'Jenis nomor telepon',
      hangup: 'akhiri',
      dialCall: 'mulai panggilan',
      remarks: 'keterangan',
      mainCallCount: 'jumlah panggilan keluar',
      callCount: 'jumlah panggilan masuk',
      totalCount: 'total',
      callStatus: 'status panggilan terakhir',
      followUpTime: 'waktu follow up',
      saveReminder: 'catatan follow up pinjaman',
      addContract: 'Tambah Kontak',
      contactResult: 'hasil kontak',
      repaymentWillingness: 'Hasil Follow Up',
      contractName: 'nama kontak',
      contractMobile: 'Nomor Akun kontak',
      contractRelationship: 'hubungan dengan kontak',
      add: 'tambah',
      save: 'simpan',
      select: 'pilih',
      send: 'Kirim',
      sendMsg: 'Kirim SMS',
      msgTemplate: 'Format SMS',
      msgContent: 'Isi SMS',
      repayChannel: 'Jalur pembayaran',
      retrieveAddressBook: 'Refresh Kontak'
    },
    collectRecordTab: {
      title: 'Riwayat',
      collectRecord: {
        title: 'Catatan Follow Up',
        contractDate: 'waktu panggilan',
        task: 'Tugas',
        contractPerson: 'kontak',
        operator: 'Staff'
      },
      contractRecord: {
        title: 'Catatan Telepon',
        startTime: 'waktu mulai',
        endTime: 'waktu berakhir',
        whoCall: 'Peran panggilan keluar',
        callMonthod: 'mode panggilan',
        callStatus: 'status panggilan',
        dialPerson: 'Staff',
        dialNumber: 'nomor yang dihubungi',
        record: 'rekam suara'
      },
      repaymentPlan: {
        title: 'rencana pembayaran',
        receivableDate: 'tanggal jatuh tempo pembayaran',
        paymentDate: 'tanggal pembayaran',
        corpus: 'pinjaman pokok',
        interest: 'bunga',
        managementCost: 'biaya layanan',
        overdueNewCost: 'Denda',
        rolloverServiceFee: 'Biaya layanan pembaruan',
        amountReturned: 'jumlah yang telah dibayar',
        receivableAmount: 'jumlah yang harus dibayar pada periode ini',
        status: 'status',
        overDays: 'jumlah hari keterlambatan',
        loanAmount: 'Dana Diterima',
        remainAmount: 'Sisa yang harus dibayar',
        remark: 'Remarks'
      },
      collectionPath: {
        title: 'jalur penagihan',
        changeTime: 'waktu pengubahan',
        changeReason: 'alasan pengubahan',
        strategicPhase: 'tahap strategi',
        task: 'tugas',
        fllowUpPerson: 'staff follow up',
        executor: 'operator'
      },
      approvalRecord: {
        title: 'Riwayat pemeriksaan melalui telepon',
        callStatus: 'Status panggilan',
        callNo: 'Kode panggilan',
        startTime: 'Waktu mulai panggilan',
        endTime: 'Waktu akhir panggilan',
        playRecord: 'Rekaman',
        noRecord: 'Sementara tidak ada rekaman suara',
        otherMobile: 'Telepon lainnya',
        currentAddr: 'Alamat saat ini',
        maritalStatus: 'Status perkawinan',
        organization: 'Nama perusahaan',
        monthlyIncome: 'Pendapatan bulanan',
        repayDay: 'Tanggal gajian',
        companyAddress: 'Alamat perusahaan saat ini',
        curWorkContactType: 'Nomor telepon perusahaan',
        hasOtherLoan: 'Apakah ada pinjaman lain',
        totalAmount: 'Jumlah pinjaman'
      },
      operateRecord: {
        title: 'Riwayat Pesan',
        operateTime: 'Waktu ',
        operateType: 'Jenis',
        content: 'Isi',
        operators: 'Tahap',
        operateor: 'Operator',
        update_time: 'Panggil waktu berakhir'
      },
      daihouLog: {
        title: 'Catatan pinjaman',
        collection_vir: 'Koleksi catatan Ivr ',
        contactTime: 'Waktu',
        followResult: 'Hasil follow up',
        remark: 'Keterangan',
        operateUser: 'Operator',
      },
      daihouHis: {
        title: 'Jalur pasca peminjaman',
        changeTime: 'Waktu kontak',
        contactUser: 'Kontak',
        contactRelation: 'Relationship',
        followResult: 'Hasil kontak',
        followRepayWish: 'Repayment Willingness',
        remark: 'Komentar',
        createUser: 'Operator',
      },
      records: {
        paymentHistory: 'Catatan Pembayaran',
        convenience: 'Silakan pilih toko swalayan',
        reimbursementCodes: 'Buat Kode VA',
        messageContent: 'konten pesan teks',
        repay_create_time: 'Waktu',
        repay_amount: 'Nominal',
        repay_method: 'Jalur  Pembayaran',
        repay_type: 'Jenis kode pembayaran',
        repay_bank: 'Bank/Gerai',
        repay_code: 'Kode VA',
        repay_code_expire_at: 'Waktu Kadluwarsa',
        repay_status: 'Status',
        request_type: 'Metode penyelesaian',
        bank_store: 'Bank/Gerai',
        drop_code: 'Batalkan kode VA',
        repayAmount: 'Bagian dari kisaran jumlah pembayaran adalah ',
        repaytips: 'Pembayaran melalui Gerai max Rp 2.500.000, pembayaran melebihi nominal ini harap mengajukan kode pembayaran melalui Bank.',
        isClose: 'Yakin di Hapus?',
        isCloseTips: 'Setelah di konfirmasi, nasabah dapat dibuatkan kode pembayaran melalui aplikasi. Harap sampaikan kepada nasabah untuk memakai kode pembayaran terbaru',
        repay_method_type:'Jenis Pembayaran',
        va_creater:'Pembuat',
      }
    },
    contactInformationTab: {
      title: 'Informasi kontak',
      contactRecord: {
        title: 'Catatan kontak',
        contactsRecentContactTime: 'Waktu kontak terbaru',
        contactsCommonContact: 'Apakah ini kontak biasa',
        contactsNumber: 'Jumlah kontak',
        contactDisplayName: 'Nama tampilan kontak',
        contactNot: 'Tidak',
        contactYes: 'Ya'
      },
      callRecord: {
        title: 'Riwayat panggilan',
        callPhoneNumber: 'Nomor telepon',
        callPhoneName: 'Nama',
        callDuration: 'Durasi',
        callType: 'Jenis panggilan',
        callTime: 'Waktu',
        callTypeIncomingCall: 'Panggilan masuk',
        callTypeOutgoing: 'Keluar',
        callTypeMissed: 'Tidak terjawab',
        callTypeVoiceMail: 'Pesan suara',
        callTypeRejected: 'Tolak',
        callTypeBlocked: 'Blokir',
        callTypeUnknown: 'Tidak dikenal'
      },
      smsRecord: {
        title: 'Catatan SMS',
        smsType: 'Jenis SMS',
        smsTypeReceive: 'penerimaan',
        smsTypeSend: 'Kirim',
        smsContent: 'Konten SMS',
        smsAddress: 'Alamat',
        smsDate: 'Tanggal',
        smsSentDate: 'tanggal jatuh tempo',
        smsSender: 'Pengirim'
      }
    },
    modelMsg: {
      userName: 'masukkan nama kontak',
      mobile: 'masukkan Nomor Akun kontak yang benar',
      relationship: 'pilih hubungan dengan kontak',
      saveSuccess: 'tersimpan',
      contactResult: 'pilih hasil kontak',
      repaymentWillingness: 'pilih Hasil Follow Up',
      followUpTime: 'pilih waktu follow up',
      dialing: 'menunggu panggilan...',
      dialDone: 'panggilan berakhir',
      audioTitle: 'putar hasil rekaman suara',
      phoneType: 'silahkan pilih jenis nomor telepon'
    },
    remark: {
      remarkTitle: 'Catatan CS',
      remarkSort:'Nomor',
      remarkTxt:'isi',
      remarkTime:'waktu',
      operatorName:'Dibuat Oleh',
    },
  },
  approvalDetail: {
    baseInfo: {
      title: 'data pemeriksaan',
      orderTitle: 'informasi pesanan',
      uid: 'UID',
      name: 'nama',
      gender: 'jenis kelamin',
      mobile: 'Nomor Akun',
      birthday: 'Tanggal lahir',
      idcard: 'NIK KTP',
      ocrName: 'OCR Nama',
      ocrCardNo: 'OCR NIK',
      ocrArea: 'OCR Alamat',
      ocrResult: 'OCR Hasil verifikasi',
      homeAddress: 'domisili',
      maritalStatus: 'status perkawinan',
      religion: 'agama',
      userType: 'status pekerjaan',
      jobType: 'jenis pekerjaan',
      companyName: 'nama perusahaan',
      salary: 'pendapatan bulanan',
      bankName: 'nama bank',
      contactRelation: 'hubungan dengan kontak',
      contactName: 'nama kontak',
      contactMobile: 'telepon kontak',
      contractPerson: 'kontak',
      relationship: 'hubungan',
      associatedOrder: 'pesanan yang berhubungan',
      bankCardID: 'nomor Rek ',
      error: 'PERINGATAN',
      errorMsg: 'Kode daerah dalam OCR NIK KTP dan OCR Alamat tidak sesuai'
    },
    associatedOrderInfo: {
      type: 'Jenis',
      info: 'Informasi duplikasi',
      associatedOrder: 'pesanan yang berhubungan',
      applyTime: 'Waktu pengajuan',
      orderStuas: 'Status pesanan',
      noData: 'Tidak ada pesanan yang berhubungan',
      check: 'List pemeriksaan',
      record: 'Catatan',
      phoneRecords: {
        title: 'Catatan pemeriksaan melalui telepon',
        isSelf: 'Diajukan oleh peminjam sendiri',
        idcard: 'NIK KTP',
        idcardName: 'Nama KTP',
        birthday: 'DOB KTP',
        idcardAddress: 'Alamat KTP',
        othermobile: 'Nomor telepon lain',
        curAddress: 'Domisili saat ini',
        curAddressOwn: 'Status kepemilikan domisili',
        loanUse: 'Tujuan peminjaman',
        maritalStatus: 'Status pernikahan',
        legend: 'Agama peminjam',
        organization: 'Nama perusahaan',
        monthlyIncome: 'Pendapatan bulanan',
        repayDay: 'Tanggal gajian',
        companyAddress: 'Alamat perusahaan sekarang',
        workType: 'Posisi',
        curWorkTime: 'Lama waktu kerja di perusahaan',
        curWorkContactType: 'Nomor telepon perusahaan',
        hasOtherLoan: 'Sedang meminjam di tempat lain',
        totalAmount: 'Total pinjaman yang belum lunas',
        canRepayAmount: 'Kemampuan pelunasan per bulannya',
        contactName: 'Nama kontak darurat',
        contactPhone: 'Nomor kontak darurat',
        contactRelationship: 'Hubungan dengan kontak darurat',
        contactKnown: 'Kontak darurat mengetahui peminjaman ini',
        relationship: 'Hubungan peminjam dan kontak darurat',
        contactCheck: 'Verifikasi data dengan kontak darurat',
        workInfoCheck: 'Verifikasi mengenai informasi pekerjaan (dengan perusahaan)'
      }
    },
    orderInfo: {
      orderNo: 'kode pesanan',
      applyTime: 'waktu pengajuan',
      channel: 'jalur masuk pesanan',
      appName: 'pengajuan produk',
      applyTerm: 'batas waktu pengajuan',
      applyAmount: 'jumlah pengajuan',
      accountAmount: 'jumlah yang diterima',
      oneTimeFee: 'biaya administrasi',
      repayAmount: 'jumlah pengembalian',
      repayTime: 'waktu pembayaran',
      loanUse: 'tujuan peminjaman',
      approveType: 'jenis pemeriksaan',
      loanNum: 'Jumlah pinjaman'
    },
    callRecord: {
      callPhoneNumber: "Nomor telepon",
      callPhoneName: "Nama",
      callDuration: "Durasi",
      callType: "Jenis panggilan",
      callTime: "Waktu",
      callTypeIncomingCall: "Panggilan masuk",
      callTypeOutgoing: "Keluar",
      callTypeMissed: "Tidak terjawab",
      callTypeVoiceMail: "Pesan suara",
      callTypeRejected: "Tolak",
      callTypeBlocked: "Blokir",
      callTypeUnknown: "Tidak dikenal",
    },
    contactRecord: {
      contactsRecentContactTime: "Waktu kontak terbaru",
      contactsCommonContact: "Apakah ini kontak biasa",
      contactsNumber: "Jumlah kontak",
      contactDisplayName: "Nama tampilan kontak",
      contactNot: "Tidak",
      contactYes: "Ya",
    },
    smsRecord: {
      smsType: "Jenis SMS",
      smsTypeReceive: "penerimaan",
      smsTypeSend: "Kirim",
      smsContent: "Konten SMS",
      smsAddress: "Alamat",
      smsDate: "Tanggal",
      smsSentDate: "tanggal jatuh tempo",
      smsSender: "Pengirim",
    },
    msgRemind: {
      title: 'sms pemberitahuan',
      dateTime: 'waktu',
      msgType: 'jenis pesan',
      sender: 'pengirim',
      sendMsgRemind: 'kirim pesan teks pengingat',
      send: 'kirim',
      sendSuccess: 'terkirim',
      sendMsg: 'kirim pesan'
    },
    telApproval: {
      title: 'riwayat telepon',
      callNumber: 'nomor panggilan',
      callStatus: 'status panggilan',
      mobile: 'nomor tujuan',
      startTime: 'waktu mulai',
      endTime: 'waktu berakhir',
      dialPerson: 'penelepon',
      dial: 'hubungi',
      hangup: 'akhiri panggilan',
      soundRecord: 'dengar pesan suara',
      createNewCall: 'mulai panggilan baru',
      dialCall: 'mulai panggilan',
      placeholder: 'masukkan nomor panggilan'
    },
    followUpStatus: {
      title: 'status lanjut',
      dateTime: 'waktu',
      afterStatus: 'status setelah modifikasi',
      approvalFollowUpStatus: 'hasil analisa',
      operator: 'operator'
    },
    approvalConclusionHistory: {
      title: 'hasil keputusan',
      examiner: 'pemeriksa',
      approvalTime: 'waktu pemeriksaan',
      approvalConclusion: 'keputusan pemeriksaan',
      mineConclusion: 'hasil keputusan Anda',
      refusalReason: {
        title: 'alasan penolakan',
        reason1: 'termasuk kelompok "beresiko tinggi"',
        reason2: 'data tidak sesuai',
        reason3: 'riwayat telepon tidak berlaku',
        reason4: 'pemeriksa menyerah',
        reason5: 'lainnya'
      },
      resultCancel: 'Batalkan Pinjaman',
      remarks: 'keterangan',
      resultRefusal: 'tidak lolos',
      resultExamination: 'lolos',
      onlyInternalVisible: 'hanya dapat dilihat secara internal',
      pass: 'lolos',
      refusal: 'tolak',
      save: 'simpan',
      commit: 'kirim'
    },
    msgList: {
      changeOrder: 'pesanan ini telah diganti',
      warning: 'peringatan',
      examine: 'menyetujui keputusan pemeriksaan',
      followStatus: 'pilih hasil analisa',
      reason: 'pilih alasan penolakan',
      submitSuccess: 'terkirim',
      saveSuccess: 'tersimpan',
      hasMobile: 'masukkan nomor panggilan yang benar',
      dialSuccess: 'menunggu panggilan..',
      hungUpSuccess: 'panggilan berakhir',
      submitResultConfirm: 'keputusan yang telah dikumpul tidak dapat diubah, yakin akan mengirim？'
    },
    result: {
      TaskStage: 'Fase tugas',
      TaskStages: [{
          index: 0,
          value: 'Semua'
        },
        {
          index: 1,
          value: 'H0'
        }, {
          index: 2,
          value: 'H1'
        }, {
          index: 3,
          value: 'H2'
        }, {
          index: 4,
          value: 'H3'
        }
      ],
      conclusion: [{
          label: 'lulus',
          id: 1
        },
        {
          label: 'tolak',
          id: 2
        },
        {
          label: 'Batalkan Pinjaman',
          id: 3
        }
      ],
      rejectReson: [{
          title: 'termasuk kelompok "beresiko tinggi"',
          value: [{
              label: 'tidak ada penghasilan tetap',
              id: 1
            },
            {
              label: 'pinjaman beresiko tinggi',
              id: 2
            },
            {
              label: 'dugaan penipuan',
              id: 17
            },
            {
              label: 'foto dari layar lain',
              id: 18
            },
            {
              label: 'Pemalsuan KTP',
              id: '19'
            },
            {
              label: 'KTP rusak',
              id: '20'
            },
            {
              label: 'Foto blur',
              id: '21'
            },
            {
              label: 'KTP kadaluarsa',
              id: '22'
            }
          ]
        },
        {
          title: 'data tidak sesuai',
          value: [{
              label: 'dokumen tidak berlaku',
              id: 3
            },
            {
              label: 'pas foto tidak sesuai dengan pemilik',
              id: 4
            },
            {
              label: 'informasi pekerjaan saat riwayat telepon tidak sesuai dengan informasi yang diberikan',
              id: 5
            },
            {
              label: 'informasi kontak saat riwayat telepon tidak sesuai dengan informasi yang diberikan',
              id: 6
            },
            {
              label: 'informasi keluarga saat riwayat telepon tidak sesuai dengan informasi yang diberikan',
              id: 7
            },
            {
              label: 'informasi pendapatan saat riwayat telepon berbeda jauh dengan informasi yang diberikan',
              id: 8
            }
          ]
        },
        {
          title: 'riwayat telepon tidak tersedia',
          value: [{
              label: 'peminjam tidak dapat dihubungi',
              id: 9
            },
            {
              label: 'keluarga/teman tidak dapat dihubungi',
              id: 10
            },
            {
              label: 'peminjam tidak bekerja sama saat panggilan',
              id: 11
            },
            {
              label: 'keluarga/teman tidak bekerja sama saat panggilan',
              id: 12
            }
          ]
        },
        {
          title: 'pemeriksa menyerah',
          value: [{
              label: 'peminjam menolak',
              id: 13
            },
            {
              label: 'keluarga/teman menolak',
              id: 14
            }
          ]
        },
        {
          title: 'lainnya',
          value: [{
              label: 'informasi pemeriksa salah',
              id: 15
            },
            {
              label: 'lainnya',
              id: 16
            }
          ]
        }
      ]
    },
    dataReport: {
      loverallData: {
        searchBlock: {
          phone: 'Nomor ponsel',
          name: 'Nama yang disetujui',
          date: 'Rentang waktu'
        },
        tableBlock: {
          name: 'Nama yang disetujui',
          phone: 'Ponsel',
          firstNum: 'Jumlah uji coba pendahuluan',
          firstRefuse: 'Penolakan percobaan pertama',
          firstPass: 'Uji coba pertama berlalu',
          loanNum: 'Jumlah pinjaman',
          loanRate: 'Tingkat pinjaman',
          refundedNum: 'Jumlah iuran harus dikembalikan',
          refundsNum: 'Jumlah pengiriman uang',
          refundsRate: 'Tingkat pengembalian'
        },

      }
    }
  },
  dataReport: {
    search: {
      expireDate: 'tanggal jatuh tempo',
    },
    repayWish: {
      nowContact: 'Tersedia saat ini',
      hisContact: 'Riwayat yang dapat dihubungkan',
      all: 'Semua',
      tips: 'Petunjuk:',
      tabTip1: 'Menurut catatan tindak lanjut karyawan, ambil status tindak lanjut terakhir dari setiap pesanan',
      tabTip2: 'Riwayat dapat dihubungkan: Ambil semua catatan tindak lanjut dalam riwayat setiap pesanan, dan hitung hasil tindak lanjut dengan prioritas tertinggi.  Prioritas hasil tindak lanjut: Dibayar> PTP> CTP> RTP> FCT> Tidak Diketahui> Kontak Hilang> Terbuka',
      tip1: 'Semua: Jumlah semua kasus yang batas waktunya adalah tanggal yang dipilih',
      tip2: 'Membayar kembali: Jumlah pembayaran kembali',
      tip3: 'Dibuka: Data yg belum di follow up',
      tip4: 'PTP: Bersedia dan mampu membayar kembali',
      tip5: 'CTP：Bersedia dan tidak mampu membayar kembali',
      tip6: 'RTP：Mampu tetapi menolak untuk melakukan pembayaran',
      tip7: 'FCT：Mampu tetapi perlu bernegosiasi',
      tip8: 'Tidak diketahui: Tidak dapat menentukan sementara',
      tip9: 'Tidak dapat dihubungi: Kehilangan kontak',
    },
  },
  billInfo: {
    title:'Detail Penagihan',
    term: 'Periode',
    dueTime: 'Tanggal jatuh tempo',
    successTime: 'Tanggal pengembalian',
    principal: 'Pokok pinjaman',
    interest: 'Bunga',
    serviceFee: 'Biaya layanan',
    overdueInterest: 'Denda keterlambatan',
    shouldPayTotal: 'Jumlah yang harus dibayar periode ini',
    payedTotal: 'Jumlah yang telah dibayar',
    needPayTotal: 'Sisa yang harus dibayar',
    Lendingaccount: 'Pinjaman ke jumlah akun',
    status: 'Status',
    overdueDay: 'Jumlah hari keterlambatan',
    rolloverServiceFee: 'Biaya layanan perpanjangan',
    remark: 'Keterangan',
    Doubleloan: 'peminjaman kembali',
    oprated: 'Sudah selesai, tolong jangan diulangi',
    waitPayAmount:'Sisa Tagihan',
  },
}

export default enId
