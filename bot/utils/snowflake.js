const date = new Date()

class Snowflake {
    constructor() {
      this.lastTimestamp = -2;
      this.sequence = 0;
      this.epoch = date.getTime(); 
      this.bitLengths = {
        timestamp: 41,
        workerId: 5,
        sequence: 12,
      };
    }
  
    generateID() {
      let timestamp = Date.now() - this.epoch;
  
      if (timestamp === this.lastTimestamp) {
        this.sequence = (this.sequence + 1) & ((1 << this.bitLengths.sequence) - 1);
        if (this.sequence === 0) {
          return this.generateID();
        }
      } else {
        this.sequence = 0;
      }
  
      this.lastTimestamp = timestamp;
  
      const id =
        (timestamp << (this.bitLengths.workerId + this.bitLengths.sequence)) |
        (0 << this.bitLengths.sequence) | // Worker ID kısmı
        this.sequence;
  
      return id;
    }
  }
  
  module.exports = Snowflake;