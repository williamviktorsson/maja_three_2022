
export interface Player {
    id: string;
}

export class JumpPlayer implements Player {
    id: string;
    power_level: number;
    constructor(id: string, power_level: number) {
        this.id = id;
        this.power_level = power_level;
    }
}