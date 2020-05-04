import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { Topic } from 'src/app/models/topic';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  public topic: Topic;
  public identity: User;
  public comment: Comment;
  public token: string;
  public status: string;
  public url: string;
  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private userService: UserService,
    private commentService: CommentService
  ) {
    this.topic = new Topic('', '', '', '', '', '', '', '');
    this.identity = userService.getIdentity();
    this.comment = new Comment('', '', '', '');
    this.token = userService.getToken();
    this.url = global.url;
    if (this.identity == null) {
      this.identity = new User('', '', '', '', '', '', '');
    }
  }

  ngOnInit() {
    this.route.params.subscribe( (data) => {
      this.topicService.getTopic(data.id).subscribe( (topic: any) => {
        this.topic = topic.topic[0];
      });
    });
  }

  onSubmit(form: any) {
    this.comment.user = this.identity._id;
    this.commentService.addComment(this.comment, this.token, this.topic._id).subscribe( (data: any) => {
      if (data.topic) {
        this.status = 'success';
        this.topic = data.topic;
        form.reset();
      } else {
        this.status = 'error';
      }
    }, ( error) => {
      this.status = 'error';
    });
  }

  delete(comentId) {
    this.commentService.deleteComment(comentId, this.token, this.topic._id).subscribe((data: any) => {
      console.log(data);
      this.topic = data.topic;
    });
  }

}
