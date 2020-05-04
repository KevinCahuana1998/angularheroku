import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  public url: string;

  constructor(
    private http: HttpClient
    ) {
    this.url = global.url;
  }

  add(topic: any, token: string) {

    const header = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this.http.post(this.url + 'topic', JSON.stringify(topic), { headers: header});
  }

  getTopicsByUser(id: string) {
    return this.http.get(this.url + 'user-topics/' + id);
  }

  getTopic(id: string) {
    return this.http.get(this.url + 'topic/' + id);
  }

  updateTopic(topic: any, token: string) {
    const header = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this.http.put(this.url + 'topic/' + topic._id, JSON.stringify(topic), { headers: header});
  }

  deleteTopic(id: string, token: string) {
    const header = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this.http.delete(this.url + 'topic/' + id, { headers: header});
  }

  getTopicsPage(page = 1) {
    return this.http.get(this.url + 'topics/' + page);
  }

  search(texto: string) {
    return this.http.get(this.url + 'search/' + texto);
  }

}
