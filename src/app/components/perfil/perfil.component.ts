import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Topic } from 'src/app/models/topic';
import { global } from '../../services/global';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public user: User;
  public topics: Topic[];
  public userId: string;
  public url: string;

  constructor(
    private topicService: TopicService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.url = global.url;
    this.user = new User('', '', '', '', '', '', '');
  }

  ngOnInit() {

    this.route.params.subscribe( (data) => {
      this.userId = data.id;
      this.getUser(this.userId);
      this.getTopics(this.userId);
    });
  }

  getUser(id: string) {
    this.userService.getUser(id).subscribe( (data: any) => {
      if (data.user) {
        this.user = data.user;
      } else {
        console.log('error');
      }
    }, (error) => {
      console.log(error);
    });
  }

  getTopics(id: string) {
    this.topicService.getTopicsByUser(id).subscribe( (data: any) => {
      if (data.topics) {
        this.topics = data.topics;
      } else {
        console.log('error');
      }
    }, (error) => {
      console.log(error);
    });
  }

}
