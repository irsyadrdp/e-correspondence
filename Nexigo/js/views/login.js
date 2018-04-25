xg.widget({
    text: '&copy; e-Correspondence 2018',
    views: [{
        type: 'panel',
        cols: 4,
        offset: 5,
        text: 'Silahkan Login',
        fields: [
            {
                name: 'email',
                text: 'Email',
                type: 'email',
                required: true,
                cols: 12
            },
            {
                name: 'password',
                text: 'Password',
                type: 'password',
                required: true,
                cols: 12
            },
            {
                type: 'buttons',
                buttons: [
                    {
                        name: 'login',
                        text: 'Login',
                        icon: 'fa fa-sign-in',
                        cssClass: 'xg-btn-info',
                        action: 'login'
                    }
                ]
            }
        ]
    }],

    functions: {
        init: function (xg, cb) {
            cb();
            //cek log in
            let role = $.cookie("role");
            console.log("asdasdasd ...", role);

            if (role === undefined) {
                $('.KOTAKMASUK').addClass('hide');
                $('.SURATMASUK').addClass('hide');
                $('.LOGOUT').addClass('hide');
                
                $('.SK_Konseptor').addClass('hide');
                $('.M_Konseptor').addClass('hide');
                $('.SK_Reviewer').addClass('hide');
                $('.M_Reviewer').addClass('hide');
                $('.SK_Approver').addClass('hide');
                $('.M_Approver').addClass('hide');
            }
        },

        login: function () {
            var ser = xg.serialize();

            //data harus lengkap
            if (ser.email == "" || ser.password == "") {
                alert("Silahkan isi username dan password");
                return;
            }

            //serialize data
            var data = {
                Email: ser.email,
                Password: ser.password
            };

            xg.ajax({
                url: 'http://localhost:31602/api/User/Login',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log("Sukses data ", data.data[0]);


                    document.cookie = "id_user=" +data.data[0].IdUser;
                    document.cookie = "nama_user=" +data.data[0].NamaUser;
                    document.cookie = "email_user=" +data.data[0].EmailUser;
                    document.cookie = "token_user=" +data.data[0].Token;
                    document.cookie = "role=" +data.data[0].Role;
                },
                complete: function () {
                    console.log("Complete");
                    
                    //cek role 
                    let role = $.cookie("role");
                    if (role === "Konseptor") {
                        $('.KOTAKMASUK').removeClass('hide');
                        $('.SURATMASUK').removeClass('hide');
                        $('.LOGOUT').removeClass('hide');

                        $('.SK_Konseptor').removeClass('hide');
                        $('.M_Konseptor').removeClass('hide');

                        $('.SK_Reviewer').addClass('hide');
                        $('.M_Reviewer').addClass('hide');
                        $('.SK_Approver').addClass('hide');
                        $('.M_Approver').addClass('hide');
                    }
                    else if (role === "Reviewer") {
                        $('.KOTAKMASUK').removeClass('hide');
                        $('.LOGOUT').removeClass('hide');

                        $('.SK_Reviewer').removeClass('hide');
                        $('.M_Reviewer').removeClass('hide');

                        $('.SK_Konseptor').addClass('hide');
                        $('.M_Konseptor').addClass('hide');
                        $('.SK_Approver').addClass('hide');
                        $('.M_Approver').addClass('hide');
                    }
                    else if (role === "Approver") {
                        $('.KOTAKMASUK').removeClass('hide');
                        $('.LOGOUT').removeClass('hide');

                        $('.SK_Approver').removeClass('hide');
                        $('.M_Approver').removeClass('hide');

                        $('.SK_Konseptor').addClass('hide');
                        $('.M_Konseptor').addClass('hide');
                        $('.SK_Reviewer').addClass('hide');
                        $('.M_Reviewer').addClass('hide');
                    }

                    xg.navigate('home');
                }
            });

        },

        funcName: function () {
            
        }
    }
});