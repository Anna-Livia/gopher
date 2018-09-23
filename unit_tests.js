var f = require('./my_function');

const AreObjectsEquals = (a, b) => {
    const compare_elements = (c, d) => {
        if (typeof(c) != typeof(d)){
            return false
            }
        if (typeof(c)=='object' && c != null){
            return AreObjectsEquals(c, d)
            }
        return c == d
        }

    const a_attributes = Object.keys(a)
    const equal_attributes = a_attributes.filter(
        function (element) { return compare_elements(a[element], b[element])}
    )

    if (a_attributes.length > equal_attributes.length){
        return false
    }
    return true
    }

let test_passer = (name, test, result) => {
    console.log('testing', name)
    const feedback = function(expected, got){
        console.log("There is an issue with ** " + name + " **")
        console.log("## Details")
        console.log("## Expected: ")
        console.log("## " + typeof(expected))
        console.log("## " + JSON.stringify(expected))
        console.log("## Got: ")
        console.log("## " + typeof(got))
        console.log("## " + JSON.stringify(got))
    }

    if (typeof(test) == 'object' && typeof(result) == 'object'){
        if (!AreObjectsEquals(test, result)){
            return feedback(result, test)
        }
    } else if (test != result){
        return feedback(result, test)
    }
}

test_passer("test AreObjectsEquals_basics", AreObjectsEquals({'a':1, 'b':2}, {'a':1, 'b':2}), true)
test_passer("test AreObjectsEquals_real_life", AreObjectsEquals({x:0, y:0, destination:null}, {x:1, y:3, destination:null}), false)

const maria = {position:{x:0, y:0}, destination:null}
const jules = {position:{x:1, y:2}, destination:null}

const mission1 = {"x":3, "y":4, "start":20, "length": 10}
const mission2 = {"x":6, "y":9, "start":25, "length": 12}

test_passer(
    "Calculate the next time the masseus is available 1",
    f.roundsToCompleteMission(mission1),
    6)

test_passer(
    "Calculate the distance to destination when starting from origin",
    f.roundsToDestination(maria, mission1),
    4)

test_passer(
    "Calculate the distance to destination when not starting from origin",
    f.roundsToDestination(jules, mission2),
    7)


let jacques = {
    position:{x: 5, y: 4},
    destination:{x: 9, y: 5},
    occupe: 2
}

f.masseusUpdate(jacques)

test_passer(
    "A Masseus who's 2 turns away from available becomes 1 turn away on the next round",
    jacques,
    {
        position:{x: 5, y: 4},
        destination:{x: 9, y: 5},
        occupe: 1
    })

f.masseusUpdate(jacques)

test_passer(
    "A Masseus who's 1 turns away from available becomes available on the next round",
    jacques,
    {
        position:{x: 9, y: 5},
        destination:null,
        occupe: false
    })
f.masseusUpdate(jacques)

test_passer(
    "Once a Masseus is available, he stays available on the next round if no new mission is assigned",
    jacques,
    {
        position:{x: 9, y: 5},
        destination:null,
        occupe: false
    })
