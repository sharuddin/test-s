import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface JadualItem {
  nama: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: JadualItem[] = [
  {id: 1, nama: 'Hydrogen'},
  {id: 2, nama: 'Helium'},
  {id: 3, nama: 'Lithium'},
  {id: 4, nama: 'Beryllium'},
  {id: 5, nama: 'Boron'},
  {id: 6, nama: 'Carbon'},
  {id: 7, nama: 'Nitrogen'},
  {id: 8, nama: 'Oxygen'},
  {id: 9, nama: 'Fluorine'},
  {id: 10, nama: 'Neon'},
  {id: 11, nama: 'Sodium'},
  {id: 12, nama: 'Magnesium'},
  {id: 13, nama: 'Aluminum'},
  {id: 14, nama: 'Silicon'},
  {id: 15, nama: 'Phosphorus'},
  {id: 16, nama: 'Sulfur'},
  {id: 17, nama: 'Chlorine'},
  {id: 18, nama: 'Argon'},
  {id: 19, nama: 'Potassium'},
  {id: 20, nama: 'Calcium'},
];

/**
 * Data source for the Jadual view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class JadualDataSource extends DataSource<JadualItem> {
  data: JadualItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<JadualItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: JadualItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: JadualItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'nama': return compare(a.nama, b.nama, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}