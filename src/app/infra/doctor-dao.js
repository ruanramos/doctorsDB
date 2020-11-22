class DoctorDAO {
    constructor(db) {
        this._db = db;
    }

    listDoctors() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM Doctors',
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return reject('Could not get doctors');
                    }
                    return resolve(results)
                }
            );
        });
    }

    saveDoctor(doctor) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO Doctors (name) values (?)`,
                [doctor.name],
                (error) => {
                    if (error) {
                        console.log(error);
                        return reject('Could not get doctors');
                    }
                    resolve();
                }
            )
        });
    }

    searchDoctor(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            SELECT * FROM Doctors WHERE id = ?`,
                [id],
                (error) => {
                    if (error, result) {
                        console.log(error);
                        return reject('Doctor not found');
                    }
                    return resolve(result);
                });
        });
    }


}

module.exports = DoctorDAO;