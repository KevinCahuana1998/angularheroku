import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { Topic } from 'src/app/models/topic';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public topics: Topic[];
  public search: string;

  constructor(
    private router: Router,
    private topicService: TopicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe( (data: any) => {
      this.search = data.search;
      if (this.search.trim() === '') {
        this.router.navigate(['/temas']);
      }
      this.getTopics(this.search);
    });
  }

  getTopics(texto: string) {
    this.topicService.search(texto).subscribe( (data: any) => {
      if ( data.topics) {
        this.topics = data.topics;
      } else {
        console.log('error');
      }
    }, (error) => {
      console.log(error);
    });
  }

}
