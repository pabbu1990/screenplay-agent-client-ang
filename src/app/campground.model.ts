export class Campground {
  id: string;
  name: string;
  image: string;
  description: string;
//   comments :[{
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Comment"
// }],
//   author: {
//   id:{
//     type: mongoose.Schema.Types.ObjectId,
//       ref: "User"
//   },
//   username: String
  constructor(id: string, name: string, image: string, desc: string) {
    this.id = id;
    this.name = name;
    this. image= image;
    this.description = desc;
}
}


