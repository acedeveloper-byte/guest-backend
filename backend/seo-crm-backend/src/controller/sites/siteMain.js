const { response } = require('express');
const siteModel = require('../../schema/sitesModel');

const addSite = async (req, res) => {
  try {
    const { site_name, site_tfn, site_status } = req.body;

    const newSite = new siteModel({
      site_name,
      site_tfn,
      site_status,
    });

    await newSite.save(); // Save site details to MongoDB

    res.status(200).json({
      baseResponse: {
        message: 'Submitted site details',
        status: 'OK',
      },
    });
  } catch (error) {
    res.status(500).json({
      // Use 500 for errors
      baseResponse: {
        message: 'Not Submitted site details',
        status: 'Error',
      },
      response: [],
      error: error.message, // Include error message
    });
  }
};

const getAllsites = async (req, res) => {
  try {
    const getAllsites = await siteModel.find({}); // Fetch all sites

    if (getAllsites.length === 0) {
      return res.status(200).json({
        baseResponse: {
          message: 'No Site yet',
          status: 'empty',
        },
        response: [],
      });
    }

    res.status(200).json({
      baseResponse: {
        message: 'Showing site data',
        status: 'OK',
      },
      response: getAllsites,
    });
  } catch (error) {
    res.status(500).json({
      baseResponse: {
        message: 'Error fetching site data',
        status: 'ERROR',
      },
      response: [],
      error: error.message,
    });
  }
};

const updateSite = async (req, res) => {
  try {
    const { site_id } = req.params;
    const { site_name, site_tfn, site_status } = req.body;

    const updatedSite = await siteModel.findByIdAndUpdate(
      { _id: site_id },
      {
        $set: {
          site_name,
          site_tfn,
          site_status,
        },
      },
      { new: true, runValidators: true } // Ensure updated document is returned
    );

    if (!updatedSite) {
      return res.status(404).json({
        baseResponse: {
          message: 'Site not found',
          status: 'error',
        },
        response: [],
      });
    }

    res.status(200).json({
      baseResponse: {
        message: 'Site data updated successfully',
        status: 'ok',
      },
      response: updatedSite,
    });
  } catch (error) {
    console.error('Error updating site:', error);
    res.status(500).json({
      baseResponse: {
        message: 'Site data not updated',
        status: 'error',
      },
      response: [],
      error: error.message, // Include error message for debugging
    });
  }
};

module.exports = updateSite;

module.exports = { addSite, getAllsites, updateSite };
