import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = global.url;
  }

  addComment(comment: any, token: string, topicId: string) {
    const header = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this.http.post(this.url + 'comment/topic/' + topicId, JSON.stringify(comment), {headers: header});
  }

  deleteComment(commentId: string, token: string, topicId: string) {
    const header = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this.http.delete(this.url + 'comment/' + topicId + '/' + commentId, {headers: header});
  }

}
