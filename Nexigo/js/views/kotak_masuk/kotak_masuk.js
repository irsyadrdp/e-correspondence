xg.widget({
    text: '&copy; e-Correspondence 2018',
    views: [{
        fields: [
            {
                type: 'panel',
                name: 'panelKotakMasuk',
                text: 'Data Surat Masuk',
                offset: 1,
                cols: 12,
                fields: [
                    {
                        type: 'grid',
                        text: 'Table',
                        name: 'gridInbox',
                        options: {
                            sortable: false,
                            editable: false,
                            filterable: true,
                            pageable: true,
                            selectable: '',
                        },
                        url: 'http://localhost:31602/api/CRUD/ReadAll',
                        fields: [
                            {
                                name: 'IdSuratMasuk',
                                text: 'Id',
                                type: 'text',
                                hide: 'true',
                            },
                            {
                                name: 'IdUser',
                                text: 'Id',
                                type: 'text',
                                hide: 'true',
                            },
                            {
                                name: 'Pengirim',
                                text: 'Pengirim',
                                type: 'text',
                            },
                            {
                                name: 'Perihal',
                                text: 'Perihal',
                                type: 'text',
                            },
                            {
                                name: 'Tipe',
                                text: 'Tipe',
                                type: 'text',
                            },
                            {
                                name: 'WaktuMasuk',
                                text: 'Waktu',
                                type: 'text',
                            },
                            {
                                name: 'AlamatFile',
                                text: 'File',
                                type: 'text',
                            },
                            {
                                name: 'Lihat',
                                text: 'Lihat Surat',
                                //template: '<button onclick="xg.call(\'lihat\', #:AlamatFile#)">Lihat</button>',
                                template: '<a href="#:AlamatFile#" target="_blank">Lihat</a>',
                            },
                            {
                                name: 'Hapus',
                                text: 'Hapus Surat',
                                template: '<button onclick="xg.call(\'delete\', #:IdSuratMasuk#)">Hapus</button>',
                            },
                            //{
                            //    //type: 'button',
                            //    name: 'Hapus',
                            //    type: 'button',
                            //    text: 'Hapus Surat',
                            //    stretch: true,
                            //    action: deleteConfirm
                            //}
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

        deleteConfirm: function (Id) {
            xg.message({
                text: 'Close me please!',
                buttons: [{
                    text: 'Close!',
                    cssClass: 'xg-btn-danger'
                }, {
                    text: 'Ok',
                    type: 'button',
                    cssClass: 'xg-btn-success',
                    action: 'delete'
                }]
            });
        },

        delete: function (Id) {
            xg.ajax({
                url: 'http://localhost:31602/api/CRUD/DeleteData?Id=' + Id,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                },
                complete: function () {
                    console.log("complete");
                    xg.grid.refresh('gridInbox');
                    alert("Data berhasil dihapus");
                }
            });
        },

        funcName: function () {
            
        }
    }
});