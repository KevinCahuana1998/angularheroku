import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../../services/topic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public status: string;
  public topic: Topic;
  public idTopic: string;
  public token: string;

  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.token = userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this.route.params.subscribe((dataUrl) => {
      this.idTopic = dataUrl.id;
    });
    this.topicService.getTopic(this.idTopic).subscribe((data: any) => {
      this.topic = data.topic[0];
    });
  }

  onSubmit(form: any) {
    this.topicService.updateTopic(this.topic, this.token).subscribe( (data: any) => {
      if ( data.topic && data.topic._id) {
        this.status = 'success';
      } else {
        this.status = 'error';
      }
    }, (error) => {
      this.status = 'error';
    });
  }

  regresar() {
    this.router.navigate(['/panel/listado']);
  }
}
