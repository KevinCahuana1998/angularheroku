import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { Topic } from 'src/app/models/topic';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  public topics: Topic[];
  public nextPage: number;
  public previousPage: number;
  public totalPages: number;
  public numberPages: number[];

  constructor(
    private router: Router,
    private topicService: TopicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe( (data: any) => {
      this.getTopics(parseInt(data.page, 10));
    });
  }

  getTopics( page = 1) {
    this.topicService.getTopicsPage(page).subscribe( (data: any) => {
      if (isNaN(page)) {
        page = 1;
      }
      if (data.topics) {
        this.topics = data.topics;
        const  numberPages: number[] = [];
        this.totalPages = data.totalPages;
        for ( let i = 1; i <= this.totalPages; i++ ) {
          numberPages.push(i);
        }
        this.numberPages = numberPages;
        if (page >= 2) {
          this.previousPage = page - 1;
        } else {
          this.previousPage = 1;
        }

        if (page < this.totalPages) {
          this.nextPage = page + 1;

        } else {
          this.nextPage = this.totalPages;
        }

      } else {
        console.log('No trajo los topic');
      }
    }, (error) => {
      console.log(error);
    });
  }

}
