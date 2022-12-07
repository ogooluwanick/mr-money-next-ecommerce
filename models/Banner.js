import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
        image:String,
        buttonText:String,
        product:String,
        slug:String,
        desc:String,
        smallText:String,
        midText:String,
        largeText1:String,
        largeText2:String,
        discount:String,
        saleTime:String,
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
export default Banner;