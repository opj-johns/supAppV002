import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// material  imports
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {CdkAccordionModule} from '@angular/cdk/accordion';

@NgModule({
  declarations: [],
  imports: [
     CommonModule,
     MatToolbarModule,
     MatIconModule,
     MatSidenavModule, 
     MatCardModule,
     MatButtonModule,
     HttpClientModule,
     MatDialogModule,
     MatInputModule,
     MatFormFieldModule,
     MatTableModule
  ],
   exports:[
     CommonModule,
     MatToolbarModule,
     MatIconModule,
     MatSidenavModule, 
     MatCardModule,
     MatButtonModule,
     HttpClientModule,
     MatDialogModule,
     MatInputModule,
     MatFormFieldModule,
     MatTableModule,
     MatDividerModule,
     MatListModule,
     MatPaginatorModule,
     MatGridListModule,
     CdkAccordionModule
   ]
})
export class MaterialModule { }
