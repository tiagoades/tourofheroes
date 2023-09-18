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
  isEditing!: boolean;

  constructor(
    private heroesService: HeroService,
    private location: Location,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.getHero();

  }

  getHero(): void{

    const paramId = this.routes.snapshot.paramMap.get('id');

    if(paramId === 'new'){
      this.isEditing = false;
      this.hero = { name: ''} as Hero;
    }else{
      this.isEditing = true;
      const id = Number(paramId);
      this.heroesService.getOne(id).subscribe(hero => (this.hero = hero));
    }

  }

  goBack(): void{

    this.location.back();

  }

  update(): void{
    this.heroesService.update(this.hero).subscribe(() => this.goBack());

  }

  create(): void{
    this.heroesService.create(this.hero).subscribe(() => this.goBack());
  }

  isFormValid(): boolean{

    return !!this.hero.name.trim();

  }

}


