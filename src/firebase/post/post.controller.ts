import { Body, Controller, Get, Param, Post, Patch, Delete } from "@nestjs/common";
import { Observable } from "rxjs";
import { PostDto, PostDtoUpdate, PostTypeDto } from "./dto/post.dto";
import { PostService } from "./post.service";

@Controller('/post')
export class PostController {

    constructor(private postService: PostService) {}

    @Get(':id')
    post(@Param('id') id: string): Observable<PostTypeDto | null> {
        return this.postService.post(id)
    }

    @Get()
    posts() {
        return this.postService.posts()
    }

    @Post()
    create(@Body() post: PostDto): Observable<string> {
        return this.postService.create(post)
    }

    @Patch()
    update(@Body() post: PostDtoUpdate): Observable<boolean> {
        return this.postService.update(post)
    }

    @Delete(':id')
    remove(@Param('id') id:string ): Observable<boolean> {
        return this.postService.remove(id)
    }

}