import { MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { MatCheckboxModule, MatSelectModule, MatListModule } from '@angular/material';

import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatListModule],
    exports: [MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatListModule]
})
export class MaterialModule { }