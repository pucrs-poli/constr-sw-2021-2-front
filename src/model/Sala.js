export default class Room {
    constructor(id, name = '', classBuilding = '', capacity = '', displayName = '') {
        this.id = id;
        this.name = name;
        this.classBuilding = classBuilding;
        this.capacity = capacity;
        this.displayName = displayName;
    }
} 