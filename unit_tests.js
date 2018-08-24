var f = require('./my_function');




const AreObjectsEquals = (a, b) => {
	const compare_elements = (element){
		console.log(a[element] + ' and ' + b[element] + ' is')
		console.log(a[element]!= b[element])
		if(typeof(a[element])=='object'){
			[...]
		}
		if(a[element]!= b[element]){
			canary = false
		}
	}	
	const keysA = Object.keys(a)
	const keysB = Object.keys(b)
	let canary = true
	keysA.forEach(compare_elements(element))
	console.log('canary', canary)
	return canary
	}

let test_passer = (name, test, result) => {
	feedback = function(expected, got){
		console.log("There is an issue with ** " + name + " **")
		console.log("## Details")
		console.log("## Expected: ")
		console.log("## " + typeof(expected))
		console.log("## " + JSON.stringify(expected))
		console.log("## Got: ")
		console.log("## " + typeof(got))
		console.log("## " + JSON.stringify(got))
	}

	if (typeof(test) == 'object' && typeof(result) == 'object' && !AreObjectsEquals(test, result)){
			return feedback(result, test)
		} 
	if (test != result){
		return feedback(result, test)
	}
}

test_passer("test AreObjectsEquals", AreObjectsEquals({'a':1, 'b':2}, {'a':1, 'b':2}), true)
test_passer("test AreObjectsEquals", AreObjectsEquals({x:0, y:0, destination:null}, {x:1, y:3, destination:null}), false)

const maria = {x:0, y:0, destination:null}
const jules = {x:1, y:2, destination:null}

const mission1 = {"x":3, "y":4, "start":20, "length": 10}
const mission2 = {"x":6, "y":9, "start":25, "length": 12}

test_passer("Calculate the next time the masseus is available 1", f.roundsToCompleteMission(mission1), 6)

test_passer("Calculate the distance to destination when starting from origin", f.roundsToDestination(maria, mission1), 4)
test_passer("Calculate the distance to destination when not starting from origin", f.roundsToDestination(jules, mission2), 7)


let jacques = {x: 5, y: 4, destination:{x: 9, y: 5}, occupe: 2}
f.masseusUpdate(jacques)

test_passer(
	"A Masseus who's 2 turns away from available becomes 1 turn away on the next round",
	jacques,
	{x: 5, y: 4, destination:{x: 9, y: 5}, occupe: 1},
	)

f.masseusUpdate(jacques)

test_passer(
	"A Masseus who's 1 turns away from available becomes available on the next round",
	jacques,
	{x: 9, y: 5, destination:null, occupe: false}
	)

if (jacques.occupe == false && jacques.destination == null && jacques.position.x == 9 && jacques.position.y == 5){console.log("masseusUpdate_2", true)} else{throw "masseusUpda_2 failed"}
f.masseusUpdate(jacques)
if (jacques.occupe == false && jacques.destination == null && jacques.position.x == 9 && jacques.position.y == 5){console.log("masseusUpdate_3", true)} else{throw "masseusUpda_3 failed"}
