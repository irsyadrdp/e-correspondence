xg.widget({
    text: 'Logout',
    views: [{
        fields: [
            
        ]
    }],

    functions: {
        init: function (xg, cb) {
            cb()
            $.removeCookie('id_user', { path: '/' });
            $.removeCookie('nama_user', { path: '/' });
            $.removeCookie('email_user', { path: '/' });
            $.removeCookie('role', { path: '/' });
            $.removeCookie('token_user', { path: '/' });
            xg.navigate("login");
        },
    }
});