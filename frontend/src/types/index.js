import{shape, number, string, bool} from "prop-types";
export const userType = shape({
    id:number.isRequired,
    username: string.isRequired,
    name:string.isRequired,
})

export const contactType = shape({
    id:number.isRequired,
    username: string.isRequired,
    name:string.isRequired,
    userId:number.isRequired,
    alias:string,
})

export const chatType = shape({
    id:number.isRequired,
    title: string,
    groupal: bool.isRequired,
})