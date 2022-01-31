import { ActionModel, PerceptionModel } from './../models/model';
import { PlaceModel } from '../models/model';
import {
  trigger,
  animate,
  state,
  style,
  transition,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('placeStatus', [
      state(
        'CLEAN',
        style({
          backgroundColor: '#b4bfbd',
        })
      ),
      state(
        'DIRTY',
        style({
          backgroundColor: '#a36e40',
        })
      ),
    ]),
    trigger('stateMachine', [
      state(
        'LEFT',
        style({
          transform: 'translateX(-10em)',
        })
      ),
      state(
        'RIGHT',
        style({
          transform: 'translateX(10em)',
        })
      ),
      state(
        'UP',
        style({
          transform: 'translateY(-10em)',
        })
      ),
      state(
        'DOWN',
        style({
          transform: 'translateY(10em)',
        })
      ),

      transition('UP => RIGHT', animate('300ms ease-in')),
      transition('RIGHT => DOWN', animate('300ms ease-out')),
      transition('DOWN => LEFT', animate('300ms ease-out')),
      transition('LEFT => UP', animate('300ms ease-in')),

      transition('RIGHT => UP', animate('300ms ease-in')),
      transition('UP => LEFT', animate('300ms ease-out')),
      transition('LEFT => DOWN', animate('300ms ease-out')),
      transition('DOWN => RIGHT', animate('300ms ease-in')),

      transition('UP => DOWN', animate('300ms ease-in')),
      transition('DOWN => UP', animate('300ms ease-in')),
      transition('RIGHT => LEFT', animate('300ms ease-in')),
      transition('LEFT => RIGHT', animate('300ms ease-in')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title: string = 'AUTUM-VACUM';
  actionController: FormGroup = this.formBuilder.group({
    upClean: new FormControl('RIGHT'),
    upDirty: new FormControl('SUCK'),
    rightClean: new FormControl('DOWN'),
    rightDirty: new FormControl('SUCK'),
    downClean: new FormControl('LEFT'),
    downDirty: new FormControl('SUCK'),
    leftClean: new FormControl('UP'),
    leftDirty: new FormControl('SUCK'),
  });

  state: string = 'UP';
  actions: ActionModel[] = [
    {
      actionClean: this.actionController.value.upClean,
      actionDirty: this.actionController.value.upDirty,
    },
    {
      actionClean: this.actionController.value.rightClean,
      actionDirty: this.actionController.value.rightDirty,
    },
    {
      actionClean: this.actionController.value.downClean,
      actionDirty: this.actionController.value.downDirty,
    },
    {
      actionClean: this.actionController.value.leftClean,
      actionDirty: this.actionController.value.leftDirty,
    },
  ];
  places: PlaceModel[] = [
    { position: 'UP', status: 'CLEAN' },
    { position: 'RIGHT', status: 'CLEAN' },
    { position: 'DOWN', status: 'CLEAN' },
    { position: 'LEFT', status: 'CLEAN' },
  ];
  location: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log('FORM ', this.actionController);

    setInterval(() => {
      this.updateActions();
      let perceptions = this.agentPerceptions(this.location);
      this.agentActions(perceptions, this.location);
      console.log('PLACES ', this.places);
    }, 1000);
  }

  dirtyPlace(location: number) {
    this.places[location].status = 'DIRTY';
    console.log('PLACES ', this.places);
  }

  clearFloor(location: number) {
    this.places[location].status = 'CLEAN';
  }

  agentActions(perceptions: PerceptionModel, location: number) {
    console.log('ACTION ', perceptions);
    if (perceptions.action == 'SUCK') {
      this.clearFloor(location);
      this.state = this.state;
      this.location = location;
    }
    if (perceptions.action == 'UP') {
      this.location = 0;
    } else if (perceptions.action == 'RIGHT') {
      this.location = 1;
    } else if (perceptions.action == 'DOWN') {
      this.location = 2;
    } else if (perceptions.action == 'LEFT') {
      this.location = 3;
    }

    if (perceptions.action != 'SUCK') {
      this.state = perceptions.action;
    }
  }

  agentPerceptions(location: number): PerceptionModel {
    let perceptStatus = this.places[location].status;
    let perceptAction =
      perceptStatus == 'CLEAN'
        ? this.actions[location].actionClean
        : this.actions[location].actionDirty;

    return { status: perceptStatus, action: perceptAction };
  }

  updateActions() {
    this.actions[0].actionClean = this.actionController.value.upClean;
    this.actions[0].actionDirty = this.actionController.value.upDirty;
    this.actions[1].actionClean = this.actionController.value.rightClean;
    this.actions[1].actionDirty = this.actionController.value.rightDirty;
    this.actions[2].actionClean = this.actionController.value.downClean;
    this.actions[2].actionDirty = this.actionController.value.downDirty;
    this.actions[3].actionClean = this.actionController.value.leftClean;
    this.actions[3].actionDirty = this.actionController.value.leftDirty;
  }
}
