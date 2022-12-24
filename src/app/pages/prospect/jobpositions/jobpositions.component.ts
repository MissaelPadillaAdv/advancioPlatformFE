import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { JobPosition } from '../../../interfaces/prospect/jobpositions.interface';
import { JobpositionService } from '../../../services/prospect/jobpositions.service';
import { JobPositionModel } from '../../../models/prospect/jobpositions.model';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-jobpositions',
  templateUrl: './jobpositions.component.html',
  styleUrls: ['./jobpositions.component.css']
})
export class JobpositionsComponent implements OnInit {

  public jobPositions: JobPosition[] = [];
  public loading: boolean = true;
  public formSubmitted: boolean = false;
  public createForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  })
  public editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  }
  public isActive: boolean = true;
  public isNew: boolean = true;
  public jobPositionId: string = '';

  constructor(private jobPositionService: JobpositionService, private formBuilder: FormBuilder, private alertService: AlertsService) { 
    this.getJobPositions(this.isActive);
  }
  ngOnInit(): void {
  }

  getJobPositions(isActive: boolean, searchTerm: string = "") {
    console.log(searchTerm);
    this.isActive = isActive;
    this.loading = true;
    this.jobPositionService.getJobPositions(isActive, searchTerm).subscribe( (resp: JobPositionModel[]) => {
      this.jobPositions = resp;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    })

  }

  delete(id: string, isActive: boolean, name: string){
    this.alertService.questionAlert(`The job position "${name}" will be delete.`,"Are you sure? You won't be able to revert this!")
    .then( (resp: any) => {
      if (resp) {
        this.loading = true;
        this.jobPositionService.deleteJobPosition(id).subscribe((resp: any) =>{
          this.getJobPositions(isActive);
          this.alertService.successAlert(`Your Job Position "${name}" has been deleted successfully.`, 'Deleted!');
        })
      }
    });
  }

  save(){
    this.formSubmitted = true;
    this.setHideEvent();
    if (this.createForm.invalid) return console.log('Formulario con errores');
    const jobPosition = {
      id: this.jobPositionId,
      name: this.createForm.get('name')?.value,
      description: this.createForm.get('description')?.value,
    }
    if( this.isNew ){
      this.create(jobPosition);
    } else {
      this.update(jobPosition);
    }

  }
  setHideEvent(){
    const myModalEl = document.getElementById('exampleModal')
    myModalEl!.addEventListener('hidden.bs.modal', event => {
      this.createForm.reset({name: '', description: ''});
      this.createForm.clearAsyncValidators();
      this.formSubmitted = false;
    })
  }

  openJobPosition(id: string){
    this.loading = true
    this.jobPositionService.closeOpenJobPosition(id).subscribe(
      (resp: any) => {
        this.getJobPositions(this.isActive);
        const msg = this.isActive ? 'Closed': 'Opened'
        this.alertService.successAlert(`Your job position has been ${msg.toLowerCase()} successfully.`,msg)
      }
    )
  }

  getJobPositionData(id: string, identityName: string, assineeUsername: string, description: string){
    this.createForm.setValue({name: identityName, description});
    this.jobPositionId = id;
    const expmleBtn = document.getElementById('exampleModalbtn');
    expmleBtn?.click();
  }

  async search(searchTerm: string) {
    this.loading = true;
    await this.jobPositionService.getJobPositions(this.isActive, searchTerm).subscribe((resp: JobPositionModel[]) => {
          this.jobPositions = resp;
          setTimeout(() => {
            this.loading = false;
          }, 7000);
        });
  }

  closeModal(){
    const button = document.getElementById('close')
    button?.click();
  }

  create(data: any){
    this.jobPositionService.addJobPosition(data).subscribe( (resp: any) => {
      if(resp.succeeded){
        this.loading = true
        this.closeModal();
        this.getJobPositions(this.isActive);
        this.alertService.successAlert( `Your job position has been created successfully.`,'Created' )
      } else{
        this.alertService.errorAlert(resp.message);
      }
    });
  }

  update(data: any) {
    this.jobPositionService.updateJobPosition(data).subscribe( (resp: any) => {
      console.log(resp)

      if(!resp){

        this.loading = true
        this.closeModal();
        this.getJobPositions(this.isActive);
        this.alertService.successAlert( `Your job position has been updated successfully.`,'Updated' )

      } else {
        this.alertService.errorAlert(resp.error.error.message);
      }
    });
  }

}
