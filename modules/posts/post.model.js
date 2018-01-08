var mongoose = require('mongoose');
var { Schema } = require('mongoose');
var slug = require('slug');
var uniqueValidator = require('mongoose-unique-validator');

var postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        minlength: [3, 'Title need to be Longer'],
        unique: true
    },
    text: {
        type: String,
        trim: true,
        required: [true, 'Text is Required'],
        minlength: [10, 'Text needs to be longer']
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true
    }, 
    user: {
       type: Schema.Types.ObjectId,
       refs: 'User' 
    },
    favoriteCound: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

postSchema.plugin(uniqueValidator, {
    message: '{VALUE} already taken'
})

postSchema.pre('save', function(next){
   this._slugify();
   next()
})

postSchema.methods = {
    _slugify: function(){
        this.slug = slug(this.title)
    }
}

postSchema.statics = {
    createPost: function(args, user){
        post = new this(args);
        post.user = user;
        return post.save()
    }
}
module.exports = mongoose.model('Post', postSchema);