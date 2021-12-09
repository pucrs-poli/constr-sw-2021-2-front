export default class Matricula {
    constructor(id, semester = '', classId = '', course = '') {
        this.id = id;
        this.semester = semester;
        this.classId = classId;
        this.course = course;
    }
}
