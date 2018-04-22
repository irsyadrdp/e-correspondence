nexigo.widget('[data-name="content"]', {
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
                            "Id Penerima : <b><span id='id_penerima'></span></b><br/>",
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
                    //alert(data[0].IdSuratMasuk);

                    let poptanggal = data[0].Tanggal.substr(0, 10);
                    let popretensi = data[0].MasaRetensi.substr(0, 10);

                    //populate data
                    $('#nomor_surat1').html(data[0].Nomor);
                    $('#id_surat').html(data[0].IdSuratMasuk);
                    $('#tanggal').html(poptanggal);
                    $('#tempat').html(data[0].Tempat);
                    $('#nomor_surat2').html(data[0].Nomor);
                    $('#pengirim').html(data[0].Pengirim);
                    $('#id_penerima').html(data[0].Penerima);
                    $('#status_penerima').html(data[0].StatusPenerima);
                    $('#kode_simpan').html(data[0].KodeSimpan);
                    $('#kode_bagian_organisasi').html(data[0].KodeBagianOrganisasi);
                    $('#perihal').html(data[0].Perihal);
                    $('#prioritas').html(data[0].Prioritas);
                    $('#klasifikasi').html(data[0].KlasifikasiSurat);
                    $('#retensi').html(popretensi);
                    $('#file_surat').html(data[0].AlamatFile);
                    $('#file_lampiran').html(data[0].AlamatFileLampiran);
                    
                },
                error: function (err) {
                    console.log(err);
                },
                complete: function () {
                    console.log("Complete... ");
                }
            });

            //delete temp_id
            //$.removeCookie('temp_id', { path: '/' });
        },

    }
})