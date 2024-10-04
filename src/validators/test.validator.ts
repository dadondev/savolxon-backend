import * as yup from "yup";
const createTestValidator = yup.object({
    name:yup.string().required().min(3),
    teacher_id:yup.string().required().min(10),
})
export {createTestValidator}