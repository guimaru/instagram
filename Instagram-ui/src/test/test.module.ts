import { NgModule } from '@angular/core';
import { authService } from '../app/service/auth.service';
import { UserService } from '../app/service/user.service';
import { AuthServiceTest } from './auth.service.test';
import { UserServiceTest } from './user.service.test';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { FollowService } from '../app/service/follow.service';
import { FollowServiceTest } from './follow.service.test';
import { PostService } from '../app/service/post.service';
import { PostServiceTest } from './post.service.test';

@NgModule({
    imports: [
        RouterTestingModule
    ],
    declarations: [],
    providers: [
        {
            provide: authService,
            useClass: AuthServiceTest
        }, {
            provide: UserService,
            useClass: UserServiceTest
        }, {
            provide: FollowService,
            useClass: FollowServiceTest
        }, {
            provide: PostService,
            useClass: PostServiceTest
        },
        FormBuilder
    ],
    exports: [RouterTestingModule]
})
export class AppTestModule { }
