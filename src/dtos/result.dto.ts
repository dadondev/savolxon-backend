import { singleSolve, solvedI } from "../utils/types"


interface singleSolvePredixI extends solvedI {
    id:string
}

class resultDto {
    id:string
    wrongs:number
    corrects:number
    solved:singleSolvePredixI[] | []
    allQuizsCount:number
    userId:string
    testId
    constructor(data:any){
        this.id = data._id
        this.wrongs = data.wrongs
        this.corrects = data.corrects
        this.solved = data.solved.map((e:any)=> new solvedDto(e))
        this.allQuizsCount = data.allQuizsCount
        this.userId = data.userId
        this.testId = data.testId
    }
}


class solvedDto {
    id:string
    quizText:string
    trueVariant:string
    selectedVariant:string
    constructor(data:any){
        this.id = data._id
        this.quizText = data.quizText
        this.trueVariant = data.trueVariant
        this.selectedVariant = data.selectedVariant
    }

}

export default resultDto