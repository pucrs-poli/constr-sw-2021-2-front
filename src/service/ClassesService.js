export default class ClassesService {
    constructor() {
        this.BASE_URL = "http://localhost:8000/aula";
    }

    async getAllClasses() {
        const response = await fetch(`${this.BASE_URL}/all`);
        const objResponse = await response.json();
        return objResponse.data;
    }

    async getClassByDisciplina(disciplina) {
        const response = await fetch(`${this.BASE_URL}?disciplina=${disciplina}`);
        const objResponse = await response.json();
        return objResponse.data;
    }

    createClass(objClass) {
        return new Promise((resolve, reject) => {
            fetch(`${this.BASE_URL}`, { method: 'POST', body: objClass })
                .then(async (res) => {
                    const json = await res.json();
                    console.log(json.data);
                    resolve(json.data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    editClass(objClass) {
        return new Promise((resolve, reject) => {
            fetch(`${this.BASE_URL}/${objClass.id}`, { method: 'PUT', body: objClass })
                .then(async (res) => {
                    const json = await res.json();
                    console.log(json.data);
                    resolve(json.data);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    deleteClassById(id) {
        return new Promise((resolve, reject) => {
            fetch(`${this.BASE_URL}/${id}`, { method: 'DELETE' })
                .then(async (res) => {
                    const json = await res.json();
                    console.log(json);
                    resolve(id);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}