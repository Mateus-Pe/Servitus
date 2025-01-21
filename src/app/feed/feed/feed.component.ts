import { Component, Renderer2, OnInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faCalendar, faMagnifyingGlassLocation, faChurch  } from '@fortawesome/free-solid-svg-icons';
import { MontaFeedComponent } from '../../monta-feed/monta-feed/monta-feed.component';
import { GetFeedService } from '../../services/get_feed/get-feed.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, MontaFeedComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements OnInit, OnDestroy {
  faHouse = faHouse;
  faCalendar = faCalendar;
  faMagnifyingGlassLocation = faMagnifyingGlassLocation;
  faChurch = faChurch;

  isMenuOpen: boolean = false;

  cidadeId = '';
  agendas: any[] = [];

  constructor(private getFeedService: GetFeedService,
              private renderer: Renderer2)
  {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'styleBody');

    this.cidadeId = '9240';
    this.carregaFeed();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'styleBody');
  }

  carregaFeed(){
    const requestData = { cidade_id: this.cidadeId };
    this.getFeedService.getFeed(requestData).subscribe({
      next: (response) => {
        this.agendas = response.lista_feed_cidade;
      },
      error: (error) => {
        console.error("erro ao carregar o feed: ", error);
      }
    })
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.renderer.addClass(document.documentElement, 'overflow-hidden');
      this.renderer.addClass(document.body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(document.documentElement, 'overflow-hidden');
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }
}
