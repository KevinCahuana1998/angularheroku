import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../../services/topic.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public identity: any;
  public topics: any[];
  public token: string;

  constructor(
    private topicService: TopicService,
    private userService: UserService,
    private router: Router
    ) {
      this.identity = userService.getIdentity();
      this.token = userService.getToken();
    }

  ngOnInit() {
    this.topicService.getTopicsByUser(this.identity._id).subscribe( (data: any) => {
      this.topics = data.topics;
    });
  }

  delete(id: string) {
    this.topicService.deleteTopic(id, this.token).subscribe( (data: any) => {
      if (data.topicDeleted && data.topicDeleted._id) {
        this.topicService.getTopicsByUser(this.identity._id).subscribe( (response: any) => {
          this.topics = response.topics;
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

}
