export interface Direktori {
    negeri: string;
    Bandar: string;
    Hospital: string;
    Klinik: string;
}

export interface DirektoriRestResult {
    count: number;
    results: Direktori[];
}