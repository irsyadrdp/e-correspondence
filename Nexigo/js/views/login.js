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
        },

        login: function () {
            var ser = xg.serialize();
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
                    console.log("Sukses");
                    document.cookie = "id_user=" +data.data[0].IdUser;
                    document.cookie = "nama_user=" +data.data[0].NamaUser;
                    document.cookie = "email_user=" +data.data[0].EmailUser;
                    document.cookie = "token_user=" +data.data[0].Token;
                    document.cookie = "role=" +data.data[0].Role;
                },
                complete: function () {
                    console.log("Complete");
                    xg.navigate('home');
                }
            });
           
        },

        funcName: function () {
            
        }
    }
});