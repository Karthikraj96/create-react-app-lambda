import axios from 'axios';
import Cookies from 'js-cookie';
// const Base_Api = 'http://localhost:8083/api';
 const Base_Api = 'http://ec2-13-232-247-239.ap-south-1.compute.amazonaws.com:8083/api';
import jwt_decode from 'jwt-decode';
export let token = Cookies.get('auth_token')
export let AwsURL = 'https://woolmsystem.s3.ap-south-1.amazonaws.com/'
let decodedata2 = token ? jwt_decode(token) : jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY2hvb2xUeXBlIjoiY2JzZSIsImlkIjoiNWUxMWQyODg5MTNiMzUyODA0YWJmOTA5Iiwicm9sZV9pZCI6IjEiLCJwcm9maWxlX3R5cGUiOiJBZG1pbmlzdHJhdG9yIiwib3JnSWQiOjEsImlhdCI6MTYzNjE4NTA3MywiZXhwIjoxNjM2MjQ1MDczfQ.R2Vc2CNUXEsG-NQHnp6w-Kzjea99T2S2HFrzjLqkKBk");
let da = setInterval(() => {
  try {
    decodedata2 = jwt_decode(Cookies.get('auth_token'));
    token = Cookies.get('auth_token')
    clearInterval(da);
  }
  catch (e) {
    token = null
    decodedata2 = jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY2hvb2xUeXBlIjoiY2JzZSIsImlkIjoiNWUxMWQyODg5MTNiMzUyODA0YWJmOTA5Iiwicm9sZV9pZCI6IjEiLCJwcm9maWxlX3R5cGUiOiJBZG1pbmlzdHJhdG9yIiwib3JnSWQiOjEsImlhdCI6MTYzNjE4NTA3MywiZXhwIjoxNjM2MjQ1MDczfQ.R2Vc2CNUXEsG-NQHnp6w-Kzjea99T2S2HFrzjLqkKBk");
  }

}, 1000);
export let decodedata = decodedata2
export const api = axios.create({
  baseURL: Base_Api,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`,
    'Accept': "application/json"
  },
  timeout: 30000,
});
// getParticularSection
export function getParticularSection(data) {
  return api.post('/getParticularSection', data);
}
export function getSectionStudTotal(data) {
  return api.get('/getSectionStudTotal/' + data);
}
export function studentBatchSwap(data) {
  return api.post('/studentBatchSwap', data);
}
export function deleteAttendance(data) {
  return api.post('/deleteAttendance', data);
}
export function getAllOrgTwoPlusFee(data) {
  return api.post('/getAllOrgTwoPlusFee', data);
}
export function addCourseTwoPlusFee(data) {
  return api.post('/addCourseTwoPlusFee', data);
}
export function addCourseRppFee(data) {
  return api.post('/addCourseRppFee', data);
}
export function getAllOrgRppFee(data) {
  return api.post('/getAllOrgRppFee', data);
}
export function addCourseFeeType(data) {
  return api.post('/addCourseFeeType', data);
}
export function addParticular(data) {
  return api.post('/addParticular', data);
}
export function getAllOrgCourseFee(data) {
  return api.post('/getAllOrgCourseFee', data);
}
export function getAllOrgParticular(data) {
  return api.get('getAllOrgParticular/' + data.org+'/'+data.year);
}
export function addFeeType(data) {
  return api.post('/addFeeType', data);
}
export function getAllFeeType(data) {
  return api.get('getAllFeeType/' + data.org+'/'+data.year);
}
export function getCurrentYear() {
  return api.get('getCurrentYear/');
}
export function getAllYear(data) {
  return api.get('getAllYear/' + data);
}
export function deleteYear(data) {
  return api.delete('deleteYear/' + data);
}
export function editCurrentYear(data) {
  return api.put('editCurrentYear/' + data.id, data);
}
export function addYear(data) {
  return api.post('/addYear', data);
}
export function getOrgRadio(data) {
  return api.get('getOrgRadio2/' + data);
}
export function editRadio(data) {
  return api.put('editRadio/' + data.id, data);
}
export function createDocument1(data) {
  return api.post('/createDocument', data);
}
export function editDocument(data) {
  return api.put('editDocument/' + data.id, data);
}
export function editHomework(data) {
  return api.put('editHomework/' + data.id, data);
}
export function getFullProfile(data) {
  return api.get('/getFullProfile/' + data);
}
export function uploadStudentFiles(data) {
  return api.post('uploadStudentFiles/', data);
}
export function guardians_chg(data) {
  return api.put('guardians_chg/' + data.id, data);
}
export function saveNewMob(data) {
  return api.put('saveNewMob/', data);
}
export function saveNewPass(data) {
  return api.put('saveNewPass/', data);
}
export function addstudent(data) {
  return api.post('addstudent/', data);
}
// editGuardianDetail
export function editGuardianDetail(data) {
  return api.put('editGuardianDetail/' + data.id, data);
}
export function editStudentDetail(data) {
  return api.put('editStudentDetail/' + data.id, data);
}
export function getStudentsLanguage(data) {
  return api.get('/getStudents/' + data);
}
export function getStudent_users(data) {
  return api.get('/getStudent_users/' + data);
}
export function getTimetable(data) {
  return api.post('/getTimetable', data);
}
export function addTimetable(data) {
  return api.post('/addTimetable', data);
}
export function addAllocation2(data) {
  return api.post('/addAllocation2', data);
}
export function deleteAllocation(data) {
  return api.delete('/deleteAllocation/' + data)
}
export function getTeacherSectionAllocation(data) {
  return api.post('/getTeacherSectionAllocation2', data);
}
export function getTeacherList() {
  return api.get('/getTeacherList2/');
}
export function cntadmissionStatus(data) {
  return api.post('/cntadmissionStatus', data);
}
export function acceptExistApplication(data) {
  return api.put('acceptExistApplication/' + data.id, data);
}
export function acceptApplication(data) {
  return api.put('acceptApplication2/' + data.id, data);
}
// getSingleApplication
export function editApplication(data) {
  return api.put('editApplication/' + data.id, data);
}
export function postApplication(data) {
  return api.post('postApplication', data);
}
export function countApplication(data) {
  return api.post('countApplication', data);
}
export function countAdmission(data) {
  return api.post('countAdmission', data);
}
export function getAllApplication(data) {
  return api.post('/getAllApplication/'+data.page, data);
}
export default function getGrades() {
  return api.get('/getGrades');
}
export function findRegUser(data) {
  return api.get('/findRegUser/' + data);
}
export function getAllExams(data) {
  return api.get('/getAllExams2?organization_id=' + data.org + '&grade=' + data.grade);
}
export function getSectionFullResult2(data) {
  return api.post('/getSectionFullResult2', data);
}
export function getpaBest2(data) {
  return api.post('/getpaBest2', data);
}
export function getAvgmark(data) {
  return api.post('/getAvgmark', data);
}
export function getPreTotal(data) {
  return api.post('/getPreTotal', data);
}
export function UpdateMaxValue(data) {
  return api.post('/UpdateMaxValue', data);
}
export function getSectionScheduledel(data) {
  return api.post('/getSectionScheduledel', data);
}
export function entryMark(data) {
  return api.post('/entryMark', data);
}
export function internalNeedUpdate(data) {
  return api.post('/internalNeedUpdate', data);
}
export function uploadFileForExam(data) {
  return api.post('/uploadFileForExam2', data);
}
export function getGradeSubjects(data) {
  return api.get('/getGradeSubjects/' + data);
}
export function deleteSchedule2(data) {
  return api.post('/deleteSchedule2', data);
}
export function editSchedule(data) {
  return api.put('/editSchedule/' + data);
}
export function createOneSchedule(data) {
  return api.post('/createOneSchedule2', data);
}
export function getExam(data) {
  return api.get('/getExam/' + data);
}
export function getExamSchedule(data) {
  return api.get('/getExamSchedule/' + data);
}
export function deleteExam(data) {
  return api.delete('/deleteExam/' + data);
}
export function createExam(data) {
  return api.post('/createExam', data);
}
export function deleteSchoolexamtype(data) {
  return api.delete('/deleteSchoolexamtype/' + data);
}
export function addSchoolexamtype(data) {
  return api.post('/addSchoolexamtype', data);
}
export function getAllType(data) {
  return api.get('/getAllType?organization_id=' + data);
}
export function modifyHrInstituteSetup2(data) {
  return api.post('/modifyHrInstituteSetup2', data);
}
export function deleteQues(data) {
  return api.delete('/deleteQues/' + data);
}
export function createQuestion2(data) {
  return api.post('/createQuestion2', data);
}
export function deleteTest(data) {
  return api.delete('/deleteTest/' + data);
}
export function createTest2(data) {
  return api.post('/createTest2', data);
}
export function createTest(data) {
  return api.post('/createTest', data);
}
export function getAllcurrentTestWithResult3(data) {
  return api.post('/getAllcurrentTestWithResult3', data);
}
export function getAllcurrentTestWithResult(data) {
  return api.post('/getAllcurrentTestWithResult2', data);
}
export function deleteEvent(data) {
  return api.delete('/deleteEvent/' + data);
}
export function addEvent(data) {
  return api.post('/addEvent2', data);
}
export function getAllEvent(data) {
  return api.post('/getAllEvent', data);
}
export function deletehomework(data) {
  return api.delete('/deletehomework/' + data);
}
export function createAdminhome3(data) {
  return api.post('/createAdminhome', data);
}
export function createAdminhome2(data) {
  return api.post('/createAdminhome3', data);
}
export function createAdminhome(data) {
  return api.post('/createAdminhome2', data);
}
export function getChapter(data) {
  return api.get('/getChapter/' + data);
}
export function getAllOrgHomeworks(data) {
  return api.post('/getAllOrgHomeworks', data);
}
export function deleteSurvey(data) {
  return api.delete('/deleteSurvey/' + data);
}
export function getSurveyQues(data) {
  return api.get('/getSurveyQues/' + data);
}
export function PostSurveyQuestions(data) {
  return api.post('/PostSurveyQuestions', data);
}
export function getSurvey(data) {
  return api.post('/getSurvey', data);
}
export function createSurvey(data) {
  return api.post('/createSurvey', data);
}
export function createContest(data) {
  return api.post('/createContest2', data);
}
export function getWinners(data) {
  let id = data.id
  let section = data.section
  return api.get('/getWinners2/' + id + '/' + section);
}
export function deleteContest(data) {
  return api.delete('/deleteContest2/' + data);
}
export function getAllContests(data) {
  return api.post('/getAllContests', data);
}
export function getSectionDetail(data) {
  let grade_id = data.grade_id;
  let org = data.orgId ? data.orgId : decodedata.orgId
  return api.get('/getSectionDetail/' + grade_id + '/' + org);
}
export function updateSection(data) {
  return api.post('/updateSection', data);
}
export function createSection(data) {
  return api.post('/createSection', data);
}
export function deleteSection(data) {
  return api.post('/deleteSection', data);
}
export function signin(data) {
  return api.post('/authenticate', data);
}
export function getTeacherSuggestion(data) {
  return api.post('/getTeacherSuggestion', data);
}
export function getParentSuggestion(data) {
  return api.post('/getParentSuggestion', data);
}
export function PostParentSuggestion(data) {
  return api.post('/postParentSuggestion', data);
}
export function GetSuggestionTotal(data) {
  return api.post('/suggestionTotal', data);
}
export function SuggestionClosed(data) {
  return api.post('/suggestionsetclosed', data);
}
export function PostTeacherSuggestion(data) {
  return api.post('/postTeacherSuggestion', data);
}
export function getTeacherDiscipline(data) {
  return api.post('/get_discipline_teacher', data);
}
export function PostTeacherDiscipline(data) {
  return api.post('/post_discipline_teacher', data);
}
export function getTeacherDisciplineTotal(data) {
  return api.post('/getTotalDicipline', data);
}
export function teacherDisciplineClose(data) {
  return api.post('/close_discipline_teacher', data);
}
export function getAnnoucement(data) {
  return api.post('/getAllAnnouncement', data);
}
export function deleteAnnoucement(data) {
  return api.post('/deleteAnnouncement/', data);
}
export function createAnnoucement(data) {
  return api.post('/addAnnouncement2', data);
}
export function setleave(data) {
  return api.post('/setleave', data);
}
export function getStudents(data) {
  let section = data.section_id;
  let org = data.orgId ? data.orgId : decodedata.orgId
  return api.get('/getStudents2/' + section + '/' + org);
}
export function getStudentsTotal(data) {
  let org = data.orgId ? data.orgId : decodedata.orgId
  return api.get('/getStudent_Total2/' + org);
}
export function editAttendence(data) {
  return api.post('/editAttendanceEntry2', data);
}
export function getSectionAttendence(data) {
  return api.post('/getAttendance2', data);
}
export function getAttendenceId(data) {
  return api.post('/createAttendance2', data);
}
export function postAttendence(data) {
  return api.post('/entrieAttendance', data);
}
export function getLeave(data) {
  return api.post('/getAllLeaves2', data);
}
export function getTc(data) {
  return api.post('/getApplyTCList2', data);
}
export function setTc(data) {
  return api.post('/setTc', data);
}
export function postRadio(data) {
  return api.post('/radio/upload', data);
}
export function deleteRadio(data) {
  return api.post('/radio/delete', data);
}
export function addRadio(data) {
  return api.post('addRadio1', data);
}
export function getRadio(data) {
  return api.get('/getRadio/'+data);
}
// addSpeech2
export function addSpeech2(data) {
  return api.post('/addSpeech2', data);
}
export function postSpeech(data) {
  return api.post('/speech/upload', data);
}
export function deleteSpeech2(data) {

  return api.post('/speech/delete2', data);
}
export function deleteSpeech(data) {

  return api.post('/speech/delete', data);
}
export function getSpeech() {
  return api.get('/getPrincispeech');
}
export function getDocument(data) {
  return api.post('/getDocuments', data);
}
export function createDocument(data) {
  return api.post('/createDocument1', data);
}
export function downloadDocument(data) {
  return api.post('/downloadDocument', data);
}
export function deleteDocument(data) {
  return api.post('/deleteDocument', data);
}
export function deleteDocument2(data) {
  return api.post('/deleteDocument2', data);
}
export function createExtraActi(data) {
  return api.post('/createActivity', data);
}
export function deleteExtraActi(data) {
  let id = { id: data }
  return api.post('/deleteActivity', id);
}
export function getOrgId() {
  return api.get('/getHrInstituteSetups2/');
}
export function getExtra(data) {
  return api.post('/getAllActivity', data);
}
export function getFullAttendence(data) {
  return api.post('/getFullAttendce', data);
}
export function getAttendenceTotal(data) {
  let { orgId, entry_date } = data
  return api.get('/getDayTotalAttendanceChart/' + entry_date + '/' + orgId);
}
export function getTeacher(data) {
  return api.get('/getOrgTeacherList/' + data);
}
export function getClass(data) {
  let id = data.id;
  let level = data.level;
  return api.get('/getOrgSection/' + level + '/' + id);
}
export function getSubject2(data) {
  let level = data.level;
  return api.get('/getSubject2/' + level);
}
export function getSubject(data) {
  let type = data.type;
  let level = data.level;
  return api.get('/getOrgSubject/' + level + '/' + type);
}
export function postSchedule(data) {
  return api.post('/addSchedlue', data);
}
export function getSchedule(data) {
  return api.get('/getSchedule/' + data);
}
export function deleteSchedule(data) {
  return api.post('/deleteSchedlue', data);
}
export function getAllSuggestion() {
  return api.get('/getAllSuggestion')
}
export function getAllDiscipline() {
  return api.get('/getAllDiscipline')
}
//Awards&Recognition
export function getRecognition(){
  return api.get('/Recognition');
}
export function postRecognition(data) {
  return api.post('/Recognition',data);
}
export function deleteRecognition(data){
  return api.delete('/Recognition/'+data.id);
}
export function getBadge(){
  return api.get('/Badge');
}
export function postBadge(data){
  return api.post('/Badge',data);
}
export function deleteBadge(data){
  return api.delete('/Badge/'+data.id);
}
//expenses and expensestype 
export function getExpenses(){
  return api.get('/getExpenses');
}
export function createExpenses(data) {
  return api.post('/createExpenses',data);
}
export function deleteExpenses(data){
  return api.delete('/deleteExpenses/'+data.id);
}
//expensestype
export function getExpensesType(){
  return api.get('/getExpensesType');
}
export function createExpensestype(data) {
  return api.post('/createExpensestype',data);
}
export function deleteExpensestype(data){
  return api.delete('/deleteExpensestype/'+data.id);
}
//Transport 
export function getBusLoc(){
  return api.get('/getBusLoc');
}