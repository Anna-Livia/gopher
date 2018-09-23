let mission_backlog = []

const teamSize = 50

class TeamMember {
    constructor(){
        this.name = 0
        this.position = {x: 0, y: 0},
        this.destination = null,
        this.occupe = false
    }
  }

const teamGenerator = (numberOfTeammates) => {
    team = []
    for (let i = 0; i < numberOfTeammates; i++){
        let m = new TeamMember
        m.name = i + 1
        team.push(m)
    }
    return team
}

let staff = teamGenerator(teamSize)

let rounds = 0

function roundsToDestination(masseus, mission){
    const distance = Math.sqrt(Math.pow(mission.x - masseus.position.x, 2) + Math.pow(mission.y - masseus.position.y, 2))
    const speed = 15 / 60
    const time = distance / speed
    return Math.ceil(time/5)
}

function roundsToCompleteMission(mission){
    const roundsToStart = Math.ceil(mission.start/5) - rounds
    const roundsOfMission = Math.ceil(mission.length/5)
    return roundsToStart + roundsOfMission
}

function masseusUpdate(masseus){
    if (masseus.occupe > 1){
            masseus.occupe -= 1
        } else if (masseus.occupe == 1){
            masseus.occupe = false
            masseus.position = masseus.destination
            masseus.destination = null
        }
    return masseus
}

function makeComparer(masseus) {
  return function(a, b) {
    const roundsToStart_a = Math.ceil(a.start/5) - rounds
    const roundsToStart_b = Math.ceil(b.start/5) - rounds

        if (a.status && typeof(b.status)!= undefined) {
            return 1
        }
        if (roundsToDestination(masseus, a) + roundsToStart_a < roundsToDestination(masseus, b) + roundsToStart_b)
         return -1;
      if (roundsToDestination(masseus, a) > roundsToDestination(masseus, b))
         return 1;
      // a doit être égal à b
      return 0;
    }
  }


function attributeMissions(missions){
    mission_backlog = mission_backlog.concat(missions)
    staff = staff.map(x => masseusUpdate(x))
    let available_staff = staff.filter(
        function(masseus){
        if (masseus.occupe == false){
            return true
        } else {return false}
    })





    give_out_mission = function(masseus){
        let available_missions = mission_backlog.filter(
        function(mission){
        if ((Math.ceil(mission.start/5) < rounds) || (mission.status)){
            return false
        } else {
            return true
        }
        })
        let compare = makeComparer(masseus)
        let sortedMissions = available_missions.sort(compare)
        let missionAtHand = available_missions[0]
        if(missionAtHand){
            missionAtHand.status = "staffed"
            masseus.destination = {x: missionAtHand.x, y: missionAtHand.y}
            masseus.occupe = roundsToCompleteMission(missionAtHand)
        }

        return masseus
    }

    assignment = available_staff.map(x => give_out_mission(x))

    rounds += 1

    result = {}
    for (let elementIndex = 0; elementIndex < assignment.length; elementIndex++){
        element = assignment[elementIndex]
        if (element.destination != null) {
            result[element.name] = element.destination
        }

    }
    return result

}

function clean(){
    mission_backlog = []
    jp = {position: {x: 0, y: 0}, destination:null, occupe: false}
    rounds = 0
}
function displayEndState(){
    return [jp.position.x, jp.position.y]
}
exports.attributeMissions = attributeMissions;
exports.roundsToDestination = roundsToDestination;
exports.roundsToCompleteMission = roundsToCompleteMission
exports.masseusUpdate = masseusUpdate
exports.clean = clean
exports.displayEndState = displayEndState
