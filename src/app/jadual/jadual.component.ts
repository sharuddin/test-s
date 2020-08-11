import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LadangDataSource } from './ladang-datasource';
import { ActivatedRoute } from '@angular/router';
import { LadangService } from './ladang.service';
import { Ladang } from './ladang';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BorangComponent } from '../borang/borang.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-jadual',
  templateUrl: './jadual.component.html',
  styleUrls: ['./jadual.component.css']
})
export class JadualComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Ladang>;
  @ViewChild('input') input: ElementRef;
  dataSource: LadangDataSource
  ladang: Ladang;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nama', 'kategori', 'telefon'];

  constructor(private route: ActivatedRoute, private ladangService: LadangService, public dialog: MatDialog) {

  }
  ngOnInit()  {
 this.dataSource = new LadangDataSource(this.ladangService);
    //this.soil = this.route.snapshot.data['soil'];
    this.dataSource.loadLadang('', 'id', 'asc', 0, 10);
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLadangPage();
        })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLadangPage())
      )
      .subscribe();


  
  }

  loadLadangPage() {
    this.dataSource.loadLadang(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }


  editLadang(ladang?: Ladang) {
    const dialogRef = this.dialog.open(BorangComponent, {
      // width: '250px',
      data: ladang != null ? ladang : { id: null, nama: '', kategori: '', telefon: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.ladangService.save(result)
        .subscribe((data: Ladang) => {
          console.log(data);
          this.loadLadangPage();
        });
    });
  }

  deleteLadang(id: number, msg: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width: '250px',
      data: { id: id, message: msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.ladangService.delete(id).subscribe(
          () => {
            this.loadLadangPage();
          }
        );
    });
  }
}
