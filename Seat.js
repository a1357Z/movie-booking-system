module.exports = class Seat{
    /*
    status:
    0 --> available
    1 --> booked
    2 --> hold
    */

    constructor(id, position){
        this.id = id;
        this.status = 0
        this.position = position
        
        //timer pending
        this.timerDuration = 1000;
    }

    setStatus(status){
        return this.status = status;
    }

    getStatus(){
        return this.status;
    }

    getPosition(){
        return this.position
    }

    isAvailable(){
        return this.status === 0;
    }


    startTimer(){
        this.status = 2;
        setTimeout(( ) => {
            //if timer complete and ticket on hold, mark it available
            if(this.status == 2)this.status = 0;
        }, this.timerDuration)
    }
}