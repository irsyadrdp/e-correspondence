var dataPrioritas = [
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
        text: 'Biasa',
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

var dataApprover;
//get approver data
xg.ajax({
    url: 'http://localhost:31602/api/User/ReadAllByRole?role=Approver',
    async: false,
    method: 'POST',
    contentType: "application/text; charset=utf-8",
    success: function (result) {
        console.log("Success... ");
        dataApprover = result;
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
        text: 'Review Surat Keluar',
        name: 'formulirSuratKeluar',
        inline: true,
        collapsible: false,
        cols: 6,
        offset: 4,
        fields: [
            {
                name: 'id_surat_keluar',
                cols: 7,
                hide: true
            },

            {
                name: 'bahasa',
                text: 'Bahasa yang digunakan',
                type: 'radio',
                required: true,
                //style: 'margin-bottom:40px;',
                display: 'inline',
                data: [
                    { text: 'English', value: 'English' },
                    { text: 'Indonesia', value: 'Indonesia' }
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
                data: dataUser,
                onChange: 'isiKodeOrganisasi',
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
                disabled: true,
                cols: 7,
                hide: true
            },

            {
                name: 'kode_divisi',
                text: 'Kode Bagian Organisasi',
                disabled: true,
                cols: 7,
                required: true
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
                placeholder: 'Pilih tembusan',
                data: dataUser
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
                placeholder: 'Pilih reviewer',
                data: dataReviewer,
                hide: true,
            },

            {
                type: 'select',
                text: 'Approver',
                name: 'approver',
                cols: 7,
                required: true,
                placeholder: 'Pilih approver',
                data: dataApprover,
            },

            {
                type: 'fieldRow',
                name: 'button_aksi',
                fields: [
                    {
                        name: 'draft',
                        text: 'Revisi Kembali',
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
                            xg.call('update', 'Revised');
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
                            xg.call('update', 'Reviewed');
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

            //fetch surat keluar data by Id
            let Id = $.cookie("temp_id");
            xg.ajax({
                url: 'http://localhost:31602/api/SuratKeluar/ReadDataById?Id=' + Id,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    console.log("Success... ", data);

                    let poptanggal = data.data.Tanggal.substr(0, 10);
                    let popretensi = data.data.MasaRetensi.substr(0, 10);
                    xg.populate({
                        id_surat_keluar: data.data.IdSuratKeluar,
                        bahasa: data.data.Bahasa,
                        tempat: data.data.Tempat,
                        nomor: data.data.Nomor,
                        pengirim: data.data.Pengirim,
                        direktorat: data.data.Direktorat,
                        penerima: data.data.Penerima,
                        kode_simpan: data.data.KodeSimpan,
                        kode_bagian_organisasi: data.data.KodeBagianOrganisasi,
                        kode_divisi: data.kode_divisi,
                        perihal: data.data.Perihal,
                        isi_surat: data.data.IsiSurat,
                        fileLampiran: data.data.AlamatFileLampiran,
                        tanggal: poptanggal,
                        retensi: popretensi,
                        prioritas: data.data.Prioritas,
                        klasifikasi_surat: data.data.KlasifikasiSurat,
                        tembusan: data.data.Tembusan,
                        reviewer: data.data.Reviewer,
                    });
                },
                error: function (err) {
                    console.log(err);
                },
                complete: function () {
                    console.log("Complete... ");
                }
            });

            //delete temp_id
            $.removeCookie('temp_id', { path: '/' });
        },

        update: function (status) {
            var ser = xg.serialize();
            var data = {
                IdSuratKeluar: ser.id_surat_keluar,
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
                Approver: ser.approver,
                Status: status,
            }
            //console.log(data);
            xg.ajax({
                url: 'http://localhost:31602/api/SuratKeluar/Update',
                method: 'POST',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    console.log("Success... ", result);

                    if (status === "Revised") alert("Data surat keluar berhasil dikirim kembali ke Konseptor.")
                    else if (status === "Reviewed") alert("Data surat keluar telah dikirim ke Approver.")

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