nexigo.widget('[data-name="content"]', {
    text: '&copy; e-Correspondence 2018',
    views: [{
        fields: [
            {
                type: 'panel',
                offset: 1,
                cols: 12,
                text: '<div style="text-align: right; font-weight: normal;">Anda login sebagai: <b><span id="welcome_text"></span></b></div> ',
                fields: [
                    {
                        type: 'content',
                        content: [
                            "<br/><div style='text-align: center;'><h3><b>Selamat datang di aplikasi E-Correspondence</b></h3></div><br/><br/><br/>",
                            "<div style='text-align: center;'><h5><b>E-Correspondence</b> adalah aplikasi korespondensi elektronik <br/> yang bertujuan untuk membuat, mereview, disposisi, serta melakukan approval <br/> terhadap berbagai surat.</h5></div><br/><br/><br/><br/>",
                            "<div style='text-align: center;'><img src='assets/img/fitur.jpg'></div>",
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


            $('#welcome_text').html(nama_user);
        },

    }
})