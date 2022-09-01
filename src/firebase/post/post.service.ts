import { Injectable } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { PostDto, PostDtoCreate, PostDtoUpdate, PostTypeDto } from "./dto/post.dto";
import {v4 as uuidv4} from 'uuid'

let POSTS: PostDto[] = [
    {
        id: '11',
        title: 'tit1',
        text: 'lorem11',
        author: 'Demo',
        date: 'Fri Apr 08 2022 19:33:30 GMT+0300 (Moscow Standard Time)'
    },
   {
        id: '22',
        title: 'tit2',
        text: 'lorem22',
        author: 'Dmitry',
        date: 'Fri Apr 08 2022 19:33:30 GMT+0300 (Moscow Standard Time)'
    },
]

@Injectable()
export class PostService {

    post(id: string): Observable<PostTypeDto | null> {
        const post = {...POSTS.find(p => p.id === id)}
        if(post) {
            delete post.id
            let newObj: PostTypeDto = {}
            newObj[id] = post
            return of(newObj)
        }
        return
    }

    posts(): Observable<PostTypeDto> {
        let newObj = {}
        POSTS.map( (post: PostDto) => {
            let obj = {...post}
            delete obj.id
            newObj[post.id] = obj
            return newObj
        })
        return of(newObj)
   }

    create(post: PostDtoCreate): Observable<string> {
        const id = uuidv4()
        POSTS.unshift({
            ...post,
            id: id,
            date: new Date().toString()
        })
        return of(id)
    }

    update(post: PostDtoUpdate): Observable<boolean> {
        const index = POSTS.findIndex(p => p.id === post.id)
        if(index === -1) {
            return of(false)
        }

        POSTS[index] = {...post}
        return of(true)
    } 

    remove(id: string): Observable<boolean> {
        const index = POSTS.findIndex(p => p.id === id)
        if(index === -1) {
            return of(false)
        }

        POSTS.splice(index, 1)
        return of(true) 
    }
}