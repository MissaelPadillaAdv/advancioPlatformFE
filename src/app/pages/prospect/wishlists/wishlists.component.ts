import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { WishlistService } from 'src/app/services/prospect/wishlist.service';
import { AlertsService } from '../../../services/alerts.service';
import { TalentModel } from '../../../models/prospect/talent.model';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.css']
})
export class WishlistsComponent implements OnInit {

  //Arrays
  public wishLists: any[] = []; 
  public talents: any[] = [];
  public wishListsToMove: any[] =[];

  //Proces Variables
  public loading = true; 
  public loadingTabs = true; 
  public indicator: string = '#';
  public currentId: string = '';
  public currentName: string = '';
  public formSubmitted: boolean = false;
  public isNew = false;
  public modalTitle = "Create new Wishlist category.";
  //Form to save the category
  public wishForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

public talent = new TalentModel();

  constructor(private wishListService: WishlistService, private formBuilder: FormBuilder, private alertService: AlertsService) { 
    this.getWishList();
  }
  ngOnInit(): void {
  }

  
  getWishList() {
    this.wishListService.getWishLists().subscribe( async (resp: any) => {
      this.wishLists = resp.items;
      await this.getTalents(this.wishLists[0].id)
      setTimeout(() => {
        this.loading = false;
        this.loadingTabs = false
      }, 7000);
      this.currentName = this.wishLists[0].name
    })
  }

  async getTalents(id: string){
    this.loading = true;
    await this.wishListService.getTalentsByWishListsId(id).subscribe( (resp: any) => {
      this.talents = resp.items;
      setTimeout(() => {
        this.loading = false;
      }, 7000);
    })
    this.filterWishlists(id);
  }
  
  filterWishlists(id: string){
    this.wishListsToMove = this.wishLists.filter(f => f.id !== id);
    this.currentId = id;
  }

  delete(currentId: string, name: string){
    this.alertService.questionAlert(`Your Wishlist category "${name}" will be deleted.`,'The talent associations from this list will be removed too. This action can not be reversed.')
    .then((resp: any) => {
      if(resp){
        this.loadingTabs = true;
        if(this.talents.length > 0){
          const data = {
            id: currentId,
            talents: this.talents
          }
          this.callRemoveTalentsEndPoint(data)
        }
        this.wishListService.deleteWishlist(currentId).subscribe((resp: any) =>{
          this.getWishList();
          this.alertService.successAlert('Your Wishlist category has been deleted successfully.', 'Deleted!');
        })
      }
    });
  }

  save(){
    this.formSubmitted = true;
    this.clearValues();
    if (this.wishForm.invalid) return console.log('Formulario con errores');

    const whishList = {
      id: this.currentId,
      name: this.wishForm.get('name')?.value
    }

    if(this.isNew){
      this.create(whishList);
    }
    else {
      this.update(whishList);
    }
  }

  clearValues(){
    const myModalEl = document.getElementById('exampleModal')
    myModalEl!.addEventListener('hidden.bs.modal', event => {
      this.wishForm.reset({name: ''});
      this.wishForm.clearAsyncValidators();
      this.formSubmitted = false;
    })
  }

  getDataToModal(){
    this.wishForm.setValue({name: this.currentName});
    this.modalTitle = "Update Wishlist category name.";
  }
  create( data: any){
    this.loadingTabs = true;
    this.wishListService.create(data).subscribe( (resp: any) => {
      this.getWishList();
      this.closeModal();
      this.alertService.successAlert('Your Wishlist category has been created successfully.', 'Created!');
    })
  }

  update( data: any){
    this.loadingTabs = true;
    this.wishListService.update(data).subscribe( async (resp: any) => {
      await this.getWishList();
      this.closeModal();
      this.alertService.successAlert('Your Wishlist category has been updated successfully.', 'Updated!');
    })
  }

  closeModal(){
    const button = document.getElementById('close')
    button?.click();
  }

  removeTalent(talent: string, talentName: string){
    const data = {
      id: this.currentId,
      talents: [
        talent
      ]
    }
    this.alertService.questionAlert(`The talent "${talentName}" will be removed from the Wishlist "${this.currentName}".`,'Are you sure? This action can not be reversed.')
    .then((resp: any) => {
      if(resp){
        this.loading = true;
        this.callRemoveTalentsEndPoint(data, talentName);
      }
    });
  } 

  moveTo(wishListItem: string, talent: string, talentName: string, wishListName: string){
    const data = { talents: [ talent ], idWishListOrigin: this.currentId, idWishListDestination: wishListItem }

    this.loading = true;
    this.wishListService.moveTo(data).subscribe( async (resp: any) => {
      await this.getTalents(this.currentId);
      this.alertService.successAlert(`Talent "${talentName}" was moved from "${this.currentName}" category to ${wishListName} category successfully.`, 'Moved!')
    })
  }
  
  showTalent(talent: any){
    
    this.talent = talent;

    console.log('talent', this.talent)

  }

  callRemoveTalentsEndPoint(data: any ,talentName: string = ''){
    this.wishListService.removeTalents(data).subscribe( async (resp: any) => {
      await this.getTalents(this.currentId);
      if(talentName){
        this.alertService.successAlert(`Talent "${talentName}" was deleted from "${this.currentName}" category successfully.`, 'Deleted!')
      }
    })
  }

}
