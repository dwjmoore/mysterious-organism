const returnRandBase = () => {
	const dnaBases = ['A', 'T', 'C', 'G']
	return dnaBases[Math.floor(Math.random() * 4)]
}

const mockUpStrand = () => {
	const newStrand = []
	for (let i = 0; i < 15; i++) {
		newStrand.push(returnRandBase())
	}
	return newStrand
}

const pAequorFactory = (specimenNum, dna) => {
	return {
		specimenNum: specimenNum,
		dna: dna,
		mutate() {
			let randomIndex = Math.floor(Math.random() * this.dna.length);
			let mutation = returnRandBase();
			while (mutation === this.dna[randomIndex]) {
				mutation = returnRandBase();
			}
			this.dna[randomIndex] = mutation;
		},
		compareDNA(otherPAequor) {
			let commonDNACounter = 0;
			for (let i = 0; i < this.dna.length; i++) {
				this.dna[i] === otherPAequor.dna[i] ? commonDNACounter++ : null;
			}
			const percentCommonDNA = commonDNACounter / this.dna.length;
			console.log(`Specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${Math.round(percentCommonDNA * 100)}% DNA in common.`);
		},
		willLikelySurvive() {
			let cCount = 0;
			let gCount = 0;
			for (let i = 0; i < this.dna.length; i++) {
				this.dna[i] === 'C' ? cCount++ : null;
				this.dna[i] === 'G' ? gCount++ : null;
			}
			return cCount / this.dna.length > 0.6 || gCount / this.dna.length > 0.6 ? true : false;
		},
	};
};

const speciman1 = pAequorFactory(1, mockUpStrand());
const speciman2 = pAequorFactory(2, mockUpStrand());
console.log(speciman1.dna);
console.log(speciman2.dna);
speciman1.compareDNA(speciman2);
console.log(speciman1.willLikelySurvive());
console.log(speciman2.willLikelySurvive());