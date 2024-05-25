import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { filmResultDTO } from '../../constants/api-dto';
import { HelperService } from '../../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class SliderComponent implements OnInit {
  current = 0;
  movies_data: any;
  @Input() movies: filmResultDTO[] = [];

  constructor(public helperService: HelperService,
    public router: Router
  ) { }

  ngOnInit() {
    this.sliderTimer();
  }

  sliderTimer() {
    setInterval(() => {
      this.current = ++this.current % this.movies.length;
    }, 5000);
  }

  redirectToMovie(url: string) {
    const id = this.helperService.getIdfromUrl(url);
    this.router.navigate([`/movie/${id}`]);
  }
}
