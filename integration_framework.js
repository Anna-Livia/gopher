var f = require('./my_function');


class Masseus{
    constructor(){
        this.id = 0
        this.position = {x: 0, y: 0},
        this.destination = {x: 0, y: 0}
    }
  }

const masseusTeamGenerator = (numberOfMasseus) => {
    masseusTeam = []
    for (let i = 0; i < numberOfMasseus; i++){
        let m = new Masseus
        m.id = i + 1
        masseusTeam.push(m)
    }
    return masseusTeam
}

const calculate_new_position = (position, destination) => {
    const calculate_distance = (position, destination) => {
        let power = Math.pow((destination.x-position.x), 2) + Math.pow((destination.y - position.y), 2)
        let distance = Math.sqrt(power)

        return distance
        }
    let distance = calculate_distance(position, destination)
    const distance_in_5_minutes = 15.0 / 60.0 * 5.0
    let new_position = {}
    if (distance < distance_in_5_minutes){
        return destination
    }
    // theoreme de thales

    new_position['x'] = position.x + (distance_in_5_minutes / distance * (destination.x - position.x))
    new_position['y'] = position.y + (distance_in_5_minutes/ distance * (destination.y - position.y))
    return new_position
}

const updateMasseusLocation = (masseus) => {
    newPosition = calculate_new_position(masseus.position, masseus.destination)
    masseus.position = newPosition
    return masseus
}

const isMissionWorked = (mission, time) => {
    MissionEnd = mission.start + mission.length
    if (mission.start <= time && MissionEnd >= time) {
        return true
    } else{
        return false
    }
}


function simulation(maxTime, numberOfMasseus, allTheMissions){
    let masseusTeam = masseusTeamGenerator(numberOfMasseus)
    let time = 0
    let points = 0
    let missions = []

    do {

        if (allTheMissions[time]){
            missionForThisRound = allTheMissions[time]
            missions = missions.concat(missionForThisRound)
        } else {
            missionForThisRound = []
        }

        instructionsForMasseus = f.attributeMissions(missionForThisRound)

        for ( let i = 0; i < masseusTeam.length; i++){
            if (instructionsForMasseus[i+1]){
                masseusTeam[i].destination = instructionsForMasseus[i+1]
            }
        }

        masseusTeamPositionUpdated = masseusTeam.map(updateMasseusLocation)

        for (let missionIndex = 0; missionIndex < missions.length ; missionIndex ++) {
            let mission = missions[missionIndex]
            if (isMissionWorked(mission, time)){
                masseusOnThatMission = masseusTeam.filter(masseus => {
                    if((masseus.position.x == mission.x) && (masseus.position.y == mission.y)){
                        return true
                    } else {
                        return false
                    }
                })

                if (masseusOnThatMission.length > 0){
                    if (typeof(mission.turns) == 'undefined'){
                        mission.turns = mission.length / 5
                    }

                    if (mission.turns > 0){
                        mission.turns -= 1
                        if (mission.turns == 0){
                            points += 1
                        }
                    }
            }
        }
        }


        time += 5

        masseusTeam = masseusTeamPositionUpdated

    } while (time < maxTime);
    f.clean()
    return points
}


exports.simulation = simulation
