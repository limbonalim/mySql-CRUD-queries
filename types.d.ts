export interface IData {
  name: string | null;
  description: string | null;
}

interface IItemData extends IData{
  category: string;
  point: string;
}

interface IQueryPutOptions {
  nameAndDescription: string,
  description: string,
  name: string,
}