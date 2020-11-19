class DoctorDAO {
    constructor(db) {
        this._db = db;
    }

    listDoctors() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM Doctors',
                (error, results) => {
                    if (error) return reject('Could not get doctors');
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
}

module.exports = DoctorDAO;