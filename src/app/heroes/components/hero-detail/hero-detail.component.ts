import { Component, OnInit } from "@angular/core";
import { HeroService } from "../../../core/services/hero.service";
import { Hero } from "../../../core/models/hero.model";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero!: Hero;
  isEditing = false;

  form = this.fb.group({
    id:[{ value: '', disabled: true }],
    name:['', [Validators.required, Validators.minLength(3)]],
  })

  constructor(
    private fb: FormBuilder,
    private heroesService: HeroService,
    private location: Location,
    private routes: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {

    this.getHero();

  }

  getHero(): void{

    const paramId = this.routes.snapshot.paramMap.get('id');

    if(paramId !== 'new'){

      this.isEditing = true;
      const id = Number(paramId);
      this.heroesService.getOne(id).subscribe((hero) => {
      this.hero = hero;
      this.form.controls['id'].setValue(String(hero.id));
      this.form.controls['name'].setValue(hero.name);
      });

    }

  }

  goBack(): void{

    this.location.back();

  }

  update(): void{
    const { valid, value } = this.form;

    if(valid){

      const hero: Hero = {
        id: this.hero.id,
        name: value.name,
      } as Hero;

      this.heroesService.update(hero).subscribe(() => this.goBack());

    }else{

      this.showErrorMsg();

    }
  }

  create(): void{

    const { valid, value } = this.form;

    if(valid){

      const hero: Hero = {
        name: value.name,
      } as Hero;

      this.heroesService.create(hero).subscribe(() => this.goBack());

    }else{

      this.showErrorMsg();

    }

  }

  private showErrorMsg(){

    this.snackBar.open('Please check the errors found.', 'Ok',{
      duration: 5000,
      verticalPosition: 'top',

    });
  }

}


