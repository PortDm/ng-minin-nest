export interface PostDto {
    id: string
    title: string
    text: string
    author: string
    date: string
}

export interface PostDtoCreate {
    title: string
    text: string
    author: string
}

export interface PostDtoUpdate {
    id: string
    title: string
    text: string
    author: string
    date: string
}

export interface PostAnswerDto {
    title: string
    text: string
    author: string
    date: string
}

export type PostTypeDto = {[id: string]: PostAnswerDto}
