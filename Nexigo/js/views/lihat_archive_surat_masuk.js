﻿nexigo.widget('[data-name="content"]', {
    text: '&copy; e-Correspondence 2018',
    views: [{
        fields: [
            {
                type: 'panel',
                offset: 5,
                cols: 4,
                text: '<div style="text-align: left; font-weight: normal;">Archive Surat : <b><span id="nomor_surat1"></span></b></div> ',
                fields: [
                    {
                        type: 'content',
                        content: [
                            "<br/>",
                            "Id Surat : <b><span id='id_surat'></span></b><br/>",
                            "Tanggal : <b><span id='tanggal'></span></b><br/>",
                            "Tempat : <b><span id='tempat'></span></b><br/>",
                            "Nomor Surat : <b><span id='nomor_surat2'></span></b><br/>",
                            "Pengirim : <b><span id='pengirim'></span></b><br/>",
                            "Penerima : <b><span id='id_penerima'></span></b><br/>",
                            "Status Penerima : <b><span id='status_penerima'></span></b><br/>",
                            "Kode Simpan : <b><span id='kode_simpan'></span></b><br/>",
                            "Kode Bagian Organisasi : <b><span id='kode_bagian_organisasi'></span></b><br/>",
                            "Perihal : <b><span id='perihal'></span></b><br/>",
                            "Prioritas : <b><span id='prioritas'></span></b><br/>",
                            "Klasifikasi Surat : <b><span id='klasifikasi'></span></b><br/>",
                            "Masa Retensi : <b><span id='retensi'></span></b><br/>",
                            "File Surat: <b><span id='file_surat'></span></b><br/>",
                            "Lampiran : <b><span id='file_lampiran'></span></b><br/>",
                        ]
                    },
                ]
            },
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
                url: 'http://localhost:31602/api/SuratMasuk/ReadDataById?Id=' + Id,
                type: 'POST',
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    console.log("Success... ", data);

                    let poptanggal = data.data.Tanggal.substr(0, 10);
                    let popretensi = data.data.MasaRetensi.substr(0, 10);

                    //populate data
                    $('#nomor_surat1').html(data.data.Nomor);
                    $('#id_surat').html(data.data.IdSuratMasuk);
                    $('#tanggal').html(poptanggal);
                    $('#tempat').html(data.data.Tempat);
                    $('#nomor_surat2').html(data.data.Nomor);
                    $('#pengirim').html(data.data.Pengirim);
                    $('#id_penerima').html(data.nama_penerima);
                    $('#status_penerima').html(data.data.StatusPenerima);
                    $('#kode_simpan').html(data.data.KodeSimpan);
                    $('#kode_bagian_organisasi').html(data.kode_divisi);
                    $('#perihal').html(data.data.Perihal);
                    $('#prioritas').html(data.data.Prioritas);
                    $('#klasifikasi').html(data.data.KlasifikasiSurat);
                    $('#retensi').html(popretensi);
                    $('#file_surat').html(data.data.AlamatFile);
                    $('#file_lampiran').html(data.data.AlamatFileLampiran);
                    
                },
                error: function (err) {
                    console.log(err);
                },
                complete: function () {
                    console.log("Complete... ");
                }
            });

            delete temp_id
            $.removeCookie('temp_id', { path: '/' });
        },

    }
})