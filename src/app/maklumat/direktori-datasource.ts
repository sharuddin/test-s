import { DataSource } from '@angular/cdk/table';
import { Direktori, DirektoriRestResult } from './direktori';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { DirektoriService } from './direktori.service';


export class DirektoriDataSource implements DataSource<Direktori>{
    [x: string]: any;
    private direktoriSubject = new BehaviorSubject<Direktori[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

   

    constructor(private direktoriService: DirektoriService) { }

    loadDirektori(filter: string, sortColumn: string, sortDirection: string, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);
        this.direktoriService.findLadangDT(filter, sortColumn, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((data: DirektoriRestResult) => {
                this.direktoriSubject.next(data.results);
                this.countSubject.next(data.count);
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<Direktori[]> {
        console.log("Connecting data source");
        return this.direktoriSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.direktoriSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }
}