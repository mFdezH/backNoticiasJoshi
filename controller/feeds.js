const FeedModel = require('../models/feed');

const getFeeds = async (req, res) => {
    const feeds = await FeedModel.find( )
    .sort({ date: "desc" })
    .lean();
  res.json({ feeds });
}

const getFeedsById = async (req, res) => {
    const feeds = await FeedModel.findById(req.params.id)
    .sort({ date: "desc" })
    .lean();
  res.json({ feeds });
}

const updateFeed = async (req, res) => {
    const { title, body, image, source, publisher } = req.body;
    await FeedModel.findByIdAndUpdate(req.params.id, { title, body, image, source, publisher});
    res.json("Feed Updated Successfully");
};
  
const deleteFeed = async (req, res) => {
    await FeedModel.findByIdAndDelete({_id:req.params.id});
    res.json("Feed Deleted Successfully");
};

const createFeed = async (req, res) => {
    const { title, body, image, source, publisher } = req.body;
    await FeedModel.create( {title, body, image, source, publisher} );
    res.json("Feed Create Successfully");
};

module.exports = {getFeeds, getFeedsById, deleteFeed, updateFeed , createFeed}
