xg.widget({
    text: '&copy; e-Correspondence 2018',
    views: [{
        fields: [
            {
                type: 'panel',
                text: 'Data Pending Memorandum',
                offset: 1,
                cols: 12,
                fields: [
                    {
                        type: 'grid',
                        text: 'Table',
                        name: 'gridMemorandum',
                        options: {
                            sortable: false,
                            editable: false,
                            filterable: true,
                            pageable: true,
                        },
                        url: 'http://localhost:31602/api/Memorandum/ReadAllByStatus?Status=Pending',
                        fields: [
                            {
                                name: 'Id_Memorandum',
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
                                name: 'IdPengirim',
                                text: 'Id Pengirim',
                                type: 'text',
                                hide: 'true',
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
                                name: 'IdReviewer',
                                text: 'Id Reviewer',
                                type: 'text',
                                hide: 'true',
                            },
                            {
                                name: 'Reviewer',
                                text: 'Reviewer',
                                type: 'text',
                            },
                            {
                                name: 'IdTembusan',
                                text: 'Id Tembusan',
                                type: 'text',
                                hide: 'true',
                            },
                            {
                                name: 'Tembusan',
                                text: 'Tembusan',
                                type: 'text',
                            },
                            {
                                name: 'Lihat',
                                text: 'Lihat',
                                template: '<button onclick="xg.call(\'lihat\', #:Id_Memorandum#)">Lihat</button>',
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

        lihat: function (Id) {
            document.cookie = "temp_id=" + Id;
            xg.navigate('lihat_memorandum');
        },

        funcName: function () {

        }
    }
});