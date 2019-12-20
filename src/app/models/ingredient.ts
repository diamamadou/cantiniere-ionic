export class Ingredient {
    id?: number;
    status?: number;
    label?: string;
    description?: string;
    image?: string;
    constructor(
        id: number,
        status?: number,
        label?: string,
        description?: string,
        image?: string
    ) {
        this.id = id;
        this.status = status;
        this.label = label;
        this.description = description;
        this.image = image;
    }
}
