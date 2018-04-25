var dataPrioritas= [
    {
        value: 'segera',
        text: 'Segera',
    },
    {
        value: 'biasa',
        text: 'Biasa',
    }
];

var dataKlasifikasi = [
    {
        value: 'rahasia',
        text: 'Rahasia',
    },
    {
        value: 'biasa',
        text: 'Biasa',
    }
];

var dataKodeSimpan = [
    {
        value: 'S1',
        text: 'S1'
    },
    {
        value: 'S2',
        text: 'S2'
    },
    {
        value: 'S3',
        text: 'S3'
    },
    {
        value: 'S4',
        text: 'S4'
    },
    {
        value: 'S5',
        text: 'S5'
    },
    {
        value: 'S6',
        text: 'S6'
    },
    {
        value: 'S7',
        text: 'S7'
    },
    {
        value: 'S8',
        text: 'S8'
    },
    {
        value: 'S9',
        text: 'S9'
    },
];

var dataUser;
//get penerima, pengirim, tembusan data
xg.ajax({
    url: 'http://localhost:31602/api/User/GetPenerima',
    async: false,
    method: 'POST',
    contentType: "application/text; charset=utf-8",
    success: function (result) {
        console.log("Success... ");
        dataUser = result;
    },
    error: function (err) {
        console.log(err);
    },
    complete: function () {
        console.log("Complete");
    }
});

var dataReviewer;
//get reviewer data
xg.ajax({
    url: 'http://localhost:31602/api/User/ReadAllByRole?role=Reviewer',
    async: false,
    method: 'POST',
    contentType: "application/text; charset=utf-8",
    success: function (result) {
        console.log("Success... ");
        dataReviewer = result;
    },
    error: function (err) {
        console.log(err);
    },
    complete: function () {
        console.log("Complete");
    }
});

