var dataStatusPenerima = [
    {
        value: 'T0',
        text: 'T0',
    },
    { value: 'T1', text: 'T1', },
    { value: 'T2', text: 'T2', },
    { value: 'T3', text: 'T3', },
    { value: 'T4', text: 'T4', },
    { value: 'T5', text: 'T5', },
    { value: 'T6', text: 'T6', },
    { value: 'T7', text: 'T7', },
    { value: 'T8', text: 'T8', },
    { value: 'T9', text: 'T9', },
];

var dataKodeSimpan = [
    {
        value: 'S0',
        text: 'S0',
    },
    { value: 'S1', text: 'S1', },
    { value: 'S2', text: 'S2', },
    { value: 'S3', text: 'S3', },
    { value: 'S4', text: 'S4', },
    { value: 'S5', text: 'S5', },
    { value: 'S6', text: 'S6', },
    { value: 'S7', text: 'S7', },
    { value: 'S8', text: 'S8', },
    { value: 'S9', text: 'S9', },
];

var dataPenerima = [];

xg.widget({
    text: '&copy; e-Correspondence 2018',
    views: [{
        type: 'panel',
        text: 'Edit Surat Masuk',
        name: 'formulirSuratMasuk',
        inline: true,
        collapsible: false,
        cols: 6,
        offset: 3,
        fields: [
            {
                name: 'id_surat_masuk',
                cols: 7,
                hide: true
            },

            {
                type: 'fieldRow',
                fields: [
                    {
                        name: 'tempat',
                        text: 'Tempat',
                        cols: 7,
                        required: true
                    },
                    {
                        type: 'picker',
                        cols: 5,
                        name: 'tanggal',
                        placeholder: 'Pilih tanggal..',
                        text: 'Tanggal',
                        min: moment().subtract(7, 'days'),
                        required: true
                    }
                ]
            },

            {
                name: 'nomor',
                text: 'Nomor',
                cols: 7,
                required: true
            },

            {
                name: 'pengirim',
                text: 'Dari',
                //cols: 12,
                required: true
            },

            {
                name: 'penerima',
                text: 'Penerima',
                type: 'select',
                cols: 7,
                required: true,
                placeholder: 'Pilih Penerima',
                onChange: 'isiKodeOrganisasi',
                data: 'http://localhost:31602/api/User/GetPenerima'
            },

            {
                name: 'status_penerima',
                text: 'Status Penerima',
                type: 'select',
                cols: 4,
                required: true,
                placeholder: 'Status Penerima',
                data: dataStatusPenerima
            },

            {
                name: 'kode_simpan',
                text: 'Kode Simpan',
                type: 'select',
                placeholder: 'Kode Simpan',
                cols: 4,
                required: true,
                data: dataKodeSimpan
            },

            {
                name: 'kode_bagian_organisasi',
                text: 'Kode Bagian Organisasi',
                disabled: true,
                cols: 7,
                required: true
            },

            {
                name: 'perihal',
                text: 'Perihal',
                type: 'textarea',
                maxLength: 200,
                placeholder: 'isi perihal',
                cols: 7,
                required: true
            },

            {
                type: 'radio',
                name: 'prioritas',
                text: 'Prioritas',
                display: 'inline',
                required: true,
                data: [
                    { value: 'segera', text: 'Segera', },
                    { value: 'biasa', text: 'Biasa', }
                ]
            },

            {
                type: 'radio',
                name: 'klasifikasi_surat',
                text: 'Klasifikasi Surat',
                display: 'inline',
                required: true,
                data: [
                    { value: 'rahasia', text: 'Rahasia', },
                    { value: 'biasa', text: 'Biasa', }
                ]
            },

            {
                type: 'picker',
                cols: 5,
                placeholder: 'Pilih retensi..',
                name: 'retensi',
                text: 'Masa Retensi',
                min: moment().subtract(7, 'days'),
                required: true
            },

            {
                type: 'fieldRow',
                inline: true,
                fields: [
                    {
                        text: 'Surat',
                        type: 'text',
                        cols: 2,
                        disabled: true
                    },
                    {
                        type: 'upload',
                        name: 'fileSurat',
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
                        filter: ["jpg", "png", "pdf", "doc", "docx"],
                        filterMessage: 'Hanya dokumen dengan tipe PDF, DOC, DOCX, JPG dan PNG yang dapat diunggah'
                    },
                ]
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
                            xg.call('update', 'Draft');
                        },
                        cssClass: 'xg-btn-danger',
                        //style: 'font-size:16px',
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
                            xg.call('update', 'Finish');
                        },
                        icon: 'fa-send',
                        cssClass: 'xg-btn-info',
                        //style: 'font-size:16px',
                        cols: 2,
                        inline: false,
                    },
                ]
            }
        ]
    }],

    functions: {
        init: function (xg, cb) {
            cb();

            //cek log in
            let role = $.cookie("role");
            let nama_user = $.cookie("nama_user");
            console.log("asdasdasd ...", role);

            if (role === undefined) {
                console.log("Silahkan log in terlebih dahulu");
                xg.navigate("login");
            }
            else console.log("Anda sudah login");

            
            //fetch draft data by Id
            let Id = $.cookie("temp_id");
            xg.ajax({
                url: 'http://localhost:31602/api/SuratMasuk/ReadDraftById?Id=' + Id,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    console.log("Success... ", data);
                    //alert(data[0].IdSuratMasuk);

                    let poptanggal = data[0].Tanggal.substr(0, 10);
                    let popretensi = data[0].MasaRetensi.substr(0, 10);
                    xg.populate({
                        id_surat_masuk: data[0].IdSuratMasuk,
                        tempat: data[0].Tempat,
                        nomor: data[0].Nomor,
                        pengirim: data[0].Pengirim,
                        penerima: data[0].Penerima,
                        status_penerima: data[0].StatusPenerima,
                        kode_simpan: data[0].KodeSimpan,
                        kode_bagian_organisasi: data[0].KodeBagianOrganisasi,
                        perihal: data[0].Perihal,
                        fileSurat: data[0].AlamatFile,
                        fileLampiran: data[0].AlamatFileLampiran,
                        tanggal: poptanggal,
                        retensi: popretensi,
                        prioritas: data[0].Prioritas,
                        klasifikasi_surat: data[0].KlasifikasiSurat,
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
                IdSuratMasuk: ser.id_surat_masuk,
                Tempat: ser.tempat,
                Tanggal: ser.tanggal,
                Nomor: ser.nomor,
                Pengirim: ser.pengirim,
                Penerima: ser.penerima,
                StatusPenerima: ser.status_penerima,
                KodeSimpan: ser.kode_simpan,
                KodeBagianOrganisasi: parseInt(ser.kode_bagian_organisasi),
                Perihal: ser.perihal,
                Prioritas: ser.prioritas,
                KlasifikasiSurat: ser.klasifikasi_surat,
                MasaRetensi: ser.retensi,
                AlamatFile: ser.fileSurat[0].name,
                AlamatFileLampiran: ser.fileLampiran[0].name,
                Status: status,
            }
            console.log(data);
            xg.ajax({
                url: 'http://localhost:31602/api/SuratMasuk/Update',
                method: 'POST',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    console.log("Success... ", result);

                    if (status === "Draft") alert("Data surat masuk berhasil disimpan di Draft.")
                    else if (status === "Finish") alert("Data surat masuk telah dikirim.")

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
            var userId = xg.serialize().penerima;
            userId = parseInt(userId);

            xg.ajax({
                url: 'http://localhost:31602/api/User/getDivisi?Id=' + userId,
                method: 'POST',
                contentType: "application/text; charset=utf-8",
                success: function (result) {
                    console.log("Success... ");
                    console.log(result);
                    $('[name="kode_bagian_organisasi"]').val(result);
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
})





