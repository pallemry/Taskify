export class ModalClosedEvent extends Event {

    public readonly chosenOption: string;
    
    constructor(chosenOption: string) {
        super('modalclosed');
        this.chosenOption = chosenOption;
    }
}