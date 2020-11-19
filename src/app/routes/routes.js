const DoctorDAO = require('../infra/doctor-dao');
const db = require('../../config/database');


module.exports = (app) => {
    app.get("/", (request, response) => {
        response.send(
            `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Home!</h1>
                </body>
            </html>
            `
        )
    });

    app.get("/user", (request, response) => {
        response.send(
            `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Users</h1>
                </body>
            </html>
            `
        )
    });

    app.get("/doctors", (request, response) => {
        new DoctorDAO(db).listDoctors()
            .then(
                (results) => {
                    response.marko(
                        require('../views/doctors/list/list.marko'),
                        {
                            doctors: results
                        }
                    );
                })
            .catch(error => console.log(error));
    });

    app.get("/doctors/form", (request, response) => {
        response.marko(require('../views/doctors/form/form.marko'))
    });

    app.post("/doctors", (request, response) => {
        const doctor = request.body;
        console.log(doctor);
        new DoctorDAO(db).saveDoctor(doctor)
            .then(response.redirect('/doctors'))
            .catch(error => console.log(error));
    });

};