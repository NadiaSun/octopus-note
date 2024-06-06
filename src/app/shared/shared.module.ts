import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthService } from "../admin/shared/auth.service";

@NgModule({
    imports: [
        HttpClientModule,
    ],
    exports: [
        HttpClientModule
    ],
    providers: [
        AuthService,
    ]
})
export class SharedModule {
    
}