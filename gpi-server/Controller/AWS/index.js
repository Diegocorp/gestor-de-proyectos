const aws = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const multers3 = require("multer-s3");
const s3 = new aws.S3({
  region: "us-west-1",
});

const uploadImage = multer({
  storage: multers3({
    s3: s3,
    bucket: "gpi-images",
    acl: "public-read",
    contentType: multers3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, res, cb) {
      let fullpath = `users/${req.body.imageName}`;
      cb(null, fullpath);
    },
  }),
});

const getImage = (req, res) => {
  try {
    const fullpath = `users/${req.params.fileName}`;
    const params = { Bucket: "gpi-images", Key: fullpath, Expires: 60 * 5 };
    const url = s3.getSignedUrl("getObject", params);
    res.status(200).json({ success: true, data: url });
  } catch (error) {
    console.log(error.message);
  }
};

const uploadDocument = multer({
  storage: multers3({
    s3,
    bucket: "gpi-images",
    acl: "public-read",
    contentType: multers3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, res, cb) {
      let fullpath = `projects/${req.params.id}/${req.body.fileName}`;
      cb(null, fullpath);
    },
  }),
});

const getDocument = (req, res) => {
  try {
    const fullpath = `projects/${req.params.id}/${req.params.fileName}`;
    const params = { Bucket: "gpi-images", Key: fullpath, Expires: 60 * 5 };
    const url = s3.getSignedUrl("getObject", params);
    res.status(200).json({ success: true, data: url });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteDocument = (req, res) => {
  try {
    const fullpath = `projects/${req.params.id}/${req.params.fileName}`;
    const params = { Bucket: "gpi-images", Key: fullpath };
    s3.deleteObject(params, function(err, data){
      if(err) console.log(err, err.stack);
      else console.log(`Document deleted`);
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteDirectory = async (req, res) => {
  const listParams = {
      Bucket: 'gpi-images',
      Prefix: `projects/${req.params.id}/`
  };
  const listedObjects = await s3.listObjectsV2(listParams).promise();
  if (listedObjects.Contents.length === 0) return;
  const deleteParams = {
      Bucket: 'gpi-images',
      Delete: { Objects: [] }
  };
  listedObjects.Contents.forEach(({ Key }) => {
      deleteParams.Delete.Objects.push({ Key });
  });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await emptyS3Directory('gpi-images', `projects/${req.params.id}/`);
}

module.exports = {
  uploadImage,
  getImage,
  uploadDocument,
  getDocument,
  deleteDocument,
  deleteDirectory,
};