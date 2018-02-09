import { Scopes, Guesses } from '../shared/shared.model';

export class Scope {
  public id: number;
  public title: string;
  public description: string;
  public scopes: Scopes[];
  public guesses: Guesses[];

  constructor(id: number, title: string, desc: string, scopes: Scopes[], guesses: Guesses[]) {
    this.id = id;
    this.title = title;
    this.description = desc;
    this.scopes = scopes;
    this.guesses = guesses;
  }
}
