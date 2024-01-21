type Item = {
  name: string;
  hasContent: boolean;
  segments: string[];
  children: Item[];
};

export default Item;
