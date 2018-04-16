import { NgModule } from '@angular/core'
import {
  MatButtonModule, MatCardModule, MatProgressBarModule, MatIconModule, MatMenuModule,
  MatToolbarModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCheckboxModule,
  MatTooltipModule, MatListModule, MatSnackBarModule, MatChipsModule, MatProgressSpinnerModule,
  MatDialogModule, MatTabsModule, MatButtonToggle, MatButtonToggleModule, MatRadioModule, MatSlideToggleModule
} from '@angular/material'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'

const modules = [
  MatButtonModule,
  MatCardModule,
  MatProgressBarModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatListModule,
  MatSelectModule,
  MatTableModule,
  MatSnackBarModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatSlideToggleModule
]

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule { }