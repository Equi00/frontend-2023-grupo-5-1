export class Reserve {
    constructor( 
        userId,
        lodgmentId,
        startDate,
        endDate,
        cost
    ) {
        this.userId = userId
        this.lodgmentId = lodgmentId
        this.startDate = startDate
        this.endDate = endDate
        this.cost = cost
    }
}

export class ReserveDTO {
    constructor( 
        user,
        lodgmentId,
        startDate,
        endDate,
        cost
    ) {
        this.user = user
        this.lodgmentId = lodgmentId
        this.startDate = startDate
        this.endDate = endDate
        this.cost = cost
    }
}

