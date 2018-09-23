let mission_backlog = []
let jp = {position: {x:0, y:0}, destination: null, occupe: false}
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
}

function makeComparer(masseus) {
  return function(a, b) {
    const roundsToStart_a = Math.ceil(a.start/5) - rounds
    const roundsToStart_b = Math.ceil(b.start/5) - rounds
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
    masseusUpdate(jp)

    let available_missions = mission_backlog.filter(
        function(mission){
        if (Math.ceil(mission.start/5) < rounds){
            return false
        } else {return true}
    })

    if (available_missions.length > 0 && jp.destination == null){
        let compare = makeComparer(jp)
        let sortedMissions = available_missions.sort(compare)
        let missionAtHand = available_missions[0]

      if (missionAtHand.start / 5 > roundsToDestination(jp, missionAtHand) + rounds){
            jp.destination = {x: missionAtHand.x, y: missionAtHand.y}
            jp.occupe = roundsToCompleteMission(missionAtHand)
            }
    }

    rounds += 1

    if (jp.destination != null) {
        return {1: jp.destination}
    }
    return {}

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
