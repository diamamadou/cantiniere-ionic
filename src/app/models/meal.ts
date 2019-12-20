import { Ingredient } from './ingredient';

export class Meal {
    id?: number;
    status?: number;
    label?: string;
    description?: string;
    priceDF: number;
    availableForWeeks: string;
    image?: string;
    ingredients: Ingredient[];
    constructor(
        id: number,
        status?: number,
        label?: string,
        description?: string,
        priceDF?: number,
        availableForWeeks?: string,
        image?: string
    ) {
        this.id = id;
        this.status = status;
        this.label = label;
        this.description = description;
        this.priceDF = priceDF;
        this.availableForWeeks = availableForWeeks;
        this.image = image;
    }
}
