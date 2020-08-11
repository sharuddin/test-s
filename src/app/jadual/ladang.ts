export interface Ladang {
    id: number;
    nama: string;
    kategori: string;
    telefon: string;
}

export interface LadangRestResult {
    count: number;
    results: Ladang[];
}