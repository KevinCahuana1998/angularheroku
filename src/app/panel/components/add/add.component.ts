import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from '../../../models/topic';
import { TopicService } from '../../../services/topic.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public status: string;
  public identity: any;
  public token: string;
  public topic: Topic;

  constructor(
    private topicService: TopicService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
    ) {

      this.token = userService.getToken();
      this.identity = userService.getIdentity();
      this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
    }

  ngOnInit() {
  }

  onSubmit(form: any) {
    this.topicService.add(this.topic, this.token).subscribe((data: any) => {
      if ( data.topic && data.topic._id ) {
        this.status = 'success';
        this.topic = data.topic;
        this.router.navigate(['/panel', 'listado']);

      } else {
        this.status = 'error';
      }
    }, (error) => {
      this.status = 'error';
    });
  }

}
