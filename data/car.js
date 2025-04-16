class car {
  brand;
  model;
  speed;
  isTrunkOpen;

  constructor(carDetails) {
    this.brand = carDetails.brand,
    this.model = carDetails.model,
    this.speed = carDetails.speed,
    this.isTrunkOpen = carDetails.speed

  };

  displayInfo() {
    console.log(`brand is: ${this.brand}, model is ${this.model}, speed is: ${this.speed}`)
  };

  go() {
   if(this.speed < 196) this.speed += 5 
    
  };

  brake() {
   if(this.speed >= 5) this.speed -= 5
  };

  openTrank() {

  }
  closeTrank() {

  }
}

const car1 = new car({
  brand: 'Toyota',
  model: 'Corolla',
  speed: 0,
  isTrunkOpen: false
});

const car2 = new car({
  brand: 'Tesla',
  model: 'Model 3',
  speed: 0,
  isTrunkOpen: false
});


car1.displayInfo();
car2.displayInfo();