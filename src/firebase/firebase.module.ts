import { Module } from "@nestjs/common";
import { FirebaseController } from "./firebase.controller";
import { FirebaseService } from "./user/user.service";

@Module({
    controllers: [FirebaseController],
    providers: [FirebaseService],
    
})
export class FirebaseModule {}