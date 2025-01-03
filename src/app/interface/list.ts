export interface List {
    name: String;
    discription: String;
    address: String;
    regularPrice: Number;
    discountPrice: Number;
    bathrooms: Number;
    bedrooms: Number;
    furnished: Boolean;
    parcking: Boolean;
    type: String;
    offer: Boolean;
    images: Array<String>;
    userRef: String;
  }