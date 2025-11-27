/**
 * Module
 */
export interface ModuleEntity {
    description?: string;
    id: number;
    order?: number;
    photo?: string;
    title: string;
    [property: string]: any;
}