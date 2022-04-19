const FeedModel = require('../models/feed');

const getFeeds = async (req, res) => {
  try {
    const feeds = await FeedModel.find( )
    .sort({ date: "desc" })
    .lean();
    res.json({ feeds })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getFeedsById = async (req, res) => {
    try{
      const feeds = await FeedModel.findById(req.params.id)
      .sort({ date: "desc" })
      .lean()
      res.json({ feeds })
    }catch(err){
      res.status(500).json({ message: err.message })
    }
}

const updateFeed = async (req, res) => {
  try {
    const { title, body, image, source, publisher } = req.body;
    await FeedModel.findByIdAndUpdate(req.params.id, { title, body, image, source, publisher});
    res.json("Feed Updated Successfully");
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};
  
const deleteFeed = async (req, res) => {
  try {
    await FeedModel.findByIdAndDelete({_id:req.params.id});
    res.json("Feed Deleted Successfully");
  } catch (error) {
    
  }
};

const createFeed = async (req, res) => {
    try{     
      const { title, body, image, source, publisher } = req.body;
      await FeedModel.create( {title, body, image, source, publisher} );
      res.json("Feed Create Successfully");
    }catch(err){
      res.status(500).json({ message: err.message })
    }
};

module.exports = {getFeeds, getFeedsById, deleteFeed, updateFeed , createFeed}
