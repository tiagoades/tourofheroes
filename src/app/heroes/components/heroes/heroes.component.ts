import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/models/dialog-data.model';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'actions'];
  heroes: Hero[] = [];

  constructor(private dialog: MatDialog, private heroService: HeroService) {}

  ngOnInit(): void{
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getAll().subscribe(
      (heroes) => (this.heroes = heroes)
      );
  }

  delete(hero: Hero): void{
    const dialogData: DialogData = {
      cancelText: 'Cancel',
      confirmText: 'Delete',
      content: `Delete '${hero.name}' ?`,
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if(result){
        this.heroService.delete(hero).subscribe(() => {
          //this.heroes = this.heroes.filter((h) => h !== hero);
          this.getHeroes();
        });
      }
    });

  }

  onSelected(hero: Hero): void{
    this.delete(hero);
  }

}
