import { Address } from "../value-object/address";

// Foque no cliente, foque no negócio
/*

 Complexidade de negócio
  Entity - (Domain)
  - customer.ts (regras de negócio)

  Complexidade acidental
  infra (Mundo externo, detalhe)
  - Entity / Model
   - customer (get, set)

  Modelagem de persistência !== modelagem de negócio

  A modelagem de persistência é feita em outra etapa do desenvolvimento

*/

/*

  --> Entidade <-- de Negócio
  "Entidade" de Persistencia - ORM

*/

// Entidade Focada em negócio
export class Customer {
  // Esse id server pra mim identificar esse objeto no meu sistema
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    //Estrategia para manter a entidade consitente.
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  isActive(): boolean {
    return this._active;
  }

  // Uma entidade por padrão sempre tem que se autovalidar.
  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  get address() {
    return this._address;
  }

  // expressividade semântica
  changeAddress(address: Address) {
    this._address = address;
  }

  changeName(name: string) {
    this._name = name;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer!");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }
}

// Os dados a todo momento devem estar consistentes - 100% do tempo

// Evitar isso - não existe cliente sem nome!!! - mas tudo depende das regras de negócio da aplicação
// let customer = new Customer("123", "");
