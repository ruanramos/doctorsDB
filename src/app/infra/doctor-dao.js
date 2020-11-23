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
                    console.log(`Saved successfuly doctor ${doctor.name}`);
                    resolve();
                }
            )
        });
    }

    searchDoctor(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * FROM Doctors WHERE id = ?`,
                [parseInt(id)],
                (error, result) => {
                    if (error) {
                        console.log(error);
                        return reject('Doctor not found');
                    }
                    console.log(`Here it is, doctor ${result}`);
                    return resolve(result);
                });
        });
    }

    deleteDoctorByID(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM Doctors WHERE id = ?`,
            [id],
            (error) => {
                if(error) {
                    console.log(error);
                    return reject('Doctor ID not found');
                }
                console.log(`Doctor Deleted successfuly`);
                resolve();
            }
            );
        });
    }
}

module.exports = DoctorDAO;