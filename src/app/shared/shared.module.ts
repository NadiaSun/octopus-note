import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthService } from "../admin/shared/auth.service";
import { QuillModule } from "ngx-quill";

@NgModule({
    imports: [
        HttpClientModule,
        QuillModule.forRoot(),
    ],
    exports: [
        HttpClientModule,
        QuillModule
    ],
    providers: [
        AuthService,
    ]
})
export class SharedModule {
    
}