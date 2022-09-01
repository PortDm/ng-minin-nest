import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserDto } from "./user/dto/user.dto";
import { FirebaseService } from "./user/user.service";

@Controller('firebase')
export class FirebaseController {
    constructor(private fbService: FirebaseService) {}

    @Get()
    get() {
        return '<h2>Firebase rinning...</h2>'
    }

    @Post()
    login(@Body() userDto: UserDto) {
        return this.fbService.login(userDto)
    }


}