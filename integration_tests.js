var f = require('./my_function');
const maxTime = 60
const numberOfMasseus = 15
const allTheMissions = {5:[{"x":3, "y":4, "start":20, "length": 10}]}
class Masseus{
    constructor(){
        this.position = {x: 0, y: 0},
        this.destination = {x: 0, y: 0}
    }
  }
const masseusTeamGenerator = (numberOfMasseus) => {
    masseusTeam = []
    for (let i = 0; i < numberOfMasseus; i++){
        masseusTeam.push(new Masseus)
    }
    return masseusTeam
}

function simulation(maxTime, numberOfMasseus, allTheMissions){
    let masseusTeam = masseusTeamGenerator(numberOfMasseus)
    let time = 0
    let counter = 0
    let points = 0

    do {
        time += 5
        
    } while (time < maxTime);

    return points
}
