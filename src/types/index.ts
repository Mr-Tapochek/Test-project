export interface Painting {
    authorId: number;
    created: string;
    id: number;
    imgUrl: string;
    locationId: number;
    name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
}