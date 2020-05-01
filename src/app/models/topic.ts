export class Topic {
    constructor(
        // tslint:disable-next-line: variable-name
        public _id: string,
        public title: string,
        public content: string,
        public code: string,
        public lang: string,
        public date: string,
        public user: any,
        public comments: any
    ) {}
}
