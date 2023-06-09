const router = require("express").Router();
const Data = require("../model/dataSchema");
const data = require("../Data");

//create

router.post("/create", (req, res) => {
  data.map(async (value) => {
    const addData = await new Data(value);
    try {
      const savedData = await addData.save();
    } catch (error) {
      res.status(404).json(error);
    }
  });
  res.status(200).json("success");
});

router.get("/get", async (req, res) => {
  try {
    const result = await Data.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error);
  }
});

//bar chart
router.get("/publications", async (req, res) => {
  const sector = req.query.sector;
  let filter = {};
  if (sector) {
    filter.sector = sector;
  }
  let result;
  await Data.find(filter, "country title")
    .then((value) => {
      result = value;
    })
    .catch((err) => {
      res.status(404).json(err);
    });
  res.status(200).json(result);
});

// DoughNut chart
router.get("/sector", async (req, res) => {
  const topic = req.query.topic;
  let filter = {};
  if (topic) {
    filter.topic = topic;
  }

  try {
    const result = await Data.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$sector",
          totalIntensity: { $sum: "$intensity" },
        },
      },
      {
        $project: {
          _id: 0,
          sector: "$_id",
          value: "$totalIntensity",
        },
      },
    ]);
    res.status(200).json(result.filter(value=>value.sector != ""));
  } catch (error) {
    res.status(500).json(error);
  }
});
//linechart

router.get('/time', async (req, res) => {
  const { country } = req.query;
  let filter = {};
  if (country) {
    filter.country = country;
  }
 
  let result;

  await Data.aggregate([
    {
      $match:filter
    },
    {
      $group: {
        _id: '$end_year',
        totalLikelihood: { $sum: '$likelihood' }
      }
    },
    {
      $project: {
        _id: 0,
        end_year: '$_id',
        totalLikelihood: 1
      }
    }
  ])
    .then(value => {
      result = value;
      
    })
    .catch(err => {
      res.status(404).json(err);
    });

  res.status(200).json(result);
});

//horizontal bar chart

router.get("/relavance", async (req, res) => {
  let result;
  await Data.find({}, "sector relevance")
    .then((value) => {
      result = value;
    })
    .catch((err) => {
      res.status(404).json(err);
    });
  
  const relavanceSector = {};
  result.forEach((item) => {
    const { sector } = item;
    if (relavanceSector.hasOwnProperty(sector)) {
      relavanceSector[sector] += item.relevance;
    } else {
      relavanceSector[sector] = item.relevance;
    }
  });
  const arr = Object.entries(relavanceSector).map(([sector, value]) => ({
    sector,
    value,
  }));

  res.status(200).json(arr);
});

//group chart

router.get("/groupchart", async (req, res) => {
  const { end_year } = req.query;
  const match = end_year ? { end_year } : {};
  Data.aggregate([
    {$match:match},
    {
      $group: {
        _id: "$sector",
        totalRelavance: { $sum: "$relevance" },
        totalIntensity: { $sum: "$intensity" },
      },
    },
    {
      $project: {
        _id: 0,
        sector: "$_id",
        totalRelavance: 1,
        totalIntensity: 1,
      },
    },
  ])
    .then((result) => {
      res.status(200).json(result);
      // Use the result array of objects as needed
    })
    .catch((error) => {
      console.error(error);
    });
});

//scatter bar

router.get("/region", async (req, res) => {
  const pestle = req.query.pestle;

  let filter = {};

  if(pestle){
    filter.pestle=pestle;
  }

  Data.aggregate([
    {$match:filter},
    {
      $group: {
        _id: "$region",
        totalIntensity: { $sum: "$intensity" },
        totalRelevance: { $sum: "$relevance" },
      },
    },
    {
      $project: {
        region: "$_id",
        totalIntensity: 1,
        totalRelevance: 1,
        _id: 0,
      },
    },
  ])
    .exec()
    .then((result) => {
      
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

//sector

router.get("/sectors", async (req, res) => {
  try {
    const sectors = await Data.distinct("sector",{ country: { $ne: "" } });

    res.status(200).json(sectors.filter((value) => value != ""));
  } catch (error) {
    res.status(500).json(error);
  }
});

//country

router.get("/country", async (req, res) => {
  try {
    const countrys = await Data.distinct("country",{ end_year: { $ne: "" } });
    
    res.status(200).json(countrys.filter((value) => value != ""));
  } catch (error) {
    res.status(500).json(error);
  }
});

//topic
router.get("/topics", async (req, res) => {
  try {
    const topics = await Data.distinct("topic", {
      intensity: { $gt: 0 },
      sector: { $exists: true, $ne: "" }
    });

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json(error);
  }
});

//end_year
router.get("/endYear", async (req, res) => {
  try {
    const topics = await Data.distinct("end_year");
    res.status(200).json(topics.filter(value=>value != ""));
  } catch (error) {
    res.status(500).json(error);
  }
});

//Pestle
router.get("/pestle", async (req, res) => {
  try {
    const pestles = await Data.distinct("pestle", { region: { $ne: "" } });

    res.status(200).json(pestles);
  } catch (error) {
    res.status(500).json(error);
  }
});






module.exports = router;
