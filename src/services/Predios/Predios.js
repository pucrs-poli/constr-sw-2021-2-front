import axios from 'axios';

const baseURL = "http://3.145.8.22/api/"
const roomsEndPoint = "rooms/";
const buildingEndPoint = "buildings/"

const api = axios.create({
    baseURL
});

export const getAllBuilding = async () => {
    let result;
    await api.get(buildingEndPoint).then((response) => {
        result = response
    }).catch((err) => { console.error("something bad happened :("); })
    return result;
}

export const deleteBuildingById = async (id) => {
    let result;
    await api.delete(`${buildingEndPoint}${id}`)
        .then((res) => result = res)
        .catch((err) => console.log("something bad happened :("));
    return result;
}

export const createBuilding = async (buildingInfo) => {
    let result;
    const objBuild = {
        name: buildingInfo.name,
        localition: buildingInfo.location
    }
    await api.post(`${buildingEndPoint}`, objBuild).then((res) => { result = res }
    )
    return result;
}

export const updateBuilding = async (buildingInfo) => {
    let result;
    const objBuilding = {
        name: buildingInfo.name,
        location: buildingInfo.location
    }
    const id = buildingInfo.id
    await api.put(`${buildingEndPoint}${id}`, objBuilding)
        .then((res) => result = res)
        .catch((err) => console.log("something bad happened :("));

    return result;




}

export const getRoomByBuilding = async (buildName) => {

    let result;
    await api.get(`${roomsEndPoint}?buildingName=${buildName}`).then((response) => {
        result = response
    }).catch((err) => { console.error("something bad happened :("); })
    return result;

}