xg.widget({
    text: '&copy; e-Correspondence 2018',
    views: [{
        type: 'panel',
        text: 'Formulir Surat Keluar',
        name: 'formulirSuratKeluar',
        inline: true,
        collapsible: false,
        cols: 6,
        offset: 4,
        fields: [
            {
                name: 'bahasa',
                text: 'Bahasa yang digunakan',
                type: 'radio',
                required: true,
                //style: 'margin-bottom:40px;',
                display: 'inline',
                data: [
                    {text: 'English', value: 'English' },
                    {text: 'Indonesia', value: 'Indonesia' }
                ] 
            },

            {
                type: 'fieldRow',
                fields: [
                    {
                        name: 'tempat',
                        text: 'Tempat',
                        cols: 7,
                        required: true,
                    },
                    {
                        type: 'picker',
                        cols: 5,
                        placeholder: 'Pilih tanggal..',
                        name: 'tanggal',
                        text: 'Tanggal',
                        min: moment(),
                        sideBySide: true,
                        disabledTimeIntervals: [moment({ h: 7 }), moment({ h: 17 })],
                        //format: 'YYYYMMDD HH:mm',
                        required: true
                    }
                ]
            },

            {
                name: 'nomor',
                text: 'Nomor',
                type: 'text',
                cols: 7,
                required: true,
            },

            {
                name: 'pengirim',
                text: 'Dari',
                type: 'select',
                cols: 7,
                required: true,
                placeholder: 'Pilih pengirim',
                onChange: 'isiKodeOrganisasi',
                data: dataUser,
            },

            {
                name: 'direktorat',
                text: 'Direktorat',
                cols: 7,
                required: true,
                disabled: true,
            },

            {
                name: 'penerima',
                text: 'Kepada',
                type: 'textarea',
                maxLength: 30,
                placeholder: 'jabatan, nama, alamat kantor',
                cols: 7,
                required: true,
            },

            {
                name: 'kode_simpan',
                text: 'Kode Simpan',
                type: 'select',
                cols: 4,
                required: true,
                placeholder: 'Kode Simpan',
                data: dataKodeSimpan,
            },

            {
                name: 'kode_bagian_organisasi',
                text: 'Kode Bagian Organisasi',
                type: 'text',
                cols: 7,
                required: true,
                hide: true
            }, {
                name: 'kode_divisi',
                text: 'Kode Bagian Organisasi',
                type: 'text',
                cols: 7,
                required: true,
                disabled: true
            },

            {
                name: 'perihal',
                text: 'Perihal',
                type: 'textarea',
                required: true,
                cols: 7,
            },

            {
                name: 'prioritas',
                text: 'Prioritas',
                type: 'radio',
                display: 'inline',
                required: true,
                data: dataPrioritas
            },

            {
                name: 'klasifikasi_surat',
                text: 'Klasifikasi Surat',
                type: 'radio',
                display: 'inline',
                required: true,
                data: dataKlasifikasi
            },

            {
                type: 'picker',
                cols: 5,
                placeholder: 'Pilih tanggal..',
                name: 'retensi',
                text: 'Masa Retensi',
                min: moment(),
                sideBySide: true,
                disabledTimeIntervals: [moment({ h: 7 }), moment({ h: 17 })],
                //format: 'YYYY-MM-DD HH:mm',
                required: true
            },

            {
                type: 'select',
                text: 'Tembusan',
                name: 'tembusan',
                cols: 7,
                required: true,
                data: dataUser,
                placeholder: 'Pilih tembusan',
            },

            {
                name: 'isi_surat',
                text: 'Isi Surat',
                type: 'textarea',
                required: true,
                icon: '	fa fa-envelope-o',
                maxLength: 30,
                cols: 12,
            },

            {
                type: 'fieldRow',
                inline: true,
                fields: [
                    {
                        text: 'Lampiran',
                        type: 'text',
                        cols: 2,
                        disabled: true
                    },
                    {
                        type: 'upload',
                        name: 'fileLampiran',
                        icon: 'fa-plus',
                        text: 'Tambah File',
                        cssClass: 'xg-btn-basic',
                        cols: 6,
                        required: true,
                        filter: ["jpg", "png", "pdf", "doc", "docx"],
                        filterMessage: 'Hanya dokumen dengan tipe PDF, DOC, DOCX, JPG dan PNG yang dapat diunggah'
                    },
                ]
            },
                    
            {
                type: 'select',
                text: 'Reviewer',
                name: 'reviewer',
                cols: 7,
                required: true,
                data: dataReviewer,
                placeholder: 'Pilih reviewer',
            },

            {
                type: 'fieldRow',
                name: 'button_aksi',
                fields: [
                    {
                        name: 'draft',
                        text: 'Simpan ke Draft',
                        type: 'button',
                        action: function () {
                            var data = xg.serialize();
                            var emptyData = 0;
                            data = $.map(data, function (value, index) {
                                return [value];
                            });
                            for (var i = 0; i < data.length; i++) {
                                if (data[i] === "" || data[i] === null || data[i].length === 0) {
                                    alert("Form data harus diisi dengan lengkap");
                                    emptyData++;
                                    return;
                                }
                            }
                            xg.call('insert', 'Draft');
                        },
                        cssClass: 'xg-btn-danger',
                        cols: 2,
                        //offset: 11,
                        inline: false,
                        offset: 8,
                    },
                    {
                        name: 'kirim',
                        text: 'KIRIM',
                        type: 'button',
                        action: function () {
                            var data = xg.serialize();
                            var emptyData = 0;
                            data = $.map(data, function (value, index) {
                                return [value];
                            });
                            for (var i = 0; i < data.length; i++) {
                                if (data[i] === "" || data[i] === null || data[i].length === 0) {
                                    alert("Form data harus diisi dengan lengkap");
                                    emptyData++;
                                    return;
                                }
                            }
                            xg.call('insert', 'Pending');
                        },
                        icon: 'fa-send',
                        cssClass: 'xg-btn-info',
                        cols: 2,
                        inline: false,
                    },
                ]
            },

            {
                type: 'fieldRow',
                fields: [
                    {
                        type: 'content',
                        content: [
                            "<br/><br/><br/>",
                        ]
                    },
                ]
            },


        ]
    }],

    functions: {
        init: function (xg, cb) {
            cb()

            //cek log in
            let role = $.cookie("role");
            let nama_user = $.cookie("nama_user");
            console.log("asdasdasd ...", role);

            if (role === undefined) {
                console.log("Silahkan log in terlebih dahulu");
                xg.navigate("login");
            }
            else console.log("Anda sudah login");
        },

        insert: function (status) {
            var ser = xg.serialize();
            var data = {
                Bahasa: ser.bahasa,
                Tempat: ser.tempat,
                Tanggal: ser.tanggal,
                Nomor: ser.nomor,
                Pengirim: ser.pengirim,
                Direktorat: ser.direktorat,
                Penerima: ser.penerima,
                KodeSimpan: ser.kode_simpan,
                KodeBagianOrganisasi: parseInt(ser.kode_bagian_organisasi),
                Perihal: ser.perihal,
                Prioritas: ser.prioritas,
                KlasifikasiSurat: ser.klasifikasi_surat,
                MasaRetensi: ser.retensi,
                Tembusan: ser.tembusan,
                IsiSurat: ser.isi_surat,
                AlamatFileLampiran: ser.fileLampiran[0].name,
                Reviewer: ser.reviewer,
                Approver: "",
                Status: status,
            }
                console.log(data)
    
            xg.ajax({
                url: 'http://localhost:31602/api/SuratKeluar/Insert',
                method: 'POST',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    console.log("Success... ", result);

                    if (status === "Draft") alert("Data surat keluar berhasil disimpan di Draft.")
                    else if (status === "Pending") alert("Data surat keluar telah dikirim ke Reviewer.")

                    xg.navigate('home');
                },
                error: function (err) {
                    console.log("Error dude... ", err);
                },
                complete: function () {
                    console.log("Complete... ");
                }
            });

        },

        isiKodeOrganisasi: function () {
            var userId = xg.serialize().pengirim;
            userId = parseInt(userId);
            console.log("INI ID USERNYA ZXZXCZXCXZC ", userId);

            xg.ajax({
                url: 'http://localhost:31602/api/User/getDivisi?Id=' + userId,
                method: 'POST',
                contentType: "application/text; charset=utf-8",
                success: function (result) {
                    console.log("Success... ");
                    console.log(result);
                    $('[name="kode_bagian_organisasi"]').val(result.IdDivisi);
                    $('[name="kode_divisi"]').val(result.KodeDivisi);
                    $('[name="direktorat"]').val(result.NamaDirektorat);
                },
                error: function (err) {
                    console.log(err);
                },
                complete: function () {
                    console.log("Complete");
                }
            });

        },

        funcName: function () {
            
        }
    }
});