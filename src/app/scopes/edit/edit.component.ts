import { ScopeService } from './../scope.service';
import swal from 'sweetalert2';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: number;
  i;
  scopeId: number;
  editMode = false;
  scopeForm: FormGroup;
  scopeList;
  guessList;
  scopeListId: number;
  guessListId: number;


  constructor(private route: ActivatedRoute,
              private scopeService: ScopeService,
              private router: Router,
              private http: Http) {
              }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          const scopeTitle = '';
          const scopeDescription = '';
          const scopeScopes = new FormArray([]);
          const scopeGuesses = new FormArray([]);

          if (this.editMode) {
            this.scopeService.getScopes('api/Guesses').subscribe (
              data => {
                this.scopeId = data.Data[this.id]['Id'];
                const index = data.Data[this.id];

                this.scopeList = data.Data[this.id]['Scopes'];
                this.guessList = data.Data[this.id]['Guesses'];

                for ( const scopeItem of data.Data[this.id]['Scopes']) {
                  this.scopeListId = scopeItem.Id;
                }

                for ( const guessItem of data.Data[this.id]['Guesses']) {
                  this.guessListId = guessItem.Id;
                }

                this.initEditForm(index);
            }
            );
          }
          this.initAddForm();
        }
      );
  }

  onSubmit() {
    const router = this.router;
    const route = this.route;
    const id = this.id;

    if (this.editMode) {
      this.scopeService.updateScope('api/Guesses/' + this.scopeId, this.scopeForm.value).subscribe();
      swal({
        title: 'Scope Update',
        text: 'Scope is updated',
        type: 'success'
        })
          .then(function () {
            // router.navigate(['../'], {relativeTo: route});
            window.location.href = 'scopes/' + id;
        });
    } else {
      this.scopeService.addScope('api/Guesses', this.scopeForm.value).subscribe();
      swal({
        title: 'Add Scope',
        text: 'New Scope added!',
        type: 'success'
        })
          .then(function () {
            setTimeout(() => {
              window.location.href = 'scopes';
            }, 1000);
        });
    }
  }

  onAddScopes() {
    if (this.editMode) {
      this.scopeListId++;
      const scopeId = this.scopeListId;

      (<FormArray>this.scopeForm.get('Scopes')).push(
        new FormGroup({
          'Id': new FormControl(scopeId),
          'ScopeTitle': new FormControl(null, Validators.required),
          'GuessId': new FormControl(this.scopeId),
        })
      );
    } else {
      (<FormArray>this.scopeForm.get('Scopes')).push(
        new FormGroup({
          'ScopeTitle': new FormControl(null, Validators.required),
        })
      );
    }
  }

  getScopes(scopeForm) {
    return scopeForm.get('Scopes').controls;
  }

  onDeleteScopes(index: number) {
    if (this.editMode) {
      const scopeService = this.scopeService;
      const router = this.router;
      const route = this.route;
      const id = this.id;
      const scopeIndex = this.scopeList[index];
      const scopeId = scopeIndex['Id'];

      if (!this.scopeList[index]) {
        (<FormArray>this.scopeForm.get('Scopes')).removeAt(index);
      } else {
              swal({
                title: 'Delete',
                text: 'Do you want to continue',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonColor: '#d33',
            }).then(function () {
                scopeService.deleteScopeList('api/ScopeLists/', scopeId).subscribe();
                window.location.reload();
              }, (dismiss) => {
                // dismiss can be "cancel" | "close" | "outside"
                'cancel';
              });
            }
      } else {
      (<FormArray>this.scopeForm.get('Scopes')).removeAt(index);
    }
  }

  onAddGuesses() {
    if (this.editMode) {
      this.guessListId++;
      const guessId = this.guessListId;

      (<FormArray>this.scopeForm.get('Guesses')).push(
        new FormGroup({
          'Id': new FormControl(guessId),
          'GuessTitle': new FormControl(null, Validators.required),
          'GuessId': new FormControl(this.scopeId),
        })
      );
    }else {
      (<FormArray>this.scopeForm.get('Guesses')).push(
        new FormGroup({
          'GuessTitle': new FormControl(null, Validators.required),
        })
      );
    }
  }

  getGuesses(scopeForm) {
    return scopeForm.get('Guesses').controls;
  }

  onDeleteGuesses(index: number) {
    if (this.editMode) {
      const scopeService = this.scopeService;
      const router = this.router;
      const route = this.route;
      const id = this.id;
      const guessIndex = this.guessList[index];
      const guessId = guessIndex['Id'];

      if ( !this.guessList[index]) {
        (<FormArray>this.scopeForm.get('Guesses')).removeAt(index);
      } else {
        swal({
          title: 'Delete',
          text: 'Do you want to continue',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonColor: '#d33',
      }).then(function () {
          scopeService.deleteGuessList('api/GuessLists/', guessId).subscribe();
          window.location.reload();
        },
        (dismiss) => {
            // dismiss can be "cancel" | "close" | "outside"
            'cancel';
          });
        }
    } else {
      (<FormArray>this.scopeForm.get('Guesses')).removeAt(index);
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  initEditForm(index: any) {
    const scopeTitle = index['Title'];
    const scopeDescription = index['Desc'];
    const scopeScopes = new FormArray([]);
    const scopeGuesses = new FormArray([]);

    for (const scopeItem of index['Scopes']) {
        scopeScopes.push(
          new FormGroup({
            'Id': new FormControl(+scopeItem.Id),
            'ScopeTitle': new FormControl(scopeItem.ScopeTitle, Validators.required),
            'GuessId': new FormControl(scopeItem.GuessId),
          }
        )
      );
    }

    for (const guessItem of index['Guesses']) {
        scopeGuesses.push(
          new FormGroup({
            'Id': new FormControl(+guessItem.Id),
            'GuessTitle': new FormControl(guessItem.GuessTitle, Validators.required),
            'GuessId': new FormControl(guessItem.GuessId)
          })
      );
    }

    this.scopeForm = new FormGroup({
      'Title': new FormControl(scopeTitle, Validators.required),
      'Desc': new FormControl(scopeDescription, Validators.required),
      'Scopes': scopeScopes,
      'Guesses': scopeGuesses
    });
  }

  initAddForm() {
    const scopeTitle = '';
    const scopeDescription = '';
    const scopeScopes = new FormArray([]);
    const scopeGuesses = new FormArray([]);

    this.scopeForm = new FormGroup({
      'Title': new FormControl(scopeTitle, Validators.required),
      'Desc': new FormControl(scopeDescription, Validators.required),
      'Scopes': scopeScopes,
      'Guesses': scopeGuesses
    });
  }
}
