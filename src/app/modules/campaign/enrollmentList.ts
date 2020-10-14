export class enrollmentList {
    name: string;
    category: string;
    email: string;
    phone: string;
    gender: string;
    location: string;
    status: string;

    constructor(name: string,
        category: string,
        email: string,
        phone: string,
        gender: string,
        location: string,
        status: string) { 
            this.name = name;
            this.category = category;
            this.phone = phone;
            this.gender = gender;
            this.location = location;
            this.status = status;
            this.email = email;
        }
}

export class PagedData<T> {
    data = new Array<T>();
    page = new Page();
}

export class Page {
      //The number of elements in the page
      size: number = 0;
      //The total number of elements
      totalElements: number = 0;
      //The total number of pages
      totalPages: number = 0;
      //The current page number
      pageNumber: number = 0;
}