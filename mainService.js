const readline = require('readline')
const parsToDegService = require('./parsService')
const fs = require('fs')
const starCoordinates = require('./starCoordinatesFinder')
const  workWithMatrix = require('./MathForStar')

let stars=[]


function main() {
	
	const rl = readline.createInterface({
 		input: fs.createReadStream('./resources/starsInfo.txt'),
  		crlfDelay: Infinity
		})

	rl.on('line', (line) => {
  		var star = parsToDegService.parsToDeg(line)
		stars.push(star)
		})

}

function findRealStars(expectedStars){
	return new Promise ((resolve, reject) => {
	//	expectedStars = [{deltaExp:Math.PI*10/180,alfaExp:Math.PI*15/180}]
		let realStars = []

		for (let i = 0; i < expectedStars.length; i++){
			realStars[i] = {alfa:1, delta:1, betta:100000000,count:0}
		}

		
		for (let i = 0; i<stars.length; i++){
				for (let j = 0; j<expectedStars.length; j++){
					let betta = Math.acos(Math.sin(stars[i].delta)*Math.sin(expectedStars[j].deltaExp) + Math.cos(stars[i].delta)*Math.cos(expectedStars[j].deltaExp)*Math.cos(stars[i].alfa - expectedStars[j].alfaExp)) 
					if (betta < realStars[j].betta) {
						realStars[j].betta = betta
						realStars[j].alfa = stars[i].alfa
						realStars[j].delta = stars[i].delta
						realStars[j].count = i	
					}



			}
		}
		let r_zv_vesk_real = []
		let stars_end = []
		let A = starCoordinates.getMat()
			

		for (let i=0; i<expectedStars.length;i++){

			r_zv_vesk_real.push([Math.cos(realStars[i].alfa)*Math.cos(realStars[i].delta), Math.sin(realStars[i].alfa)*Math.cos(realStars[i].delta), Math.sin(realStars[i].delta)])

			let r_zv_vesk_realT = [
				[r_zv_vesk_real[i][0]],
				[r_zv_vesk_real[i][1]],
				[r_zv_vesk_real[i][2]]
			]
					
			let r_zv = [
			[A[0][0] * r_zv_vesk_real[i][0]+ A[0][1]*r_zv_vesk_real[i][1]+A[0][2]*r_zv_vesk_real[i][2]],
			[A[1][0] * r_zv_vesk_real[i][0]+ A[1][1]*r_zv_vesk_real[i][1]+A[1][2]*r_zv_vesk_real[i][2]],
			[A[2][0] * r_zv_vesk_real[i][0]+ A[2][1]*r_zv_vesk_real[i][1]+A[2][2]*r_zv_vesk_real[i][2]]
			]
			let x = starCoordinates.getFoc()*r_zv[0]/r_zv[2]
			let y = starCoordinates.getFoc()*r_zv[1]/r_zv[2]

			stars_end.push({x,y})

		}

		resolve(stars_end)
		// reject(new Error(""))
	})
}

module.exports.main = main
module.exports.findRealStars = findRealStars

