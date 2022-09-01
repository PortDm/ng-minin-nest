import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createHmac } from "crypto";
import { UserDto } from "./dto/user.dto";

export interface iUser {
    email: string
    password: string
}

function genRandomStr(alhoritm: string, password: string, data='') {
    return createHmac(alhoritm, password)
    .update(data)
    .digest('hex')
}

const admins: iUser[] = [
    {email: 'd@d', password: '123456'},
    {email: 'ds@ds', password: '123123'},
]


@Injectable()
export class FirebaseService {
    isAuthenticated(user: UserDto) {
       const isAuth = admins.map(a => {
           const isEmail = a.email === user.email
           const isPass = a.password === user.password
           return isEmail && isPass
       }) 

       return isAuth.find(i => i === true)
    }

    login(userDto: UserDto) {
        if (this.isAuthenticated(userDto)) {
           return {
                display: '',
                key: genRandomStr('sha256', userDto.password, userDto.email),
                tokenId: genRandomStr('sha512', userDto.password, userDto.email),
                returnSecureToken: true,
                expire: 3600
            } 
        } else {
            throw new HttpException('Email or Password is not correct', HttpStatus.BAD_REQUEST)
        }
    }
}