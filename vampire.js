class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamp = 0;
    let currentVamp = this;

    while(currentVamp.creator){
      currentVamp = currentVamp.creator;
      numberOfVamp++;
    }
    return numberOfVamp;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal){
      return false; 
    }
    return true;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if(this.name === name) return this;

    for (let child of this.offspring){
      const found = child.vampireWithName(name);
      if(found){
        return found;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVamps = 0;
    // This return just first child
    totalVamps = totalVamps + this.offspring.length;
    // With for loop we are going into deep
   for (const vamp of this.offspring){
     totalVamps = totalVamps + vamp.totalDescendents;      
    }
     return totalVamps;
  }

  // Returns an array of all the vampires that were converted after 1980
   get allMillennialVampires() {
    let vamps = []; 
    if(this.yearConverted > 1980) {
      vamps.push(this);
    } 
    for(const vamp of this.offspring){
      const childMillennialVampires = vamp.allMillennialVampires;
      vamps = vamps.concat(childMillennialVampires)
    }
    return vamps;
  }
}

module.exports = Vampire;

