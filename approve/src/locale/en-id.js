const enId = {
  title: 'Sistem Pemeriksaan',
  titleLender: 'Sistem Lender',
  okText: 'OK',
  cancelText: 'batal',
  close: 'tutup',
  onLine: 'online',
  offLine: 'offline',
  quit: 'keluar',
  resetPassword: 'ubah kata sandi',
  inputPrefix: 'masukkan ',
  selectPrefix: 'pilih ',
  loadingText: 'loading',
  curLanguage: 'Bahasa saat ini',
  all: 'semua',
  mobile: 'nomor telepon',
   search: 'cari',
  noFound: {
    title: 'maaf, halaman yang Anda kunjungi tidak ada',
    back: 'kembali'
  },
  download: {
    modalTitle: 'unduhan saya',
    time: 'hari & tanggal',
    title: 'judul',
    resultAmount: 'jumlah akhir',
    status: 'status',
    action: 'pengoperasian',
    download: 'mengunduh'
  },
  loanTypes: [{
    key: 0,
    value: 'Semua'
  },
  {
    key: 1,
    value: 'pinjaman pertama'
  },
  {
    key: 2,
    value: 'peminjam ulang'
  }
],
approveStatusOp: [{
  key: '',
  value: 'Semua'
},
{
  key: 1,
  value: 'Tertunda'
},
{
  key: 2,
  value: 'Lolos'
}
],
  listModule: {
    handle: 'pengoperasian',
    viewBtn: 'lihat',
    editBtn: 'ubah',
    destroyBtn: 'Batalkan',
    destroyTip: 'Keluar dari pengguna akan menghapus semua informasi pribadi pengguna',
    userInfoList: {
      accountNumber: 'ID',
      name: 'nama',
      phone: 'nomor telepon',
      email: 'email',
      mobile: 'nomor ekstensi',
      status: 'status',
      role: 'peran',
      createTime: 'waktu pembuatan'
    }
  },
  pageSlot: {
    total: 'total',
    count: 'catatan'
  },
  sildeNav: [

  //   {
  //   title: 'pengelolaan sistem',
  //   url: '/management',
  //   role: 'role_approve_admin',
  //   sunNav: [
  //     // {
  //     // title: 'pengelolaan pemeriksa',
  //     // url: '/management/userList'
  //     // },
  //     {
  //       title: 'Pengelolaan Pengguna',
  //       url: '/management/customerList'
  //     },
  //   ]
  // },
  {
    title: 'pengelolaan pemeriksaan',
    url: '/approval',
    role: 'role_approve_admin',
    sunNav: [{
      title: 'daftar pemeriksaan',
      url: '/approval/list'
    },
    // {
    //   title: 'Tugas tanda tangan',
    //   url: '/task/singInfo'
    // }
  ]
  },
  {
    title: 'tugas saya',
    url: '/task',
    role: 'role_approver',
    sunNav: [{
      title: 'tugas pemeriksaan',
      url: '/task/list'
    },
    {
      title: 'riwayat tugas pemeriksaan',
      url: '/task/history'
    },
    {
      title: 'Tinjauan batch',
      url: '/task/personCheck'
    },
    ]
  },
  // {
  //   title: 'Laporan data',
  //   role: 'role_approve_admin',
  //   url: '/datareport',
  //   sunNav: [{
  //     title: 'Persetujuan data keseluruhan',
  //     url: '/datareport/approvedata'
  //   }]
  // },

  ],
   lender_sildeNav: [{
       title: 'Detil Finansial',
       url: '/home',
       role: 'role_approve_admin',
       sunNav: [{
         title: 'Detil Finansial',
         url: '/home/myHome'
       },
      {
        title: 'Lender Informasi',
        url: '/home/lenderInfo'
      },
      {
        title: 'laporan bulanan',
        url: '/home/monthReport'
      },
      // {
      //   title: 'Statistik Pendanaan',
      //   url: '/lender/amountStatistics'

      // }
    ]
     },
    //  {
    //    title: 'pengelolaan sistem',
    //    url: '/management',
    //    role: 'role_approve_admin',
    //    sunNav: [{
    //      title: 'pengelolaan pemeriksa',
    //      url: '/management/userList'
    //    }]
    //  },
     {
       title: 'Detil Pemberian Dana',
       url: '/approval',
       role: 'role_approve_admin',
       sunNav: [
      //    {
      //    title: 'daftar pemeriksaan',
      //    url: '/approval/list'
      //  },
       {
         title: 'Pengajuan Pemberian Dana',
         url: '/approval/loanlist'
       },
       ]
     },
     {
       title: 'daftar pesanan',
       url: '/task',
       role: 'role_approver',
       sunNav: [{
           title: 'Daftar Pinjaman Tersedia',
           url: '/task/list'
         },
        //  {
        //    title: 'Riwayat Pinjaman',
        //    url: '/task/history'
        //  }
       ]
     },
    //  {
    //    title: 'Laporan data',
    //    role: 'role_approve_admin',
    //    url: '/datareport',
    //    sunNav: [{
    //      title: 'Persetujuan data keseluruhan',
    //      url: '/datareport/approvedata'
    //    }]
    //  },
    {
      title: 'Daftar Pesanan',
      url: '/sing',
      role: 'role_approve_admin',
      sunNav: [
        {
          title: 'Semua Pesanan Gagal',
          url: '/sing/invalid'
        },
        {
          title: 'Tugas tanda tangan',
          url: '/sing/singInfo'
        },
        // {
        //   title: 'Tanda Tangan Pemberi Dana',
        //   url: '/sing/lenderOrder'
        // },
        {
          title: 'Tanda Tangan Penerima Dana',
          url: '/sing/borrowerOrder'
        },
        {
          title: 'Pesanan Pendanaan',
          url: '/sing/loanOrder'
        },

      ]
    },
    {
      title: 'Financial',
      url: '/financial',
      role: 'role_approve_admin',
      sunNav: [
        {
          title: 'Financial account',
          url: '/financial/account'
        },
        {
          title: 'Financial config',
          url: '/financial/config'
        },
     

      ]}
   ],
  userManagement: {
    editInfo: {
      editUserInfo: 'ubah informasi pemeriksa',
      viewUserInfo: 'lihat info pemeriksa',
      userName: 'nama',
      account: 'ID',
      email: 'email',
      phone: 'nomor hp',
      role: 'peran',
      state: 'status',
      createTime: 'waktu pembuatan',
      assignNumber: 'nomor ekstensi',
      assignPassword: 'kata sandi ekstensi',
      yes: 'iya',
      no: 'tidak',
      assignNumberRules: 'yakin akan menambahkan nomor ekstensi?'
    },
    serachBlock: {
      account: 'ID',
      userName: 'nama',
      phoneNum: 'nomor hp',
      ruler: 'peran',
      assignNumber: 'nomor ekstensi'
    }
  },
    home: {
     sisaDana: 'Sisa dana',
      waitingRepayNum: "Jumlah order pinjaman berjalan",
      waitingRepayAmount: 'Total dana pinjaman berjalan',
      totalDana: 'Total dana',
      kodeRdl: 'Kode VA',
      loanAmount: 'Sisa Dana',
      orderNumber: "Jumlah order pinjaman yang sedang berjalan",
      profit: 'Total Keuntungan',
      paycode: 'Kode Top Up',
      withdraw: 'Penarikan',
      recharge: 'Top Up',
      getCode: 'Dapatkan kode isi ulang',
      withdrawTitle: 'Konfirmasi Penarikan Dana',
      getVcode: 'dapatkan kode verifikasi',
      tableHader: {
        time: 'Waktu',
        type: 'Tipe',
        amount: 'Nominal(RP)',
        status: 'Status',
      },
      userInfo: {
        bankType: 'Bank',
        bankCode: 'No Akun',
        amount: ' Nominal(Rp)',
        vcode: 'Kode verifikasi',
        bankpeopleName: 'Nama Akun',
        okText: 'Konfirmasi Penarikan',
        submitSuccess: 'Pengajuan penarikan dana sedang diproses, menunggu verifikasi lanjut'
      },
    },
    loan: {
      search: {
        channelSource: 'asal mula user',
        orderNo: 'Kode pesanan',
        mobile: 'Nomor Akun',
        userId: 'UID',
        userName: 'Nama pengaju',
        productId: 'Produk pengajuan',
        orderStatus: 'Status pesanan',
        applicationAmount: 'Jumlah pengajuan (RP)',
        applicationTerm: 'Jangka waktu pengajuan',
        termUnit: 'Satuan jangka waktu',
        all: 'semua',
        timeType: 'Jenis waktu',
        time: 'Waktu mulai dan selesai',
        export: "Pesanan pinjaman ekspor",
        exportErr: "pilih waktu penampilan daftar",
      },
      tableHead: {
        orderNo: 'Kode pesanan',
        userName: 'Nama pengaju',
        productId: 'Produk pengajuan',
        applicationAmount: 'Jumlah pengajuan (RP)',
        applicationTerm: 'Jangka waktu pengajuan',
        createTime: 'Waktu pembuatan',
        applyTime: 'Waktu pengajuan',
        orderStatus: 'Status pesanan',
        operate: 'Pengoperasian',
          viewBtn: 'Lihat',
          confirmLoan: 'Konfirmasi pencairan dana',
            setFail: 'Diatur menjadi gagal',
            confirmLoanTip: 'Yakin ingin mencairkan dana untuk pesanan ini？',
            setFailTip: 'Pencairan dana gagal merupakan status final, tidak dapat dibatalkan, yakin ingin mengoperasikannya?'
      },
      loanInfo: {
        loanInfoTitle: 'Informasi pesanan',
        baseInfoTitle: 'Informasi umum nasabah',
        detailInfoTitle: 'Informasi lengkap nasabah',
        materialInfoTitle: 'Informasi data nasabah',
        businessInfo: 'Detail bisnis',
        businessPic: 'Informasi material komersial',
        contractInfoTitle: 'Informasi perjanjian',
        userName: 'Pengaju',
        orderNo: ' Kode pesanan',
        uid: 'UID',
        productId: 'Produk pengajuan',
        channel: 'Channel',
        loanNum: ' Frekuensi peminjaman',
        createTime: 'Waktu pembuatan',
        applyTime: 'Waktu pengajuan',
        applyNum: 'Jumlah pengajuan (RP)',
        applyTerm: 'Jangka waktu pengajuan',
        appName: 'Nama aplikasi',
        orderLog: 'Catatan riwayat pesanan',
        confirmTime: 'Waktu kirim',
        stayTime: 'Waktu jeda',
        status: 'Status pesanan',
        operator: 'Operator',
        remark: 'Keterangan',
        accrual: 'keuntungan',
      },
      approvInfo: {
        approvalTime: ' Waktu pemeriksaan',
        approver: 'Analis',
        approveType: 'Jenis pemeriksaan',
        conclusion: 'Hasil keputusan'
      },
      baseInfo: {
        uid: 'UID',
        userName: 'Nama pengguna',
        mobile: 'Nomor Akun',
        idcard: 'NIK',
        level: 'Level pengguna'
      },
      detailInfo: {
        personal: 'Informasi pribadi',
        userType: 'Jenis pengguna',
        education: 'Jenjang pendidikan',
        loanPurpose: 'Tujuan peminjaman',
        monthPay: 'Pendapatan bulanan',
        religion: 'Agama',
        birthday: 'Tanggal lahir',
        maritalStatus: 'Status perkawinan',
        sex: 'Jenis kelamin',
        area: 'Domisili saat ini',
        workType: 'Jenis pekerjaan',
        company: 'Nama perusahaan',
        emergs1Name: 'Nama kontak darurat 1',
        emergs1Phone: 'Nomor HP kontak darurat 1',
        emergs1Relation: 'Hubungan kontak darurat 1',
        emergs2Name: 'Nama kontak darurat 2',
        emergs2Phone: 'Nomor HP kontak darurat 2',
        emergs2Relation: 'Hubungan kontak darurat 2',
        deviceInfo: 'Informasi perangkat',
        gps: 'Informasi GPS',
        imei: 'imei',
        brand: 'Merk perangkat',
        model: 'Tipe perangkat',
        ocrInfo: 'Informasi penilaian kredit',
        passFacePhoto: 'Apakah lolos verifikasi wajah',
        samePerson: 'Apakah lolos perbandingan wajah',
        confidenceScore: 'Nilai perbandingan wajah',
        realnameStatus: 'Hasil verifikasi nama asli',
        ocrName: 'Nama OCR',
        ocrCardno: 'NIK OCR',
        ocrArea: 'Alamat OCR',
        ocrStatus: 'Hasil verifikasi OCR',
        checkAddress: 'Hasil perbandingan alamat OCR',
        business: 'Rincian komersial',
        businessName: "nama toko",
        businessIncome: 'Pendapatan bulanan',
        businessOwner: 'Kepemilikan komersial',
        businessCreateTime: 'Tanggal pendirian',
        businessType: 'Jenis bisnis',
        businessPhone: 'Nomor telepon perusahaan',
        businessAddress: 'Alamat bisnis',
      },
      materialInfo: {
        idcardFront: 'Halaman depan KTP',
        idcardBack: 'Halaman belakang KTP',
        idcardHeld: 'Foto memegang KTP',
        socialCard: 'Foto BPJS',
        creditCard: 'Foto kartu kredit',
        familyCard: 'Foto kartu keluarga',
        facePhotoList: 'Foto verifikasi wajah',
        devicePhoto: 'Foto etalase',
        frontPhoto: 'Foto muatan',
        stockPhoto: 'Foto stock',
      },
      contractInfo: {
        conractName: 'Perjanjian pinjaman'
      }
    },
  approvalTask: {
    serachBlock: {
      orderId: 'kode pesanan',
      loanType: 'jenis peminjam',
      approveStatus: 'status persetujuan',
      customerName: 'Nama',
      sourceChannel: 'asal mula user',
      orderAmount: 'jumlah Pendanaan',
      timeType: 'jenis waktu',
      orderNum: 'kode pesanan',
      followUpState: 'Hasil ',
      followStatus: 'status',
      city: 'kota',
      approver: 'pemeriksa',
      startTime: 'waktu mulai',
      endTime: 'waktu berakhir',
      timeRange: 'waktu',
      search: 'cari',
      export: 'tampilkan daftar pemeriksaan',
      exportSms: 'Ekspor catatan SMS',
      selectApproval: 'Pilih nama pemeriksa untuk mengganti',
      exportSuc: 'proses unduh telah selesai, silahkan buka unduhan saya untuk mengunduh data',
      exportErr: 'pilih waktu penampilan daftar',
      remain: 's',
      channel: 'Jalur masuk pesanan',
      productName: ' produk',
      seeMore: 'lihat lebih banyak',
      noMore: 'Tidak lagi',
    },
    offlineBloack: {
      tips: 'Anda sedang offline, silahkan klik tombol OK untuk online。',
      onlineBtn: 'online'
    },
    tableBlock: {
      orderId: 'kode pesanan',
      customerName: 'Nama',
      city: 'kota',
      orderAmount: 'jumlah Pendanaan',
      applyTime: 'waktu pengajuan',
      orderDistributionTime: 'waktu pembagian pesanan',
      followUpState: 'Hasil ',
      action: 'pengoperasian',
      orderStatus: 'status pesanan',
      approveTime: 'waktu pemeriksaan',
      checkOrder: 'periksa',
      changeOrder: 'ganti pesanan',
      contract: 'kontrak',
      viewcontract: 'lihat kontrak',
      view: 'lihat',
      approval: 'pemeriksaan',
      approver: 'pemeriksa',
      sourceChannel: "Sumber saluran",
      repaymentsNum: "Pinjaman ke-",
      noDataTip: 'sedang dikirim, silahkan mengklik tombol CARI untuk mendapatkan tugas',
      noFollowUser: 'sementara tidak ada pemeriksa',
      Sign: 'Tanda tangan elektronik',
    },
    approverModal: {
      curTip: 'pemeriksa saat ini：',
      changeTip: 'pemeriksa diganti menjadi：',
      approverTip: 'pilih pemeriksa yang ingin diganti',
      batch: 'Bagi Tugas',
      selectTask: 'Pilih tugas lebih dulu',
      changeSuccess: 'Berhasil mengganti pesanan',
      changeFail: 'Gagal mengganti pesanan',
      selectedNum: 'Pilih tugas lebih dulu'
    },
    downloadModal: {
      modalTitle: 'unduhan saya',
      time: 'hari & tanggal',
      title: 'judul',
      resultAmount: 'jumlah akhir',
      status: 'status',
      action: 'pengoperasian'
    },
    personCheck: {
      pass: "Loloskan",
      Refuse: "Tolak",
      cancel: "Batalkan",
      allSelect: "pilih semua",
      nowSelect: "terpilih",
      orderNum: "kode pesanan",
      allTotal: "total",
      imagesWhatch: "periksa gambar",
      batchChange: "modifikasi batch",
      noOrder: "tidak ada pesanan yang dipilih",
      allPass: "semua lolos",
      allRefuse: "semua ditolak",
      allCancel: "semua dibatalkan",
      success: "sukses",
      failed: "gagal",
      num: "angka",
      sure: "pasti",
      approve: "verifikasi",
      pleaseChooseOrder: "silahkan pilih pesanan",
      isAllCancel: "apakah semua pesanan telah dibatalkan",
      passOrder:'Perintah perubahan telah disetujui',
      passOrderLimit30: 'Anda hanya dapat memeriksa 30 pesanan paling banyak',
    },
  },
  login: {
    welcome: 'sistem pemeriksaan',
    accountPlaceholder: 'masukkan nomor akun',
    passwordlaceholder: 'masukkan kata sandi',
    vcodePlaceholder: 'masukkan kode verifikasi',
    buttonText: 'masuk'
  },
  reset: {
    welcome: 'sistem pemeriksaan',
    passwordPlaceholder: 'masukkan kata sandi baru',
    oldPasswordPlaceholder: 'masukkan kata sandi lama',
    confirmPasswordPlaceholder: 'masukkan kembali kata sandi baru',
    buttonText: 'OK'
  },
  approvalDetail: {
    baseInfo: {
      title: 'data pemeriksaan',
      orderTitle: 'informasi pesanan',
      uid: 'UID',
      name: 'nama',
      gender: 'jenis kelamin',
      mobile: 'Nomor Telepon',
      birthday: 'Tanggal lahir',
      idcard: 'NIK KTP',
      ocrName: 'OCR Nama',
      ocrCardNo: 'OCR NIK',
      faceThan: 'Perbandingan wajah',
      ocrArea: 'OCR Alamat',
      ocrResult: 'OCR Hasil verifikasi',
      homeAddress: 'domisili',
      maritalStatus: 'status perkawinan',
      religion: 'agama',
      userType: 'status pekerjaan',
      jobType: 'jenis pekerjaan',
      companyName: 'nama perusahaan',
      companyPhone: 'Telefon',
      salary: 'pendapatan bulanan',
      bankName: 'nama bank',
      contactRelation: 'hubungan dengan kontak',
      contactName: 'nama kontak',
      contactMobile: 'telepon kontak',
      contractPerson: 'kontak',
      relationship: 'hubungan',
      associatedOrder: 'pesanan yang berhubungan',
      bankCardID: 'nomor kartu bank',
      error: 'PERINGATAN',
      errorMsg: 'Kode daerah dalam OCR NIK KTP dan OCR Alamat tidak sesuai',
       businessUid: "UID",
        businessName: "nama toko",
          businessIncome: 'Pendapatan bulanan',
          businessOwner: 'Kepemilikan komersial',
          businessCreateTime: 'Tanggal pendirian',
          businessType: 'Jenis bisnis',
          businessPhone: 'Nomor telepon perusahaan',
          businessAddress: 'Alamat bisnis',
      contactInfo: {
        title: 'Edit kontak darurat',
        name: 'Nama',
        relation: 'hubungan',
        phone: 'Nomor ponsel',
        update: 'Baru',
        delete: 'Hapus',
        cancel: 'Batal',
        rulephone: 'Harap masukkan nomor telepon yang benar dengan 10 - 13 digit',
        ruleName: 'Nama tidak boleh lebih dari 30 karakter',
      },
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
      applyTerm: 'Tenor Produk (hari)',
      applyAmount: 'jumlah pengajuan',
      accountAmount: 'jumlah yang diterima',
      oneTimeFee: 'biaya administrasi',
      creditScore: 'Nilai kredit',
      repayAmount: 'jumlah pengembalian',
      repayTime: 'waktu pembayaran',
      loanUse: 'tujuan peminjaman',
      approveType: 'jenis pemeriksaan',
      loanNum: 'Jumlah pinjaman'
    },
    callRecord: {
      callPhoneNumber:"Nomor telepon",
      callPhoneName:"Nama",
      callDuration:"Durasi",
      callType:"Jenis panggilan",
      callTime:"Waktu",
      callTypeIncomingCall:"Panggilan masuk",
      callTypeOutgoing:"Keluar",
      callTypeMissed:"Tidak terjawab",
      callTypeVoiceMail:"Pesan suara",
      callTypeRejected:"Tolak",
      callTypeBlocked:"Blokir",
      callTypeUnknown:"Tidak dikenal",
    },
    contactRecord: {
      contactsRecentContactTime:"Waktu kontak terbaru",
      contactsCommonContact:"Apakah ini kontak biasa",
      contactsNumber:"Jumlah kontak",
      contactDisplayName:"Nama tampilan kontak",
      contactNot:"Tidak",
      contactYes:"Ya",
    },
    smsRecord: {
      smsType:"Jenis SMS",
      smsTypeReceive:"penerimaan",
      smsTypeSend:"Kirim",
      smsContent:"Konten SMS",
      smsAddress:"Alamat",
      smsDate:"Tanggal",
      smsSentDate:"Tanggal pengiriman",
      smsSender:"Pengirim",
      noSms: 'Tidak ada data untuk diekspor'
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
      approvalFollowUpStatus: 'Hasil ',
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
      commit: 'kirim',
      insuranceTitle: 'membeli asuransi',
    },
    msgList: {
      changeOrder: 'pesanan ini telah diganti',
      warning: 'peringatan',
      examine: 'menyetujui keputusan pemeriksaan',
      followStatus: 'pilih Hasil ',
      reason: 'pilih alasan penolakan',
      submitSuccess: 'terkirim',
      saveSuccess: 'tersimpan',
      hasMobile: 'masukkan nomor panggilan yang benar',
      dialSuccess: 'menunggu panggilan..',
      hungUpSuccess: 'panggilan berakhir',
      submitResultConfirm: 'keputusan yang telah dikumpul tidak dapat diubah, yakin akan mengirim？'
    },
    result: {
      conclusion: [
        {label: 'lulus', id: 1},
        {label: 'tolak', id: 2},
        {label: 'Batalkan Pinjaman', id: 3}
      ],
      lenderConclusion: [{
        label: 'lulus',
        id: 1
      }, {
        label: 'tolak',
        id: 2
      }, ],
      insuranceTitle: 'membeli asuransi',
      isInsurance: 'Ya',
      unInsurance: 'Tidak',
      rejectReson: [
        {
          title: 'termasuk kelompok "beresiko tinggi"',
          value: [
            {label: 'tidak ada penghasilan tetap', id: 1},
            {label: 'pinjaman beresiko tinggi', id: 2},
            {label: 'dugaan penipuan', id: 17},
            {label: 'foto dari layar lain', id: 18},
            {label: 'Pemalsuan KTP', id: '19'},
            {label: 'KTP rusak', id: '20'},
            {label: 'Foto blur', id: '21'},
            {label: 'KTP kadaluarsa', id: '22'}
          ]
        },
        {
          title: 'data tidak sesuai',
          value: [
            {label: 'dokumen tidak berlaku', id: 3},
            {label: 'pas foto tidak sesuai dengan pemilik', id: 4},
            {label: 'informasi pekerjaan saat riwayat telepon tidak sesuai dengan informasi yang diberikan', id: 5},
            {label: 'informasi kontak saat riwayat telepon tidak sesuai dengan informasi yang diberikan', id: 6},
            {label: 'informasi keluarga saat riwayat telepon tidak sesuai dengan informasi yang diberikan', id: 7},
            {label: 'informasi pendapatan saat riwayat telepon berbeda jauh dengan informasi yang diberikan', id: 8}
          ]
        },
        {
          title: 'riwayat telepon tidak tersedia',
          value: [
            {label: 'peminjam tidak dapat dihubungi', id: 9},
            {label: 'keluarga/teman tidak dapat dihubungi', id: 10},
            {label: 'peminjam tidak bekerja sama saat panggilan', id: 11},
            {label: 'keluarga/teman tidak bekerja sama saat panggilan', id: 12}
          ]
        },
        {
          title: 'pemeriksa menyerah',
          value: [
            {label: 'peminjam menolak', id: 13},
            {label: 'keluarga/teman menolak', id: 14}
          ]
        },
        {
          title: 'lainnya',
          value: [
            {label: 'informasi pemeriksa salah', id: 15},
            {label: 'lainnya', id: 16}
          ]
        }
      ]
    },
    dataReport: {
      loverallData: {
        searchBlock: {
          phone: 'Nomor ponsel',
          name: 'Nama yang disetujui',
          date: 'waktu'
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
        }
      }
    }
  },
  sing:{
    orderNo:'jumlah order',
    userName:'nama pelanggan',
    cityName:'Kota',
    loanAmount:'jumlah pesanan',
    createTime:'waktu aplikasi',
    signStatusDesc:'Status tanda tangan',
    goSing:'tanda tangan',
    insuranceDesc:'Status asuransi',
    isinsuranceDesc:'asuransi yang dibeli',
    uninsuranceDesc:'tidak diasuransikan',
    isSing:'Tanda tangan konfirmasi',
    WordPad:'WordPad',
    Insurance:'Pertanggungan',
    unInsurance:'batalkan asuransi',
    batchInsurance:'kelompok Pertanggungan',
    batchSing:'Tanda tangan massal',
    choose:'Tolong pilih',
    chooseIsSing:"{num} pesanan telah dipilih, apakah akan masuk secara berkelompok?",
    isInsurance:'Konfirmasi pembelian asuransi?',
    isunInsurance:'Batalkan asuransi?',
    toubao:'Beli asuransi',
    quxiao:'Batalkan asuransi',
    waitInsurance:'Asuransi lainnya',
    successInsurance:'Sukses asuransi',
    cancelInsurance:'Pembatalan Asuransi',
  },
}

export default enId
