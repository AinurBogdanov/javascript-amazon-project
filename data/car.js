class Car {
  #brand;
  #model;
  #speed;
  isMoving;
  isTrunkOpen;

  constructor(carDetails) {
    this.#brand = carDetails.brand,
    this.#model = carDetails.model,
    this.#speed = 0,
    this.isTrunkOpen = false,
    this.isMoving = false

  };

  displayInfo() {
    console.log(
      `brand is: ${this.#brand}, model is ${this.#model}, speed is: ${this.#speed},
      trunk is ${this.isTrunkOpen ? 'open' : 'closed'}`
    )
  };

  go() {
   if(this.#speed < 196 && !this.isTrunkOpen) {
      this.#speed += 5;
      this.isMoving = true;
   }
  };

  brake() {
   if(this.#speed >= 5) {
    this.#speed -= 5;
    this.isMoving = false;
   }
  };

  openTrank() {
    if (!this.isMoving) { this.isTrunkOpen = true }
  };
  closeTrank() {
    this.isTrunkOpen = false;
  };
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration
  };

  go() {
    this.speed += this.acceleration
    if(this.speed > 300) this.speed = 300 
  };

  openTrank() {
    console.log('no trunk on this car')
  };

  closeTrank() {
    console.log('no trunk on this car')
  };
}

const car3 = new RaceCar({
  brand: 'McLaren',
  model: 'f1',
  acceleration: 20
})

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

car3.openTrank();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();

car3.displayInfo();
car2.displayInfo();