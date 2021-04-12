class Neuron {

  constructor(numberOfInput) {

    this.weight = []

    for (let i = 0; i < numberOfInput; i++) {
      this.weight.push();
    }

  }

  setWeight(weightIndice, weightNewValue) {

    this.weight[weightIndice] = weightNewValue;

  }

  getWeight(weightIndice) {

    return this.weight[weightIndice];
    
  }

  numberOfInputs() {
    return this.weight.length;
  }

  think(input) {

    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      sum += input[i]*this.weight[i];
    }
    let parameter = -sum;
    let result = 1/(1+exp(parameter));
    return result;

  }

}
