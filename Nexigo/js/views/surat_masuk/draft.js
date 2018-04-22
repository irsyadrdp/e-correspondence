xg.widget({
    text: '&copy; e-Correspondence 2018',
    views: [{
        fields: [
            {
                type: 'panel',
                text: 'Data Draft Surat Masuk',
                offset: 1,
                cols: 12,
                fields: [
                    {
                        type: 'grid',
                        text: 'Table',
                        name: 'gridDraft',
                        options: {
                            sortable: false,
                            editable: false,
                            filterable: true,
                            pageable: true,
                            selectable: 'single',
                        },
                        url: 'http://localhost:31602/api/SuratMasuk/ReadAllDraft',
                        fields: [
                            {
                                name: 'Id_Surat_Masuk',
                                text: 'Id',
                                type: 'text',
                                hide: 'true',
                            },
                            {
                                name: 'Tanggal',
                                text: 'Waktu',
                                type: 'text',
                            },
                            {
                                name: 'Nomor_Surat',
                                text: 'Nomor Surat',
                                type: 'text',
                            },
                            {
                                name: 'Perihal',
                                text: 'Perihal',
                                type: 'text',
                            },
                            {
                                name: 'Pengirim',
                                text: 'Pengirim',
                                type: 'text',
                            },
                            {
                                name: 'IdPenerima',
                                text: 'Id Penerima',
                                type: 'text',
                                hide: 'true',
                            },
                            {
                                name: 'Penerima',
                                text: 'Penerima',
                                type: 'text',
                            },
                            {
                                name: 'Edit',
                                text: 'Edit Surat',
                                template: '<button onclick="xg.call(\'edit\', #:Id_Surat_Masuk#)">Edit</button>',
                            },
                            {
                                name: 'Hapus',
                                text: 'Hapus Surat',
                                template: '<button onclick="xg.call(\'delete\', #:Id_Surat_Masuk#)">Hapus</button>',
                            },
                        ],
                    }
                ]
            },

        ]
    }],

    functions: {
        init: function (xg, cb) {
            cb();

            //cek log in
            let role = $.cookie("role");
            console.log("asdasdasd ...", role);

            if (role === undefined) {
                console.log("Silahkan log in terlebih dahulu");
                xg.navigate('login');
            }
            else console.log("Anda sudah login");
        },

        delete: function (Id) {
            xg.ajax({
                url: 'http://localhost:31602/api/SuratMasuk/Delete?Id=' + Id,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                },
                complete: function () {
                    console.log("complete");
                    xg.grid.refresh('gridDraft');
                    alert("Data berhasil dihapus");
                }
            });
        },

        edit: function (Id) {
            document.cookie = "temp_id=" + Id;
            xg.navigate('surat_masuk/edit_surat_masuk');
        },

        funcName: function () {

        }
    }
});