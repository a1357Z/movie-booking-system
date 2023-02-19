/*
    status:
    0 --> initiated
    1 --> success
    2 --> failure
    */

    module.exports = class Payment{
    constructor(ticket){
        this.ticket = ticket;
        this.status = 0
    }

    async getPaymentStatus(){
        return true;
    }

    failPayment(){
        this.status = 2;
    }

    succeedPayment(){
        this.status = 1;
    }

    initiateRefund(){
        
    }
}