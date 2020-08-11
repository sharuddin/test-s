import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DirektoriDataSource } from './direktori-datasource';
import { ActivatedRoute } from '@angular/router';
import { DirektoriService } from './direktori.service';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Direktori } from './direktori';



@Component({
  selector: 'app-maklumat',
  templateUrl: './maklumat.component.html',
  styleUrls: ['./maklumat.component.css']
})
export class MaklumatComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Direktori>;
  @ViewChild('input') input: ElementRef;
  dataSource: DirektoriDataSource
  direktori: Direktori;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['negeri', 'Bandar', 'Hospital', 'Klinik','action'];

  constructor(private route: ActivatedRoute, private direktoriservice: DirektoriService, public dialog: MatDialog) {

  }
  ngOnInit()  {
 this.dataSource = new DirektoriDataSource(this.direktoriservice);
    //this.soil = this.route.snapshot.data['soil'];
    this.dataSource.loadDirektori('', 'negeri', 'asc', 0, 10);
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
          this.loadDirektoriPage();
        })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadDirektoriPage())
      )
      .subscribe();


  
  }
  loadDirektoriPage() {
    throw new Error("Method not implemented.");
  }

  loadLadangPage() {
    this.dataSource.loadDirektori(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }


  editDirektori(direktori?: Direktori) {
    const dialogRef = this.dialog.open(MaklumatComponent, {
      // width: '250px',
      data: direktori != null ? direktori : { negeri:'', bandar: '', hospital: '', klinik: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.direktoriservice.save(result)
        .subscribe((data: Direktori) => {
          console.log(data);
          this.loadDirektoriPage();
        });
    });
  }

  
}