export type ActionResult = {
   error: string;
};
// data type buat ActionResult untuk mengkartegorikan bahwa sanya itu string
export type Tparams = {
   id: string;
};
export type Tedit = {
   params: Tparams;
};
export type Tproduct = {
   id: number;
   image_url: string | null;
   name: string;
   category_name: string;
   price: number;
};
