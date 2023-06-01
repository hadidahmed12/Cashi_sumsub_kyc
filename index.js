const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const cors = require("cors");
const {
  createAccessToken,
  getApplicantStatus,
  createApplicant,
  addDocument,
} = require("./sub-sum");

app.use(cors());
// app.get("/testing", async (req, res) => {
//   return res.send("Success");
// });
app.post("/create-applicant", async (req, res) => {
  try {
    // const {kycLevel,documentType,documentImage} = req.body
    externalUserId =
      "random-JSToken-" + Math.random().toString(36).substr(2, 9);
    levelName = "basic-kyc-level";
    console.log("testing ----------------");
    console.log("object");

    const applicant = await axios(createApplicant(externalUserId, levelName));
    console.log("============>>>>> Applicant", applicant?.data);

    const applicantid = applicant.data.id;
    console.log("Applicant id ============>>>>>>>>>>>>", applicantid);

    // res.send(applicant?.data);

    const adddocs = await axios(addDocument(applicantid));

    console.log("============>>>>> adddocs", adddocs?.data);

    res.send(adddocs?.data);

    // const status = await axios(getApplicantStatus(applicantid));

    // console.log("🚀 ~ file: index.js:40 ~ app.post ~ status:", status?.data);

    // res.send({
    //   applicant: applicant?.data,
    //   addoc: adddocs?.data,
    //   status: status?.data,
    // });
  } catch (error) {
    res.send(error);
  }
});

// app.post("/create-token", async (req, res) => {
//   try {
//     externalUserId =
//       "random-JSToken-" + Math.random().toString(36).substr(2, 9);
//     levelName = "basic-kyc-level";

//     //   const applicant = await axios(createApplicant(externalUserId, levelName));

//     const token = await axios(createAccessToken(externalUserId));
//     console.log("============>>>>> token", token?.data);

//     //   res.send(applicant?.data);
//     res.send(token?.data);
//   } catch (error) {
//     res.send(error);
//   }
// });

// app.get("/getstatus", async (req, res) => {
//   try {
//     // if (!req.query.applicantid){
//     //     return res.statusCode(400).send({message:"applicant id is required"})
//     // }
//     const status = await axios(getApplicantStatus(req.params.applicantid));
//     console.log("🚀 ~ file: index.js:40 ~ app.post ~ status:", status?.data);

//     res.send(status?.data);
//   } catch (error) {
//     res.send(error);
//   }
// });

//  app.get('/',async(req,res)=>{
//     try {
//         externalUserId = "random-JSToken-" + Math.random().toString(36).substr(2, 9);
//          const token = await axios(createAccessToken(externalUserId))
//          res.send(token.data)
//     } catch (error) {
//         res.send(error)
//     }
// })

app.listen(3001, () => {
  console.log("server lisring listening");
});
