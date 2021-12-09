export default class Resource {
    constructor(id, name = '', description = '' , resourceType = 'Computadores') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.resourceType = resourceType;
    }
}