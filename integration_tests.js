var f = require('./my_function');
const maxTime = 60
const numberOfMasseus = 1
const allTheMissions = {5:[{"x":3, "y":4, "start":20, "length": 10}]}

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

const calculate_distance = (position, destination) => {
    power = Math.pow((destination.x-position.x), 2) + Math.pow((destination.y - position.y), 2)
    distance = Math.sqrt(power)

    return distance
    }

const calculate_new_position = (position, destination) => {

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

const isMissionsWorked = (mission, time) => {
    if (mission.start <= time && mission.end <= time) {
        return true
    } else{
        return false
    } 
}

const addTurnsToMission = (mission) => {
    turns = (mission.end - mission.start) / 5
    mission.turns = turns
    mission.pointsToVictory = turns
    return mission
}

function simulation(maxTime, numberOfMasseus, allTheMissions){
    let masseusTeam = masseusTeamGenerator(numberOfMasseus)
    let time = 0
    let counter = 0
    let points = 0
    let missions = []

    do {
        console.log(masseusTeam)
        if (allTheMissions[time]){
            missionForThisRoundUnedited = allTheMissions[time]
            missionForThisRound = missionForThisRoundUnedited.map(addTurnsToMission)
            missions.push(missionForThisRound)
            
        } else {
            missionForThisRound = []
        }
        
        instructionsForMasseus = f.attributeMissions(missionForThisRound)
        masseurTeamUpdated = masseusTeam.map(updateMasseusLocation)

        // missionsBeingWorked = missions.filter()
        time += 5

        masseusTeam = masseurTeamUpdated

    } while (time < maxTime);

    return points
}


simulation(maxTime, numberOfMasseus, allTheMissions)
