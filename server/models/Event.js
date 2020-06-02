const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//validate inputs
let Type_eventLengthCheker = (Type_event) => {
  if (!Type_event) {
    return false;
  } else {
    if (Type_event.length > 25) {
      return false;
    } else return true;
  }
};
let Type_eventValidCheker = (Type_event) => {
  if (!Type_event) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(Type_event);
  }
};

const typeEventValidator = [
  {
    validator: Type_eventLengthCheker,
    message: "type event must  no more 25 characteres ",
  },
  {
    validator: Type_eventValidCheker,
    message: "type event must not have any special characteres ",
  },
];

let cityLengthCheker = (City) => {
  if (!City) {
    return false;
  } else {
    if (City.length > 25) {
      return false;
    } else return true;
  }
};
let CityValidCheker = (City) => {
  if (!City) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(City);
  }
};
const cityValidators = [
  {
    validator: cityLengthCheker,
    message: "city must be no more 25 characters ",
  },
  {
    validator: CityValidCheker,
    message: "city must not have any special characteres ",
  },
];
let TitreLengthCheker = (Titre) => {
  if (!Titre) {
    return false;
  } else {
    if (Titre.length > 25) {
      return false;
    } else return true;
  }
};
let TitreValidCheker = (Titre) => {
  if (!Titre) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(Titre);
  }
};
const TitreValidator = [
  {
    validator: TitreLengthCheker,
    message: "Titre event must be no more 25 ",
  },
  {
    validator: TitreValidCheker,
    message: "Titre must not have any special characteres ",
  },
];

let DescriptionLengthCheker = (Description) => {
  if (!Description) {
    return false;
  } else {
    if (Description.length > 500) {
      return false;
    } else return true;
  }
};

const DescriptionValidator = [
  {
    validator: DescriptionLengthCheker,
    message: "Description must not more 500 ",
  },
];
let countryLengthCheker = (Country) => {
  if (!Country) {
    return false;
  } else {
    if (Country.length > 25) {
      return false;
    } else return true;
  }
};
let ContryValidCheker = (Country) => {
  if (!Country) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(Country);
  }
};
const countryValidators = [
  {
    validator: countryLengthCheker,
    message: "Country must be no more 25 characters ",
  },
  {
    validator: ContryValidCheker,
    message: "Country must not have any special characteres ",
  },
];

let ZipCodeCheker = (Zip_Code) => {
  if (!Zip_Code) {
    return false;
  } else {
    if (Zip_Code.length < 4 || Zip_Code.length > 8) {
      return false;
    } else return true;
  }
};
const Zip_CodeValidators = [
  {
    validator: ZipCodeCheker,
    message: "Zip_Code must be at least 4 characters but no more 8 ",
  },
];

let eventImageCheker = (Zip_Code) => {
  if (!Zip_Code) {
    return false;
  }
};
const eventImageValidators = [
  {
    validator: eventImageCheker,
    message: "eventImage must be not null ",
  },
];

let start_dateCheker = (start_date) => {
  if (!start_date) {
    return false;
  } else {
    const regExp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return regExp.test(start_date);
  }
};

const start_dateValidators = [
  {
    validator: start_dateCheker,
    message: "start_date must be  valid ",
  },
];
let End_dateCheker = (End_date) => {
  if (!End_date) {
    return false;
  } else {
    const regExp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return regExp.test(End_date);
  }
};

const End_dateValidators = [
  {
    validator: End_dateCheker,
    message: "End_date must be  valid",
  },
];

let commentLengthCheker = (Comment) => {
  if (!Comment[0]) {
    return false;
  } else {
    if (Comment[0].length < 1 || Comment[0].length > 200) {
      return false;
    } else {
      return true;
    }
  }
};
const commentValidators = [
  {
    validator: commentLengthCheker,
    message: "Comments may not exceed 200 characters",
  },
];
// Create Schema
var EventSchema = Schema({
  Type_event: {
    type: String,
    required: true,
    validate: typeEventValidator,
  },
  City: {
    type: String,
    required: true,
    validate: cityValidators,
  },
  Country: {
    type: String,
    required: true,
    validate: countryValidators,
  },
  Titre: {
    type: String,
    required: true,
    validate: TitreValidator,
  },
  Description: {
    type: String,
    required: true,
    validate: DescriptionValidator,
  },
  Sponsor: {
    type: String,
  },
  Zip_code: {
    type: String,
    required: true,
    validate: Zip_CodeValidators,
  },

  Start_date: {
    type: String,
    required: true,
    validate: start_dateValidators,
  },
  End_date: {
    type: String,
    required: true,
    validate: End_dateValidators,
  },
  EventImage: {
    type: String,
    required: true,
    validate: eventImageValidators,
  },
  Likes: {
    type: Number,

    default: 0,
  },

  DisLikes: {
    type: Number,

    default: 0,
  },
  likedBy: { type: Array },
  DisLikedBy: { type: Array },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  Commnets: [
    {
      comment: { type: String, validate: commentValidators },
      commentator: { type: String },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Events = mongoose.model("Events", EventSchema);
