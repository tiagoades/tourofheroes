import { Component, OnInit } from "@angular/core";
import { HeroService } from "../../../core/services/hero.service";
import { Hero } from "../../../core/models/hero.model";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero!: Hero;

  constructor(
    private heroesService: HeroService,
    private location: Location,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.getHero();

  }

  getHero(): void{

    const id = Number(this.routes.snapshot.paramMap.get('id'));

    this.heroesService.getHero(id).subscribe(hero => (this.hero = hero));

  }

  goBack(): void{

    this.location.back();

  }

}


