function parsToDeg (inPutLine) {
	
	let hourIndexAlf1 = 150
	let hourIndexAlf2 = 152
	let minIndexAlf1 = 152
	let minIndexAlf2 = 154
	let signDegIndexDelta1 = 167

	let degIndexDelta1 = 168
	let degIndexDelta2 = 170
	let minsIndexDelta1 = 170
	let minsIndexDelta2 = 172

	let hoursAlfa = Number(inPutLine.slice(hourIndexAlf1,hourIndexAlf2))
	let minsAlfa = Number(inPutLine.slice(minIndexAlf1,minIndexAlf2))
	let degDelta = Number(inPutLine.slice(degIndexDelta1,degIndexDelta2))
	let minsDelta = Number(inPutLine.slice(minsIndexDelta1,minsIndexDelta2))
	let signDelta = inPutLine[signDegIndexDelta1]
	let alfa = Math.PI * (hoursAlfa * 15 + minsAlfa * 0.25)/180
	let delta = Math.PI * (degDelta + minsDelta * 0.25)/180
			
	if(signDelta == "-"){
		delta = delta*(-1)
	}
	let star={alfa:alfa, delta:delta}
	return star
}



module.exports.parsToDeg = parsToDeg

function test(){
	let realStar = parsToDeg("258996 235451.661-0.0148 2 52.480 61894.8-822652.62-0.020 2 51.53 61895.5 1599.9 5.7K0 14190100007033219CP-82  907   2243620332196.26076224-1.43898818235732.747-0.0169-821011.58-0.0266.27247677-1.43413501")
	let expectedStar={alfa:359.25,delta:84.5}
	console.log(realStar)
	console.log(expectedStar)
}
//test()


