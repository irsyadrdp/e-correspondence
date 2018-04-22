nexigo.widget({
    text: 'BIODATA',
    toolbars: [

    ],
    views: [
        {
            name: 'panel1',
            text: 'CRUD Biodata',
            inline: true,
            fields: [
                { name: 'Username', text: 'Usename', cols: 5, required: true,},
                { name: 'Firstname', text: 'Firstname', cols: 5, required: true, },
                { name: 'Lastname', text: 'Lastname', cols: 5, required: true, },
                { name: 'Password', text: 'Password', cols: 5, required: true, },
                {
                    type: 'buttons',
                    buttons: [
                        { name: 'save', text: 'Create', icon: 'fa-save', cssClass: 'xg-btn-info', action: 'save' },
                        { name: 'update', text: 'Update', icon: 'fa-save', cssClass: 'xg-btn-success', action: 'update' },
                        { name: 'delete', text: 'Delete', icon: 'fa-save', cssClass: 'xg-btn-danger', action: 'delete' },
                        { name: 'cancle', text: 'Cancel', icon: 'fa-undo', cssClass: 'xg-btn-warning' },
                    ]
                },
            ]
        },
        {
            type: 'panel',
            text: 'List Biodata',
            fields: [
                {
                    type: 'grid',
                    text: 'Table',
                    name: 'gridCustomer',
                    onDblClick: 'doubleClick',
                    options: {
                        sortable: false,
                        editable: false,
                        filterable: true,
                        pageable: true,
                        selectable: 'single',
                    },
                    fields: [
                        {
                            name: 'Id',
                            text: 'Id',
                            type: 'text',
                        },
                        {
                            name: 'Username',
                            text: 'Username',
                            type: 'text',
                        },
                        {
                            name: 'Firstname',
                            text: 'Firstname',
                            type: 'text',
                        },
                        {
                            name: 'Lastname',
                            text: 'Lastname',
                            type: 'text',
                        },
                        {
                            name: 'Password',
                            text: 'Password',
                            type: 'password',
                        }
                    ],
                    url: 'http://localhost:31602/api/CRUD/ReadAll',
                    data: [
                        {
                            Name: 'Alfa',
                            Address: 'Jalan-jalan'
                        },
                        {
                            Name: 'Indo',
                            Address: 'Kuda-kuda'
                        }
                    ]
                }
            ]
        },
    ],
    functions: {

        doubleClick: function (row) {
            xg.loading.show();
            console.log(row);
            xg.populate(row);
            var data = xg.serialize();
            window.ProcessID = row.ProcessID;
            xg.loading.hide();
        },

        save: function () {
            var req = xg.serialize();
            xg.ajax({
                url: 'http://localhost:31602/api/CRUD/Create',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    xg.loading.show();
                    console.log(data);
                    xg.loading.hide();
                },
                complete: function () {
                    console.log("complete");
                }
            });
        },

        update: function () {
            var req = xg.serialize();
            xg.ajax({
                url: 'http://localhost:31602/api/CRUD/UpdateData',
                type: 'POST',
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log(data);
                },
                complete: function () {
                    console.log("complete");
                }
            });
        },
        delete: function () {
            var req = xg.serialize();
            var Username = req.Username;
            xg.ajax({
                url: 'http://localhost:31602/api/CRUD/DeleteData?Username=' + Username,
                type: 'POST',
                //data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    alert("sukses");
                    console.log(data);
                },
                complete: function () {
                    console.log("complete");
                }
            });
        },
        cancle: function () {
            xg.populate();
        },

        init: function (xg, callback) {
            //alert('test');

            //xg.ajax({
            //    url: 'http://localhost:31602/api/employee/EmployeeList',
            //    data: {},
            //    type: 'POST',
            //    //dataType: 'json',
            //    contentType: "application/json; charset=utf-8",
            //    success: function (data) {
            //        console.log(data);
            //    },
            //    complete: function () {
            //        console.log("complete");
            //    }
            //});
            $('[xg-field="save"]').hide();
            callback();
        }
    }
});