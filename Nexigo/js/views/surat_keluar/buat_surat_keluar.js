var dataBahasa = [
    {
        value: 'indonesia',
        text: 'Indonesia',
    },
    {
        value: 'english',
        text: 'English',
    }
];

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
        text: 'Biasa',
    },
    {
        value: 'biasa',
        text: 'Biasa',
    }
];

var dataTempat = [
    {
        value: 'Bandung',
        text: 'Bandung',
    },
    {
        value: 'Jakarta',
        text: 'Jakarta',
    },
    {
        value: 'Surabaya',
        text: 'Surabaya',
    },
    {
        value: 'Padang',
        text: 'Padang',
    },
];

var dataDari = [
    {
        value: 'Fikri',
        text: 'Fikri',
    },
    {
        value: 'Firda',
        text: 'Firda',
    },
    {
        value: 'Irsyad',
        text: 'Irsyad',
    }
];

var dataTembusan = [
    {
        value: 'Fikri',
        text: 'Fikri',
    },
    {
        value: 'Firda',
        text: 'Firda',
    },
    {
        value: 'Irsyad',
        text: 'Irsyad',
    }
];

var dataReviewer= [
    {
        value: 'Fikri',
        text: 'Fikri',
    },
    {
        value: 'Firda',
        text: 'Firda',
    },
    {
        value: 'Irsyad',
        text: 'Irsyad',
    }
];

var dataDirektorat = [
    {
        value: 'IT',
        text: 'IT',
    },
    {
        value: 'Keuangan',
        text: 'Keuangan',
    },
    {
        value: 'CEO',
        text: 'CEO',
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

var dataBulan = [
    { value: '1', text: '1', },
    { value: '2', text: '2', },
    { value: '3', text: '3', },
    { value: '4', text: '4', },
    { value: '5', text: '5', },
    { value: '6', text: '6', },
    { value: '7', text: '7', },
    { value: '8', text: '8', },
    { value: '9', text: '9', },
    { value: '10', text: '10', },
    { value: '11', text: '11', },
    { value: '12', text: '12', },
];

xg.widget({
    text: 'Surat Keluar',
    views: [{
        type: 'panel',
        text: 'Formulir Surat Keluar',
        name: 'formulirSuratKeluar',
        inline: true,
        collapsible: false,
        cols: 6,
        offset: 3,
        fields: [
            {
                name: 'bahasa',
                text: 'Bahasa yang digunakan',
                type: 'radio',
                //style: 'margin-bottom:40px;',
                display: 'inline',
                data: dataBahasa
            },
            {
                type: 'fieldRow',
                fields: [
                    {
                        name: 'tempat',
                        text: 'Tempat, Tanggal*',
                        type: 'select',
                        cols: 9,
                        required: true,
                        placeholder: 'Pilih tempat',
                        data: dataTempat,
                    },
                    {
                        name: 'tanggal',
                        type: 'picker',
                        cols: 3,
                        format: 'DD MMMM YYYY',
                        required: true,
                    }
                ]
            },
            {
                name: 'nomor',
                text: 'Nomor',
                type: 'text',
                cols: 9,
                disabled: true
            },
            {
                name: 'dari',
                text: 'Dari*',
                type: 'select',
                cols: 9,
                required: true,
                placeholder: 'Pilih pengirim',
                data: dataDari,
            },
            {
                name: 'direktorat',
                text: 'Direktorat*',
                type: 'select',
                cols: 9,
                required: true,
                placeholder: 'Pilih direktorat',
                data: dataDirektorat,
            },
            {
                name: 'tujuan',
                text: 'Kepada',
                type: 'textarea',
                maxLength: 30,
                placeholder: 'jabatan, nama, alamat kantor',
                cols: 12,
            },
            {
                name: 'kodeSimpan',
                text: 'Kode Simpan*',
                type: 'select',
                cols: 6,
                required: true,
                placeholder: 'Pilih kode simpan',
                data: dataKodeSimpan,
            },
            {
                name: 'kbo',
                text: 'Kode Bagian Organisasi',
                type: 'text',
                cols: 9,
                disabled: true
            },
            {
                name: 'perihal',
                text: 'Perihal*',
                type: 'text',
                cols: 12,
            },
            {
                name: 'prioritas',
                text: 'Prioritas',
                type: 'radio',
                display: 'inline',
                data: dataPrioritas
            },
            {
                name: 'klasifikasiSurat',
                text: 'Klasifikasi Surat',
                type: 'radio',
                display: 'inline',
                data: dataKlasifikasi
            },
            {
                type: 'fieldRow',
                fields: [
                    {
                        name: 'tahunRetensi',
                        text: 'Masa Retensi*',
                        type: 'numeric',
                        cols: 5,
                        placeholder: 'lama tahun',
                        required: true,
                    },
                    {
                        name: 'bulanRetensi',
                        type: 'select',
                        cols: 4,
                        required: true,
                        placeholder: 'Lama bulan',
                        data: dataBulan,
                    },
                ]
            },
            {
                type: 'autoComplete',
                text: 'Tembusan',
                name: 'tembusan',
                multiple: true,
                persist: true,
                cols: 9,
                data: dataTembusan,
                placeholder: 'Pilih tembusan',
            },
            {
                name: 'isiSurat',
                text: 'Isi Surat',
                type: 'textarea',
                icon: '	fa fa-envelope-o',
                maxLength: 30,
                cols: 12,
            },
            {
                type: 'fieldRow',
                fields: [
                    {
                        name: 'jumlahLampiran',
                        text: 'Lampiran',
                        type: 'text',
                        cols: 8,
                        disabled: true
                    },
                    {
                        type: 'upload',
                        name: 'uploader1',
                        icon: 'fa-upload',
                        cols: 4,
                        filter: ["jpg", "png", "pdf", "doc", "docx"],
                        filterMessage: 'Hanya dokumen dengan tipe PDF, DOC, DOCX, JPG dan PNG yang dapat diunggah',
                        data: { url: 'api/file/uploadeds' }
                        //uploadUrl: 'http://localhost:53390/api/material/attachment/upload'
                    },      
                ]
            },
                    
            {
                type: 'autoComplete',
                text: 'Reviewer',
                name: 'reviewer',
                multiple: true,
                persist: true,
                cols: 9,
                data: dataReviewer,
                placeholder: 'Pilih reviewer',
            },
        ]
            
        
    }],

    functions: {
        init: function (xg, cb) {
            cb()
        },
        
        funcName: function () {
            
        }
    }
});