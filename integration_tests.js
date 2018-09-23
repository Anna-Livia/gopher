var s = require('./integration_framework');

const test_simulator = (name, theMissions, result) => {
    running_simulation = s.simulation (maxTime, numberOfMasseus, theMissions)
    if ( running_simulation == result){
        console.log("All Good")
    } else {
        console.log("OOPS ! there is a problem with:", name)
        console.log("## Expected", result)
        console.log("## Got", running_simulation)
    }
}
const maxTime = 60
const numberOfMasseus = 1


let mission_1 = {0: [{"start":30, "length": 10, "x":2, "y":4}]}
let mission_2 = {0: [{"start":30, "length": 10, "x":2, "y":4}], 10: [{"start":50, "length": 10, "x":2, "y":4}]}
let mission_3 = {5: [
    {"start":30, "length": 10, "x":2, "y":4},
    {"start":30, "length": 10, "x":1, "y":2}
    ]}

test_simulator("No Mission", {}, 0)
test_simulator("One mission", mission_1, 1)
test_simulator("Two missions", mission_2, 2)
test_simulator("Two missions at the same time", mission_3, 1)
