import axios from 'axios';

const baseURL = "http://3.145.8.22/api/"
const roomsEndPoint = "rooms/";
const buildingEndPoint = "buildings/"

const api = axios.create({
    baseURL
});

export const getAllRooms = async () => {
    let result;
    await api.get(roomsEndPoint).then((response) => {
        result = response
    }).catch((err) => { console.error("something bad happened :("); })
    return result;
}

export const deleteRoomById = async (id) => {
    let result;
    await api.delete(`${roomsEndPoint}/${id}`)
        .then((res) => result = res)
        .catch((err) => console.log("something bad happened :("));
    return result;
}

export const createRoom = async (roomInfo) => {
    let result;
    const buildingId = roomInfo.classBuilding;
    const objRoom = {
        name: roomInfo.name,
        capacity: Number(roomInfo.capacity)
    }
    await api.post(`${buildingEndPoint}${buildingId}/rooms`, objRoom).then((res) => { result = res }
    )
    return result;
}

export const updateRoom = async (roomInfo) => {
    let result;
    const objRoom = {
        name: roomInfo.name,
        capacity: roomInfo.capacity
    }
    const id = roomInfo.id
    await api.put(`${roomsEndPoint}${id}`, objRoom)
        .then((res) => result = res)
        .catch((err) => console.log("something bad happened :("));

    return result;
}