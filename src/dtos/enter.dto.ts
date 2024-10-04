class enterDto {
    id: string
    name: string
    teacher_id: string
    quizs:[]
    constructor(data:any) {
        this.id = data._id;
        this.name = data.name;
        this.teacher_id = data.teacher;
        this.quizs = data.quizs.map((e:any)=> new SingleQuiz(e))
    }
}

class SingleQuiz {
    id:string
    text:string
    variants:[]
    constructor(data:any) {
        this.id = data._id;
        this.text = data.text;
        this.variants = data.variants.map((e:any)=> new SingleVariant(e))
    }
}

class SingleVariant {
    id:string
    text:string
    name:string
    constructor(data:any) {
        this.id = data._id;
        this.text = data.text;
        this.name= data.name;
    }
}

export default enterDto