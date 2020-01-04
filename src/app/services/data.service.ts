import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(
        private httpClt: HttpClient,
    ) {
    }

    token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZnVybml0dXJlLmdyYXNzYnVzaW5lc3NsYWJzLm1sXC9cL2FwaVwvbG9naW5BZG1pbiIsImlhdCI6MTU2NDA0NzEzOSwiZXhwIjoxNjI0MDQ3MDc5LCJuYmYiOjE1NjQwNDcxMzksImp0aSI6Ik1lQzJBclcxMVNHdHpjaXkiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.KPlvZpeAU6CgI7iItcBL6SEZHGknRC0StgFWSFYcioI`;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json',
            Authorization: `Bearer ${this.token}`
        }),
    };
    admin = {
        email: 'admin@gmail.com',
        password: '123456',
    };
    host = 'https://furniture.grassbusinesslabs.ml';

    test() {
        this.get().subscribe(data => console.log(data));
    }

    get() {
        return this.httpClt.get(this.host + '/api/allVideosAllUsers', this.httpOptions);
    }

    postAuth(admin) {
        return this.httpClt.post(this.host + '/api/loginAdmin', admin, this.httpOptions);
    }

    put(task, index) {
        console.log('PUT =>');
        return this.httpClt.put('https://jsonplaceholder.typicode.com/todos/' + index, task, this.httpOptions);
    }

    delete(index) {
        console.log('DELETE =>');
        return this.httpClt.delete('https://jsonplaceholder.typicode.com/todos/' + index, this.httpOptions);
    }
}
