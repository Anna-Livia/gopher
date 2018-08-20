


//http://dev-challenge.gofer.fr

//start : minutes écoulées depuis 8h
// length: duree du massage en minutes
// x et Y : coordonées en km

//let mission_eg = {"start":800, "length": 60, "x":2, "y":4}

//let input_eg = [{"start":800, "length": 60, "x":2.1, "y":4}, {"start":900, "length": 30, "x":-3, "y":-5}]

//let output_eg = {1: { x: 7.4, y: -2.9 }, 2: { x: 1.2, y: -0.3 } }

    //Vitesse en Km/h .
    //Quand vous donnez l'ordre à un masseur de se rendre à un point donné,
    // il se met immédiatement en route en ligne droite vers ce point à la vitesse de 15km/h.
    // Il continue jusqu'à être arrivé à destination ou jusqu'à recevoir de nouvelles instructions.

    // real max time is 14*60

    // write your code here
    // HINT: you have access to the `console` object for debugging
var f = require('./my_function');
let maria = {x:0, y:0, destination:null}
let mariasMission = {"x":3, "y":4, "start":20, "length": 10,}

if (f.roundsToDestination(maria, mariasMission) == 4){console.log("timeToDestination", true)} else{throw "timeToDestination failed"}

if (f.roundsToCompleteMission(mariasMission) == 6){console.log("roundsToCompleteMission", true)} else{throw "roundsToCompleteMission failed"}


maria = {x:0, y:0, destination:null}
mariasMission = {"x":5, "y":7, "start":25, "length": 12,}

if (f.roundsToDestination(maria, mariasMission) == 7){console.log("timeToDestination", true)} else{throw "timeToDestination failed"}
if (f.roundsToCompleteMission(mariasMission) == 8){console.log("roundsToCompleteMission", true)} else{throw "roundsToCompleteMission failed"}

let paul = {x:5, y:4, destination:{x: 9, y: 5}, occupe: 5}
f.masseusUpdate(paul)
if (paul.occupe == 4){console.log("masseusUpdate", true)} else{throw "masseusUpdate failed"}

jacques = {x:5, y:4, destination:{x: 9, y: 5}, occupe: 1}
f.masseusUpdate(jacques)
if (jacques.occupe == false && jacques.destination == null && jacques.position.x == 9 && jacques.position.y == 5){console.log("masseusUpdate_2", true)} else{throw "masseusUpda_2 failed"}
f.masseusUpdate(jacques)
if (jacques.occupe == false && jacques.destination == null && jacques.position.x == 9 && jacques.position.y == 5){console.log("masseusUpdate_3", true)} else{throw "masseusUpda_3 failed"}

function test_runner(max_time, missions){
    // Mission Raiting
    let missions_meta = []
    let point_break_meta = {}

    let time = 0

    function calculate_distance(position, destination){
        power = Math.pow((destination.x-position.x), 2) + Math.pow((destination.y - position.y), 2)
        distance = Math.sqrt(power)

        return distance
    }

    function calculate_new_position(position, destination){
        if (!destination){
            return position
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

    function are_we_there_yet(position, destination){
        //console.log("are_we_there_yet", position, destination)
        if (destination == null){
            //console.log("are_we_there_yet", "there")
            return true
        }else if(position.x == destination.x && position.y == destination.y){
            //console.log("are_we_there_yet", "just got there")
            return true
        }
        //console.log("are_we_there_yet", "getting there")
        return false
    }

    function run_missions(max_time, missions){
    	const START_POSITION = { x: 0, y: 0}
        let point_break = 0
    	let points = 0
    	let position = START_POSITION
    	let minutes_left = max_time - time
    	do {
    		round_mission = get_mission(time, missions);
            missions_meta = missions_meta.concat(round_mission)
            attribution = f.attributeMissions(round_mission);
            //console.log("attribution", attribution)
            position = calculate_new_position(position,attribution[1])
            //console.log("position", position)
            function count_points(){
                for (index in missions_meta){
                    this_mission = missions_meta[index]
                    this_mission.destination = {x: missions_meta[index].x, y:missions_meta[index].y}
                if (time >= this_mission.start && time <= (this_mission.start + this_mission.length) && are_we_there_yet(position, this_mission.destination)){
                        if (!point_break_meta[index]){
                            point_break_meta[index] = 1
                        } else {
                            point_break_meta[index] += 1
                        }
                        if (point_break_meta[index] == (this_mission.length / 5) + 1){
                            points += 1
                        }
                    }
                }
            }
            time += 5
            console.log("time: ", time)
            count_points()
            console.log("points", points)


            console.log("########")
    	} while (time < MAX_TIME);

    	return points
    }

    function get_mission(time, missions){
        time_for_missions = Object.keys(missions).map(x => Number(x))
        if (time_for_missions.includes(time)){
            return missions[time]
        } else {return mission_0}
    }

    return run_missions(max_time, missions)
}
// Step 1, one masseuse, one mission, one hour
// step 2,  one masseuse, two missions, one hour
let mission_0 = []
let mission_1 = [{"start":30, "length": 10, "x":2, "y":4}]
let mission_2 = [{"start":50, "length": 10, "x":2, "y":4}]
let mission_3 = [{"start":30, "length": 10, "x":2, "y":4}, {"start":30, "length": 10, "x":1, "y":2}]

let missions_test_1 = {}
let missions_test_2 = {0: mission_1}
let missions_test_3 = {0: mission_1, 10: mission_2}
let missions_test_4 = {5: mission_3}

const MAX_TIME = 60
let numberOfmasseus = 1
console.log('#')
if (test_runner(MAX_TIME, missions_test_1) == 0){console.log("missions_test_1", true)} else{throw "missions_test_1 failed"}

f.clean()
if (test_runner(MAX_TIME, missions_test_2) == 1){console.log("missions_test_2", true)} else{throw "missions_test_2 failed"}
f.clean()
if (test_runner(MAX_TIME, missions_test_3) == 2){console.log("missions_test_3", true)} else{throw "missions_test_3 failed"}
f.clean()
if (test_runner(MAX_TIME, missions_test_4) == 1 ){console.log("missions_test_4", true)} else{throw "missions_test_4 failed"}
    console.log("###")
endState = f.displayEndState()
console.log(endState)
if (endState[0] == 1 && endState[1] == 2){console.log("missions_test_4bis", true)} else{throw "missions_test_4bis failed"}
