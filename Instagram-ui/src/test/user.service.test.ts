import { Observable, of } from 'rxjs';
import { PostDto } from '../app/model/Post';
import { User } from '../app/model/User';

export class UserServiceTest {
    getUsers(): Observable<User[]> {
        return null;
    }
    registerUser(user: User): Observable<User> {
        return null;
    }
    changeUserData(user: User): Observable<User> {
        return null;
    }
    getProfile(name: String): Observable<User> {
        return of(User.createDummy());
    }
    getAmountFollowers(id: number): Observable<number> {
        return of(0);
    }
    getAmountFolloweds(id: number): Observable<number> {
        return of(0);
    }
    getFollowers(id: number): Observable<User[]> {
        return of([User.createDummy()]);
    }
    getFolloweds(id: number): Observable<User[]> {
        return of([User.createDummy()]);
    }
    getAmountPost(id: number): Observable<number> {
        return of(0);
    }
    modifyPass(oldpass: string, userName: string, newPass: string): Observable<boolean> {
        return null;
    }
    uploadImage(foto: string, descripcion: string, id: number, fecha: Date): Observable<PostDto> {
        return null;
    }
    updatePerfilPhoto(idUser: number, photo: string): Observable<{} | User> {
        return null;
    }
    searchUsers(text: string): Observable<any[] | User[]> {
        return null;
    }

    constructor() {

    }

}
