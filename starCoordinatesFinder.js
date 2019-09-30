const  workWithMatrix = require('./MathForStar')
let A_vesk_orb = []
let focus

function start(body){
	body.ipsilon = (Math.PI * body.ipsilon)/180
	body.iota = (Math.PI * body.iota)/180
	body.omega = (Math.PI * body.omega)/180

	let r = [
		[1],
		[0],
		[0]
		]
	let v = [
		[0],
		[1],
		[0]
		]

	let Ayu = [
		[Math.cos(body.ipsilon), 0, Math.sin(body.ipsilon)],
		[0, 1, 0],
		[-Math.sin(body.ipsilon), 0, Math.cos(body.ipsilon)]
	]	
	let Azu = [
		[Math.cos(body.ipsilon), -Math.sin(body.ipsilon), 0],
		[Math.sin(body.ipsilon), Math.cos(body.ipsilon), 0],
		[0, 0, 1]
	]
	let Axi = [
		[1, 0, 0],
		[0, Math.cos(body.iota), -Math.sin(body.iota)],
		[0, Math.sin(body.iota), Math.cos(body.iota)]
	]

	let Azo = [
		[Math.cos(body.omega), -Math.sin(body.omega), 0],
		[Math.sin(body.omega), Math.cos(body.omega), 0],
		[0, 0, 1]
	]

	let R = workWithMatrix.MultiplyMatrix(Azu,Axi)
	R =  workWithMatrix.MultiplyMatrix(R,Azo)
	R = workWithMatrix.MultiplyMatrix(R,r)
	let V = workWithMatrix.MultiplyMatrix(Azu,Axi)
	V =  workWithMatrix.MultiplyMatrix(V,Azo)
	V = workWithMatrix.MultiplyMatrix(V,v)
	

	let Zorb = R
	let RxV =  workWithMatrix.MultiplyMatrixVector(R,V)
	let Yorb = RxV
	Yorb[0] = Yorb[0]/workWithMatrix.FindModuleVector(RxV)
	Yorb[1] = Yorb[1]/workWithMatrix.FindModuleVector(RxV)
	Yorb[2] = Yorb[2]/workWithMatrix.FindModuleVector(RxV)
	let YxZ = workWithMatrix.MultiplyMatrixVector(Yorb,Zorb)
	let Xorb =  workWithMatrix.MultiplyMatrixVector(Yorb,Zorb)
	Xorb[0] = Xorb[0]/workWithMatrix.FindModuleVector(YxZ)
	Xorb[1] = Xorb[1]/workWithMatrix.FindModuleVector(YxZ)
	Xorb[2] = Xorb[2]/workWithMatrix.FindModuleVector(YxZ)

	A_vesk_orb = [
		[Xorb[0], Xorb[1], Xorb[2]],
		[Yorb[0], Yorb[1], Yorb[2]],
		[Zorb[0], Zorb[1], Zorb[2]]
	]
	
	let A_vesk_orb_t = workWithMatrix.TransMatrix(A_vesk_orb)

	let sensorMat = sensorMatrixBuilder(body.matrix)

	let r_vesk_zv = []

				for (let i = 0; i<sensorMat.length; i++){
		let r = workWithMatrix.MultiplyMatrix(A_vesk_orb_t,[[sensorMat[i][0]],[sensorMat[i][1]],[sensorMat[i][2]]])
		let norma2 = workWithMatrix.FindModuleVector(sensorMat[i])
		r_vesk_zv.push([r[0]/norma2,r[1]/norma2,r[2]/norma2])
	}
	
	let alfaDeltaExpected = []

	for (let i = 0; i<9; i++){
		let alfaExp = Math.atan(r_vesk_zv[i][1]/r_vesk_zv[i][0])
		let deltaExp = Math.asin(r_vesk_zv[i][2])

		alfaDeltaExpected.push({alfaExp, deltaExp})
	}
	console.log(alfaDeltaExpected)

	return(alfaDeltaExpected)
}



function sensorMatrixBuilder(matrix){
	
	const percentOfBorder = 1

	let border1Y = -matrix.heightlnPixels/2 * percentOfBorder*matrix.pixelSize 
	let border2Y = -matrix.heightlnPixels/2 * percentOfBorder*matrix.pixelSize 
	let border3Y = -matrix.heightlnPixels/2 * percentOfBorder*matrix.pixelSize 
	let border4Y = 0
	let point5Y = 0
	let border6Y = 0
	let border7Y = matrix.heightlnPixels/2 * percentOfBorder*matrix.pixelSize 
	let border8Y = matrix.heightlnPixels/2 * percentOfBorder*matrix.pixelSize 
	let border9Y = matrix.heightlnPixels/2 * percentOfBorder*matrix.pixelSize 

	let border1X = -matrix.widthlnPixels/2 * percentOfBorder*matrix.pixelSize 
	let border2X = 0
	let border3X = matrix.widthlnPixels/2 * percentOfBorder*matrix.pixelSize 
	let border4X = -matrix.widthlnPixels/2 * percentOfBorder*matrix.pixelSize 
	let point5X = 0
	let border6X = matrix.widthlnPixels/2 * percentOfBorder*matrix.pixelSize 
	let border7X = -matrix.widthlnPixels/2 * percentOfBorder*matrix.pixelSize 
	let border8X = 0
	let border9X = matrix.widthlnPixels/2 * percentOfBorder*matrix.pixelSize 

	focus = matrix.focus




	var sensorLimites = [
	[border1X, border1Y, focus],
	[border2X, border2Y, focus],
	[border3X, border3Y, focus],
	[border4X, border4Y, focus],
	[point5X, point5Y, focus],
	[border6X, border6Y, focus],
	[border7X, border7Y, focus],
	[border8X, border8Y, focus],
	[border9X, border9Y, focus]	
	]

	return(sensorLimites)

}
function getMat(){
	return(A_vesk_orb)
}
 
function getFoc(){
	return(focus)
}

module.exports.start = start
module.exports.getMat = getMat
module.exports.getFoc = getFoc