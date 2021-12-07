export class ClassesService {
    constructor() {
        this.BASE_URL = "http://localhost:8000/aula";
    }

    async getAllClasses() {
        const response = await fetch(`${this.BASE_URL}/all`);
        const objResponse = await response.json();
        return objResponse.data;
    }
}