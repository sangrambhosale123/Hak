import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class sharedService{
    Uid:string|undefined;
    isActive = new EventEmitter<string>();
    setter(uid:string|undefined){
        this.Uid = uid;
    }
    getter():any{
        return this.Uid
    }
}