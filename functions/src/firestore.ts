import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const surveyCount = functions.firestore
  .document(`users/{userId}/communitySurveyResults`)
  .onCreate(async (snapshot, context) => {
    const data = await snapshot.data();

    const communitySurveyResultsRef = db.doc('Surveys/communitySurveyResults')
    const surveySnap = await communitySurveyResultsRef.get();
    const surveyData = surveySnap.data();
    
    console.log(snapshot, data, ' then ', surveyData);
  })