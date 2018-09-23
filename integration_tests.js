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
const maxTime = 60*14
const numberOfMasseus = 50


let mission_1 = {0: [{"start":30, "length": 10, "x":2, "y":4}]}
let mission_2 = {0: [{"start":30, "length": 10, "x":2, "y":4}], 10: [{"start":50, "length": 10, "x":2, "y":4}]}
let mission_3 = {5: [
    {"start":30, "length": 10, "x":2, "y":4},
    {"start":30, "length": 10, "x":1, "y":2}
    ]}

test_simulator("No Mission", {}, 0)
test_simulator("One mission", mission_1, 1)
test_simulator("Two missions", mission_2, 2)
test_simulator("Two missions at the same time", mission_3, 2)

let mission_4 = { 0: [
  {
    "start": 355,
    "length": 5,
    "x": 4.030947594055855,
    "y": 6.084631424988442,
  },
  {
    "start": 815,
    "length": 20,
    "x": 1.7118373723534588,
    "y": 4.925952033200128,
  },
  {
    "start": 305,
    "length": 10,
    "x": 1.8148574766648076,
    "y": -1.032662693108115,
  },
  {
    "start": 185,
    "length": 10,
    "x": -1.1156275857045612,
    "y": -5.569784957024897,
  },
  {
    "start": 480,
    "length": 5,
    "x": -0.9336655456123487,
    "y": 1.653081710128768,
  },
  {
    "start": 225,
    "length": 10,
    "x": 2.4405184182161213,
    "y": 1.463590171503254,
  },
  {
    "start": 825,
    "length": 15,
    "x": 2.666334295195181,
    "y": -7.842340753803983,
  },
  {
    "start": 835,
    "length": 5,
    "x": 7.6704484693021735,
    "y": -5.798242057790405,
  }
]}

test_simulator("real world example", mission_4, 8)
