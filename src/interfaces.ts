export interface Product {
    id: string;
    basePrice: number;
    rules: Rule[];
}

export interface Rule {
    conditions: Condition[];
    operation: Operation;
}

export interface Condition {
    field: string;
    operator: '>' | '<' | '==' | '!=';
    value: number | string | boolean;
    type?: 'AND' | 'OR';
}

export interface Operation {
    field: string;
    operator: '+' | '-' | '*' | '/';
    value: number;
}