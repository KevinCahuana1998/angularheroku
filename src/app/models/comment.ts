export class Comment {
    constructor(
        // tslint:disable-next-line: variable-name
        public _id: string,
        public content: string,
        public date: string,
        public user: any
    ) {}
}
